import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, VT323, Space_Grotesk, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _vt323 = VT323({ subsets: ["latin"], weight: "400" })
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "KyraQuest | Turn the real world into a quest",
  description: "Launch quests, token drops, and treasure hunts across maps — powered by Web3.",
  generator: "v0.app",
  icons: {
    icon: "/icon-main.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
