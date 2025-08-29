import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is required')
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Get the Gemini Pro model
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

// Configuration for different content types
export const geminiConfig = {
  generationConfig: {
    temperature: 0.8,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],
}

// Helper function to generate content with Gemini
export async function generateWithGemini(prompt: string): Promise<string> {
  try {
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini generation error:', error)
    throw new Error('Failed to generate content with Gemini')
  }
}
