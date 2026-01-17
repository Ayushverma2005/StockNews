/**
 * Top Navigation Bar
 * Centered brand name with subtitle on the right
 * Matches exact design: StockNews centered, subtitle with blue underline
 */
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/30 bg-transparent backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Centered Brand */}
        <div className="flex-1" />
        <h1 className="flex-1 text-center font-sans text-3xl font-bold text-white">
          StockNews
        </h1>
        
        {/* Subtitle on Right */}
        <div className="flex flex-1 items-center justify-end">
          <div className="flex flex-col items-end gap-1">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              NSE Market News Sentiment Dashboard
            </p>
            <div className="h-[1px] w-full bg-blue-500" />
          </div>
        </div>
      </div>
    </nav>
  )
}
