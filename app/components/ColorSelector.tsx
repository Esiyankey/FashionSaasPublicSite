'use client'

import { cn } from '@/lib/utils'

interface ColorSelectorProps {
  color: string
  title: string
  description: string
  selected: boolean
  onSelect: () => void
}

const colorPalettes: Record<string, string> = {
  warm: 'bg-amber-100',
  cool: 'bg-blue-100',
  neutral: 'bg-stone-100',
  deep: 'bg-slate-800',
}

export function ColorSelector({
  color,
  title,
  description,
  selected,
  onSelect,
}: ColorSelectorProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'group relative flex flex-col items-center gap-4 p-6 rounded-lg border-2 transition-all duration-200',
        selected
          ? 'border-gray-900 bg-white'
          : 'border-gray-200 bg-gray-50 hover:border-gray-400'
      )}
    >
      <div
        className={cn(
          'w-16 h-16 rounded-full border-2 transition-all',
          colorPalettes[color],
          selected ? 'border-gray-900' : 'border-gray-300'
        )}
      />
      <div className="flex flex-col items-center">
        <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-xs text-gray-600 mt-1 text-center">{description}</p>
      </div>
      {selected && (
        <div className="absolute inset-0 rounded-lg bg-gray-900 opacity-5 pointer-events-none" />
      )}
    </button>
  )
}
