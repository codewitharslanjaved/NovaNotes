import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter, Orbitron } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })

export const metadata: Metadata = {
  title: "Nova Notes",
  description: "Space themed Nova Notes",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body>{children}</body>
    </html>
  )
}
