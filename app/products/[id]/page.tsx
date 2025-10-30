import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import productsData from "@/data/products.json"
import type { Metadata } from "next"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = productsData.products.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: "Product Not Found - Rafa Store",
    }
  }

  return {
    title: `${product.name} - Rafa Store`,
    description: product.description,
    keywords: `${product.name}, ${product.type}, router, networking, ${product.category}`,
    openGraph: {
      title: `${product.name} - Rafa Store`,
      description: product.description,
      images: [product.image],
    },
  }
}

export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = productsData.products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
