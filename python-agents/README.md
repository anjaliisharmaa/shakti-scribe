# 🐍 Shakti Scribe Python Agents

This directory contains the Python + CrewAI implementation of the Shakti Scribe agents, designed to work with the Next.js frontend.

## 🏗️ Architecture

```
python-agents/
├── agents/          # Individual agent implementations
│   ├── base_agent.py    # Base agent class
│   ├── gynika.py        # Menstrual health expert
│   ├── maaya.py         # Motherhood guide
│   ├── meher.py         # Mental health advocate
│   ├── nyaya.py         # Legal rights expert
│   └── vaanya.py        # Menopause & empowerment
├── crew/            # CrewAI integration
│   └── shakti_crew.py   # Main crew orchestration
├── api/             # FastAPI server
│   └── main.py          # REST API endpoints
├── requirements.txt     # Python dependencies
├── setup.py            # Setup and test script
└── .env.example        # Environment variables template
```

## 🚀 Quick Start

### 1. Setup Environment

```bash
cd python-agents
python setup.py
```

This will:
- Install all required dependencies
- Create `.env` file
- Test the agent system

### 2. Configure API Key

Edit `.env` file and add your Google API key:
```
GOOGLE_API_KEY=your_actual_api_key_here
```

### 3. Start API Server

```bash
python setup.py --server
```

The API will be available at `http://localhost:8000`

### 4. Update Next.js Frontend

Update your Next.js app to call the Python API instead of TypeScript agents.

## 🤖 Agents

### Gynika 🌸
- **Focus**: Menstrual health & period care
- **Tone**: Empathetic, educational, stigma-breaking
- **Expertise**: Period pain, PCOS, menstrual products

### Maaya 👶
- **Focus**: Motherhood & parenting
- **Tone**: Nurturing, practical, understanding
- **Expertise**: Pregnancy, childcare, work-life balance

### Meher 💙
- **Focus**: Mental health & emotional support
- **Tone**: Compassionate, validating, empowering
- **Expertise**: Anxiety, depression, self-care

### Nyaya ⚖️
- **Focus**: Legal rights & workplace justice
- **Tone**: Authoritative, empowering, informative
- **Expertise**: POSH Act, maternity rights, legal guidance

### Vaanya 🌟
- **Focus**: Menopause & midlife empowerment
- **Tone**: Wise, empowering, frank
- **Expertise**: Menopause, career transitions, age empowerment

## 🔄 CrewAI Features

### Single Agent Content
Generate content using one specialized agent:
```python
result = shakti_crew.generate_content(
    agent_name="gynika",
    content_type="video",
    prompt="period pain during work"
)
```

### Collaborative Content
Multiple agents working together:
```python
result = shakti_crew.collaborative_content(
    primary_agent="nyaya",
    supporting_agents=["meher", "gynika"],
    content_type="text",
    prompt="workplace period leave policies"
)
```

## 🌐 API Endpoints

### `GET /agents`
List all available agents

### `POST /generate`
Generate content with single agent
```json
{
  "agent": "gynika",
  "contentType": "text", 
  "prompt": "period pain relief"
}
```

### `POST /collaborate`
Generate content with multiple agents
```json
{
  "primaryAgent": "nyaya",
  "supportingAgents": ["meher"],
  "contentType": "video",
  "prompt": "workplace harassment guidance"
}
```

### `GET /agent/{name}`
Get specific agent information

## 🔧 Integration with Next.js

Update your Next.js `contentGenerator.ts` to call the Python API:

```typescript
const response = await fetch('http://localhost:8000/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    agent: request.agent,
    contentType: request.contentType,
    prompt: request.prompt
  })
})
```

## 🧪 Testing

Run tests:
```bash
python setup.py
```

Test specific agent:
```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"agent": "gynika", "contentType": "text", "prompt": "period tips"}'
```

## 📦 Dependencies

- **CrewAI**: Agent orchestration framework
- **FastAPI**: REST API server
- **Google Generative AI**: Gemini integration
- **Uvicorn**: ASGI server

## 🔄 Migration Benefits

### ✅ CrewAI Advantages
- **Agent Collaboration**: Multiple agents can work together
- **Advanced Workflows**: Complex task delegation
- **Better Memory**: Agents can remember context
- **Rich Tooling**: Extended capabilities

### ✅ Python Ecosystem
- **AI/ML Libraries**: Access to full Python AI stack
- **LangChain Integration**: Advanced prompt engineering
- **Data Processing**: Better handling of complex data

### ✅ Hybrid Architecture
- **Best of Both**: Keep Next.js UI + Python AI power
- **Scalable**: Easy to add more agents or features
- **Maintainable**: Clear separation of concerns
