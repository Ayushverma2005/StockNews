"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import type { RecentSearch } from "@/types/api"

interface RecentSearchesProps {
  onSelect: (symbol: string) => void
}

export default function RecentSearches({ onSelect }: RecentSearchesProps) {
  const [searches, setSearches] = useState<RecentSearch[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const response = await fetch("/api/recent")
        if (response.ok) {
          const data = await response.json()
          setSearches(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch recent searches:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentSearches()
  }, [])

  if (isLoading || searches.length === 0) {
    return null
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-400">Recent Searches:</h3>
      </div>

      <div className="flex flex-wrap gap-2.5 overflow-x-auto pb-2">
        {searches.map((search) => (
          <button
            key={`${search.symbol}-${search.timestamp}`}
            onClick={() => onSelect(search.symbol)}
            className="group flex items-center gap-2 whitespace-nowrap rounded-full border border-cyan-500/30 bg-gray-900/40 px-4 py-2 backdrop-blur-sm transition-all hover:scale-105 hover:border-cyan-400/50 hover:bg-gray-900/60 hover:shadow-md hover:shadow-cyan-500/10"
          >
            {/* Symbol in neon green as per design */}
            <span className="font-mono text-sm font-bold text-emerald-400 group-hover:text-emerald-300">
              {search.symbol}
            </span>
            <span className="text-xs text-gray-500">-</span>
            <span className="max-w-[200px] truncate text-xs text-gray-400">
              {search.company_name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
