import { ContentRequest, GeneratedContent } from './contentGenerator'

const PYTHON_API_URL = 'http://localhost:8000'

export interface PythonAgentRequest {
  agent: string
  contentType: string
  prompt: string
}

export interface PythonAgentResponse {
  title: string
  content: string
  agent: string
  contentType: string
  metadata: {
    hashtags: string[]
    callToAction: string
    generatedBy: string
    agentPersonality: string
  }
}

export class PythonAgentClient {
  
  async generateContent(request: ContentRequest): Promise<GeneratedContent> {
    try {
      console.log('🐍 Calling Python CrewAI agents...')
      
      const response = await fetch(`${PYTHON_API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent: request.agent,
          contentType: request.contentType,
          prompt: request.prompt
        } as PythonAgentRequest)
      })

      if (!response.ok) {
        throw new Error(`Python API error: ${response.status} ${response.statusText}`)
      }

      const pythonResult: PythonAgentResponse = await response.json()

      // Transform Python response to match frontend interface
      return {
        title: pythonResult.title,
        content: pythonResult.content,
        contentType: pythonResult.contentType as 'video' | 'text' | 'poll',
        agent: pythonResult.agent,
        additionalData: {
          hashtags: pythonResult.metadata.hashtags,
          callToAction: pythonResult.metadata.callToAction,
          generatedBy: pythonResult.metadata.generatedBy,
          agentPersonality: pythonResult.metadata.agentPersonality,
          pythonCrewAI: true
        }
      }

    } catch (error) {
      console.error('❌ Python agent error:', error)
      throw error
    }
  }

  async getAgents() {
    try {
      const response = await fetch(`${PYTHON_API_URL}/agents`)
      if (!response.ok) {
        throw new Error(`Failed to fetch agents: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching agents:', error)
      throw error
    }
  }

  async healthCheck() {
    try {
      const response = await fetch(`${PYTHON_API_URL}/health`)
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Python API health check failed:', error)
      return { status: 'unhealthy', error: error instanceof Error ? error.message : String(error) }
    }
  }

  async collaborativeContent(primaryAgent: string, supportingAgents: string[], contentType: string, prompt: string) {
    try {
      const response = await fetch(`${PYTHON_API_URL}/collaborate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primaryAgent,
          supportingAgents,
          contentType,
          prompt
        })
      })

      if (!response.ok) {
        throw new Error(`Collaboration API error: ${response.status}`)
      }

      const pythonResult: PythonAgentResponse = await response.json()

      return {
        title: pythonResult.title,
        content: pythonResult.content,
        contentType: pythonResult.contentType as 'video' | 'text' | 'poll',
        agent: pythonResult.agent,
        additionalData: {
          hashtags: pythonResult.metadata.hashtags,
          callToAction: pythonResult.metadata.callToAction,
          collaborative: true,
          supportingAgents,
          pythonCrewAI: true
        }
      }
    } catch (error) {
      console.error('Collaborative content error:', error)
      throw error
    }
  }
}

export const pythonAgentClient = new PythonAgentClient()
