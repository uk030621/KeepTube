import connectDB from "@/lib/mongodbmongoose";
import Contact from "@/models/contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// POST method to save contact and send email
export async function POST(req) {
  const { fullname, email, message } = await req.json();

  try {
    await connectDB();
    await Contact.create({ fullname, email, message });

    // Send email via Resend
    const sendResult = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL, // ✅ Important: use domain verified with Resend
      to: process.env.ADMIN_EMAILS, // Where you want to receive messages
      subject: "New Contact Message",
      reply_to: email, // optional: makes it easy to reply
      text: `
        Name: ${fullname}
        Email: ${email}
        
        Message:
        ${message}
      `,
    });

    if (sendResult.error) {
      console.error("Email failed:", sendResult.error);
      return NextResponse.json({
        msg: ["Message saved but email failed to send."],
        success: false,
      });
    }

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to send message."] });
    }
  }
}

// GET method to retrieve all contact messages
export async function GET() {
  try {
    await connectDB();
    const messages = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to fetch messages."] });
  }
}
