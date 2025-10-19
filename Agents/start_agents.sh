#!/bin/bash

# DevOps Agents Quick Start Script

echo "🤖 DevOps Agents System Launcher"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Python 3 found: $(python3 --version)${NC}"

# Check environment
if [ ! -f "/mnt/f/DevOps/.env" ]; then
    echo -e "${YELLOW}⚠️ Warning: .env file not found${NC}"
    echo "Please ensure AI_GATEWAY_API_KEY is set in /mnt/f/DevOps/.env"
fi

# Create necessary directories
mkdir -p /mnt/f/DevOps/Agents/{logs,workflows,configs}

# Menu
echo ""
echo "Select an agent to run:"
echo "1) AI Gateway Agent - Chat and code analysis"
echo "2) File Operations Agent - Organize and backup files"
echo "3) System Monitor Agent - Monitor system resources"
echo "4) Agent Orchestrator - Run workflows"
echo "5) Install dependencies"
echo "6) Run all agents demo"
echo "0) Exit"
echo ""

read -p "Enter choice (0-6): " choice

case $choice in
    1)
        echo -e "${GREEN}Starting AI Gateway Agent...${NC}"
        cd /mnt/f/DevOps/Agents/ai-agents
        python3 ai_gateway_agent.py
        ;;
    2)
        echo -e "${GREEN}Starting File Operations Agent...${NC}"
        cd /mnt/f/DevOps/Agents/automation
        python3 file_ops_agent.py
        ;;
    3)
        echo -e "${GREEN}Starting System Monitor Agent...${NC}"
        cd /mnt/f/DevOps/Agents/monitoring
        python3 system_monitor_agent.py
        ;;
    4)
        echo -e "${GREEN}Starting Agent Orchestrator...${NC}"
        cd /mnt/f/DevOps/Agents/orchestration
        python3 agent_orchestrator.py
        ;;
    5)
        echo -e "${YELLOW}Installing dependencies...${NC}"
        pip3 install -r /mnt/f/DevOps/Agents/requirements.txt
        echo -e "${GREEN}✓ Dependencies installed${NC}"
        ;;
    6)
        echo -e "${GREEN}Running all agents demo...${NC}"
        echo ""
        echo "1. File Operations Demo"
        python3 /mnt/f/DevOps/Agents/automation/file_ops_agent.py
        echo ""
        echo "2. System Monitor Demo (30 seconds)"
        timeout 30 python3 /mnt/f/DevOps/Agents/monitoring/system_monitor_agent.py
        echo ""
        echo "3. Orchestrator Demo"
        python3 /mnt/f/DevOps/Agents/orchestration/agent_orchestrator.py
        echo ""
        echo -e "${GREEN}✓ All demos completed${NC}"
        ;;
    0)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "Agent execution completed."