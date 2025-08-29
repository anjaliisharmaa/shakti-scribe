'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ControlPanel from '../components/ControlPanel'
import OutputCanvasNew from '../components/OutputCanvasNew'
import ReadmeModal from '../components/ReadmeModal'
import ContentHistory from '../components/ContentHistory'

interface GeneratedContent {
  type: string
  pillar: string
  prompt: string
  content: any
  timestamp: Date
}

interface ContentHistoryItem extends GeneratedContent {
  id: string
}

export default function Home() {
  const [activeView, setActiveView] = useState('generate')
  const [canvasState, setCanvasState] = useState<'initial' | 'generating' | 'content'>('initial')
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | undefined>()
  const [showReadme, setShowReadme] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [contentHistory, setContentHistory] = useState<ContentHistoryItem[]>([])

  // Mock content generation function
  const generateMockContent = (type: string, pillar: string, prompt: string) => {
    const mockContent = {
      video: {
        visuals: [
          'Close-up shot of a professional woman looking confident',
          'Medium shot of office environment with busy colleagues',
          'Text overlay: "Your boundaries matter"',
          'Wide shot of woman walking away confidently'
        ],
        voiceover: [
          "It's okay to say no at work.",
          "Your time and energy are valuable resources.",
          "Setting boundaries isn't selfish - it's self-care.",
          "Remember: You have the power to protect your peace."
        ],
        cta: "Drop a 💪 if you're ready to set better boundaries! Follow for more empowerment tips.",
        hashtags: ['TheShaktiTea', 'SpillTheShakti', 'WorkplaceBoundaries', 'SelfCare', 'WomenEmpowerment']
      },
      text: {
        post: `💡 The importance of saying 'no' at work!

Let's spill the tea: Your boundaries aren't suggestions - they're requirements. ☕️

Here's what I learned the hard way:
🚫 Saying no to extra projects when you're already overwhelmed
🚫 Saying no to after-hours calls during family time  
🚫 Saying no to taking credit for someone else's mistake

Your worth isn't measured by how much you can handle. It's measured by how well you protect your peace and energy.

The guilt you feel when setting boundaries? That's not your intuition - that's conditioning. Unlearn it. 

What's one boundary you need to set at work this week? 👇`,
        engagement: "What's the hardest boundary for you to set at work?",
        hashtags: ['TheShaktiTea', 'SpillTheShakti', 'WorkplaceBoundaries', 'SelfCare', 'ProfessionalGrowth']
      },
      poll: {
        question: "What's the hardest part about saying 'no' at work?",
        options: [
          'Fear of disappointing others',
          'Worry about career impact',
          'Feeling guilty or selfish',
          'Not knowing how to say it'
        ],
        context: "Setting boundaries at work is crucial for mental health and productivity. Understanding what holds us back is the first step!",
        hashtags: ['TheShaktiTea', 'SpillTheShakti', 'WorkplaceBoundaries', 'Poll']
      }
    }

    return mockContent[type as keyof typeof mockContent] || mockContent.text
  }

  const handleGenerate = async (data: { type: string; pillar: string; prompt: string }) => {
    setCanvasState('generating')
    
    try {
      console.log('🚨 CALLING REAL API!', data)
      
      // Call the actual API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ API Response:', result)
      
      if (result.success) {
        const newContent: GeneratedContent = {
          type: data.type,
          pillar: data.pillar,
          prompt: data.prompt,
          content: result.content,
          timestamp: new Date()
        }
        
        setGeneratedContent(newContent)
        setCanvasState('content')
      } else {
        throw new Error('API returned unsuccessful response')
      }
      
    } catch (error) {
      console.error('❌ API Failed:', error)
      
      // Fallback to mock content only if API fails
      const content = generateMockContent(data.type, data.pillar, data.prompt)
      const newContent: GeneratedContent = {
        type: data.type,
        pillar: data.pillar,
        prompt: data.prompt,
        content: {
          ...content,
          fallback: true,
          error: error.toString()
        },
        timestamp: new Date()
      }
      
      setGeneratedContent(newContent)
      setCanvasState('content')
    }
  }

  const handleSaveToHistory = () => {
    if (generatedContent) {
      const historyItem: ContentHistoryItem = {
        ...generatedContent,
        id: Date.now().toString()
      }
      setContentHistory(prev => [historyItem, ...prev])
    }
  }

  const handleCopyContent = () => {
    if (generatedContent) {
      let textToCopy = ''
      
      if (generatedContent.type === 'text') {
        textToCopy = generatedContent.content.post
      } else if (generatedContent.type === 'poll') {
        textToCopy = `${generatedContent.content.question}\n\n${generatedContent.content.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}`
      } else if (generatedContent.type === 'video') {
        textToCopy = `Voiceover Script:\n${generatedContent.content.voiceover.join('\n\n')}\n\nVisuals:\n${generatedContent.content.visuals.join('\n')}`
      }
      
      navigator.clipboard.writeText(textToCopy)
      // You could add a toast notification here
    }
  }

  const handleRegenerate = () => {
    if (generatedContent) {
      handleGenerate({
        type: generatedContent.type,
        pillar: generatedContent.pillar,
        prompt: generatedContent.prompt
      })
    }
  }

  const handleViewChange = (view: string) => {
    setActiveView(view)
    if (view === 'history') {
      setShowHistory(true)
    }
  }

  const handleLoadHistoryContent = (item: ContentHistoryItem) => {
    setGeneratedContent(item)
    setCanvasState('content')
    setShowHistory(false)
    setActiveView('generate')
  }

  const handleDeleteHistoryItem = (id: string) => {
    setContentHistory(prev => prev.filter(item => item.id !== id))
  }

  return (
    <main className="min-h-screen bg-shakti-white dark:bg-shakti-charcoal">
      <Sidebar 
        activeView={activeView}
        onViewChange={handleViewChange}
        onShowReadme={() => setShowReadme(true)}
      />
      
      <div className="ml-64 flex min-h-screen">
        <ControlPanel 
          onGenerate={handleGenerate}
          isGenerating={canvasState === 'generating'}
        />
        
        <OutputCanvasNew
          state={canvasState}
          generatedContent={generatedContent}
          onEdit={() => {}}
          onCopy={handleCopyContent}
          onRegenerate={handleRegenerate}
          onSave={handleSaveToHistory}
        />
      </div>

      <ReadmeModal 
        isOpen={showReadme}
        onClose={() => setShowReadme(false)}
      />

      <ContentHistory
        isOpen={showHistory}
        history={contentHistory}
        onClose={() => setShowHistory(false)}
        onLoadContent={handleLoadHistoryContent}
        onDeleteItem={handleDeleteHistoryItem}
      />
    </main>
  )
}
