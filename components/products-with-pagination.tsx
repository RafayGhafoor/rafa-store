"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  type: string
  price: number
  originalPrice?: number
  description: string
  features: string[]
  image: string
  inStock: boolean
  trending: boolean
}

interface Category {
  id: string
  name: string
  description: string
}

interface ProductsWithPaginationProps {
  products: Product[]
  categories: Category[]
}

const PRODUCTS_PER_PAGE = 6

export function ProductsWithPagination({ products, categories }: ProductsWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "trending":
          return b.trending ? 1 : -1
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return sorted
  }, [products, selectedCategory, sortBy, searchQuery])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleFilterChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
    setCurrentPage(1)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-8">
      {/* Filters and Search */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => handleFilterChange("all")}
            size="sm"
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleFilterChange(category.id)}
              size="sm"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Sort and Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} of{" "}
              {filteredAndSortedProducts.length} products
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="trending">Trending First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("all")
              setSearchQuery("")
              setSortBy("name")
              setCurrentPage(1)
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  )
}
