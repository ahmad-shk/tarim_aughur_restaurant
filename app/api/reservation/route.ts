import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/sendEmail"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, guests, date, time } = body

    const htmlContentAdmin = `
      <h2>New Reservation Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
    `

    const htmlContentCustomer = `
      <h2>Reservation Confirmation</h2>
      <p>Dear ${name},</p>
      <p>Your reservation for ${guests} person(s) on ${date} at ${time} has been received.</p>
      <p>We look forward to serving you!</p>
    `

    // Send email to admin & staff
    await sendEmail({
      to: `${process.env.ADMIN_EMAIL}, ${process.env.STAFF_EMAIL}`,
      subject: "New Restaurant Reservation",
      html: htmlContentAdmin,
    })

    // Send confirmation to customer
    await sendEmail({
      to: email,
      subject: "Your Reservation is Confirmed!",
      html: htmlContentCustomer,
    })

    return NextResponse.json({ success: true, message: "Emails sent!" })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
