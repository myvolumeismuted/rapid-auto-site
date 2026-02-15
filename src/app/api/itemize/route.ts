import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe"

async function handleSendInvoice(customerData: any, items: [{name: string, price: number}]) {
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
    }
}

export async function POST(request: NextRequest) {
    const { lookup_id, items } = await request.json()
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    const { data, error } = await supabase.from("inquiries").update({ itemization: JSON.stringify(items) }).eq("lookup_id", lookup_id).select().single()
    if (error) return NextResponse.json({ success: false })
    if (data.selected_option) await handleSendInvoice(data, JSON.parse(JSON.stringify(items)))
    return NextResponse.json({ success: true })
}