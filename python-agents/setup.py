"""
🚀 Shakti Scribe Setup Script
Complete setup for Python + CrewAI agents
"""

import subprocess
import sys
import os
import shutil
from pathlib import Path

def print_header(title):
    """Print a formatted header"""
    print("\n" + "=" * 60)
    print(f"🚀 {title}")
    print("=" * 60)

def print_step(step, description):
    """Print a formatted step"""
    print(f"\n� Step {step}: {description}")
    print("-" * 40)

def run_command(command, description, check=True):
    """Run a command with error handling"""
    print(f"🔧 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=check, capture_output=True, text=True)
        if result.stdout:
            print(f"✅ {result.stdout.strip()}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
        if e.stderr:
            print(f"Details: {e.stderr.strip()}")
        return False

def check_python():
    """Check Python installation"""
    try:
        result = subprocess.run([sys.executable, "--version"], capture_output=True, text=True)
        version = result.stdout.strip()
        print(f"✅ {version} found")
        
        # Check if version is 3.8+
        version_parts = version.split()[1].split('.')
        major, minor = int(version_parts[0]), int(version_parts[1])
        
        if major >= 3 and minor >= 8:
            return True
        else:
            print(f"❌ Python 3.8+ required, found {version}")
            return False
    except Exception as e:
        print(f"❌ Python not found: {e}")
        return False

def install_dependencies():
    """Install Python dependencies"""
    # Install requirements directly
    if not run_command(f"{sys.executable} -m pip install --upgrade pip", "Upgrading pip"):
        return False
    
    # Install requirements
    if not run_command(f"{sys.executable} -m pip install -r requirements.txt", "Installing dependencies"):
        return False
    
    return True

def setup_env_file():
    """Set up environment file"""
    if os.path.exists(".env"):
        print("📁 .env file already exists")
        
        # Check if it has the API key
        with open(".env", "r") as f:
            content = f.read()
            if "GOOGLE_API_KEY=" in content and not "your_actual_key_here" in content:
                print("✅ API key appears to be configured")
                return True
            else:
                print("⚠️ Please add your GOOGLE_API_KEY to .env file")
                return False
    
    if os.path.exists(".env.example"):
        shutil.copy(".env.example", ".env")
        print("✅ .env file created from template")
        print("⚠️ Please edit .env and add your GOOGLE_API_KEY")
        return False
    else:
        print("❌ .env.example not found")
        return False

def test_installation():
    """Test the installation"""
    print("🧪 Testing installation...")
    
    # Test structure
    if not run_command("python tests/test_structure.py", "Testing file structure"):
        return False
    
    # Test imports
    test_script = """
try:
    import fastapi
    import uvicorn
    import google.generativeai
    import pydantic
    from dotenv import load_dotenv
    print("✅ All core dependencies imported successfully")
except ImportError as e:
    print(f"❌ Import error: {e}")
    exit(1)
"""
    
    with open("temp_test.py", "w") as f:
        f.write(test_script)
    
    try:
        success = run_command(f"{sys.executable} temp_test.py", "Testing imports")
        os.remove("temp_test.py")
        return success
    except Exception as e:
        print(f"❌ Test failed: {e}")
        if os.path.exists("temp_test.py"):
            os.remove("temp_test.py")
        return False

def main():
    """Main setup function"""
    print_header("SHAKTI SCRIBE SETUP")
    print("Setting up Python + CrewAI agents for content generation")
    
    # Change to script directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    success = True
    
    # Step 1: Check Python
    print_step(1, "Checking Python Installation")
    if not check_python():
        print("❌ Please install Python 3.8+ and try again")
        return False
    
    # Step 2: Install dependencies
    print_step(2, "Installing Dependencies")
    if not install_dependencies():
        success = False
    
    # Step 3: Setup environment file
    print_step(3, "Setting Up Environment")
    env_configured = setup_env_file()
    
    # Step 4: Test installation
    print_step(4, "Testing Installation")
    if success and not test_installation():
        success = False
    
    # Final status
    print_header("SETUP COMPLETE")
    
    if success and env_configured:
        print("🎉 Setup completed successfully!")
        print("\n✅ What's working:")
        print("   - All dependencies installed")
        print("   - Environment configured")
        print("   - File structure verified")
        
        print("\n🚀 Next steps:")
        print("   1. Start the API server:")
        print("      python api/main.py")
        print("   2. Test in browser:")
        print("      http://localhost:8000/docs")
        print("   3. Start Next.js frontend:")
        print("      cd ../shakti-scribe-nextjs && npm run dev")
        
    elif success and not env_configured:
        print("⚠️ Setup mostly complete, but needs configuration:")
        print("\n✅ What's working:")
        print("   - All dependencies installed")
        print("   - File structure verified")
        
        print("\n📝 Action needed:")
        print("   1. Edit .env file and add your GOOGLE_API_KEY")
        print("   2. Then start the API server:")
        print("      python api/main.py")
        
    else:
        print("❌ Setup encountered errors")
        print("\n🔧 Troubleshooting:")
        print("   1. Ensure Python 3.8+ is installed")
        print("   2. Check internet connection for package downloads")
        print("   3. Try running setup again")
    
    return success and env_configured

if __name__ == "__main__":
    main()
