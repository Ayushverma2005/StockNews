"use client"

import { TrendingUp, TrendingDown, Minus, Activity, Newspaper, Target } from "lucide-react"
import type { SentimentSummary } from "@/types/api"

interface FloatingInsightsProps {
  sentimentSummary: SentimentSummary
  articleCount: number
  companyName: string
}

/**
 * Floating insights panel that appears after search
 * Shows key metrics in a compact, visually appealing format
 */
export default function FloatingInsights({ sentimentSummary, articleCount, companyName }: FloatingInsightsProps) {
  const sentimentConfig = {
    bullish: {
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      icon: TrendingUp,
      label: "Bullish",
      glow: "shadow-emerald-500/20",
    },
    bearish: {
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      icon: TrendingDown,
      label: "Bearish",
      glow: "shadow-red-500/20",
    },
    neutral: {
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      icon: Minus,
      label: "Neutral",
      glow: "shadow-amber-500/20",
    },
  }

  const sentiment = sentimentSummary.sentiment_label.toLowerCase()
  const config = sentimentConfig[sentiment as keyof typeof sentimentConfig] || sentimentConfig.neutral
  const Icon = config.icon

  return (
    <div className="glass-strong fixed right-6 top-28 z-40 w-80 rounded-2xl p-6 shadow-2xl transition-all duration-500 animate-in slide-in-from-right">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{companyName}</h3>
          <p className="text-xs text-gray-400">AI Analysis Complete</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
          <Activity className="h-5 w-5 text-blue-400" />
        </div>
      </div>

      {/* Sentiment Score */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">Market Sentiment</span>
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${config.bgColor} ${config.borderColor} border`}>
            <Icon className={`h-4 w-4 ${config.color}`} />
            <span className={`text-xs font-semibold uppercase ${config.color}`}>{config.label}</span>
          </div>
        </div>
        <div className="relative">
          <div className="h-4 overflow-hidden rounded-full bg-gray-800/50">
            <div
              className={`h-full rounded-full transition-all ${config.bgColor} ${config.glow}`}
              style={{ width: `${Math.abs(sentimentSummary.overall_score) * 10}%` }}
            />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${config.color}`}>
              {sentimentSummary.overall_score > 0 ? "+" : ""}
              {sentimentSummary.overall_score.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">/ 10.0</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-emerald-500/10 p-3 border border-emerald-500/20">
          <div className="mb-1 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-gray-400">Bullish</span>
          </div>
          <p className="text-xl font-bold text-emerald-400">{sentimentSummary.bullish}</p>
        </div>
        <div className="rounded-lg bg-amber-500/10 p-3 border border-amber-500/20">
          <div className="mb-1 flex items-center gap-1.5">
            <Minus className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-medium text-gray-400">Neutral</span>
          </div>
          <p className="text-xl font-bold text-amber-400">{sentimentSummary.neutral}</p>
        </div>
        <div className="rounded-lg bg-red-500/10 p-3 border border-red-500/20">
          <div className="mb-1 flex items-center gap-1.5">
            <TrendingDown className="h-3.5 w-3.5 text-red-400" />
            <span className="text-xs font-medium text-gray-400">Bearish</span>
          </div>
          <p className="text-xl font-bold text-red-400">{sentimentSummary.bearish}</p>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="space-y-3 border-t border-gray-700/50 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Articles Analyzed</span>
          </div>
          <span className="text-sm font-semibold text-white">{articleCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-400">AI Confidence</span>
          </div>
          <span className="text-sm font-semibold text-blue-400">{(sentimentSummary.confidence * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}
