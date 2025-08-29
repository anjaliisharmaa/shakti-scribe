import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🧪 TESTING AGENT SYSTEM')
    
    // Test 1: Basic structure test
    console.log('\n📋 Test 1: Agent Structure')
    try {
      const { agentFactory } = await import('../../../../agents/core/agentFactory')
      const agents = agentFactory.listAgents()
      console.log(`✅ Found ${agents.length} agents: ${agents.join(', ')}`)
      
      // Test agent info
      const gynikaInfo = agentFactory.getAgentInfo('gynika')
      console.log(`✅ Gynika info: ${gynikaInfo.name} - ${gynikaInfo.description}`)
      
    } catch (error) {
      console.error('❌ Structure test failed:', error)
      return NextResponse.json({ error: 'Agent structure test failed', details: error.message })
    }

    // Test 2: Content generation
    console.log('\n📝 Test 2: Content Generation')
    try {
      const { agentFactory } = await import('../../../../agents/core/agentFactory')
      
      const result = await agentFactory.generateContent({
        contentType: 'text',
        agent: 'gynika',
        prompt: 'period pain relief during work'
      })

      console.log(`✅ Generated content: ${result.title}`)
      console.log(`📊 Length: ${result.content.length} characters`)
      
      return NextResponse.json({ 
        success: true, 
        test: 'Content generation successful',
        result: {
          title: result.title,
          agent: result.agent,
          contentType: result.contentType,
          contentLength: result.content.length,
          preview: result.content.substring(0, 200) + '...',
          metadata: result.metadata
        }
      })

    } catch (error) {
      console.error('❌ Generation test failed:', error)
      return NextResponse.json({ 
        error: 'Content generation test failed', 
        details: error.message,
        stack: error.stack 
      })
    }

  } catch (error) {
    console.error('❌ Overall test failed:', error)
    return NextResponse.json({ 
      error: 'Agent test failed', 
      details: error.message 
    })
  }
}
