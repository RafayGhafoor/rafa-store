import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, Zap, Shield, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Rafa Store",
  description: "Learn about Rafa Store, your trusted source for premium routers and networking solutions.",
  keywords: "about, rafa store, routers, networking, company",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Rafa Store</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for premium routers and networking solutions in Pakistan
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-effect p-8 rounded-lg animate-slide-up">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Rafa Store, we are committed to providing high-quality networking solutions that empower businesses and
              individuals to stay connected. We believe in delivering exceptional products with outstanding customer
              service.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-lg animate-slide-up">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become the leading provider of innovative networking solutions in Pakistan, offering cutting-edge
              technology at competitive prices with unmatched customer support.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Rafa Store?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: "Authentic Products",
                description: "100% genuine routers from top brands",
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                description: "Quick and reliable shipping across Pakistan",
              },
              {
                icon: Shield,
                title: "Warranty Support",
                description: "Complete warranty and after-sales support",
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Dedicated customer service team available 24/7",
              },
            ].map((item, index) => (
              <Card key={index} className="border-0 glass-effect hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <item.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center glass-effect p-12 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Upgrade Your Network?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Explore our wide range of premium routers and networking solutions today.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
