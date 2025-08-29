// Python-only con  // Force API call - no cache
  console.log('🚀 FORCING API CALL - NO CACHE!')
  console.log('🐍 Request details:', { contentType, agent, prompt })
  
  const apiUrl = 'http://localhost:8001/generate'
  const payload = {
    contentType: contentType === 'text' ? 'social_media_post' : contentType,
    prompt: prompt,
    agent: agent
  }ator
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
  additionalData?: any
}

export async function generateContent(request: ContentRequest): Promise<GeneratedContent> {
  const { contentType, agent, prompt } = request

  // Force API call - no cache
  console.log('� FORCING API CALL - NO CACHE!')
  console.log('🐍 Request details:', { contentType, agent, prompt })
  
  const apiUrl = 'http://localhost:8000/generate'
  const payload = {
    contentType: contentType === 'text' ? 'social_media_post' : contentType,
    prompt: prompt,
    agent: agent
  }
  
  console.log('📡 API URL:', apiUrl)
  console.log('📤 Payload:', JSON.stringify(payload, null, 2))

  try {
    console.log('🔄 Making fetch request...')
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(payload)
    })

    console.log('📡 Response status:', response.status)
    console.log('📡 Response headers:', Object.fromEntries(response.headers))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API Error response:', errorText)
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ API SUCCESS! Result:', result)
    
    // Transform the Python API response to match frontend expectations
    let transformedContent
    
    if (contentType === 'text') {
      transformedContent = {
        post: result.content,
        engagement: result.metadata?.callToAction || "What's your take on this?",
        hashtags: result.metadata?.hashtags || ['#TheShaktiTea', '#SpillTheShakti']
      }
    } else if (contentType === 'poll') {
      transformedContent = {
        question: result.title,
        options: [
          "Strongly agree",
          "Somewhat agree", 
          "Neutral",
          "Disagree"
        ],
        context: result.content,
        hashtags: result.metadata?.hashtags || ['#TheShaktiTea', '#SpillTheShakti']
      }
    } else if (contentType === 'video') {
      const lines = result.content.split('\n').filter(line => line.trim())
      transformedContent = {
        visuals: lines.slice(0, Math.ceil(lines.length/2)),
        voiceover: lines.slice(Math.ceil(lines.length/2)),
        cta: result.metadata?.callToAction || "Share your thoughts!",
        hashtags: result.metadata?.hashtags || ['#TheShaktiTea', '#SpillTheShakti']
      }
    }
    
    // Force return the API result
    const finalResult = {
      title: result.title || `${agent} Response`,
      content: transformedContent || result.content,
      contentType: contentType,
      agent: result.agent || agent,
      additionalData: {
        ...result.metadata,
        generationMethod: 'Python Agents API',
        timestamp: new Date().toISOString(),
        apiSuccess: true
      }
    }
    
    console.log('🎉 Returning result:', finalResult)
    return finalResult

  } catch (error) {
    console.error('❌ API FAILED:', error)
    console.log('🔄 Falling back to mock content...')
    
    // Return enhanced fallback
    return {
      title: `API Error - ${agent} Fallback`,
      content: `❌ The Python agents API failed with error: ${error}. This is fallback content for "${prompt}". Please check the API server.`,
      contentType,
      agent,
      additionalData: {
        hashtags: ['#TheShaktiTea', '#APIError'],
        callToAction: 'Please try again!',
        fallback: true,
        error: error.toString()
      }
    }
  }
}

// Fallback mock content for error cases
function generateMockContent(request: ContentRequest): GeneratedContent {
  const { contentType, agent, prompt } = request
  
  return {
    title: `${agent} Content`,
    content: `This is fallback content for ${contentType} about "${prompt}" from ${agent}. The real agent system encountered an error, but this ensures the app keeps working.`,
    contentType,
    agent,
    additionalData: {
      hashtags: ['#TheShaktiTea', '#SpillTheShakti'],
      callToAction: 'Share your thoughts below!',
      fallback: true
    }
  }
}
