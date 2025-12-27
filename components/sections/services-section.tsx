"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Core Features
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Everything you need</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Map-based treasure chests",
              description: "Discoverable rewards scattered across real-world locations",
              direction: "top",
            },
            {
              title: "Daily check-in & spin rewards",
              description: "Engage users with recurring daily interactions and gamification",
              direction: "right",
            },
            {
              title: "QR scan to claim airdrops",
              description: "Seamless claim experience with instant blockchain settlement",
              direction: "left",
            },
            {
              title: "Account verification",
              description: "Powered by Reclaim Protocol for anti-sybil protection",
              direction: "bottom",
            },
          ].map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  index,
  isVisible,
}: {
  feature: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (feature.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group scroll-smooth-in ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="rounded-lg border border-border/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-primary transition-all duration-300 group-hover:w-12" />
          <span className="font-mono text-xs text-primary font-semibold">0{index + 1}</span>
        </div>
        <h3 className="mb-3 font-sans text-2xl font-light text-foreground md:text-3xl">{feature.title}</h3>
        <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{feature.description}</p>
      </div>
    </div>
  )
}
