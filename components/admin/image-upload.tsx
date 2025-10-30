"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  currentImage?: string
}

export function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPreview(result)
        onImageUpload(result)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleClear = () => {
    setPreview(null)
    onImageUpload("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {preview ? (
        <div className="relative w-full h-48 bg-primary/10 rounded-lg border-2 border-primary/20 overflow-hidden">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-white hover:bg-destructive/90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 bg-primary/5 rounded-lg border-2 border-dashed border-primary/30 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition"
        >
          <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">Click to upload image</p>
          <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full bg-transparent"
      >
        <Upload className="h-4 w-4 mr-2" />
        {uploading ? "Uploading..." : "Choose Image"}
      </Button>
    </div>
  )
}
