export const runtime = "nodejs"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, serviceType, phone, message } = await req.json()

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Remove NEXT_PUBLIC_ prefix
        pass: process.env.GMAIL_APP_PASS, // Remove NEXT_PUBLIC_ prefix
      },
    })

    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission - ${serviceType}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Service Type: ${serviceType}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || 'Not provided'}</p>
        <p><b>Service Type:</b> ${serviceType}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send email" }, 
      { status: 500 }
    )
  }
}