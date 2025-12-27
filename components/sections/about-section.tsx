"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useScrollAnimation(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center bg-card px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left side - About KyraQuest */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                Why KyraQuest
              </h2>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Bridge the gap between physical exploration and digital rewards. KyraQuest combines location-based
                gaming with Web3 tokenomics.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Built for communities, DAOs, events, and brands who want to engage users with meaningful, rewarding
                experiences.
              </p>
            </div>
          </div>

          {/* Right side - Key benefits */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-12">
            {[
              { value: "Anti-sybil", label: "Verification", sublabel: "Powered by Reclaim", direction: "right" },
              { value: "Real-world +", label: "On-chain", sublabel: "Best of both worlds", direction: "left" },
              { value: "Low Gas", label: "Mantle Network", sublabel: "Built for scale", direction: "right" },
            ].map((benefit, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return benefit.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-4 border-l border-primary/30 pl-4 scroll-smooth-in md:gap-8 md:pl-8 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="text-3xl font-light text-primary md:text-4xl lg:text-5xl">{benefit.value}</div>
                  <div>
                    <div className="font-sans text-base font-light text-foreground md:text-xl">{benefit.label}</div>
                    <div className="font-mono text-xs text-foreground/60">{benefit.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-16 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(4)}>
            Start Your Quest
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(1)}>
            Learn More
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
