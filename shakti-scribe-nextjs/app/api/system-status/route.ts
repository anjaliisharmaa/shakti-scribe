import { NextResponse } from 'next/server'

export async function GET() {
  const status = {
    nextjs: true,
    timestamp: new Date().toISOString(),
    agents: {
      typescript: false,
      python: false
    },
    services: {
      gemini: false,
      pythonAPI: false
    }
  }

  // Test TypeScript agents
  try {
    const { agentFactory } = await import('../../../../agents/core/agentFactory')
    const testResult = await agentFactory.generateContent({
      agent: 'gynika',
      contentType: 'text',
      prompt: 'test'
    })
    status.agents.typescript = !!testResult
    status.services.gemini = true
  } catch (error) {
    console.warn('TypeScript agents not available:', error)
  }

  // Test Python API
  try {
    const response = await fetch('http://localhost:8000/health', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (response.ok) {
      const healthData = await response.json()
      status.agents.python = healthData.status === 'healthy'
      status.services.pythonAPI = true
    }
  } catch (error) {
    console.warn('Python API not available:', error)
  }

  return NextResponse.json(status)
}
