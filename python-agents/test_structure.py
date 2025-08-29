"""
Test to verify Python agent structure (without CrewAI dependencies)
"""
import sys
import os

# Add current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_agent_structure():
    """Test agent files and structure"""
    print("🧪 TESTING PYTHON AGENT STRUCTURE")
    print("=" * 50)
    
    try:
        # Test that agent files exist and have basic structure
        agent_files = [
            'agents/gynika.py',
            'agents/maaya.py', 
            'agents/meher.py',
            'agents/nyaya.py',
            'agents/vaanya.py',
            'agents/base_agent.py'
        ]
        
        missing_files = []
        for agent_file in agent_files:
            if os.path.exists(agent_file):
                print(f"✅ {agent_file} exists")
            else:
                print(f"❌ {agent_file} missing")
                missing_files.append(agent_file)
        
        # Test other important files
        important_files = [
            'crew/shakti_crew.py',
            'api/main.py',
            'requirements.txt',
            '.env.example'
        ]
        
        for file_path in important_files:
            if os.path.exists(file_path):
                print(f"✅ {file_path} exists")
            else:
                print(f"❌ {file_path} missing")
                missing_files.append(file_path)
        
        print(f"\n📊 Structure test completed!")
        
        if missing_files:
            print(f"❌ Missing {len(missing_files)} files")
            return False
        else:
            print("✅ All required files present!")
            print("\nNext steps:")
            print("1. Install dependencies: pip install -r requirements.txt")
            print("2. Add GOOGLE_API_KEY to .env file") 
            print("3. Start API server: python api/main.py")
            return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    success = test_agent_structure()
    exit(0 if success else 1)
