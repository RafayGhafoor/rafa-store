"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Product } from "@/types/product"
import productsData from "@/data/products.json"
import { ImageUpload } from "./image-upload"

interface ProductFormProps {
  product: Product | null
  onSave: (product: Product) => void
  onCancel: () => void
  loading: boolean
}

export function ProductForm({ product, onSave, onCancel, loading }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: Date.now().toString(),
      name: "",
      category: "5g",
      type: "",
      price: 0,
      originalPrice: null,
      description: "",
      features: [],
      image: "",
      inStock: true,
      trending: false,
    },
  )

  const [featureInput, setFeatureInput] = useState("")
  const [videoType, setVideoType] = useState<"youtube" | "tiktok" | "shorts">(formData.video?.type || "youtube")
  const [videoValue, setVideoValue] = useState(formData.video?.id || formData.video?.url || "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "originalPrice" ? Number(value) : value,
    }))
  }

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }))
      setFeatureInput("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedData = { ...formData }
    if (videoValue) {
      updatedData.video = {
        type: videoType,
        ...(videoType === "tiktok" ? { url: videoValue } : { id: videoValue }),
      }
    }

    onSave(updatedData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-semibold">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., UltraSpeed 5G Pro"
              required
              className="glass-effect"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Product Type</Label>
            <Input
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g., 5G, 4G LTE"
              required
              className="glass-effect"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
            rows={4}
            required
            className="glass-effect"
          />
        </div>
      </div>

      {/* Pricing & Category */}
      <div className="space-y-4">
        <h3 className="font-semibold">Pricing & Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="glass-effect">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productsData.categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (Rs.)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              required
              className="glass-effect"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="originalPrice">Original Price (Rs.)</Label>
            <Input
              id="originalPrice"
              name="originalPrice"
              type="number"
              value={formData.originalPrice || ""}
              onChange={handleChange}
              placeholder="Optional"
              className="glass-effect"
            />
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <h3 className="font-semibold">Product Image</h3>
        <ImageUpload
          onImageUpload={(url) => setFormData((prev) => ({ ...prev, image: url }))}
          currentImage={formData.image}
        />
      </div>

      {/* Video */}
      <div className="space-y-4">
        <h3 className="font-semibold">Video (Optional)</h3>
        <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="videoType">Video Type</Label>
              <Select value={videoType} onValueChange={(value: any) => setVideoType(value)}>
                <SelectTrigger className="glass-effect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="shorts">YouTube Shorts</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoValue">{videoType === "tiktok" ? "TikTok URL" : "Video ID"}</Label>
              <Input
                id="videoValue"
                value={videoValue}
                onChange={(e) => setVideoValue(e.target.value)}
                placeholder={videoType === "tiktok" ? "https://www.tiktok.com/@user/video/123456" : "dQw4w9WgXcQ"}
                className="glass-effect"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="font-semibold">Features</h3>
        <div className="flex gap-2">
          <Input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            placeholder="Add a feature"
            className="glass-effect"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddFeature())}
          />
          <Button type="button" onClick={handleAddFeature} variant="outline" className="bg-transparent">
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-primary/5 rounded border border-primary/20"
            >
              <span className="text-sm">{feature}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFeature(index)}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-4">
        <h3 className="font-semibold">Status</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={formData.inStock}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, inStock: checked as boolean }))}
            />
            <Label htmlFor="inStock" className="font-normal cursor-pointer">
              In Stock
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trending"
              checked={formData.trending}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, trending: checked as boolean }))}
            />
            <Label htmlFor="trending" className="font-normal cursor-pointer">
              Trending Product
            </Label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary/90">
          {loading ? "Saving..." : "Save Product"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="flex-1 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
