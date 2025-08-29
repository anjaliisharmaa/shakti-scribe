import { getAgent } from './agentProfiles'

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
  const agentProfile = getAgent(agent)

  if (!agentProfile) {
    throw new Error(`Unknown agent: ${agent}`)
  }

  // For now, we'll create mock content based on the agent and content type
  // Later, this will integrate with actual AI/LLM services
  
  switch (contentType) {
    case 'video':
      return generateVideoScript(agentProfile, prompt)
    case 'text':
      return generateTextPost(agentProfile, prompt)
    case 'poll':
      return generatePoll(agentProfile, prompt)
    default:
      throw new Error(`Unsupported content type: ${contentType}`)
  }
}

function generateVideoScript(agent: any, prompt: string): GeneratedContent {
  // Mock video script generation
  const scripts = {
    gynika: {
      title: "Understanding Your Flow 🌸",
      content: `Hey beautiful souls! 💕 Today we're talking about ${prompt}. 

As your flow friend Gynika, I want you to know that your menstrual health matters. Here's what you need to understand:

✨ Your body is amazing and every cycle tells a story
🌸 There's no shame in asking questions about periods
💝 Knowledge is power when it comes to your reproductive health

Remember: You're not alone in this journey. Every woman deserves to understand her body and make informed choices.

What questions do you have about your menstrual health? Drop them below! 👇

#MenstrualHealth #WomensWellness #ShaktiAI #Gynika`
    },
    maaya: {
      title: "Motherhood Wisdom 💕",
      content: `Hello beautiful mamas and mamas-to-be! 🤱

Today's heart-to-heart is about ${prompt}.

As Maaya, your companion through motherhood, I want to share some love and wisdom:

💕 Every pregnancy journey is unique and beautiful
🤱 Your instincts as a mother are powerful - trust them
👶 Baby care comes with learning, and that's perfectly okay
💝 Taking care of yourself is taking care of your family

Remember: You're doing an incredible job, even when it doesn't feel like it.

Sending you all the love and virtual hugs! What part of your motherhood journey would you like to talk about?

#Motherhood #PregnancyJourney #BabyCare #ShaktiAI #Maaya`
    },
    meher: {
      title: "Gentle Healing 🤗",
      content: `Sweet soul, I see you. 💙

Today we're gently exploring ${prompt}.

I'm Meher, and I want you to know that healing isn't linear, and that's completely okay:

🤗 Your feelings are valid, whatever they are
💙 Taking small steps toward healing is still progress
🌟 You deserve peace, love, and respect
💝 Asking for help shows strength, not weakness

Remember: You are worthy of love, healing, and happiness. Your journey matters.

If you need support, please reach out to trusted friends, family, or professionals. You don't have to walk this path alone.

#MentalHealth #Healing #Support #ShaktiAI #Meher`
    },
    nyaya: {
      title: "Know Your Rights ⚖️",
      content: `Sisters, knowledge is power! 💪

Today we're discussing your legal rights regarding ${prompt}.

I'm Nyaya, your rights ally, and here's what you need to know:

⚖️ You have fundamental rights that cannot be taken away
💪 Understanding the law empowers you to protect yourself
🔊 Your voice and consent matter in every situation
📚 Legal literacy is crucial for every woman in India

Key rights to remember:
• Right to equality and non-discrimination
• Right to safety and security
• Right to make decisions about your own body
• Right to fair treatment at work

Stay informed, stay empowered. What legal questions can I help you with?

#WomensRights #LegalLiteracy #Empowerment #ShaktiAI #Nyaya`
    },
    vaanya: {
      title: "Age Rebel Wisdom 🔥",
      content: `Hey fierce souls! 🔥

Time to rebel against stereotypes about ${prompt}!

I'm Vaanya, and I'm here to remind you that age is just a number:

🔥 Your 40s, 50s, and beyond are YOUR decades to shine
💪 Menopause is a natural transition, not a disease
✨ Your wisdom and experience are your superpowers
🌟 You're allowed to reinvent yourself at any age

Society tries to make us invisible after a certain age. I say NO! 

You are:
• Powerful at every age
• Deserving of respect and pleasure
• Capable of new dreams and adventures
• Beautiful in your own unique way

What stereotype are you ready to smash today?

#AgingGracefully #Menopause #WomensEmpowerment #ShaktiAI #Vaanya`
    }
  }

  return {
    title: scripts[agent.name.toLowerCase() as keyof typeof scripts]?.title || `Wisdom from ${agent.name}`,
    content: scripts[agent.name.toLowerCase() as keyof typeof scripts]?.content || `Content about ${prompt} from ${agent.name}`,
    contentType: 'video',
    agent: agent.name,
    additionalData: {
      duration: "30-45 seconds",
      tone: agent.tone,
      hashtags: ["#ShaktiAI", `#${agent.name}`]
    }
  }
}

function generateTextPost(agent: any, prompt: string): GeneratedContent {
  // Mock text post generation
  const posts = {
    gynika: `🌸 Let's talk about ${prompt} 🌸

Hey beautiful! Your flow friend Gynika here with some real talk about periods and reproductive health.

Here's what every woman should know:
• Your menstrual cycle is a vital sign of health
• Pain during periods isn't always "normal" 
• You deserve access to safe contraception
• Period products should be affordable and accessible

Your body, your choice, your power! 💪

What questions about menstrual health have you been afraid to ask? This is a safe space! 💕

#MenstrualHealth #Periods #WomensHealth #ShaktiAI`,

    maaya: `💕 Mama wisdom about ${prompt} 💕

Sweet souls, every mother's journey is different, and that's the beauty of it.

Things I wish someone told me:
• Trust your maternal instincts - they're real
• It's okay to not know everything immediately
• Asking for help makes you a good mother, not a failure
• Your mental health matters as much as physical health

Whether you're expecting, have newborns, or toddlers running around - you're doing better than you think! 🤱

Share your motherhood moments below! What's been your biggest learning? 👇

#Motherhood #Pregnancy #MomLife #ShaktiAI`,

    meher: `🤗 Gentle reminder about ${prompt} 🤗

Beautiful soul, I want you to know that healing takes time, and that's perfectly okay.

If you're struggling with:
• Past trauma or difficult experiences
• Anxiety about the future
• Feeling overwhelmed by life
• Questioning your self-worth

Remember: You are not broken. You are healing. You are worthy of love and respect.

Small steps count. Seeking help shows strength. Your feelings are valid.

You don't have to carry everything alone. 💙

If you need professional support, please reach out. You matter.

#MentalHealth #Healing #SelfCare #ShaktiAI`,

    nyaya: `⚖️ Your rights regarding ${prompt} ⚖️

Sisters, legal knowledge is your shield and your sword.

Key rights every Indian woman should know:
• Right to equality (Article 14)
• Right against discrimination (Article 15)
• Right to work with dignity (POSH Act)
• Right to reproductive choices

Remember:
• Consent is mandatory, not optional
• Workplace harassment is illegal
• You have rights in marriage and divorce
• Your body, your decisions

Knowledge empowers. Silence enables injustice.

What legal questions can I help clarify? Let's build a more informed sisterhood! 💪

#WomensRights #LegalAwareness #Empowerment #ShaktiAI`,

    vaanya: `🔥 Time to rebel against ${prompt}! 🔥

Listen up, fierce souls! Society has some outdated ideas about women and aging. Time to smash them!

Myths I'm tired of hearing:
❌ "You're too old for that"
❌ "Menopause ruins everything"
❌ "Women peak in their 20s"
❌ "Act your age"

Truth bombs:
✅ Your 40s+ are your power decades
✅ Menopause is just another life phase
✅ Wisdom and experience are sexy
✅ You get to define what "your age" looks like

Age is not a limitation - it's an accumulation of badassery! 💪

What stereotype are you ready to demolish today? Let's rewrite the rules together!

#AgeRebel #Menopause #WomensEmpowerment #ShaktiAI`
  }

  return {
    title: `${agent.name}'s Take`,
    content: posts[agent.name.toLowerCase() as keyof typeof posts] || `Post about ${prompt} from ${agent.name}`,
    contentType: 'text',
    agent: agent.name,
    additionalData: {
      platform: "LinkedIn",
      tone: agent.tone,
      hashtags: ["#ShaktiAI", `#${agent.name}`]
    }
  }
}

function generatePoll(agent: any, prompt: string): GeneratedContent {
  // Mock poll generation
  const polls = {
    gynika: {
      question: `What's your biggest period concern related to ${prompt}?`,
      options: [
        "Irregular cycles",
        "Period pain management", 
        "Contraception choices",
        "Period product access"
      ]
    },
    maaya: {
      question: `What aspect of ${prompt} would you like more support with?`,
      options: [
        "Pregnancy symptoms",
        "Newborn care tips",
        "Postpartum recovery",
        "Work-life balance"
      ]
    },
    meher: {
      question: `When dealing with ${prompt}, what helps you most?`,
      options: [
        "Talking to trusted friends",
        "Professional counseling",
        "Self-care practices",
        "Support groups"
      ]
    },
    nyaya: {
      question: `Which legal right related to ${prompt} do you want to learn more about?`,
      options: [
        "Workplace rights",
        "Reproductive rights",
        "Marriage and family law",
        "Safety and protection laws"
      ]
    },
    vaanya: {
      question: `What stereotype about aging and ${prompt} needs to be busted?`,
      options: [
        "Career limitations",
        "Health and sexuality",
        "Fashion and beauty",
        "Learning new things"
      ]
    }
  }

  const pollData = polls[agent.name.toLowerCase() as keyof typeof polls] || {
    question: `What would you like to know about ${prompt}?`,
    options: ["Option 1", "Option 2", "Option 3", "Option 4"]
  }

  return {
    title: `${agent.name}'s Poll`,
    content: pollData.question,
    contentType: 'poll',
    agent: agent.name,
    additionalData: {
      options: pollData.options,
      tone: agent.tone,
      engagement: "interactive"
    }
  }
}
