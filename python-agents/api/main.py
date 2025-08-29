"""
FastAPI server to bridge Python agents with Next.js frontend
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import sys
import os

# Add the parent directory to path to import crew
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from crew.shakti_crew import shakti_crew
    CREW_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Could not import shakti_crew: {e}")
    CREW_AVAILABLE = False

app = FastAPI(title="Shakti Scribe Agent API", version="1.0.0")

# CORS middleware to allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContentRequest(BaseModel):
    contentType: str
    prompt: str
    agent: Optional[str] = None

class ContentResponse(BaseModel):
    title: str
    content: str
    agent: str
    contentType: str
    metadata: Dict[str, Any]

@app.get("/")
async def root():
    return {
        "message": "Shakti Scribe Python Agent API", 
        "status": "running",
        "crew_available": CREW_AVAILABLE
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "crew_available": CREW_AVAILABLE,
        "agents_count": len(shakti_crew.agents) if CREW_AVAILABLE else 0
    }

@app.get("/agents")
async def list_agents():
    """List all available agents"""
    if not CREW_AVAILABLE:
        return {"error": "Crew system not available", "agents": []}
    
    try:
        return shakti_crew.get_all_agents_info()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate", response_model=ContentResponse)
async def generate_content(request: ContentRequest):
    """Generate content using a specific agent or auto-select"""
    if not CREW_AVAILABLE:
        # Fallback response
        return ContentResponse(
            title="Service Temporarily Unavailable",
            content="The content generation service is currently being set up. Please try again later!",
            agent="system",
            contentType=request.contentType,
            metadata={
                "hashtags": ["#TheShaktiTea", "#ComingSoon"],
                "callToAction": "Check back soon!",
                "generatedBy": "Fallback System",
                "fallback": True
            }
        )
    
    try:
        result = shakti_crew.generate_content(
            content_type=request.contentType,
            prompt=request.prompt,
            agent_name=request.agent
        )
        return ContentResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/collaborate", response_model=ContentResponse)
async def collaborative_content(request: ContentRequest):
    """Generate content with multiple agents collaborating"""
    if not CREW_AVAILABLE:
        raise HTTPException(status_code=503, detail="Crew system not available")
    
    try:
        result = shakti_crew.collaborate_on_content(
            content_type=request.contentType,
            prompt=request.prompt,
            num_agents=2
        )
        return ContentResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/agent/{agent_name}")
async def get_agent_info(agent_name: str):
    """Get information about a specific agent"""
    if not CREW_AVAILABLE:
        raise HTTPException(status_code=503, detail="Crew system not available")
    
    if agent_name not in shakti_crew.agents:
        raise HTTPException(status_code=404, detail=f"Agent '{agent_name}' not found")
    
    try:
        agent = shakti_crew.agents[agent_name]
        return agent.get_agent_info()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/recommend/{content_type}")
async def recommend_agent(content_type: str, prompt: str):
    """Recommend the best agent for a content type and prompt"""
    if not CREW_AVAILABLE:
        raise HTTPException(status_code=503, detail="Crew system not available")
    
    try:
        recommended_agent = shakti_crew.get_agent_recommendation(content_type, prompt)
        return {
            "recommended_agent": recommended_agent,
            "content_type": content_type,
            "prompt": prompt
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("Starting Shakti Scribe API...")
    print(f"Crew system available: {CREW_AVAILABLE}")
    uvicorn.run(app, host="0.0.0.0", port=8000)
