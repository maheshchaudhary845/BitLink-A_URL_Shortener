import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { name, email, message } = await request.json()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'New message from BitLink contact form',
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: \n${message}`
    }

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true })
    }
    catch (error) {
        console.error("Email send error: ", error)
        return NextResponse.json({ success: false, error: error.message })
    }
}