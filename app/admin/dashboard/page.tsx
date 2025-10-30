"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Plus, AlertCircle } from "lucide-react"
import { ProductForm } from "@/components/admin/product-form"
import { ProductsList } from "@/components/admin/products-list"
import type { Product } from "@/types/product"
import productsData from "@/data/products.json"

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(productsData.products)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")
  const [syncMessage, setSyncMessage] = useState("")

  useEffect(() => {
    const session = sessionStorage.getItem("adminSession")
    if (!session) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setShowForm(true)
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setLoading(true)
    try {
      const response = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id))
        await syncToGitHub()
      }
    } catch (error) {
      console.error("Delete failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProduct = async (product: Product) => {
    setLoading(true)
    try {
      const method = product.id && products.find((p) => p.id === product.id) ? "PUT" : "POST"
      const response = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        const data = await response.json()
        if (method === "POST") {
          setProducts([...products, data.product])
        } else {
          setProducts(products.map((p) => (p.id === product.id ? data.product : p)))
        }
        setShowForm(false)
        setSelectedProduct(null)
        await syncToGitHub()
      }
    } catch (error) {
      console.error("Save failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const syncToGitHub = async () => {
    setSyncStatus("syncing")
    setSyncMessage("Syncing to GitHub...")

    try {
      const response = await fetch("/api/admin/github-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        setSyncStatus("success")
        setSyncMessage("Successfully synced to GitHub!")
        setTimeout(() => setSyncStatus("idle"), 3000)
      } else {
        const error = await response.json()
        setSyncStatus("error")
        setSyncMessage(error.message || "Failed to sync to GitHub")
      }
    } catch (error) {
      setSyncStatus("error")
      setSyncMessage("Error syncing to GitHub. Make sure GitHub credentials are configured.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and store content</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Sync Status */}
        {syncStatus !== "idle" && (
          <Card
            className={`mb-6 border-l-4 ${syncStatus === "success" ? "border-l-green-500 bg-green-500/5" : syncStatus === "error" ? "border-l-destructive bg-destructive/5" : "border-l-primary bg-primary/5"}`}
          >
            <CardContent className="pt-6 flex items-center gap-3">
              {syncStatus === "syncing" && (
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              )}
              {syncStatus === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
              <span className={syncStatus === "error" ? "text-destructive" : ""}>{syncMessage}</span>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="glass-effect">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Products</h2>
                <p className="text-muted-foreground">Total: {products.length} products</p>
              </div>
              <Button onClick={handleAddProduct} className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>

            {showForm ? (
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductForm
                    product={selectedProduct}
                    onSave={handleSaveProduct}
                    onCancel={() => {
                      setShowForm(false)
                      setSelectedProduct(null)
                    }}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            ) : (
              <ProductsList
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                loading={loading}
              />
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Store performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground">Total Products</p>
                    <p className="text-2xl font-bold">{products.length}</p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-sm text-muted-foreground">In Stock</p>
                    <p className="text-2xl font-bold">{products.filter((p) => p.inStock).length}</p>
                  </div>
                  <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <p className="text-sm text-muted-foreground">Trending</p>
                    <p className="text-2xl font-bold">{products.filter((p) => p.trending).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure your admin panel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-sm font-medium">Admin Password</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Set your admin password via NEXT_PUBLIC_ADMIN_PASSWORD environment variable
                  </p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-sm font-medium">GitHub Sync</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Configure GITHUB_TOKEN, GITHUB_REPO, and GITHUB_BRANCH environment variables to enable automatic
                    GitHub syncing
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
