import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import type { Product } from "@/types/product"

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json")

async function readProducts(): Promise<any> {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return { products: [], categories: [], brands: [], siteInfo: {} }
  }
}

async function writeProducts(data: any): Promise<void> {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(data, null, 2))
}

export async function GET(request: NextRequest) {
  try {
    const data = await readProducts()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const product: Product = await request.json()
    const data = await readProducts()

    // Generate new ID if not provided
    if (!product.id) {
      product.id = Math.max(...data.products.map((p: Product) => Number.parseInt(p.id) || 0), 0) + 1 + ""
    }

    data.products.push(product)
    await writeProducts(data)

    return NextResponse.json({ product, message: "Product added successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to add product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const product: Product = await request.json()
    const data = await readProducts()

    const index = data.products.findIndex((p: Product) => p.id === product.id)
    if (index === -1) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    data.products[index] = product
    await writeProducts(data)

    return NextResponse.json({ product, message: "Product updated successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const data = await readProducts()

    data.products = data.products.filter((p: Product) => p.id !== id)
    await writeProducts(data)

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 })
  }
}
