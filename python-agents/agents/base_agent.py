"""
Base agent configurations and tools for Shakti Scribe agents  
"""
import os
import random
from typing import Dict, List, Any, Optional

class BaseShaktiAgent:
    """Base class for all Shakti agents"""
    
    def __init__(self, name: str, description: str, personality: str, expertise: List[str], tone: str):
        self.name = name
        self.description = description
        self.personality = personality
        self.expertise = expertise
        self.tone = tone
        
    def generate_content(self, content_type: str, prompt: str) -> Dict[str, Any]:
        """Generate content using agent personality"""
        print(f"🤖 {self.name} generating {content_type} about: {prompt}")
        
        # Generate personalized content based on agent specialty
        content = self._generate_personalized_content(content_type, prompt)
        title = self._generate_title(content_type, prompt)
        hashtags = self._generate_hashtags(content_type, prompt)
        cta = self._generate_cta(content_type)
        
        return {
            "title": title,
            "content": content,
            "agent": self.name.lower(),
            "contentType": content_type,
            "metadata": {
                "hashtags": hashtags,
                "callToAction": cta,
                "generatedBy": f"{self.name} (Shakti AI)",
                "agentPersonality": self.personality[:100] + "...",
                "expertise": self.expertise
            }
        }
    
    def _generate_personalized_content(self, content_type: str, prompt: str) -> str:
        """Generate content based on agent's personality and expertise"""
        # Content templates based on agent expertise
        if "menstrual" in ' '.join(self.expertise).lower() or "period" in ' '.join(self.expertise).lower():
            return self._generate_period_content(content_type, prompt)
        elif "wellness" in ' '.join(self.expertise).lower() or "health" in ' '.join(self.expertise).lower():
            return self._generate_wellness_content(content_type, prompt)
        elif "legal" in ' '.join(self.expertise).lower() or "rights" in ' '.join(self.expertise).lower():
            return self._generate_legal_content(content_type, prompt)
        elif "career" in ' '.join(self.expertise).lower() or "professional" in ' '.join(self.expertise).lower():
            return self._generate_career_content(content_type, prompt)
        else:
            return self._generate_lifestyle_content(content_type, prompt)
    
    def _generate_period_content(self, content_type: str, prompt: str) -> str:
        templates = [
            f"🌺 Let's normalize period talk! Here's what every Indian woman should know about {prompt}:\n\n"
            "✨ Your cycle is not shameful - it's powerful!\n"
            "💪 Track your symptoms to understand your body better\n" 
            "🩸 Choose products that work for YOUR lifestyle\n"
            "🏠 Create a comfortable space during your period\n"
            "💊 Don't ignore severe pain - seek help when needed\n\n"
            "Remember: Your period doesn't define your productivity. You're amazing every day of your cycle! 💕",
            
            f"🔥 Breaking period myths around {prompt}:\n\n"
            "❌ MYTH: You can't exercise during periods\n"
            "✅ TRUTH: Gentle exercise can actually help with cramps!\n\n"
            "❌ MYTH: Period pain is 'normal' and should be endured\n"
            "✅ TRUTH: Severe pain needs medical attention\n\n"
            "❌ MYTH: You're 'impure' during periods\n"
            "✅ TRUTH: Periods are a natural, healthy bodily function\n\n"
            "Your period, your rules! 🌟"
        ]
        return random.choice(templates)
    
    def _generate_wellness_content(self, content_type: str, prompt: str) -> str:
        templates = [
            f"🌿 Wellness wisdom about {prompt} for the modern Indian woman:\n\n"
            "🧘‍♀️ Start your day with 5 minutes of mindfulness\n"
            "🥗 Fuel your body with foods that energize you\n"
            "💤 Prioritize sleep - it's not a luxury, it's essential\n"
            "🚶‍♀️ Movement doesn't have to be a gym session - find joy in motion\n"
            "🤝 Set boundaries that protect your peace\n\n"
            "Self-care isn't selfish - it's strategic! 💪✨",
            
            f"💚 Real talk about {prompt} and your wellbeing:\n\n"
            "When you're juggling work, family, and everything else, remember:\n\n"
            "🌱 Small consistent actions > perfect plans\n"
            "💧 Hydration is the cheapest skincare routine\n" 
            "🌅 Morning sunlight boosts mood naturally\n"
            "📱 Digital detox for 30 mins daily works wonders\n\n"
            "You can't pour from an empty cup. Fill yours first! 🌟"
        ]
        return random.choice(templates)
    
    def _generate_legal_content(self, content_type: str, prompt: str) -> str:
        templates = [
            f"⚖️ Know your rights: {prompt} edition\n\n"
            "📚 Legal literacy is your superpower as an Indian woman!\n\n"
            "🏢 Workplace harassment? Document everything\n"
            "💰 Equal pay isn't a favor - it's your right\n"
            "🏠 Property rights don't disappear after marriage\n"
            "👥 Know your maternity leave entitlements\n"
            "📞 Keep emergency legal helpline numbers handy\n\n"
            "Knowledge of your rights is the first step to claiming them! 💪",
            
            f"🔍 Legal reality check about {prompt}:\n\n"
            "Many Indian women don't know these basic rights:\n\n"
            "✅ Right to equal wages (Equal Remuneration Act)\n"
            "✅ Right to work without harassment (POSH Act)\n"
            "✅ Right to property (Hindu Succession Act)\n"
            "✅ Right to maintenance (Section 125 CrPC)\n\n"
            "Don't just know your rights - exercise them! 🌟"
        ]
        return random.choice(templates)
    
    def _generate_career_content(self, content_type: str, prompt: str) -> str:
        templates = [
            f"🚀 Career power moves: {prompt} strategy\n\n"
            "💼 Your career is a marathon, not a sprint!\n\n"
            "📈 Document your wins - create a 'brag file'\n"
            "🤝 Network genuinely, not just when you need something\n"
            "💰 Negotiate your salary - you're worth it!\n"
            "📚 Invest in skills that compound over time\n"
            "👑 Lead with confidence, even when you don't feel it\n\n"
            "Your ambition is not too much. The world needs more women who own their power! ✨",
            
            f"💡 Real career talk about {prompt}:\n\n"
            "Let's be honest about the challenges we face:\n\n"
            "🎯 Impostor syndrome is real, but so is your competence\n"
            "⚖️ Work-life balance is a myth - aim for work-life integration\n"
            "🗣️ Speak up in meetings - your voice matters\n"
            "🚪 Sometimes you have to create your own opportunities\n\n"
            "Success isn't just climbing the ladder - it's building your own! 🌟"
        ]
        return random.choice(templates)
    
    def _generate_lifestyle_content(self, content_type: str, prompt: str) -> str:
        templates = [
            f"✨ Lifestyle insights on {prompt} for the modern Indian woman:\n\n"
            "🌟 Authenticity > Perfection, always!\n\n"
            "💫 Invest in experiences, not just things\n"
            "🤗 Surround yourself with people who celebrate your wins\n"
            "📚 Read books that expand your worldview\n"
            "🎨 Make time for what makes you feel alive\n"
            "🌱 Growth happens outside your comfort zone\n\n"
            "Your life is your canvas - paint it boldly! 🎨",
            
            f"🌈 Living your best life: {prompt} edition\n\n"
            "Life is too short for:\n❌ Toxic relationships\n❌ Clothes that don't fit\n❌ Dreams deferred\n\n"
            "Life is perfect for:\n✅ Spontaneous dance parties\n✅ Meaningful conversations\n✅ Taking calculated risks\n\n"
            "You have one life - make it count! 💖"
        ]
        return random.choice(templates)
    
    def _generate_title(self, content_type: str, prompt: str) -> str:
        """Generate an engaging title"""
        title_templates = [
            f"{self.name}'s take on {prompt}",
            f"Real talk: {prompt}",
            f"Let's discuss {prompt}",
            f"Your guide to {prompt}",
            f"Truth bombs about {prompt}"
        ]
        return random.choice(title_templates)
    
    def _generate_hashtags(self, content_type: str, prompt: str) -> List[str]:
        """Generate relevant hashtags"""
        base_tags = ["#TheShaktiTea", "#SpillTheShakti", f"#{self.name}Says"]
        
        topic_tags = []
        if "period" in prompt.lower() or "menstrual" in prompt.lower():
            topic_tags = ["#PeriodTalk", "#MenstrualHealth", "#BreakTheStigma"]
        elif "work" in prompt.lower() or "career" in prompt.lower():
            topic_tags = ["#WomenAtWork", "#CareerGoals", "#ProfessionalWomen"]
        elif "wellness" in prompt.lower() or "health" in prompt.lower():
            topic_tags = ["#WellnessWednesday", "#SelfCare", "#HealthyLiving"]
        elif "legal" in prompt.lower() or "rights" in prompt.lower():
            topic_tags = ["#KnowYourRights", "#LegalLiteracy", "#WomenRights"]
        else:
            topic_tags = ["#WomenEmpowerment", "#IndianWomen", "#Lifestyle"]
        
        return base_tags + topic_tags[:3]  # Limit total hashtags
    
    def _generate_cta(self, content_type: str) -> str:
        """Generate call-to-action"""
        ctas = [
            "What's your experience with this? Share below! 👇",
            "Which tip resonates with you most? Tell us! 💬",
            "Have you tried this? Let us know how it went! ✨",
            "What would you add to this list? Drop your thoughts! 🤔",
            "Share this with someone who needs to see it! 💕"
        ]
        return random.choice(ctas)
    
    def get_agent_info(self) -> Dict[str, Any]:
        """Return agent information"""
        return {
            "name": self.name,
            "description": self.description,
            "personality": self.personality,
            "expertise": self.expertise,
            "tone": self.tone,
            "available": True
        }
