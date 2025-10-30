"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
  description: string
}

interface CategoryFilterProps {
  categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  return (
    <section id="categories" className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the perfect router for your needs. From high-speed 5G to reliable mesh systems.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className="rounded-full"
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCategory(category.id)}
          >
            <h3 className="font-semibold mb-2">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
