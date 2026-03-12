import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer"
import Stripe from "stripe"

type InvoiceItem = { name: string; price: number }
type SelectedOption = {
    title?: string
    price?: string | number
    itemization?: InvoiceItem[]
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "kam@rapidautoworks.com",
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})

function normalizeItemization(items: unknown): InvoiceItem[] {
    if (!Array.isArray(items)) return []
    return items
        .map((item) => {
            const source = (item || {}) as { name?: unknown; price?: unknown }
            const price = Number(source.price)
            if (!Number.isFinite(price) || price <= 0) return null
            return {
                name: typeof source.name === "string" && source.name.trim()
                    ? source.name.trim()
                    : "Rapid Auto Care General Service",
                price
            }
        })
        .filter((item): item is InvoiceItem => Boolean(item))
}

async function createAndSendInvoice(items: InvoiceItem[], customerData: Stripe.CustomerCreateParams) {
    try {
        const stripe = new Stripe(process.env.STRIPE_KEY!)
        // CREATE THE CUSTOMER OBJECT
        const customer = await stripe.customers.create(customerData)
        // CREATE THE INVOICE
        const invoice = await stripe.invoices.create({
            customer: customer.id,
            days_until_due: 0,
            collection_method: "send_invoice"
        })
        // ADD ALL OF THE CHARGE ITEMS TO THE INVOICE
        for (const item of items) {
            const amount = Math.round(item.price * 100)
            if (!Number.isInteger(amount) || amount <= 0) continue
            await stripe.invoiceItems.create({
                description: item.name || "Rapid Auto Care General Service",
                amount,
                currency: "usd",
                invoice: invoice.id,
                customer: customer.id
            })
        }
        // FINALIZE AND SEND THE INVOICE
        await stripe.invoices.finalizeInvoice(invoice.id)
        await stripe.invoices.sendInvoice(invoice.id)
        console.log("Stripe Invoice Sent to customer. Awaiting Payment")
    } catch (error) {
        // ERROR HANDLING
        throw new Error(`Error: ${error}`)
    }
}

export async function POST(request: NextRequest) {
    const payload = await request.json().catch(() => ({})) as {
        option?: SelectedOption
        lookup_id?: string
        itemization?: unknown
    }
    const { option, lookup_id } = payload
    if (!lookup_id) {
        return NextResponse.json({ success: false, message: "Missing lookup_id" }, { status: 400 })
    }

    const normalizedItemization = normalizeItemization(payload.itemization ?? option?.itemization)
    if (normalizedItemization.length === 0) {
        const fallbackPrice = Number(option?.price)
        if (Number.isFinite(fallbackPrice) && fallbackPrice > 0) {
            normalizedItemization.push({
                name: option?.title?.trim() || "Rapid Auto Care Service",
                price: fallbackPrice
            })
        }
    }

    const supabase = await createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    const { data, error } = await supabase
        .from("inquiries")
        .update({
            selected_option: JSON.stringify(option || {}),
            itemization: JSON.stringify(normalizedItemization)
        })
        .eq("lookup_id", lookup_id)
        .select("*")
        .single()

    if (error || !data) return NextResponse.json({ success: false, error }, { status: 500 })

    await transporter.sendMail({
        to: data.email,
        from: "'Kam @ RapidAuto'",
        subject: "Your recent service request",
        text: "Your appointment is confirmed! Don't go anywhere just yet! A member from our team will send you information concerning your scheduled service soon. Thank you for choosing RapidAuto!"
    })
    await transporter.sendMail({
        to: "kamerenrichardson1@gmail.com",
        from: "'Kam @ RapidAuto'",
        subject: "Recent service request",
        text: `Request #${lookup_id} has now chosen a quote option. Please review and follow-up with the customer to begin servicing`
    })

    if (normalizedItemization.length > 0) {
        await createAndSendInvoice(normalizedItemization, {
            email: data.email,
            name: `${data.firstName} ${data.lastName}`,
            phone: data.phone || undefined
        })
    }

    return NextResponse.json({success: true})
}
