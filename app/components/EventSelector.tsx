'use client'

import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EventSelectorProps {
  type: string
  title: string
  description: string
  selected: boolean
  onSelect: () => void
}

export function EventSelector({
  type,
  title,
  description,
  selected,
  onSelect,
}: EventSelectorProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'group relative flex flex-col items-start gap-4 p-6 rounded-lg border-2 transition-all duration-200',
        selected
          ? 'border-gray-900 bg-white'
          : 'border-gray-200 bg-gray-50 hover:border-gray-400'
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 group-hover:bg-gray-300 transition-colors">
        <Sparkles className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col items-start">
        <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-xs text-gray-600 mt-1 text-left">{description}</p>
      </div>
      {selected && (
        <div className="absolute inset-0 rounded-lg bg-gray-900 opacity-5 pointer-events-none" />
      )}
    </button>
  )
}
