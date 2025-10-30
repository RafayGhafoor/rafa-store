import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import productsData from "@/data/products.json"

export const metadata: Metadata = {
  title: "Contact Us - Rafa Store",
  description: "Get in touch with Rafa Store for any inquiries about our products and services.",
  keywords: "contact, rafa store, support, inquiry",
}

export default function ContactPage() {
  const { contact } = productsData.siteInfo

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with our team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>

            {[
              {
                icon: Phone,
                title: "Phone",
                value: contact.phone,
                href: `tel:${contact.phone}`,
              },
              {
                icon: Mail,
                title: "Email",
                value: contact.email,
                href: `mailto:${contact.email}`,
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                value: contact.whatsapp,
                href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`,
              },
            ].map((item, index) => (
              <Card key={index} className="border-0 glass-effect hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={item.href} className="text-primary hover:underline font-medium">
                    {item.value}
                  </Link>
                </CardContent>
              </Card>
            ))}

            <div className="glass-effect p-6 rounded-lg">
              <h3 className="font-bold mb-2">Business Hours</h3>
              <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-muted-foreground">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input placeholder="Your name" className="bg-background/50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="your@email.com" className="bg-background/50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="How can we help?" className="bg-background/50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea placeholder="Your message..." className="bg-background/50 min-h-32" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
            </form>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center glass-effect p-12 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Need Something Else?</h2>
          <p className="text-muted-foreground mb-6">Browse our products or learn more about us</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/products">View Products</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
