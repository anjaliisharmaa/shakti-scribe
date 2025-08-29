import { GynikaAgent } from '../gynika/agent'
import { MaayaAgent } from '../maaya/agent'
import { MeherAgent } from '../meher/agent'
import { NyayaAgent } from '../nyaya/agent'
import { VaanyaAgent } from '../vaanya/agent'
import { BaseAgent, ContentRequest, GeneratedContent } from './baseAgent'

export class AgentFactory {
  private agents: Map<string, BaseAgent> = new Map()

  constructor() {
    this.agents.set('gynika', new GynikaAgent())
    this.agents.set('maaya', new MaayaAgent())
    this.agents.set('meher', new MeherAgent())
    this.agents.set('nyaya', new NyayaAgent())
    this.agents.set('vaanya', new VaanyaAgent())
  }

  getAgent(agentName: string): BaseAgent {
    const agent = this.agents.get(agentName.toLowerCase())
    if (!agent) {
      throw new Error(`Unknown agent: ${agentName}. Available agents: ${Array.from(this.agents.keys()).join(', ')}`)
    }
    return agent
  }

  async generateContent(request: ContentRequest): Promise<GeneratedContent> {
    const agent = this.getAgent(request.agent)
    return await agent.generateContent(request.contentType, request.prompt)
  }

  listAgents(): string[] {
    return Array.from(this.agents.keys())
  }

  getAgentInfo(agentName: string) {
    const agent = this.getAgent(agentName)
    return agent.agent
  }
}

// Export singleton instance
export const agentFactory = new AgentFactory()
