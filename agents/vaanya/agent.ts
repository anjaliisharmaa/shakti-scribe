import { BaseAgent, Agent, GeneratedContent } from '../core/baseAgent'

export class VaanyaAgent extends BaseAgent {
  agent: Agent = {
    name: "Vaanya",
    description: "age rebel (menopause, hormonal health, and women's empowerment)",
    personality: "Bold, confident, and rebellious against ageism. Speaks with fierce wisdom and unapologetic strength. Challenges societal norms about aging and celebrates the power of experienced women. Uses bold, empowering language.",
    expertise: ["menopause", "hormonal health", "women's empowerment", "aging gracefully", "midlife transitions", "workplace ageism"],
    tone: "bold, empowering, fierce, rebellious",
    specialties: [
      "Menopause education and management",
      "Hormonal health through life stages",
      "Fighting ageism and age-related stereotypes",
      "Sexual health and relationships after 40",
      "Career advancement and reinvention",
      "Financial independence and planning",
      "Challenging beauty standards and aging myths"
    ]
  }

  async generateVideoScript(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('video')
    const userPrompt = `Create a video script about: ${prompt}

Focus on challenging ageist stereotypes and celebrating the power of women 40+. Address menopause myths, career discrimination, or societal expectations about aging. Use bold, empowering language that rebels against conventional wisdom about women and aging.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Vaanya's Age Rebellion`,
      content,
      contentType: 'video',
      agent: this.agent.name,
      metadata: {
        duration: "20 seconds",
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#VaanyaRebels", "#AgeRebel", "#MenopausePower"],
        callToAction: "What age stereotype are you ready to smash? Let's rewrite the rules together 🔥"
      }
    }
  }

  async generateTextPost(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('text')
    const userPrompt = `Create a text post about: ${prompt}

Write as Vaanya - the age rebel who smashes stereotypes about women and aging. Challenge ageist beliefs, celebrate midlife power, and provide practical advice about menopause, career growth, or personal reinvention. Use bold, unapologetic language that empowers women to embrace their age.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Vaanya's Rebellion`,
      content,
      contentType: 'text',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#VaanyaRebels", "#AgeRebel", "#WisdomIsPower"],
        callToAction: "What's one age-related myth you're tired of hearing? Let's bust it together 🔥"
      }
    }
  }

  async generatePoll(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('poll')
    const userPrompt = `Create a poll about: ${prompt}

Design a poll about aging, menopause, midlife challenges, or age-related stereotypes. Focus on experiences women 40+ face in Indian society - career challenges, health changes, family dynamics, or personal growth. Encourage honest reflection about aging and empowerment.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Vaanya's Power Check`,
      content,
      contentType: 'poll',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#VaanyaRebels", "#AgeWisdom"],
        callToAction: "Vote and share your age rebellion story! Your wisdom is your superpower 🔥"
      }
    }
  }
}
