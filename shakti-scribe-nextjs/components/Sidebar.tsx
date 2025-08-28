'use client'

import { useState } from 'react'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  onShowReadme: () => void
}

export default function Sidebar({ activeView, onViewChange, onShowReadme }: SidebarProps) {
  const navigationItems = [
    { 
      id: 'generate', 
      icon: '🚀', 
      label: 'Generate Content',
      description: 'The main workspace'
    },
    { 
      id: 'history', 
      icon: '📚', 
      label: 'Content History',
      description: 'View past generations'
    },
  ]

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-shakti-purple to-shakti-magenta dark:from-shakti-charcoal dark:to-gray-900 flex flex-col text-white shadow-xl z-10 overflow-y-auto">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Shakti Scribe</h1>
            <p className="text-white/70 text-sm">AI Content Agent</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeView === item.id
                  ? 'bg-white/20 text-white backdrop-blur-sm shadow-lg'
                  : 'hover:bg-white/10 text-white/80 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <div className="text-left">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-white/60 group-hover:text-white/80">
                  {item.description}
                </div>
              </div>
            </button>
          ))}
          
          {/* README Button */}
          <button
            onClick={onShowReadme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-white/10 text-white/80 hover:text-white"
          >
            <span className="text-xl">📖</span>
            <div className="text-left">
              <div className="font-medium">View README</div>
              <div className="text-xs text-white/60 group-hover:text-white/80">
                Reference documentation
              </div>
            </div>
          </button>
        </div>

        {/* Brand Tagline */}
        <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
          <div className="text-center">
            <div className="text-lg font-bold mb-1">The SHAKTI Tea ☕️</div>
            <div className="text-xs text-white/70">
              Brewing powerful content for Indian women
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-shakti-magenta to-purple-500 flex items-center justify-center text-lg font-bold shadow-lg">
            A
          </div>
          <div className="flex-1">
            <div className="font-medium">Anjali</div>
            <div className="text-xs text-white/60">Content Creator</div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <span className="text-lg">⚙️</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
