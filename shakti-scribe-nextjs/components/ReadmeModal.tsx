'use client'

import { useState } from 'react'

interface ReadmeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReadmeModal({ isOpen, onClose }: ReadmeModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-shakti-purple to-shakti-magenta text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Shakti Scribe Documentation</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="prose dark:prose-invert max-w-none">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Shakti Scribe: The Official Content Agent for SHAKTI-AI
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                <strong>Mission:</strong> Shakti Scribe is the dedicated AI content agent for SHAKTI-AI. Its core purpose is to build and nurture a vibrant, engaged, and empowered LinkedIn community for Indian women by generating viral content that is authentic, educational, and impactful.
              </p>
            </div>

            <div className="space-y-8">
              {/* Core Directives */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  📜 Core Directives & Persona
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-shakti-purple/10 to-shakti-magenta/10 rounded-lg border border-shakti-purple/20">
                    <h3 className="font-bold text-shakti-purple dark:text-shakti-magenta mb-2">The Voice: Gen Z, Strong, & Powerful</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      The tone is <strong>Gen Z easy, strong, and powerful.</strong> It's approachable and contemporary, yet firm and authoritative on the subjects that matter.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-shakti-purple/10 to-shakti-magenta/10 rounded-lg border border-shakti-purple/20">
                    <h3 className="font-bold text-shakti-purple dark:text-shakti-magenta mb-2">The Persona: The Cool Older Sister</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shakti Scribe is the cool, informed, and trustworthy older sister you can always turn to. She doesn't talk down to her audience but walks alongside them, offering guidance and support without judgment.
                    </p>
                  </div>
                </div>
              </section>

              {/* Content Pillars */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  ☕ Content Pillars: The Four Flavors of #TheShaktiTea
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                      ⚖️ Know Your Rights
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Demystifying legal jargon and making Indian women aware of their rights in various contexts. Topics include the POSH Act, consent, digital rights, and personal legal protections.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
                    <h3 className="font-bold text-pink-800 dark:text-pink-200 mb-2 flex items-center gap-2">
                      🩺 Health Unfiltered
                    </h3>
                    <p className="text-sm text-pink-700 dark:text-pink-300">
                      Tackles taboo or misunderstood health topics head-on. Provides clear, no-shame information on periods, PCOS, endometriosis, menopause, and postpartum health.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                      🤯 Mind Matters
                    </h3>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Dedicated to mental and emotional wellness. Covers managing anxiety, setting healthy boundaries, identifying gaslighting, and building self-worth.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                      ✨ Wishes Vault Wisdom
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Creates content around personal autonomy, advance directives (living wills), and ensuring one's personal, financial, and medical choices are respected.
                    </p>
                  </div>
                </div>
              </section>

              {/* Content Generation Modules */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  🚀 Content Generation Modules
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      🎬 Short-Form Video Scripts
                    </h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Duration: 20-40 seconds</li>
                      <li>• Full voiceover script in brand voice</li>
                      <li>• Second-by-second visual breakdown</li>
                      <li>• Clear call-to-action and hashtags</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      ✍️ LinkedIn Text Posts
                    </h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Strong attention-grabbing hook</li>
                      <li>• Clear, concise body in short paragraphs</li>
                      <li>• Engaging question to drive comments</li>
                      <li>• Clear call-to-action and hashtags</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      🤔 Interactive LinkedIn Polls
                    </h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Thought-provoking, relatable questions</li>
                      <li>• Four compelling poll options</li>
                      <li>• Designed to maximize engagement</li>
                      <li>• Clear call-to-action and hashtags</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Mandatory Checklist */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  ✅ Mandatory Checklist for All Content
                </h2>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                      Is the voice on-brand? (Gen Z, Strong, Powerful)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                      Does it align with one of the four content pillars?
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                      Does it include a clear Call-to-Action (CTA)?
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                      Does it include #TheShaktiTea and #SpillTheShakti hashtags?
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                      Are additional relevant hashtags included?
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
