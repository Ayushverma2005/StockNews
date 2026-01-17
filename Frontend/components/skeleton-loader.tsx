"use client"

/**
 * Skeleton loader component for loading states
 * Provides shimmer effect for various content types
 */
export default function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-shimmer rounded bg-gray-800/50 ${className}`} />
  )
}
