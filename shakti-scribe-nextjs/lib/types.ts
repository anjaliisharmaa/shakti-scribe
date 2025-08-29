// Type definitions for the Shakti Scribe application

export interface ContentRequest {
  contentType: 'video' | 'text' | 'poll'
  agent: 'gynika' | 'maaya' | 'meher' | 'nyaya' | 'vaanya'
  prompt: string
}

export interface GeneratedContent {
  title: string
  content: string
  contentType: 'video' | 'text' | 'poll'
  agent: string
  additionalData?: {
    duration?: string
    platform?: string
    tone?: string
    hashtags?: string[]
    options?: string[]
    engagement?: string
  }
}

export interface ApiResponse {
  success: boolean
  content?: GeneratedContent
  metadata?: {
    contentType: string
    agent: string
    generatedAt: string
  }
  error?: string
}

export interface Agent {
  name: string
  personality: string
  expertise: string[]
  tone: string
  specialties: string[]
}

export interface ContentHistory {
  id: string
  content: GeneratedContent
  generatedAt: string
  prompt: string
}
