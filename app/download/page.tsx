"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"

function DownloadCard({
  platform,
  icon,
  version,
  size,
  releaseDate,
  downloadUrl,
  features,
}: {
  platform: string
  icon: string
  version: string
  size: string
  releaseDate: string
  downloadUrl: string
  features: string[]
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`group rounded-2xl border border-primary/20 bg-card/50 p-6 backdrop-blur-md transition-all duration-700 hover:border-primary/40 hover:bg-card/80 md:p-8 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="text-4xl md:text-5xl">{icon}</div>
        <div className="rounded-lg bg-primary/10 px-3 py-1.5">
          <p className="font-mono text-xs text-primary">v{version}</p>
        </div>
      </div>

      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{platform}</h3>
      <p className="mb-6 text-sm text-foreground/70 md:text-base">
        {size} • Released {releaseDate}
      </p>

      <div className="mb-8 space-y-2">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 md:text-base">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
        <MagneticButton variant="primary" size="lg" className="w-full justify-center">
          Download for {platform}
        </MagneticButton>
      </a>
    </div>
  )
}

function SystemRequirements() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
      <div
        className={`mb-12 transition-all duration-700 md:mb-16 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
        }`}
      >
        <h2 className="font-sans text-3xl font-light text-foreground md:text-5xl lg:text-6xl">
          System <span className="text-primary">Requirements</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
        {[
          {
            platform: "iOS",
            requirements: ["iOS 14.0 or later", "iPhone 12 or newer", "100 MB storage", "Location services enabled"],
          },
          {
            platform: "Android",
            requirements: ["Android 8.0 or later", "2GB RAM minimum", "100 MB storage", "Location services enabled"],
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl border border-primary/20 bg-card/50 p-6 backdrop-blur-md transition-all duration-700 md:p-8 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : i === 0
                  ? "-translate-x-12 opacity-0"
                  : "translate-x-12 opacity-0"
            }`}
            style={{ transitionDelay: `${300 + i * 150}ms` }}
          >
            <h3 className="mb-6 font-sans text-2xl font-light text-foreground md:text-3xl">{item.platform}</h3>
            <ul className="space-y-3">
              {item.requirements.map((req, j) => (
                <li key={j} className="flex items-center gap-3 text-sm text-foreground/85 md:text-base">
                  <div className="h-2 w-2 rounded-full bg-primary/70" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function DownloadPage() {
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const features = [
    { title: "Real-world Exploration", desc: "Turn your surroundings into an interactive quest experience" },
    { title: "Instant Rewards", desc: "Claim tokens and NFTs as you complete challenges" },
    { title: "Community Driven", desc: "Join quests created by brands, DAOs, and communities" },
    { title: "Secure & Transparent", desc: "Built on Web3 blockchain technology" },
    { title: "Offline Mode", desc: "Start your quests without internet connection" },
    { title: "Daily Challenges", desc: "New quests and rewards every single day" },
  ]

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#6241E8"
            colorB="#795CEB"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#6241E8"
            upColor="#795CEB"
            downColor="#1E1E1E"
            leftColor="#6241E8"
            rightColor="#795CEB"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-primary/10 bg-background/70 px-6 py-6 backdrop-blur-md transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-primary/30">
            <span className="font-sans text-xl font-bold text-primary">K</span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">KyraQuest</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">
            <MagneticButton variant="secondary">Back Home</MagneticButton>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative z-10 min-h-screen w-full pt-32 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 md:px-12 lg:px-16">
          <div
            className={`mb-8 transition-all duration-700 ${
              heroVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
            }`}
          >
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-primary">Available on iOS & Android</p>
            </div>
          </div>

          <h1
            className={`mb-6 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground transition-all duration-1000 md:text-6xl lg:text-7xl ${
              heroVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <span className="text-balance">
              Download <span className="text-primary">KyraQuest</span>
              <br />
              and start exploring
            </span>
          </h1>

          <p
            className={`mb-12 max-w-2xl text-lg leading-relaxed text-foreground/85 transition-all duration-1000 md:text-xl ${
              heroVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Join thousands of adventurers discovering quests, claiming rewards, and building the Web3 future. Available
            now on your favorite mobile platform.
          </p>
        </div>
      </section>

      {/* Download Cards */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="mb-16 md:mb-20">
          <h2 className="font-sans text-3xl font-light text-foreground md:text-5xl lg:text-6xl">
            Get started on your device
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <DownloadCard
            platform="iOS"
            icon="🍎"
            version="1.0.0"
            size="156 MB"
            releaseDate="Dec 2024"
            downloadUrl="https://apps.apple.com/app/kyraquest"
            features={[
              "Native iOS experience",
              "Optimized for iPhone",
              "iCloud synchronization",
              "Offline mode support",
            ]}
          />
          <DownloadCard
            platform="Android"
            icon="🤖"
            version="1.0.0"
            size="142 MB"
            releaseDate="Dec 2024"
            downloadUrl="https://play.google.com/store/apps/details?id=com.kyraquest"
            features={[
              "Full Material Design",
              "Google Play Games integration",
              "Seamless Android sync",
              "Battery optimization",
            ]}
          />
        </div>
      </section>

      {/* System Requirements */}
      <SystemRequirements />

      {/* Features Section */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="mb-16 md:mb-20">
          <h2 className="font-sans text-3xl font-light text-foreground md:text-5xl lg:text-6xl">
            Why download <span className="text-primary">KyraQuest</span>?
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-primary/20 bg-card/50 p-6 backdrop-blur-md transition-all duration-700 hover:border-primary/40 hover:bg-card/80 md:p-8 ${
                heroVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="mb-3 font-sans text-xl font-light text-foreground md:text-2xl">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/75 md:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 text-center md:px-12 md:py-32 lg:px-16">
        <div className="mb-8">
          <h2 className="mb-4 font-sans text-4xl font-light text-foreground md:text-5xl lg:text-6xl">
            Ready to begin?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/80 md:text-xl">
            Download KyraQuest now and join the quest revolution. Your next adventure awaits.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          <a href="https://apps.apple.com/app/kyraquest" target="_blank" rel="noopener noreferrer">
            <MagneticButton size="lg" variant="primary">
              Download for iOS
            </MagneticButton>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.kyraquest"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MagneticButton size="lg" variant="primary">
              Download for Android
            </MagneticButton>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/10 bg-background/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center md:px-12 md:py-16 lg:px-16">
          <p className="text-sm text-foreground/60">
            © 2025 KyraQuest. All rights reserved. Built for explorers, powered by Web3.
          </p>
        </div>
      </footer>
    </main>
  )
}
