"use client"

import { useState, useRef } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ResultsDashboard from "@/components/results-dashboard"
import FloatingInsights from "@/components/floating-insights"
import Footer from "@/components/footer"
import MouseHighlight from "@/components/mouse-highlight"
import type { PipelineResponse } from "@/types/api"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [results, setResults] = useState<PipelineResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (symbol: string) => {
    setIsLoading(true)
    setIsComplete(false)
    setError(null)
    setResults(null)

    try {
      const response = await fetch("/api/pipeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment")
      }

      const data: PipelineResponse = await response.json()
      setResults(data)
      setIsComplete(true)

      // Wait for completion message animation, then scroll
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden noise-texture">
      {/* Enhanced Mouse Follow Highlight - Cyan/Blue for AI theme */}
      <MouseHighlight containerRef={containerRef} size={500} opacity={0.12} blur={4} color="blue" enabled={true} />

      {/* Premium Layered Background - Deep Navy/Midnight Blue Theme */}
      <div className="fixed inset-0 -z-10">
        {/* Dark Navy Base - Deep blue gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

        {/* Subtle Diagonal Texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.03) 10px,
              rgba(255, 255, 255, 0.03) 20px
            )`,
          }}
        />

        {/* Soft Radial Glow - Center-right area behind sentiment card */}
        <div className="absolute right-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-3xl" />

        {/* Radial Spotlight (follows mouse via MouseHighlight) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />

        {/* Grid Pattern Overlay - Subtle */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* Hero Section with Two-Column Layout */}
        <section className="min-h-screen pt-24">
          <HeroSection onSearch={handleSearch} isLoading={isLoading} isComplete={isComplete} error={error} />
        </section>

        {/* Floating Insights Panel - Appears after search */}
        {results && (
          <FloatingInsights
            sentimentSummary={results.sentiment_summary}
            articleCount={results.article_count}
            companyName={results.company.name}
          />
        )}

        {/* Results Dashboard Section */}
        {results && (
          <section ref={resultsRef} className="mx-auto max-w-7xl px-4 pb-24 pt-12">
            <ResultsDashboard data={results} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
