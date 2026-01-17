"use client"

import { Activity, Sparkles } from "lucide-react"

interface AILoadingProps {
  message?: string
}

/**
 * AI-powered loading state with pulsing animations
 * Shows animated dots and AI activity indicator
 */
export default function AILoading({ message = "Analyzing market sentiment..." }: AILoadingProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* AI Activity Indicator */}
      <div className="relative">
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-blue-500/20 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30">
          <Activity className="h-10 w-10 animate-ai-pulse text-blue-400" />
        </div>
      </div>

      {/* Loading Message */}
      <div className="flex flex-col items-center gap-3">
        <p className="font-medium text-white">{message}</p>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 animate-ai-pulse rounded-full bg-blue-400" style={{ animationDelay: "0s" }} />
          <div className="h-2 w-2 animate-ai-pulse rounded-full bg-blue-400" style={{ animationDelay: "0.2s" }} />
          <div className="h-2 w-2 animate-ai-pulse rounded-full bg-blue-400" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>

      {/* Sparkles Effect */}
      <div className="relative mt-4">
        <Sparkles className="h-6 w-6 animate-pulse text-blue-400/50" />
      </div>
    </div>
  )
}
