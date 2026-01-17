"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, TrendingUp, Zap, Brain, CheckCircle, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import PreviewCard from "@/components/preview-card"
import AILoading from "@/components/ai-loading"
import RecentSearches from "@/components/recent-searches"
import type { AutocompleteResult } from "@/types/api"

interface HeroSectionProps {
  onSearch: (symbol: string) => void
  isLoading: boolean
  isComplete: boolean
  error: string | null
}

/**
 * Premium hero section with two-column layout
 * Left: Headline, description, search, badges
 * Right: Live preview card
 */
export default function HeroSection({ onSearch, isLoading, isComplete, error }: HeroSectionProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showHint, setShowHint] = useState(true)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Hide hint after first interaction
  useEffect(() => {
    if (query.length > 0 || suggestions.length > 0) {
      setShowHint(false)
    }
  }, [query, suggestions])

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/autocomplete?query=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data: AutocompleteResult[] = await response.json()
          setSuggestions(data)
          setShowDropdown(data.length > 0)
        }
      } catch (err) {
        console.error("Autocomplete error:", err)
      }
    }, 300)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [query])

  const handleSelect = (symbol: string) => {
    setQuery("")
    setSuggestions([])
    setShowDropdown(false)
    setSelectedIndex(-1)
    onSearch(symbol)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      handleSelect(suggestions[selectedIndex].value)
    } else if (e.key === "Enter" && suggestions.length > 0) {
      e.preventDefault()
      handleSelect(suggestions[0].value)
    }
  }

  const getSentimentPreview = (sentiment: string) => {
    const sentimentLower = sentiment.toLowerCase()
    if (sentimentLower.includes("bull") || sentimentLower.includes("positive")) {
      return { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", label: "Bullish" }
    }
    if (sentimentLower.includes("bear") || sentimentLower.includes("negative")) {
      return { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", label: "Bearish" }
    }
    return { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", label: "Neutral" }
  }

  return (
    <div className="mx-auto max-w-7xl px-8 py-16 lg:px-12">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left Column: Content */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Headline - Exact match to design */}
          <div className="space-y-6 animate-fade-in-down">
            <h1 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
              AI-Powered
              <br />
              Market
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Sentiment Intelligence
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-gray-400">
              Real-time analysis of NSE stock news using advanced FinBERT models. Get instant sentiment insights to
              inform your trading decisions.
            </p>
          </div>

          {/* Search Section */}
          <div className="space-y-4 animate-scale-in">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400 transition-all z-10" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search NSE stocks... (e.g., RELIANCE, TCS)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowHint(false)}
                className="h-14 rounded-xl border border-gray-700/50 bg-gray-900/30 pl-12 pr-6 font-sans text-base text-white backdrop-blur-md placeholder:text-gray-500 transition-all duration-300 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 focus:ring-0 hover:border-cyan-500/30"
                aria-label="Search for NSE stock symbols"
              />
              {showHint && !query && (
                <div className="absolute -bottom-8 left-0 flex items-center gap-2 text-xs text-gray-500 animate-fade-in-down">
                  <ArrowRight className="h-3 w-3" />
                  <span>Start by searching an NSE stock symbol...</span>
                </div>
              )}

              {/* Enhanced Autocomplete Dropdown */}
              {showDropdown && suggestions.length > 0 && (
                <div className="glass-strong absolute left-0 right-0 top-full z-50 mt-2 max-h-[400px] w-full overflow-y-auto rounded-xl border border-gray-700/50 shadow-2xl custom-scrollbar">
                {suggestions.map((suggestion, index) => {
                  const sentiment = getSentimentPreview(suggestion.company_name)
                  return (
                    <button
                      key={suggestion.symbol}
                      onClick={() => handleSelect(suggestion.value)}
                      className={`w-full px-4 py-4 text-left transition-all ${
                        index === selectedIndex
                          ? "bg-blue-500/20 border-l-2 border-blue-500"
                          : "hover:bg-gray-800/50"
                      }`}
                      aria-label={`Select ${suggestion.company_name} (${suggestion.symbol})`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-white">{suggestion.symbol}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${sentiment.bg} ${sentiment.border} border ${sentiment.color} font-semibold`}>
                              {sentiment.label}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">{suggestion.company_name}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-500 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  )
                })}
                </div>
              )}
            </div>

            <RecentSearches onSelect={handleSelect} />
          </div>


          {/* Loading/Error States */}
          {isLoading && (
            <div className="flex min-h-[200px] flex-col items-center justify-center">
              <AILoading message="Analyzing market sentiment with AI..." />
            </div>
          )}

          {isComplete && !isLoading && (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <p className="font-medium text-emerald-400">Analysis Complete</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-4">
              <p className="text-sm font-medium text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Right Column: Preview Card - Floating glassmorphism card */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <PreviewCard />
          </div>
        </div>
      </div>
    </div>
  )
}
