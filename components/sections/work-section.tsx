"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function WorkSection() {
  const { ref, isVisible } = useScrollAnimation(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center bg-card px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            What is KyraQuest
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Launch, explore, and earn rewards</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {[
            {
              number: "01",
              title: "Launch quests on maps",
              description: "Create location-based challenges for your Web3 community",
              direction: "left",
            },
            {
              number: "02",
              title: "QR-based token drops",
              description: "Distribute tokens instantly when users scan QR codes",
              direction: "top",
            },
            {
              number: "03",
              title: "Verified airdrops",
              description: "Anti-sybil protection ensures only real users claim rewards",
              direction: "right",
            },
          ].map((quest, i) => (
            <QuestCard key={i} quest={quest} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function QuestCard({
  quest,
  index,
  isVisible,
}: {
  quest: { number: string; title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (quest.direction) {
        case "left":
          return "-translate-x-8 opacity-0"
        case "right":
          return "translate-x-8 opacity-0"
        default:
          return "-translate-y-8 opacity-0"
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
      <div className="rounded-lg border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-background/80 md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="font-mono text-sm font-bold text-primary">{quest.number}</span>
          </div>
        </div>
        <h3 className="mb-3 font-sans text-xl font-light text-foreground md:text-2xl">{quest.title}</h3>
        <p className="text-sm leading-relaxed text-foreground/75 md:text-base">{quest.description}</p>
      </div>
    </div>
  )
}
