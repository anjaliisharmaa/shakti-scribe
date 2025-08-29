"""
Simplified Python API without CrewAI for immediate testing
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Shakti Scribe Agent API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
try:
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    model = genai.GenerativeModel('gemini-1.5-flash')
    GEMINI_AVAILABLE = True
except:
    GEMINI_AVAILABLE = False

class ContentRequest(BaseModel):
    agent: str
    contentType: str
    prompt: str

# Agent configurations
AGENTS = {
    "gynika": {
        "name": "Gynika",
        "description": "Menstrual health expert",
        "personality": "Empathetic, educational, stigma-breaking",
        "expertise": ["periods", "PCOS", "reproductive health"]
    },
    "maaya": {
        "name": "Maaya", 
        "description": "Motherhood guide",
        "personality": "Nurturing, practical, understanding",
        "expertise": ["pregnancy", "parenting", "work-life balance"]
    },
    "meher": {
        "name": "Meher",
        "description": "Mental health advocate", 
        "personality": "Compassionate, validating, empowering",
        "expertise": ["anxiety", "depression", "self-care"]
    },
    "nyaya": {
        "name": "Nyaya",
        "description": "Legal rights expert",
        "personality": "Authoritative, empowering, informative", 
        "expertise": ["workplace rights", "legal guidance"]
    },
    "vaanya": {
        "name": "Vaanya",
        "description": "Menopause & empowerment expert",
        "personality": "Wise, empowering, frank",
        "expertise": ["menopause", "midlife transitions"]
    }
}

@app.get("/")
async def root():
    return {"message": "Shakti Scribe Python API (Simplified)", "status": "running"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "gemini_available": GEMINI_AVAILABLE,
        "agents_count": len(AGENTS)
    }

@app.get("/agents")
async def list_agents():
    return {"agents": list(AGENTS.values())}

@app.post("/generate")
async def generate_content(request: ContentRequest):
    if not GEMINI_AVAILABLE:
        raise HTTPException(status_code=500, detail="Gemini API not configured")
    
    agent_config = AGENTS.get(request.agent.lower())
    if not agent_config:
        raise HTTPException(status_code=400, detail=f"Agent '{request.agent}' not found")
    
    try:
        # Create prompt with agent personality
        system_prompt = f"""
        You are {agent_config['name']}, a {agent_config['description']} for Indian women.
        Your personality: {agent_config['personality']}
        Your expertise: {', '.join(agent_config['expertise'])}
        
        Create engaging {request.contentType} content about: {request.prompt}
        
        Make it culturally relevant for Indian women aged 18-45.
        Include relevant hashtags and a call-to-action.
        """
        
        response = model.generate_content(system_prompt)
        content = response.text
        
        # Extract title (first line)
        lines = content.split('\n')
        title = lines[0].replace('#', '').strip() if lines else f"{agent_config['name']} Content"
        
        # Extract hashtags
        hashtags = []
        for line in lines:
            if '#' in line:
                line_tags = [tag.strip() for tag in line.split() if tag.startswith('#')]
                hashtags.extend(line_tags)
        
        if not hashtags:
            hashtags = ['#TheShaktiTea', '#SpillTheShakti', f'#{agent_config["name"]}Says']
        
        return {
            "title": title,
            "content": content,
            "agent": request.agent,
            "contentType": request.contentType,
            "metadata": {
                "hashtags": hashtags[:5],
                "callToAction": "Share your thoughts below!",
                "generatedBy": "Python Gemini API",
                "agentPersonality": agent_config['personality']
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Content generation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
