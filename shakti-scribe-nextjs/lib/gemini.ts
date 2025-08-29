import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is required')
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Get the Gemini Pro model (use flash for testing to save quota)
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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
    console.log('🔑 API Key exists:', !!process.env.GEMINI_API_KEY)
    console.log('📝 Prompt length:', prompt.length)
    console.log('🤖 Calling Gemini API...')
    
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    console.log('✅ Gemini response received, length:', text.length)
    return text
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorName = error instanceof Error ? error.name : 'Unknown'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    console.error('❌ Gemini generation error details:', {
      message: errorMessage,
      name: errorName,
      stack: errorStack
    })
    
    // Check if it's an API key issue
    if (errorMessage.includes('API_KEY') || errorMessage.includes('api key')) {
      throw new Error('Invalid or missing Gemini API key')
    }
    
    // Check if it's a quota issue
    if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
      throw new Error('Gemini API quota exceeded')
    }
    
    // Check if it's a safety filter issue
    if (errorMessage.includes('safety') || errorMessage.includes('blocked')) {
      throw new Error('Content blocked by Gemini safety filters')
    }
    
    throw new Error(`Gemini API error: ${errorMessage}`)
  }
}
