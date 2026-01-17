"use client"

import { useEffect, useRef } from "react"

interface UseMouseHighlightOptions {
  containerRef: React.RefObject<HTMLElement>
  highlightRef: React.RefObject<HTMLElement>
  easing?: number
  enabled?: boolean
}

export function useMouseHighlight({
  containerRef,
  highlightRef,
  easing = 0.15,
  enabled = true,
}: UseMouseHighlightOptions) {
  const mousePosition = useRef({ x: 0, y: 0 })
  const targetPosition = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    const container = containerRef.current
    const highlight = highlightRef.current
    if (!container || !highlight) return

    const handleMouseMove = (e: MouseEvent) => {
      // Use viewport coordinates for fixed positioning
      targetPosition.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const handleMouseEnter = () => {
      if (highlight) {
        highlight.style.opacity = "1"
      }
    }

    const handleMouseLeave = () => {
      if (highlight) {
        highlight.style.opacity = "0"
      }
    }

    // Smooth animation using requestAnimationFrame
    const animate = () => {
      const { x: currentX, y: currentY } = mousePosition.current
      const { x: targetX, y: targetY } = targetPosition.current

      // Smooth interpolation (easing)
      const dx = targetX - currentX
      const dy = targetY - currentY
      
      // Only update if there's significant movement to avoid unnecessary renders
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        mousePosition.current = {
          x: currentX + dx * easing,
          y: currentY + dy * easing,
        }

        if (highlight) {
          highlight.style.transform = `translate(${mousePosition.current.x}px, ${mousePosition.current.y}px) translate(-50%, -50%)`
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    container.addEventListener("mousemove", handleMouseMove, { passive: true })
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [containerRef, highlightRef, easing, enabled])
}
