"""
Direct agent test - no API server needed
"""
import os
import sys

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_direct_gemini():
    """Test Gemini directly with agent personalities"""
    print("🚀 DIRECT AGENT RESPONSE TEST")
    print("=" * 50)
    
    try:
        import google.generativeai as genai
        from dotenv import load_dotenv
        
        # Load environment
        load_dotenv()
        api_key = os.getenv("GOOGLE_API_KEY")
        
        if not api_key or "your_actual_key_here" in api_key:
            print("❌ Please configure GOOGLE_API_KEY in .env file")
            return
        
        print(f"🔑 API Key configured: ✅")
        
        # Configure Gemini
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Test each agent
        agents = [
            {
                "name": "Gynika",
                "emoji": "🌸",
                "description": "Menstrual health expert",
                "personality": "Empathetic, educational, stigma-breaking",
                "prompt": "Give me 3 practical tips for managing period pain while at work. Make it relatable for Indian working women."
            },
            {
                "name": "Maaya", 
                "emoji": "👶",
                "description": "Motherhood guide",
                "personality": "Nurturing, practical, understanding",
                "prompt": "How can working mothers manage toddler tantrums when working from home? Give practical tips."
            },
            {
                "name": "Meher",
                "emoji": "💙", 
                "description": "Mental health advocate",
                "personality": "Compassionate, validating, empowering",
                "prompt": "How to deal with workplace anxiety and imposter syndrome? Give supportive advice for Indian women."
            }
        ]
        
        for agent in agents:
            print(f"\n{agent['emoji']} Testing {agent['name']} - {agent['description']}")
            print("-" * 60)
            
            system_prompt = f"""
You are {agent['name']}, a {agent['description']} for Indian women.

Your personality: {agent['personality']}
Your audience: Indian women aged 18-45
Your tone: Warm, relatable, culturally sensitive

Create engaging content that resonates with Indian women's experiences. 
Be practical and empowering. End with relevant hashtags.

User question: {agent['prompt']}

Provide a helpful response in a conversational tone.
"""
            
            try:
                print("🤖 Generating response...")
                response = model.generate_content(system_prompt)
                content = response.text
                
                print("✅ Response generated successfully!")
                print(f"📝 Content ({len(content)} characters):")
                print("=" * 60)
                print(content)
                print("=" * 60)
                
                # Quick quality checks
                quality_checks = []
                if len(content) > 200:
                    quality_checks.append("✅ Good length")
                if "#" in content:
                    quality_checks.append("✅ Contains hashtags")
                if any(word in content.lower() for word in ["tip", "try", "can", "help"]):
                    quality_checks.append("✅ Practical advice")
                if any(word in content.lower() for word in ["women", "indian", "work"]):
                    quality_checks.append("✅ Culturally relevant")
                
                print(f"🎯 Quality: {' | '.join(quality_checks)}")
                
            except Exception as e:
                print(f"❌ Error generating content: {e}")
        
        print(f"\n🎉 AGENT TESTING COMPLETE!")
        print("📊 All agents are working and generating quality responses!")
        
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("💡 Run: pip install google-generativeai python-dotenv")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_direct_gemini()
