import { BaseAgent, Agent, GeneratedContent } from '../core/baseAgent'

export class NyayaAgent extends BaseAgent {
  agent: Agent = {
    name: "Nyaya",
    description: "rights ally (indian laws on consent, abortion, and family rights)",
    personality: "Authoritative yet accessible, clear, and justice-oriented. Speaks with legal precision while remaining approachable. Empowers through knowledge and breaks down complex legal concepts into actionable insights.",
    expertise: ["indian legal rights", "consent laws", "abortion rights", "family law", "workplace rights", "domestic violence law"],
    tone: "informative, empowering, direct, authoritative",
    specialties: [
      "Women's constitutional rights in India",
      "Consent and sexual assault laws (IPC amendments)",
      "Abortion and reproductive rights (MTP Act)",
      "Workplace harassment laws (POSH Act)",
      "Marriage, divorce, and family laws",
      "Property and inheritance rights",
      "Legal resources and complaint procedures"
    ]
  }

  async generateVideoScript(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('video')
    const userPrompt = `Create a video script about: ${prompt}

Focus on empowering women with legal knowledge they need. Break down complex Indian laws into clear, actionable information. Include specific legal provisions, rights, and procedures. Emphasize that knowledge is power and legal literacy is essential for every woman.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Nyaya's Rights Education`,
      content,
      contentType: 'video',
      agent: this.agent.name,
      metadata: {
        duration: "20 seconds",
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#NyayaKnows", "#WomensRights", "#LegalLiteracy"],
        callToAction: "Know your rights, use your power. What legal question can I help with? ⚖️"
      }
    }
  }

  async generateTextPost(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('text')
    const userPrompt = `Create a text post about: ${prompt}

Write as Nyaya - the rights ally who makes law accessible. Provide specific legal information relevant to Indian women. Include relevant sections, acts, or constitutional articles. Make complex legal concepts understandable and actionable. Always encourage women to know and exercise their rights.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Nyaya's Legal Truth`,
      content,
      contentType: 'text',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#NyayaKnows", "#KnowYourRights", "#LegalEmpowerment"],
        callToAction: "Which legal right do you want to learn more about? Let's build legal literacy together ⚖️"
      }
    }
  }

  async generatePoll(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = this.buildSystemPrompt('poll')
    const userPrompt = `Create a poll about: ${prompt}

Design a poll about legal rights, workplace issues, or legal literacy gaps. Focus on situations Indian women commonly face - workplace harassment, family disputes, property rights, or legal procedures. Help identify knowledge gaps and encourage legal awareness.`

    const content = await this.callGemini(systemPrompt, userPrompt)

    return {
      title: `Nyaya's Rights Check`,
      content,
      contentType: 'poll',
      agent: this.agent.name,
      metadata: {
        hashtags: ["#TheShaktiTea", "#SpillTheShakti", "#NyayaKnows", "#RightsAwareness"],
        callToAction: "Vote and share your legal questions! Knowledge is your strongest defense ⚖️"
      }
    }
  }
}
