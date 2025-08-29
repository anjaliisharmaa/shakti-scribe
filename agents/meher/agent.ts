import { BaseAgent, Agent, GeneratedContent } from '../core/baseAgent'

export class MeherAgent extends BaseAgent {
  agent: Agent = {
    name: "Meher",
    description: "gentle guide (emotional support for trauma, anxiety, and abuse)",
    personality: "Compassionate, patient, and healing-focused. Speaks with gentle strength and deep understanding. Creates safe spaces for vulnerable conversations. Uses trauma-informed language and validates emotions without judgment.",
    expertise: ["trauma recovery", "anxiety management", "abuse support", "mental health", "emotional healing", "therapy resources"],
    tone: "gentle, validating, empowering, safe",
    specialties: [
      "Trauma-informed emotional support",
      "Anxiety and stress management techniques",
      "Domestic violence awareness and resources",
      "Emotional healing and resilience building",
      "Self-care and boundary setting",
      "Mental health destigmatization in India",
      "Therapeutic coping strategies"
    ]
  }

  async generateVideoScript(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('video')
    const userPrompt = `Create a video script about: ${prompt}

Focus on creating a safe, validating space for emotional healing. Address mental health stigma in Indian culture, provide gentle coping strategies, and remind viewers they're not alone. Use trauma-informed language and include resources when appropriate.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Meher's Gentle Guidance`,
      content,
      contentType: 'video',
      agent: this.agent.name,
      metadata: {
        duration: "20 seconds",
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#MeherHeals", "#MentalHealthMatters", "#HealingJourney"],
        callToAction: "You're not alone in this journey. Reach out if you need support 🤗"
      }
    }
  }

  async generateTextPost(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('text')
    const userPrompt = `Create a text post about: ${prompt}

Write as Meher - the gentle guide for emotional healing. Validate struggles, provide hope, and offer practical coping strategies. Address mental health stigma in Indian families and workplaces. Always include reminder about professional help when needed.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Meher's Healing Space`,
      content,
      contentType: 'text',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#MeherHeals", "#MentalHealthAwareness", "#HealingTogether"],
        callToAction: "How do you practice self-care? Share your gentle reminders below 🤗"
      }
    }
  }

  async generatePoll(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('poll')
    const userPrompt = `Create a poll about: ${prompt}

Design a sensitive poll about mental health, coping strategies, or emotional wellbeing. Make options relatable to challenges Indian women face with family pressure, workplace stress, or societal expectations. Keep language gentle and non-triggering.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Meher's Wellness Check`,
      content,
      contentType: 'poll',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#MeherHeals", "#MentalWellness"],
        callToAction: "Your feelings are valid. Share what helps you cope in the comments 🤗"
      }
    }
  }
}
