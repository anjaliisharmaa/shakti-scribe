import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test environment variables
    const apiKeyExists = !!process.env.GEMINI_API_KEY
    const apiKeyLength = process.env.GEMINI_API_KEY?.length || 0
    const apiKeyPrefix = process.env.GEMINI_API_KEY?.substring(0, 10) || 'none'

    console.log('🔍 Environment Check:')
    console.log(`   API Key Exists: ${apiKeyExists}`)
    console.log(`   API Key Length: ${apiKeyLength}`)
    console.log(`   API Key Prefix: ${apiKeyPrefix}...`)

    if (!apiKeyExists) {
      return NextResponse.json({ 
        error: 'API key not found',
        details: 'GEMINI_API_KEY environment variable is missing',
        help: 'Check your .env.local file'
      })
    }

    if (apiKeyLength < 30) {
      return NextResponse.json({ 
        error: 'API key too short',
        details: `API key length is ${apiKeyLength}, expected at least 30 characters`,
        help: 'Verify your API key is complete'
      })
    }

    // Test basic Gemini import
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      
      console.log('✅ Gemini SDK imported and initialized successfully')
      
      // Test a very simple prompt
      console.log('🧪 Testing simple Gemini call...')
      const result = await model.generateContent('Say "Hello World" in exactly two words.')
      const response = await result.response
      const text = response.text()
      
      return NextResponse.json({ 
        success: true,
        message: 'Gemini API working correctly',
        testResponse: text,
        apiKeyStatus: 'Valid',
        responseLength: text.length
      })

    } catch (geminiError) {
      const errorMessage = geminiError instanceof Error ? geminiError.message : String(geminiError)
      console.error('❌ Gemini test failed:', errorMessage)
      
      return NextResponse.json({ 
        error: 'Gemini API test failed',
        details: errorMessage,
        apiKeyStatus: 'Key exists but API call failed'
      })
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('❌ Environment test failed:', errorMessage)
    
    return NextResponse.json({ 
      error: 'Environment test failed',
      details: errorMessage
    })
  }
}
