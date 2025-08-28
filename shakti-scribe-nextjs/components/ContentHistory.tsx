'use client'

import { useState } from 'react'

interface ContentHistoryItem {
  id: string
  type: string
  pillar: string
  prompt: string
  content: any
  timestamp: Date
}

interface ContentHistoryProps {
  isOpen: boolean
  history: ContentHistoryItem[]
  onClose: () => void
  onLoadContent: (item: ContentHistoryItem) => void
  onDeleteItem: (id: string) => void
}

export default function ContentHistory({ 
  isOpen, 
  history, 
  onClose, 
  onLoadContent, 
  onDeleteItem 
}: ContentHistoryProps) {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  if (!isOpen) return null

  const pillarLabels = {
    rights: '⚖️ Know Your Rights',
    health: '🩺 Health Unfiltered', 
    mind: '🤯 Mind Matters',
    wishes: '✨ Wishes Vault Wisdom'
  }

  const contentTypeLabels = {
    video: '🎬 Video Script',
    text: '✍️ Text Post',
    poll: '🤔 Poll'
  }

  const filteredHistory = history.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter
    const matchesSearch = item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const formatContent = (item: ContentHistoryItem) => {
    if (item.type === 'text') {
      return item.content.post?.substring(0, 100) + '...'
    } else if (item.type === 'poll') {
      return item.content.question
    } else if (item.type === 'video') {
      return `${item.content.visuals?.length || 0} scenes, ${item.content.voiceover?.length || 0} voiceover segments`
    }
    return 'Content available'
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl max-h-[90vh] w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-shakti-purple to-shakti-magenta text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Content History</h2>
              <p className="text-white/80 text-sm">{history.length} generated content pieces</p>
            </div>
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

        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-shakti-magenta focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-shakti-magenta focus:border-transparent"
              >
                <option value="all">All Content</option>
                <option value="video">🎬 Video Scripts</option>
                <option value="text">✍️ Text Posts</option>
                <option value="poll">🤔 Polls</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {filteredHistory.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4 opacity-50">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {history.length === 0 ? 'No Content Yet' : 'No Matching Content'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {history.length === 0 
                  ? 'Start creating content to see your history here!'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">
                          {contentTypeLabels[item.type as keyof typeof contentTypeLabels]?.split(' ')[0]}
                        </span>
                        <span className="px-2 py-1 bg-shakti-purple/10 text-shakti-purple dark:bg-shakti-magenta/10 dark:text-shakti-magenta rounded-full text-xs font-medium">
                          {pillarLabels[item.pillar as keyof typeof pillarLabels]}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {item.prompt}
                      </h4>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {formatContent(item)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => onLoadContent(item)}
                        className="px-3 py-1 bg-shakti-purple hover:bg-shakti-magenta text-white rounded-lg transition-colors text-sm font-medium"
                        title="Load this content"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
                        title="Delete this content"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredHistory.length} of {history.length} items
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
