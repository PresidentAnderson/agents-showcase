#!/usr/bin/env python3
"""
AI Gateway Agent - Intelligent assistant using AI Gateway API
"""

import os
import json
import asyncio
import aiohttp
from typing import Dict, List, Optional, Any
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/mnt/f/DevOps/.env')

class AIGatewayAgent:
    """AI Agent that interacts with AI Gateway API"""
    
    def __init__(self, agent_name: str = "AI Assistant"):
        self.api_key = os.getenv('AI_GATEWAY_API_KEY')
        self.base_url = "https://api.ai-gateway.com/v1"  # Update with actual URL
        self.agent_name = agent_name
        self.session = None
        self.conversation_history = []
        
        if not self.api_key:
            raise ValueError("AI_GATEWAY_API_KEY not found in environment variables")
    
    async def __aenter__(self):
        """Async context manager entry"""
        self.session = aiohttp.ClientSession(
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        if self.session:
            await self.session.close()
    
    async def chat(self, message: str, context: Optional[Dict] = None) -> str:
        """Send a message to the AI and get response"""
        try:
            payload = {
                "model": "gpt-4",  # or your preferred model
                "messages": self._build_messages(message, context),
                "temperature": 0.7,
                "max_tokens": 2000
            }
            
            async with self.session.post(
                f"{self.base_url}/chat/completions",
                json=payload
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    reply = data['choices'][0]['message']['content']
                    self._update_history(message, reply)
                    return reply
                else:
                    error = await response.text()
                    return f"Error: {response.status} - {error}"
                    
        except Exception as e:
            return f"Exception occurred: {str(e)}"
    
    def _build_messages(self, message: str, context: Optional[Dict]) -> List[Dict]:
        """Build message history for API request"""
        messages = [
            {"role": "system", "content": f"You are {self.agent_name}, a helpful AI assistant."}
        ]
        
        # Add conversation history (last 5 exchanges)
        for item in self.conversation_history[-10:]:
            messages.append(item)
        
        # Add context if provided
        if context:
            messages.append({
                "role": "system",
                "content": f"Context: {json.dumps(context)}"
            })
        
        # Add current message
        messages.append({"role": "user", "content": message})
        
        return messages
    
    def _update_history(self, user_message: str, ai_response: str):
        """Update conversation history"""
        self.conversation_history.append({"role": "user", "content": user_message})
        self.conversation_history.append({"role": "assistant", "content": ai_response})
        
        # Keep only last 20 messages
        if len(self.conversation_history) > 20:
            self.conversation_history = self.conversation_history[-20:]
    
    async def analyze_code(self, code: str, language: str = "python") -> Dict:
        """Analyze code for improvements and issues"""
        prompt = f"""
        Analyze the following {language} code:
        
        ```{language}
        {code}
        ```
        
        Provide:
        1. Code quality assessment
        2. Potential bugs or issues
        3. Performance improvements
        4. Best practice recommendations
        
        Format as JSON.
        """
        
        response = await self.chat(prompt)
        try:
            return json.loads(response)
        except:
            return {"analysis": response}
    
    async def generate_script(self, task_description: str, language: str = "bash") -> str:
        """Generate a script based on task description"""
        prompt = f"""
        Create a {language} script for the following task:
        {task_description}
        
        Include:
        - Error handling
        - Comments
        - Best practices
        
        Return only the script code.
        """
        
        return await self.chat(prompt)
    
    async def troubleshoot(self, error_message: str, context: str = "") -> str:
        """Help troubleshoot errors"""
        prompt = f"""
        Help troubleshoot this error:
        
        Error: {error_message}
        
        Context: {context}
        
        Provide:
        1. Likely causes
        2. Step-by-step solution
        3. Prevention tips
        """
        
        return await self.chat(prompt)


class DevOpsAgent(AIGatewayAgent):
    """Specialized DevOps automation agent"""
    
    def __init__(self):
        super().__init__("DevOps Agent")
        self.tasks = []
    
    async def create_dockerfile(self, app_type: str, requirements: List[str]) -> str:
        """Generate optimized Dockerfile"""
        prompt = f"""
        Create an optimized Dockerfile for a {app_type} application.
        Requirements: {', '.join(requirements)}
        
        Include:
        - Multi-stage build if applicable
        - Security best practices
        - Size optimization
        """
        
        return await self.chat(prompt)
    
    async def generate_ci_cd_pipeline(self, platform: str, tech_stack: List[str]) -> str:
        """Generate CI/CD pipeline configuration"""
        prompt = f"""
        Create a {platform} CI/CD pipeline for:
        Tech stack: {', '.join(tech_stack)}
        
        Include:
        - Build stage
        - Test stage
        - Security scanning
        - Deployment stage
        """
        
        return await self.chat(prompt)
    
    async def optimize_infrastructure(self, current_config: Dict) -> Dict:
        """Suggest infrastructure optimizations"""
        prompt = f"""
        Analyze and optimize this infrastructure configuration:
        {json.dumps(current_config, indent=2)}
        
        Suggest improvements for:
        - Cost optimization
        - Performance
        - Security
        - Scalability
        
        Return as JSON with specific recommendations.
        """
        
        response = await self.chat(prompt)
        try:
            return json.loads(response)
        except:
            return {"recommendations": response}


async def main():
    """Example usage"""
    print("🤖 AI Gateway Agent Demo\n")
    
    # Basic AI Agent
    async with AIGatewayAgent("Assistant") as agent:
        # Chat example
        response = await agent.chat("What are the best practices for Python async programming?")
        print(f"Chat Response:\n{response}\n")
        
        # Code analysis
        sample_code = """
def process_data(data):
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
    return result
        """
        
        analysis = await agent.analyze_code(sample_code)
        print(f"Code Analysis:\n{json.dumps(analysis, indent=2)}\n")
    
    # DevOps Agent
    async with DevOpsAgent() as devops:
        # Generate Dockerfile
        dockerfile = await devops.create_dockerfile(
            "Python FastAPI",
            ["PostgreSQL", "Redis", "Celery"]
        )
        print(f"Generated Dockerfile:\n{dockerfile}\n")
        
        # Generate CI/CD Pipeline
        pipeline = await devops.generate_ci_cd_pipeline(
            "GitHub Actions",
            ["Python", "PostgreSQL", "Docker", "Kubernetes"]
        )
        print(f"CI/CD Pipeline:\n{pipeline}\n")


if __name__ == "__main__":
    asyncio.run(main())