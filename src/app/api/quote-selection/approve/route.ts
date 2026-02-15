import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer"
import Stripe from "stripe"
import cron from "node-cron"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "kam@rapidautoworks.com",
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})

async function createAndSendInvoice(items: [{name: string, price: number}], customerData: {}) {
    try {
        const stripe = new Stripe(process.env.STRIPE_KEY!)
        // CREATE THE CUSTOMER OBJECT
        const customer = await stripe.customers.create(customerData)
        console.log(customer)
        // CREATE THE INVOICE
        const invoice = await stripe.invoices.create({
            customer: customer.id,
            days_until_due: 0,
            collection_method: "send_invoice"
        })
        // ADD ALL OF THE CHARGE ITEMS TO THE INVOICE
        for (const item of items) {
            await stripe.invoiceItems.create({
                description: item.name || "Rapid Auto Care General Service",
                amount: (item.price * 100),
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
    const { option, lookup_id } = await request.json().catch(error => { return {} })
    console.log(option, lookup_id)
    const supabase = await createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    const { data, error } = await supabase.from("inquiries").update({ selected_option: JSON.stringify(option) }).eq("lookup_id", lookup_id).select("*").single()
    if (error) return NextResponse.json({ success: false, error: error.message })
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
    
    if (data.itemization) {
        await createAndSendInvoice(JSON.parse(data.itemization), {email: data.email, name: `${data.firstName} ${data.lastName}`, phone: data.phone || null})
    }

    return NextResponse.json({success: true})
}