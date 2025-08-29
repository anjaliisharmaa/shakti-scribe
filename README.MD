# 🚀 Shakti Scribe - Python + CrewAI Agents

A powerful content generation system for Indian women using Python agents powered by CrewAI and Google Gemini.

## 🏗️ **Architecture**

```
SHAKTI-SCRIBE/
├── shakti-scribe-nextjs/     # 🌐 Next.js Frontend (UI Only)
└── python-agents/           # 🐍 Python Backend (All AI Logic)
    ├── agents/              # Individual CrewAI agents
    ├── crew/                # Agent collaboration system
    ├── api/                 # FastAPI REST server
    ├── tests/               # Testing scripts
    └── requirements.txt     # Dependencies
```

## 🎯 **Features**

### 🤖 **5 AI Agents with Unique Personalities**
- **Gynika** 🌸 - Menstrual health & period expert
- **Maaya** 👶 - Motherhood & parenting guide  
- **Meher** 💙 - Mental health & emotional support
- **Nyaya** ⚖️ - Legal rights & workplace justice
- **Vaanya** 🌟 - Menopause & midlife empowerment

### ⚡ **CrewAI Powered Features**
- **Single Agent Content**: Specialized content from one expert
- **Collaborative Content**: Multiple agents working together
- **Advanced Workflows**: Task delegation and agent coordination
- **Memory & Context**: Agents remember previous conversations

### 🌐 **Content Types**
- **Video Scripts**: For YouTube/Instagram/Reels
- **Text Posts**: Social media content
- **Polls**: Interactive engagement content

## 🚀 **Quick Start**

### **Prerequisites**
- Python 3.8+ installed
- Git repository cloned
- Google Gemini API key

### **1. Environment Setup**
```bash
# Navigate to Python agents
cd python-agents

# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

### **2. Configuration**
```bash
# Copy environment template
copy .env.example .env

# Edit .env file and add your API key
# GOOGLE_API_KEY=your_actual_api_key_here
```

### **3. Start the System**
```bash
# Test agents
python tests/test_agents.py

# Start API server
python api/main.py
```

### **4. Access the Application**
- **API Server**: http://localhost:8000
- **Frontend UI**: http://localhost:3001 (start separately)
- **API Docs**: http://localhost:8000/docs

## 🤖 **Agent Details**

### **Gynika** 🌸
- **Expertise**: Menstrual health, PCOS, Period products, Reproductive wellness
- **Personality**: Empathetic educator who breaks period stigma
- **Tone**: Warm, informative, culturally sensitive

### **Maaya** 👶  
- **Expertise**: Pregnancy, Childcare, Work-life balance, Parenting
- **Personality**: Nurturing guide for modern Indian mothers
- **Tone**: Supportive, practical, understanding

### **Meher** 💙
- **Expertise**: Mental health, Anxiety, Self-care, Emotional wellness
- **Personality**: Compassionate advocate for mental health awareness
- **Tone**: Validating, empowering, gentle

### **Nyaya** ⚖️
- **Expertise**: Legal rights, Workplace harassment, Women's laws, Justice
- **Personality**: Fierce advocate for women's rights in India
- **Tone**: Authoritative, empowering, informative

### **Vaanya** 🌟
- **Expertise**: Menopause, Midlife transitions, Age empowerment, Career change
- **Personality**: Wise guide for women's midlife empowerment
- **Tone**: Frank, empowering, experienced

## 🔄 **Usage Examples**

### **Single Agent Content**
```python
from crew.shakti_crew import shakti_crew

result = shakti_crew.generate_content(
    agent_name="gynika",
    content_type="video",
    prompt="managing period pain at work"
)
```

### **API Usage**
```bash
# Single agent
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"agent": "maaya", "contentType": "poll", "prompt": "work from home with toddlers"}'
```

## 🌐 **API Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API status |
| `/health` | GET | Health check |
| `/agents` | GET | List all agents |
| `/generate` | POST | Single agent content |
| `/collaborate` | POST | Multi-agent content |
| `/agent/{name}` | GET | Agent details |

## 📦 **Dependencies**

### **Core**
- `crewai`: Agent orchestration framework
- `fastapi`: REST API server
- `uvicorn`: ASGI server
- `google-generativeai`: Gemini AI integration

### **Supporting**
- `python-dotenv`: Environment management
- `pydantic`: Data validation
- `httpx`: HTTP client

## 🔧 **Troubleshooting**

### **Common Issues**

**1. Import Errors**
```bash
# Solution: Ensure virtual environment is activated
venv\Scripts\activate
pip install -r requirements.txt
```

**2. API Key Issues**
```bash
# Check .env file exists and has correct key
type .env
# Verify key works
python tests/test_gemini.py
```

**3. Port Conflicts**
```bash
# Change port in api/main.py if 8000 is busy
uvicorn.run(app, host="0.0.0.0", port=8001)
```

## 🚀 **Deployment**

### **Local Development**
```bash
# Start in development mode
python api/main.py
# OR
uvicorn api.main:app --reload --port 8000
```

---

**Built with ❤️ for empowering Indian women through AI-powered content**
