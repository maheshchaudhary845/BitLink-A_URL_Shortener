import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongoose";
import Link from "@/models/Link";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const user = await User.findOne({ email: session.user.email });

    const existing = await Link.findOne({ shortUrl: body.shortUrl });
    if (existing) {
      return Response.json({ success: false, error: true, message: "URL already exists!" });
    }

    await Link.create({
      longUrl: body.longUrl,
      shortUrl: body.shortUrl,
      user: user._id,
    });

    return Response.json({
      success: true,
      error: false,
      message: "URL Generated Successfully",
    });
  } catch (err) {
    console.error("API Error:", err);
    return Response.json({ success: false, error: true, message: "Server error" });
  }
}