"""
Simple test to verify Python agents are working with Gemini
"""
import os
import sys
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

def test_gemini_connection():
    """Test basic Gemini API connection"""
    print("🔧 Testing Gemini API connection...")
    
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("❌ GOOGLE_API_KEY not found in .env file")
        return False
    
    if "your_actual_key_here" in api_key:
        print("❌ Please update GOOGLE_API_KEY in .env file")
        return False
    
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        response = model.generate_content("Say hello in a friendly way")
        
        print(f"✅ Gemini API working!")
        print(f"📝 Response: {response.text[:100]}...")
        return True
        
    except Exception as e:
        print(f"❌ Gemini API error: {e}")
        return False

def test_agent_personalities():
    """Test each agent personality"""
    print("\n🤖 Testing agent personalities...")
    
    api_key = os.getenv("GOOGLE_API_KEY")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    agents = {
        "Gynika": {
            "description": "Menstrual health expert",
            "personality": "Empathetic, educational, stigma-breaking",
            "prompt": "Give me 3 quick tips for period pain relief at work"
        },
        "Maaya": {
            "description": "Motherhood guide", 
            "personality": "Nurturing, practical, understanding",
            "prompt": "How to manage toddler tantrums in public places"
        },
        "Meher": {
            "description": "Mental health advocate",
            "personality": "Compassionate, validating, empowering", 
            "prompt": "How to deal with workplace anxiety"
        },
        "Nyaya": {
            "description": "Legal rights expert",
            "personality": "Authoritative, empowering, informative",
            "prompt": "What are my rights if I face workplace harassment"
        },
        "Vaanya": {
            "description": "Menopause empowerment expert",
            "personality": "Wise, empowering, frank",
            "prompt": "How to handle menopause symptoms while working"
        }
    }
    
    for agent_name, config in agents.items():
        print(f"\n🌟 Testing {agent_name} ({config['description']})...")
        
        system_prompt = f"""
        You are {agent_name}, a {config['description']} for Indian women.
        Your personality: {config['personality']}
        Target audience: Indian women aged 18-45
        
        Create engaging, culturally relevant content that resonates with Indian women's experiences.
        Be warm, relatable, and empowering. Use a conversational tone.
        
        Question: {config['prompt']}
        
        Provide a helpful response with practical tips and end with relevant hashtags.
        """
        
        try:
            response = model.generate_content(system_prompt)
            content = response.text
            
            print(f"✅ {agent_name} response generated!")
            print(f"📝 Content preview: {content[:150]}...")
            
            # Check if response has good characteristics
            if len(content) > 100:
                print(f"✅ Good length: {len(content)} characters")
            
            if any(tag in content.lower() for tag in ['#', 'hashtag']):
                print("✅ Contains hashtags")
            
            if any(word in content.lower() for word in ['tip', 'help', 'try', 'can']):
                print("✅ Contains practical advice")
                
        except Exception as e:
            print(f"❌ Error testing {agent_name}: {e}")

def main():
    print("🚀 SHAKTI SCRIBE AGENT RESPONSE TEST")
    print("=" * 50)
    
    # Test 1: Basic API connection
    if not test_gemini_connection():
        print("\n❌ Cannot proceed without working Gemini API")
        return
    
    # Test 2: Agent personalities
    test_agent_personalities()
    
    print("\n🎉 AGENT TESTING COMPLETE!")
    print("\n✅ If all tests passed, your agents are ready!")
    print("📝 Next steps:")
    print("   1. Start API server: python api/main.py")
    print("   2. Test via web interface")

if __name__ == "__main__":
    main()
