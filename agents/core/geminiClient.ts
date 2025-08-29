import { generateWithGemini } from '../../shakti-scribe-nextjs/lib/gemini'

export class GeminiClient {
  static async generateContent(prompt: string): Promise<string> {
    try {
      return await generateWithGemini(prompt)
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error('Failed to generate content with Gemini')
    }
  }

  static async generateWithRetry(prompt: string, maxRetries: number = 3): Promise<string> {
    let lastError: Error

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.generateContent(prompt)
      } catch (error) {
        lastError = error as Error
        console.warn(`Gemini generation attempt ${attempt} failed:`, error)
        
        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
      }
    }

    throw lastError!
  }
}
