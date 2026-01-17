"use client"

import { useRef } from "react"
import { useMouseHighlight } from "@/hooks/use-mouse-highlight"

interface MouseHighlightProps {
  containerRef: React.RefObject<HTMLElement>
  size?: number
  opacity?: number
  blur?: number
  color?: string
  enabled?: boolean
  className?: string
}

export default function MouseHighlight({
  containerRef,
  size = 500,
  opacity = 0.2,
  blur = 3,
  color = "red",
  enabled = true,
  className = "",
}: MouseHighlightProps) {
  const highlightRef = useRef<HTMLDivElement>(null)

  useMouseHighlight({
    containerRef,
    highlightRef,
    easing: 0.15,
    enabled,
  })

  const colorClassMap: Record<string, string> = {
    red: "from-red-500/20 via-red-500/10 to-transparent",
    blue: "from-cyan-500/15 via-blue-500/10 to-transparent",
    white: "from-white/20 via-white/10 to-transparent",
    black: "from-black/20 via-black/10 to-transparent",
  }
  const colorClass = colorClassMap[color] || colorClassMap.red

  return (
    <div
      ref={highlightRef}
      className={`pointer-events-none fixed z-0 rounded-full bg-gradient-radial ${colorClass} transition-opacity duration-500 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0,
        transform: "translate(-50%, -50%)",
        willChange: "transform",
        filter: `blur(${blur * 16}px)`,
        WebkitFilter: `blur(${blur * 16}px)`,
      }}
    />
  )
}
