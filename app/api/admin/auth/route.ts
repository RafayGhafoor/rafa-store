import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }

    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "24h" })

    return NextResponse.json({ token, message: "Authentication successful" })
  } catch (error) {
    return NextResponse.json({ message: "Authentication failed" }, { status: 500 })
  }
}
