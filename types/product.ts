export interface Product {
  id: string
  name: string
  category: string
  type: string
  price: number
  originalPrice?: number | null
  description: string
  features: string[]
  image: string
  inStock: boolean
  trending: boolean
  video?: {
    type: "youtube" | "tiktok" | "shorts"
    id?: string
    url?: string
  }
}
