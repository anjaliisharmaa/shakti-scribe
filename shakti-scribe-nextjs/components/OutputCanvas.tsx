import { useState } from 'react';

export default function OutputCanvas() {
  // For demo, use state to toggle between initial, loading, and content
  const [state, setState] = useState<'initial' | 'loading' | 'content'>('initial');
  // Example content
  const contentType = '🎬 Video Script';
  const pillar = 'Mind Matters';
  const visuals = ['Scene 1: Office', 'Scene 2: Close-up', 'Scene 3: Group'];
  const voiceover = [
    'It’s okay to say no at work.',
    'Your boundaries matter.',
    'Empower yourself with knowledge.'
  ];
  'use client'

import { useState } from 'react'

interface GeneratedContent {
  type: string
  pillar: string
  prompt: string
  content: any
  timestamp: Date
}

interface OutputCanvasProps {
  state: 'initial' | 'generating' | 'content'
  generatedContent?: GeneratedContent
  onEdit: () => void
  onCopy: () => void
  onRegenerate: () => void
  onSave: () => void
}

export default function OutputCanvas({ 
  state, 
  generatedContent, 
  onEdit, 
  onCopy, 
  onRegenerate, 
  onSave 
}: OutputCanvasProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')

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

  const handleEdit = () => {
    setIsEditing(true)
    if (generatedContent) {
      setEditedContent(typeof generatedContent.content === 'string' 
        ? generatedContent.content 
        : JSON.stringify(generatedContent.content, null, 2))
    }
    onEdit()
  }

  const handleSaveEdit = () => {
    setIsEditing(false)
    // In a real app, you'd update the content here
  }

  const renderInitialState = () => (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-shakti-purple/20 to-shakti-magenta/20 rounded-3xl flex items-center justify-center">
          <span className="text-6xl font-bold bg-gradient-to-r from-shakti-purple to-shakti-magenta bg-clip-text text-transparent">
            S
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Ready to Create Magic? ✨
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          Your on-brand content will appear here. Let's create something powerful that resonates with your audience!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl w-full">
        <div className="p-4 bg-gradient-to-br from-shakti-purple/10 to-shakti-magenta/10 rounded-xl border border-shakti-purple/20">
          <div className="text-2xl mb-2">🎬</div>
          <div className="font-medium text-shakti-purple dark:text-shakti-magenta">Video Scripts</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Engaging short-form content</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-shakti-purple/10 to-shakti-magenta/10 rounded-xl border border-shakti-purple/20">
          <div className="text-2xl mb-2">✍️</div>
          <div className="font-medium text-shakti-purple dark:text-shakti-magenta">Text Posts</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">LinkedIn-ready content</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-shakti-purple/10 to-shakti-magenta/10 rounded-xl border border-shakti-purple/20">
          <div className="text-2xl mb-2">🤔</div>
          <div className="font-medium text-shakti-purple dark:text-shakti-magenta">Interactive Polls</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Engagement-driven content</div>
        </div>
      </div>
    </div>
  )

  const renderGeneratingState = () => (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <div className="mb-8">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-shakti-purple/30 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-shakti-magenta rounded-full animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">☕️</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Shakti Scribe is brewing... ☕️
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        Creating powerful, on-brand content just for you
      </p>
      
      <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="w-2 h-2 bg-shakti-purple rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-shakti-magenta rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-shakti-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )

  const renderVideoScript = (content: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <span>🎥</span> Visuals (Second-by-Second)
          </h4>
          <div className="space-y-3">
            {content.visuals?.map((visual: string, index: number) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-xs font-medium text-shakti-purple dark:text-shakti-magenta mb-1">
                  {index + 1}. ({(index * 3) + 1}-{(index + 1) * 3}s)
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{visual}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <span>🎙️</span> Voiceover Script
          </h4>
          <div className="space-y-3">
            {content.voiceover?.map((line: string, index: number) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-xs font-medium text-shakti-purple dark:text-shakti-magenta mb-1">
                  Segment {index + 1}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{line}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {content.cta && (
        <div className="p-4 bg-gradient-to-r from-shakti-purple/10 to-shakti-magenta/10 rounded-lg border border-shakti-purple/20">
          <div className="font-medium text-shakti-purple dark:text-shakti-magenta mb-1">Call to Action</div>
          <div className="text-sm">{content.cta}</div>
        </div>
      )}
      
      {content.hashtags && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="font-medium text-blue-800 dark:text-blue-200 mb-2">Hashtags</div>
          <div className="flex flex-wrap gap-1">
            {content.hashtags.map((tag: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderTextPost = (content: any) => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner">
        <div className="whitespace-pre-line text-base leading-relaxed text-gray-900 dark:text-white">
          {content.post}
        </div>
      </div>
      
      {content.engagement && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="font-medium text-green-800 dark:text-green-200 mb-1">Engagement Question</div>
          <div className="text-sm text-green-700 dark:text-green-300">{content.engagement}</div>
        </div>
      )}
      
      {content.hashtags && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="font-medium text-blue-800 dark:text-blue-200 mb-2">Hashtags</div>
          <div className="flex flex-wrap gap-1">
            {content.hashtags.map((tag: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderPoll = (content: any) => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {content.question}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
          {content.options?.map((option: string, index: number) => (
            <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-shakti-magenta transition-colors cursor-pointer group">
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-shakti-magenta">
                {option}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {content.context && (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="font-medium text-amber-800 dark:text-amber-200 mb-1">Context</div>
          <div className="text-sm text-amber-700 dark:text-amber-300">{content.context}</div>
        </div>
      )}
      
      {content.hashtags && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="font-medium text-blue-800 dark:text-blue-200 mb-2">Hashtags</div>
          <div className="flex flex-wrap gap-1">
            {content.hashtags.map((tag: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderContentState = () => {
    if (!generatedContent) return null

    const contentTypeLabel = contentTypeLabels[generatedContent.type as keyof typeof contentTypeLabels]
    const pillarLabel = pillarLabels[generatedContent.pillar as keyof typeof pillarLabels]

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-shakti-purple to-shakti-magenta border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {contentTypeLabel}: {pillarLabel}
                </h3>
                <p className="text-white/80 text-sm">
                  Generated {generatedContent.timestamp.toLocaleString()}
                </p>
              </div>
              <div className="text-white/80 text-sm">
                ☕️ The SHAKTI Tea
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {generatedContent.type === 'video' && renderVideoScript(generatedContent.content)}
                {generatedContent.type === 'text' && renderTextPost(generatedContent.content)}
                {generatedContent.type === 'poll' && renderPoll(generatedContent.content)}
              </>
            )}
          </div>

          {/* Card Footer - Action Bar */}
          {!isEditing && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-shakti-magenta hover:bg-shakti-magenta/10 rounded-lg transition-all duration-200"
                    title="Edit content"
                  >
                    <span>✏️</span>
                    <span className="font-medium">Edit</span>
                  </button>
                  
                  <button
                    onClick={onCopy}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-shakti-magenta hover:bg-shakti-magenta/10 rounded-lg transition-all duration-200"
                    title="Copy to clipboard"
                  >
                    <span>📋</span>
                    <span className="font-medium">Copy</span>
                  </button>
                  
                  <button
                    onClick={onRegenerate}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-shakti-magenta hover:bg-shakti-magenta/10 rounded-lg transition-all duration-200"
                    title="Generate new version"
                  >
                    <span>🔄</span>
                    <span className="font-medium">Regenerate</span>
                  </button>
                </div>
                
                <button
                  onClick={onSave}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-shakti-purple to-shakti-magenta text-white rounded-lg hover:from-shakti-magenta hover:to-shakti-purple transition-all duration-200 shadow-md"
                  title="Save to history"
                >
                  <span>💾</span>
                  <span className="font-medium">Save to History</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section className="flex-1 bg-shakti-white dark:bg-shakti-charcoal p-8 overflow-y-auto">
      {state === 'initial' && renderInitialState()}
      {state === 'generating' && renderGeneratingState()}
      {state === 'content' && renderContentState()}
    </section>
  )
}
  const poll = {
    question: "What's the hardest part about saying 'no' at work?",
    options: ['Fear of conflict', 'Letting people down', 'Missing out', 'Not sure'],
  };

  return (
    <section className="flex-1 bg-shakti-white dark:bg-shakti-charcoal flex items-center justify-center p-8">
      {state === 'initial' && (
        <div className="flex flex-col items-center justify-center text-center opacity-70">
          <div className="text-7xl mb-4">S</div>
          <div className="text-lg font-medium">Your on-brand content will appear here. Let's create something powerful!</div>
        </div>
      )}
      {state === 'loading' && (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-shakti-magenta border-opacity-50 mb-6"></div>
          <div className="text-lg font-medium">Shakti Scribe is brewing... ☕️</div>
        </div>
      )}
      {state === 'content' && (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-shakti-charcoal rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-2 text-shakti-purple dark:text-shakti-magenta font-semibold">
            <span>{contentType}:</span>
            <span>{pillar}</span>
          </div>
          {/* Example: Video Script */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="font-bold mb-1">Visuals (Second-by-Second)</div>
              <ul className="list-disc pl-5 text-sm">
                {visuals.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            </div>
            <div>
              <div className="font-bold mb-1">Voiceover Script</div>
              <ul className="list-disc pl-5 text-sm">
                {voiceover.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            </div>
          </div>
          {/* Example: Text Post */}
          {/* <div className="mb-4 whitespace-pre-line text-base">{textPost}</div> */}
          {/* Example: Poll */}
          {/* <div className="mb-4">
            <div className="font-bold mb-1">{poll.question}</div>
            <ul className="list-disc pl-5 text-sm">
              {poll.options.map((opt, i) => <li key={i}>{opt}</li>)}
            </ul>
          </div> */}
          {/* Action Bar */}
          <div className="flex gap-4 mt-4 border-t pt-4 border-gray-100 dark:border-gray-700">
            <button className="hover:text-shakti-magenta" title="Edit">✏️</button>
            <button className="hover:text-shakti-magenta" title="Copy">📋</button>
            <button className="hover:text-shakti-magenta" title="Regenerate">🔄</button>
            <button className="hover:text-shakti-magenta" title="Save">💾</button>
          </div>
        </div>
      )}
    </section>
  );
}
