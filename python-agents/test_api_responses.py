"""
Test API responses to see agent quality
"""
import requests
import json

def test_api_responses():
    base_url = "http://localhost:8000"
    
    # Test cases
    test_cases = [
        {
            "contentType": "social_media_post",
            "prompt": "Tips for work-life balance for Indian working mothers",
            "agent": "gynika"
        },
        {
            "contentType": "blog_post", 
            "prompt": "How to negotiate salary as a woman in India",
            "agent": "vaanya"
        },
        {
            "contentType": "wellness_tips",
            "prompt": "Stress management for busy women",
            "agent": "meher"
        }
    ]
    
    print("🧪 TESTING API RESPONSES")
    print("=" * 50)
    
    # Test health check first
    try:
        response = requests.get(f"{base_url}/health")
        print(f"✅ Health Check: {response.json()}")
        print()
    except Exception as e:
        print(f"❌ Health Check Failed: {e}")
        return
    
    # Test each case
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n📝 TEST {i}: {test_case['contentType']} by {test_case['agent']}")
        print(f"Prompt: {test_case['prompt']}")
        print("-" * 40)
        
        try:
            response = requests.post(
                f"{base_url}/generate",
                json=test_case,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ SUCCESS")
                print(f"Title: {data.get('title', 'No title')}")
                print(f"Agent: {data.get('agent', 'Unknown')}")
                print(f"Content Preview: {data.get('content', '')[:100]}...")
                print(f"Hashtags: {data.get('metadata', {}).get('hashtags', [])}")
            else:
                print(f"❌ ERROR: {response.status_code}")
                print(f"Response: {response.text}")
                
        except Exception as e:
            print(f"❌ REQUEST FAILED: {e}")
    
    print("\n" + "=" * 50)
    print("🎯 Testing complete! Check responses above.")

if __name__ == "__main__":
    test_api_responses()
