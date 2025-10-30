import { ProductsWithPagination } from "@/components/products-with-pagination"
import productsData from "@/data/products.json"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground text-lg">
            Browse our complete collection of routers and networking equipment
          </p>
        </div>

        <ProductsWithPagination products={productsData.products} categories={productsData.categories} />
      </div>
    </main>
  )
}
