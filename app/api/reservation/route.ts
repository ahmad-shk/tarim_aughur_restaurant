import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, guests, date, time, message } = body;

    const htmlContent = `
      <h2>New Reservation Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    `;

    await sendEmail({
      to: `${process.env.ADMIN_EMAIL}, ${process.env.STAFF_EMAIL}`,
      subject: "New Restaurant Reservation",
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Email Sent!" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
