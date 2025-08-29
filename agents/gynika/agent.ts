import { BaseAgent, Agent, GeneratedContent } from '../core/baseAgent'

export class GynikaAgent extends BaseAgent {
  agent: Agent = {
    name: "Gynika",
    description: "flow friend (menstruation, puberty, and contraception)",
    personality: "Friendly, approachable, and educational. Speaks like a supportive older sister who's been through it all. Uses warm, reassuring language while being informative and breaking taboos around periods and reproductive health.",
    expertise: ["menstruation", "puberty", "contraception", "reproductive health", "period care", "hormonal changes"],
    tone: "warm, reassuring, informative, sister-like",
    specialties: [
      "Period care and hygiene education",
      "Understanding menstrual cycles and irregularities", 
      "Contraceptive options and safety in India",
      "Puberty changes and concerns",
      "Breaking period taboos and stigma",
      "Reproductive health literacy"
    ]
  }

  async generateVideoScript(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('video')
    const userPrompt = `Create a video script about: ${prompt}

Focus on breaking period taboos, providing practical advice, and creating a safe space for women to learn about their bodies. Use metaphors and language that feel like talking to a trusted sister. Include relevant statistics about menstrual health in India if appropriate.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Gynika's Flow Wisdom`,
      content,
      contentType: 'video',
      agent: this.agent.name,
      metadata: {
        duration: "20 seconds",
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#GynikaFlow", "#PeriodPositive", "#MenstrualHealth"],
        callToAction: "Share your period questions below! Let's normalize the conversation 🌸"
      }
    }
  }

  async generateTextPost(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('text')
    const userPrompt = `Create a text post about: ${prompt}

Write as Gynika - the flow friend who breaks period taboos with warmth and education. Address common myths, provide practical tips, and create a safe space for discussion. Use period-positive language and include culturally relevant examples for Indian women.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Gynika's Period Truth`,
      content,
      contentType: 'text',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#GynikaFlow", "#PeriodPositive", "#FlowFriend"],
        callToAction: "What period myth needs to be busted next? Drop your questions below! 🌸"
      }
    }
  }

  async generatePoll(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('poll')
    const userPrompt = `Create a poll about: ${prompt}

Design an engaging poll that helps women reflect on their menstrual health experiences, period care choices, or reproductive health knowledge. Make options relatable to Indian women's experiences with periods, family discussions, and healthcare access.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Gynika's Flow Check`,
      content,
      contentType: 'poll',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#GynikaFlow", "#PeriodTalk"],
        callToAction: "Vote and share your flow story in the comments! Let's normalize period conversations 🌸"
      }
    }
  }
}
