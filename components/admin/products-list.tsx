"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2, ImageIcon } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductsListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  loading: boolean
}

export function ProductsList({ products, onEdit, onDelete, loading }: ProductsListProps) {
  return (
    <div className="space-y-4">
      {products.length === 0 ? (
        <Card className="glass-effect border-primary/20 p-8 text-center">
          <p className="text-muted-foreground">No products yet. Add your first product to get started.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="glass-effect border-primary/20 p-4">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {product.image ? (
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.type}</p>
                      <p className="text-sm line-clamp-2 mt-1">{product.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-lg">Rs. {product.price.toLocaleString()}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          Rs. {product.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex gap-2 mt-3">
                    {product.inStock ? (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 rounded">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-red-500/20 text-red-700 dark:text-red-400 rounded">
                        Out of Stock
                      </span>
                    )}
                    {product.trending && (
                      <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-700 dark:text-orange-400 rounded">
                        Trending
                      </span>
                    )}
                    {product.video && (
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded">
                        Has Video
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product)}
                    disabled={loading}
                    className="bg-transparent"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(product.id)}
                    disabled={loading}
                    className="bg-transparent text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
