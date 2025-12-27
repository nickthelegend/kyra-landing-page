"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

export default function Home() {
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

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

  return (
    <main className="relative w-full overflow-x-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 pointer-events-none ${isLoaded ? "opacity-100" : "opacity-0"}`}
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

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-background/75 backdrop-blur-md border-b border-border`}
      >
        <a href="#home" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-primary/30">
            <span className="font-sans text-xl font-bold text-primary">K</span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">KyraQuest</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "Home", href: "#home" },
            { label: "Work", href: "#work" },
            { label: "Services", href: "#services" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative font-sans text-sm font-medium transition-colors text-foreground/70 hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 w-0 group-hover:w-full" />
            </a>
          ))}
        </div>

        <MagneticButton variant="primary">
          <a href="#contact">Join Waitlist</a>
        </MagneticButton>
      </nav>

      <div className={`relative z-10 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen w-full flex flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24"
        >
          <div className="max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-primary">Web3 Powered Quest Platform</p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                Turn the real world
                <br />
                into a <span className="text-primary">quest</span>
              </span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/85 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Launch quests, token drops, and treasure hunts across maps — powered by Web3. Engage real-world
                exploration with blockchain rewards.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <a href="#contact">
                <MagneticButton size="lg" variant="primary">
                  Join the Waitlist
                </MagneticButton>
              </a>
              <a href="#services">
                <MagneticButton size="lg" variant="secondary">
                  View Demo
                </MagneticButton>
              </a>
              <a href="/download">
                <MagneticButton size="lg" variant="secondary">
                  Download Now
                </MagneticButton>
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/70">Scroll to explore</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work">
          <WorkSection />
        </section>

        {/* Services Section */}
        <section id="services">
          <ServicesSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
