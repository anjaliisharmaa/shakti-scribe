import { generateWithGemini } from '../../shakti-scribe-nextjs/lib/gemini'

export interface Agent {
  name: string
  description: string
  personality: string
  expertise: string[]
  tone: string
  specialties: string[]
}

export interface ContentRequest {
  contentType: 'video' | 'text' | 'poll'
  agent: string
  prompt: string
}

export interface GeneratedContent {
  title: string
  content: string
  contentType: 'video' | 'text' | 'poll'
  agent: string
  metadata?: {
    duration?: string
    hashtags?: string[]
    callToAction?: string
    additionalData?: any
  }
}

export abstract class BaseAgent {
  abstract agent: Agent
  
  constructor() {}

  abstract generateVideoScript(prompt: string): Promise<GeneratedContent>
  abstract generateTextPost(prompt: string): Promise<GeneratedContent>
  abstract generatePoll(prompt: string): Promise<GeneratedContent>

  async generateContent(contentType: 'video' | 'text' | 'poll', prompt: string): Promise<GeneratedContent> {
    switch (contentType) {
      case 'video':
        return this.generateVideoScript(prompt)
      case 'text':
        return this.generateTextPost(prompt)
      case 'poll':
        return this.generatePoll(prompt)
      default:
        throw new Error(`Unsupported content type: ${contentType}`)
    }
  }

  protected async callGemini(systemPrompt: string, userPrompt: string): Promise<string> {
    const fullPrompt = `${systemPrompt}\n\nUser Request: ${userPrompt}`
    return await generateWithGemini(fullPrompt)
  }

  protected buildSystemPrompt(contentType: string): string {
    return `You are ${this.agent.name}, ${this.agent.description}. 

Your personality: ${this.agent.personality}
Your expertise: ${this.agent.expertise.join(', ')}
Your tone: ${this.agent.tone}
Your specialties: ${this.agent.specialties.join(', ')}

You are creating content for "The SHAKTI Tea" - a platform empowering Indian women with knowledge, rights, and unfiltered truth.

${this.getContentTypeInstructions(contentType)}`
  }

  private getContentTypeInstructions(contentType: string): string {
    switch (contentType) {
      case 'video':
        return `Create a 20-second video script following this EXACT format:

"Generate a 20-second, high-definition (1080p, 9:16 vertical aspect ratio) promotional video for 'The SHAKTI Tea.' The overall tone should be empowering, warm, and intriguing, with a sophisticated and modern aesthetic. Use a warm, cinematic color palette with soft lighting.

Video Duration: 20 Seconds
Voiceover Script: [Write complete voiceover text here]

[Seconds 0-3]
Visuals: [Detailed visual description]
Audio: [Audio description]
Voiceover: "[Exact words]"
On-Screen Text: [Text that appears]

[Continue for all time segments through Seconds 16-20]

Include relevant hashtags: #TheShaktiTea #SpillTheShakti and topic-specific tags."`

      case 'text':
        return `Create a LinkedIn/social media text post following this format:

- Start with an engaging title/hook
- Use conversational, empowering tone
- Include personal insights and truth-telling
- Use bullet points or short paragraphs for readability
- Include call-to-action question for engagement
- End with relevant hashtags including #TheShaktiTea #SpillTheShakti
- Keep tone warm but bold, addressing Indian women directly
- Include tea/spilling metaphors where appropriate ☕`

      case 'poll':
        return `Create an interactive poll following this format:

Title: [Engaging title]
Context: [2-3 lines setting up the poll question]
Poll Question: [Clear, specific question]

Options (exactly 4):
🗣️ [Option 1 with relevant emoji]
🚫 [Option 2 with relevant emoji] 
🏆 [Option 3 with relevant emoji]
🧘‍♀️ [Option 4 with relevant emoji]

Keep options relatable to Indian women's experiences.`

      default:
        return ''
    }
  }
}
