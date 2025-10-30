import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, getTokenFromRequest } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    // Convert file to base64 for storage
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    const dataUrl = `data:${file.type};base64,${base64}`

    return NextResponse.json({ url: dataUrl, message: "Image uploaded successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Upload failed" }, { status: 500 })
  }
}
