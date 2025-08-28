'use client'

import { useState } from 'react'

interface ContentType {
  icon: string
  label: string
  value: string
  description: string
}

interface Pillar {
  icon: string
  label: string
  value: string
  description: string
}

interface ControlPanelProps {
  onGenerate: (data: {
    type: string
    pillar: string
    prompt: string
  }) => void
  isGenerating: boolean
}

const contentTypes: ContentType[] = [
  { 
    icon: '🎬', 
    label: 'Video Script', 
    value: 'video',
    description: '20-40 second scripts'
  },
  { 
    icon: '✍️', 
    label: 'Text Post', 
    value: 'text',
    description: 'LinkedIn posts'
  },
  { 
    icon: '🤔', 
    label: 'Poll', 
    value: 'poll',
    description: 'Interactive polls'
  },
]

const pillars: Pillar[] = [
  { 
    icon: '🌸', 
    label: 'Gynika', 
    value: 'gynika',
    description: 'Flow friend (menstruation, puberty, and contraception)'
  },
  { 
    icon: '💕', 
    label: 'Maaya', 
    value: 'maaya',
    description: 'For moms, by heart (pregnancy, child birth, and baby care)'
  },
  { 
    icon: '�', 
    label: 'Meher', 
    value: 'meher',
    description: 'Gentle guide (emotional support for trauma, anxiety, and abuse)'
  },
  { 
    icon: '⚖️', 
    label: 'Nyaya', 
    value: 'nyaya',
    description: 'Rights ally (indian laws on consent, abortion, and family rights)'
  },
  { 
    icon: '🔥', 
    label: 'Vaanya', 
    value: 'vaanya',
    description: 'Age rebel (menopause, hormonal health, and women\'s empowerment)'
  },
]

export default function ControlPanel({ onGenerate, isGenerating }: ControlPanelProps) {
  const [type, setType] = useState('video')
  const [pillar, setPillar] = useState('gynika')
  const [prompt, setPrompt] = useState('')

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate({ type, pillar, prompt: prompt.trim() })
    }
  }

  const selectedPillar = pillars.find(p => p.value === pillar)

  return (
    <section className="w-96 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-lg">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Creation Hub
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Build powerful content that resonates
        </p>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-6 py-6 space-y-8 overflow-y-auto">
        {/* Section 1: Content Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Select Content Type
          </label>
          <div className="grid grid-cols-1 gap-3">
            {contentTypes.map((ct) => (
              <button
                key={ct.value}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                  type === ct.value
                    ? 'border-shakti-magenta bg-gradient-to-r from-shakti-magenta/10 to-shakti-purple/10 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-shakti-magenta/50 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setType(ct.value)}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ct.icon}</span>
                  <div>
                    <div className={`font-medium ${
                      type === ct.value 
                        ? 'text-shakti-magenta' 
                        : 'text-gray-900 dark:text-white group-hover:text-shakti-magenta'
                    }`}>
                      {ct.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {ct.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Content Pillar */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Choose Your Pillar
          </label>
          <div className="relative">
            <select
              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium focus:border-shakti-magenta focus:ring-2 focus:ring-shakti-magenta/20 transition-all duration-200 appearance-none cursor-pointer"
              value={pillar}
              onChange={e => setPillar(e.target.value)}
            >
              {pillars.map(p => (
                <option key={p.value} value={p.value}>
                  {p.icon} {p.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {selectedPillar && (
            <div className="mt-2 p-3 bg-gradient-to-r from-shakti-purple/10 to-shakti-magenta/10 rounded-lg border border-shakti-purple/20">
              <div className="flex items-center gap-2 text-sm">
                <span>{selectedPillar.icon}</span>
                <span className="font-medium text-shakti-purple dark:text-shakti-magenta">
                  {selectedPillar.description}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Prompt */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
            What topic are we spilling the tea on today? ☕️
          </label>
          <textarea
            className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 px-4 py-3 min-h-[120px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:border-shakti-magenta focus:ring-2 focus:ring-shakti-magenta/20 transition-all duration-200"
            placeholder="e.g., The importance of saying 'no' at work"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            maxLength={500}
          />
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
            {prompt.length}/500 characters
          </div>
        </div>

        {/* Tips Section */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <span className="text-lg">💡</span>
            <div>
              <div className="font-medium text-amber-800 dark:text-amber-200 text-sm mb-1">
                Pro Tip
              </div>
              <div className="text-xs text-amber-700 dark:text-amber-300">
                Be specific about your audience, context, and desired outcome for the best results!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Generate Button */}
      <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full py-4 rounded-xl bg-gradient-to-r from-shakti-purple to-shakti-magenta text-white font-bold text-lg shadow-lg hover:from-shakti-magenta hover:to-shakti-purple transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={isGenerating || !prompt.trim()}
          onClick={handleGenerate}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Brewing...</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>Generate with Scribe</span>
            </>
          )}
        </button>
      </div>
    </section>
  )
}
