"use client"

import { TrendingUp, Activity, Brain, TrendingUp as GraphIcon, Clock, Bot } from "lucide-react"

/**
 * Sentiment Preview Card - Exact match to design
 * Floating glassmorphism card with feature icons, sentiment score, and mini chart
 * Layout: Feature icons row → Sentiment Score → AI Confidence → Mini Chart → Trend Footer
 */
export default function PreviewCard() {
  // Sample data matching the design
  const sampleScore = 72
  const sampleConfidence = 85

  // Feature icons configuration - displayed in horizontal row inside card
  const features = [
    { icon: Brain, label: "FinBERT Powered", color: "text-cyan-400" },
    { icon: GraphIcon, label: "Sentiment Analysis", color: "text-blue-400" },
    { icon: Clock, label: "Real-Time Data", color: "text-cyan-400" },
    { icon: Bot, label: "AI Insights", color: "text-blue-400" },
  ]

  return (
    <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-gray-900/50 p-6 backdrop-blur-xl shadow-2xl transition-all hover:scale-[1.01] hover:shadow-cyan-500/10">
      {/* AI Active Badge - Top Right */}
      <div className="absolute right-4 top-4 flex items-center gap-1.5">
        <Activity className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
        <span className="text-xs font-medium text-cyan-400">AI Active</span>
      </div>

      {/* Feature Icons Row - Inside card, above sentiment score */}
      <div className="mb-6 grid grid-cols-4 gap-3 pt-2">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="group flex flex-col items-center gap-2 rounded-lg p-2 transition-all hover:scale-105 hover:bg-white/5"
            >
              <div className={`${feature.color} transition-transform group-hover:scale-110`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium text-gray-400 text-center leading-tight">
                {feature.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Sentiment Score Section */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">Sentiment Score</span>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1">
            <TrendingUp className="h-3 w-3 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Bullish</span>
          </div>
        </div>
        <div className="relative">
          {/* Progress Bar */}
          <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-800/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30"
              style={{ width: `${sampleScore}%` }}
            />
          </div>
          {/* Score Display */}
          <span className="text-3xl font-bold text-emerald-400">{sampleScore}%</span>
        </div>
      </div>

      {/* AI Confidence Bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400">AI Confidence</span>
          <span className="text-xs font-semibold text-cyan-400">{sampleConfidence}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-800/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30"
            style={{ width: `${sampleConfidence}%` }}
          />
        </div>
      </div>

      {/* Mini Chart - Blue bar blocks */}
      <div className="mb-4 h-20 rounded-lg bg-gray-800/30 p-3">
        <div className="flex h-full items-end justify-between gap-1.5">
          {[45, 65, 55, 70, 60, 75, 65].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/70 to-blue-500/70 transition-all hover:opacity-80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Footer - Positive trend detected */}
      <div className="flex items-center gap-2 border-t border-gray-700/50 pt-4">
        <TrendingUp className="h-4 w-4 text-emerald-400" />
        <span className="text-sm font-medium text-emerald-400">Positive trend detected</span>
      </div>
    </div>
  )
}
