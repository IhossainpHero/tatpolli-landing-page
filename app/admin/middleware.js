import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // If there's no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}
