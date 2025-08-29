"""
Shakti Crew - Direct agent collaboration without CrewAI dependency
"""
from typing import Dict, List, Any, Optional
import random
from agents.gynika import GynikaAgent
from agents.maaya import MaayaAgent  
from agents.meher import MeherAgent
from agents.nyaya import NyayaAgent
from agents.vaanya import VaanyaAgent

class ShaktiCrew:
    def __init__(self):
        # Initialize all agents
        self.agents = {
            'gynika': GynikaAgent(),
            'maaya': MaayaAgent(),
            'meher': MeherAgent(),
            'nyaya': NyayaAgent(),
            'vaanya': VaanyaAgent()
        }
        
        # Define agent specializations for content type routing
        self.content_routing = {
            'social_media_post': ['gynika', 'vaanya'],
            'blog_post': ['maaya', 'meher'],
            'news_article': ['nyaya', 'maaya'],
            'lifestyle_content': ['gynika', 'vaanya'],
            'legal_advice': ['nyaya'],
            'wellness_tips': ['meher'],
            'general': ['gynika', 'maaya', 'meher', 'nyaya', 'vaanya']
        }
    
    def generate_content(self, content_type: str, prompt: str, agent_name: Optional[str] = None) -> Dict[str, Any]:
        """Generate content using the best agent for the content type"""
        try:
            # Use specific agent if requested
            if agent_name and agent_name in self.agents:
                agent = self.agents[agent_name]
                return agent.generate_content(content_type, prompt)
            
            # Otherwise, route based on content type
            suitable_agents = self.content_routing.get(content_type, self.content_routing['general'])
            
            # Pick the first suitable agent (or random for variety)
            chosen_agent_name = suitable_agents[0] if len(suitable_agents) == 1 else random.choice(suitable_agents)
            agent = self.agents[chosen_agent_name]
            
            return agent.generate_content(content_type, prompt)
            
        except Exception as e:
            return self._error_response(f"Crew error: {str(e)}")
    
    def get_agent_recommendation(self, content_type: str, prompt: str) -> str:
        """Recommend the best agent for a given content type and prompt"""
        # Simple keyword-based routing
        prompt_lower = prompt.lower()
        
        # Legal keywords
        if any(word in prompt_lower for word in ['legal', 'law', 'rights', 'advice', 'regulation']):
            return 'nyaya'
        
        # Health/wellness keywords
        if any(word in prompt_lower for word in ['health', 'wellness', 'exercise', 'nutrition', 'mental']):
            return 'meher'
        
        # Lifestyle/social keywords
        if any(word in prompt_lower for word in ['lifestyle', 'fashion', 'social', 'trendy', 'modern']):
            return 'gynika'
        
        # Career/business keywords
        if any(word in prompt_lower for word in ['career', 'business', 'professional', 'work', 'job']):
            return 'vaanya'
        
        # Default to content-type routing
        suitable_agents = self.content_routing.get(content_type, self.content_routing['general'])
        return suitable_agents[0]
    
    def get_all_agents_info(self) -> Dict[str, Any]:
        """Get information about all agents"""
        agents_info = {}
        for name, agent in self.agents.items():
            agents_info[name] = agent.get_agent_info()
        
        return {
            "agents": agents_info,
            "total_agents": len(self.agents),
            "crew_status": "active",
            "routing": self.content_routing
        }
    
    def collaborate_on_content(self, content_type: str, prompt: str, num_agents: int = 2) -> Dict[str, Any]:
        """Have multiple agents collaborate on content generation"""
        try:
            # Get suitable agents for the content type
            suitable_agents = self.content_routing.get(content_type, self.content_routing['general'])
            
            # Select agents for collaboration
            if len(suitable_agents) >= num_agents:
                selected_agents = random.sample(suitable_agents, num_agents)
            else:
                selected_agents = suitable_agents
            
            # Generate content from each agent
            responses = {}
            for agent_name in selected_agents:
                agent = self.agents[agent_name]
                response = agent.generate_content(content_type, prompt)
                responses[agent_name] = response
            
            # Combine the best elements (simple version)
            primary_response = responses[selected_agents[0]]
            
            # Add collaboration metadata
            primary_response['metadata']['collaboration'] = {
                'participating_agents': selected_agents,
                'collaboration_type': 'multi_agent',
                'total_responses': len(responses)
            }
            
            return primary_response
            
        except Exception as e:
            return self._error_response(f"Collaboration error: {str(e)}")
    
    def _error_response(self, error_message: str) -> Dict[str, Any]:
        """Generate error response"""
        return {
            "title": "Content Generation Error",
            "content": f"Sorry, there was an issue generating content: {error_message}",
            "agent": "crew_error",
            "contentType": "error",
            "metadata": {
                "hashtags": ["#TheShaktiTea", "#TechnicalDifficulties"],
                "callToAction": "Please try again!",
                "generatedBy": "Shakti Crew (Error Handler)",
                "error": True,
                "error_message": error_message
            }
        }

# Initialize crew instance
shakti_crew = ShaktiCrew()
