import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import productsData from "@/data/products.json"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${productsData.siteInfo.name} - ${productsData.siteInfo.tagline}`,
  description: productsData.siteInfo.description,
  keywords:
    "routers, 5G routers, 4G routers, WiFi 6, mesh systems, networking equipment, internet routers, wireless routers",
  authors: [{ name: "Rafa Store" }],
  creator: "Rafa Store",
  publisher: "Rafa Store",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rafastore.com",
    title: `${productsData.siteInfo.name} - ${productsData.siteInfo.tagline}`,
    description: productsData.siteInfo.description,
    siteName: productsData.siteInfo.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${productsData.siteInfo.name} - ${productsData.siteInfo.tagline}`,
    description: productsData.siteInfo.description,
  },
  alternates: {
    canonical: "https://rafastore.com",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: productsData.siteInfo.name,
              description: productsData.siteInfo.description,
              url: "https://rafastore.com",
              telephone: productsData.siteInfo.contact.phone,
              email: productsData.siteInfo.contact.email,
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
