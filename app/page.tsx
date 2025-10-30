import { TrendingProducts } from "@/components/trending-products"
import { Hero } from "@/components/hero"
import { CategoryFilter } from "@/components/category-filter"
import { BrandsSection } from "@/components/brands-section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import productsData from "@/data/products.json"

export default function Home() {
  const trendingProducts = productsData.products.filter((product) => product.trending)

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter categories={productsData.categories} />
      </div>

      {/* Brands Section */}
      <BrandsSection brands={productsData.brands} />

      <div className="container mx-auto px-4 py-8">
        {/* Trending Products Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold">Trending Products</h2>
              <p className="text-muted-foreground">Most popular routers chosen by our customers</p>
            </div>
            <Button asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <TrendingProducts products={trendingProducts} />
        </section>
      </div>
    </main>
  )
}
