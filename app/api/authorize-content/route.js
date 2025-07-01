// /app/api/authorize-content/route.js
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

  if (user.access === "paid") {
    return NextResponse.json({ access: "paid" }, { status: 200 });
  }

  if (user.visitCount >= 3) {
    return NextResponse.json({ access: "limit-exceeded" }, { status: 403 });
  }

  await User.updateOne({ email: token.email }, { $inc: { visitCount: 1 } });

  return NextResponse.json({ access: "free" }, { status: 200 });
}
