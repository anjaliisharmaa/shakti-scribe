"""
Quick single agent test
"""
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment
load_dotenv()

# Configure Gemini
api_key = os.getenv("GOOGLE_API_KEY")
print(f"🔑 API Key loaded: {'Yes' if api_key and len(api_key) > 10 else 'No'}")

if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Test Gynika agent
    prompt = """
    You are Gynika, a menstrual health expert for Indian women.
    Your personality: Empathetic, educational, stigma-breaking
    
    Question: What are 3 quick tips for managing period pain at work?
    
    Provide practical advice in a warm, relatable tone for Indian working women.
    End with relevant hashtags.
    """
    
    print("🤖 Testing Gynika agent...")
    try:
        response = model.generate_content(prompt)
        print("✅ Response generated!")
        print("📝 Content:")
        print("-" * 40)
        print(response.text)
        print("-" * 40)
        print(f"📊 Length: {len(response.text)} characters")
    except Exception as e:
        print(f"❌ Error: {e}")
else:
    print("❌ No API key found")
