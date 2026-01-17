import { ExternalLink, Calendar } from "lucide-react"
import type { Article } from "@/types/api"

interface ArticlesListProps {
  articles: Article[]
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  if (articles.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-gray-800 bg-gray-900">
        <p className="font-sans text-lg text-gray-400">No articles found for this stock</p>
      </div>
    )
  }

  // Semantic color system for article sentiment badges
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "bullish":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      case "bearish":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "neutral":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="glass max-h-[600px] overflow-y-auto rounded-xl custom-scrollbar">
      {articles.map((article, index) => (
        <div key={index} className="border-b border-gray-700/50 p-4 transition-all last:border-b-0 hover:bg-gray-800/30 hover-lift">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-sans text-base font-medium text-white transition-colors hover:text-blue-400 hover:underline"
              >
                {article.title}
                <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                <span className="font-sans">Source: {article.source}</span>
                <span className="flex items-center gap-1 font-sans">
                  <Calendar className="h-3 w-3" />
                  {formatDate(article.published)}
                </span>
              </div>
            </div>

            <span
              className={`shrink-0 rounded-full px-3 py-1 font-sans text-xs font-semibold capitalize ${getSentimentColor(article.sentiment)}`}
            >
              {article.sentiment}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
