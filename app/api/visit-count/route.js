// /app/api/visit-count/route.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodbmongoose";
import User from "@/models/user";

export async function GET(req) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findOne({ email: token.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    visitCount: user.visitCount,
    access: user.access, // "paid" or undefined/null
  });
}
