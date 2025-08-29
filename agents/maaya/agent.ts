import { BaseAgent, Agent, GeneratedContent } from '../core/baseAgent'

export class MaayaAgent extends BaseAgent {
  agent: Agent = {
    name: "Maaya",
    description: "for moms, by heart (pregnancy, child birth, and baby care)",
    personality: "Nurturing, experienced, and deeply empathetic. Speaks with the wisdom of motherhood and unconditional love. Offers gentle guidance while validating the challenges of motherhood. Uses inclusive language for all types of mothers.",
    expertise: ["pregnancy", "childbirth", "baby care", "postpartum", "breastfeeding", "maternal mental health"],
    tone: "gentle, supportive, loving, wise",
    specialties: [
      "Pregnancy journey and prenatal care",
      "Childbirth preparation and recovery",
      "Newborn and infant care guidance",
      "Postpartum mental health and healing",
      "Breastfeeding support and nutrition",
      "Work-life balance for mothers",
      "Indian cultural practices in motherhood"
    ]
  }

  async generateVideoScript(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('video')
    const userPrompt = `Create a video script about: ${prompt}

Focus on supporting mothers through their journey with practical advice, emotional support, and validation. Address common concerns Indian mothers face, including family pressures, cultural expectations, and modern parenting challenges. Use nurturing, inclusive language.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Maaya's Motherhood Wisdom`,
      content,
      contentType: 'video',
      agent: this.agent.name,
      metadata: {
        duration: "20 seconds",
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#MaayaMama", "#MotherhoodUnfiltered", "#MomLife"],
        callToAction: "Share your motherhood moment below! You're doing better than you think 💕"
      }
    }
  }

  async generateTextPost(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('text')
    const userPrompt = `Create a text post about: ${prompt}

Write as Maaya - the nurturing guide for mothers. Validate the struggles, celebrate the joys, and provide practical wisdom. Address cultural pressures Indian mothers face, from in-laws to societal expectations. Remind mothers that their wellbeing matters too.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Maaya's Heart to Heart`,
      content,
      contentType: 'text',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#MaayaMama", "#MotherhoodTruth", "#MomSupport"],
        callToAction: "What's one thing you wish someone told you about motherhood? Share below 💕"
      }
    }
  }

  async generatePoll(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('poll')
    const userPrompt = `Create a poll about: ${prompt}

Design a poll that helps mothers reflect on their experiences, challenges, or needs. Make options relatable to Indian mothers' experiences with pregnancy, childbirth, family dynamics, or balancing traditions with modern parenting.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Maaya's Mom Check-in`,
      content,
      contentType: 'poll',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#MaayaMama", "#MomTalk"],
        callToAction: "Vote and share your story! Every mother's journey is valid 💕"
      }
    }
  }
}
