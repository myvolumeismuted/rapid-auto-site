import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js"
import nodemailer from "nodemailer"


async function sendEmail(target: string, name: string): Promise<{ success: boolean }> {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "kam@rapidautoworks.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });
  
    try {
      await transporter.sendMail({
        from: `"Kam @ RapidAuto"`,
        to: target,
        subject: "Your Recent Service Request",
        text: `Hi ${name},
  
  Thank you for submitting a service request through RapidAuto.
  You made a great decision — your car will thank you for it.
  
  A mechanic from our team will contact you shortly.
  
  – RapidAuto`,
      });
  
      return { success: true };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false };
    }
}


async function sendEmailToOwner(id: string): Promise<{ success: boolean }> {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "kam@rapidautoworks.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });
  
    try {
      await transporter.sendMail({
        from: `"Kam @ RapidAuto"`,
        to: ["kamerenrichardson1@gmail.com", "kam@rapidautoworks.com"],
        subject: "Your Recent Service Request",
        html: `Theres been a new service request. Login to the dashboard and approve now. Request ID: ${id}. View Here: https://www.rapidautoworks.com/admin/edit/${id}"`,
      });
  
      return { success: true };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false };
    }
}


function createID() {
    let id = "XXXXXXXXXXXX"
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    while (id.includes("X")) {
        id = id.replace("X", characters.charAt(Math.floor(Math.random() * characters.length)))
    }
    return id
}


export async function POST(request: NextRequest) {
    const baseApiRoute = process.env.SUPABASE_URL!
    const formData = await request.json()
    const supabase = createClient(baseApiRoute, process.env.SUPABASE_KEY!)
    const id = createID()
    const { data, error } = await supabase.from("inquiries").insert([{...formData, lookup_id: id}]).select().single()
    if (error) {
        console.log(error)
    } else {
        console.log(data)
        const { email } = formData
        await sendEmail(email, formData.firstName)
        await sendEmailToOwner(data.lookup_id)
    }
    return NextResponse.json({ success: true })
}


