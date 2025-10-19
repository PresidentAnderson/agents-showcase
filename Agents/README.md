# 🤖 DevOps Agents System

A comprehensive agent-based automation system for DevOps operations, featuring AI-powered assistance, system monitoring, file operations, and workflow orchestration.

## 📁 Project Structure

```
/mnt/f/DevOps/Agents/
├── ai-agents/          # AI-powered agents
├── automation/         # Automation agents
├── monitoring/         # System monitoring agents
├── orchestration/      # Workflow orchestration
├── configs/           # Agent configurations
├── templates/         # Workflow templates
├── scripts/           # Helper scripts
└── workflows/         # Workflow definitions
```

## 🚀 Available Agents

### 1. AI Gateway Agent (`ai_gateway_agent.py`)
Intelligent assistant using AI Gateway API for:
- Code analysis and optimization
- Script generation
- Troubleshooting assistance
- DevOps best practices recommendations

**Features:**
- Async operations with conversation history
- Code quality assessment
- Dockerfile generation
- CI/CD pipeline creation
- Infrastructure optimization suggestions

### 2. File Operations Agent (`file_ops_agent.py`)
Automated file management and organization:
- Organize files by type/extension
- Find and remove duplicate files
- Backup directories with compression
- Clean temporary files
- Monitor directory changes

**Key Methods:**
```python
agent = FileOpsAgent()
await agent.organize_by_type("/source", "/destination")
await agent.find_duplicates("/directory", delete=True)
await agent.backup_directory("/source", "/backups")
await agent.clean_temp_files()
```

### 3. System Monitor Agent (`system_monitor_agent.py`)
Real-time system monitoring and alerting:
- CPU, memory, disk, network monitoring
- Process tracking and analysis
- Service health checks
- Log file monitoring
- Alert generation based on thresholds

**Monitoring Capabilities:**
- Real-time metrics collection
- Customizable alert thresholds
- Top process identification
- Service health verification
- Performance reporting

### 4. Agent Orchestrator (`agent_orchestrator.py`)
Coordinate multiple agents and complex workflows:
- Workflow definition and execution
- Task dependency management
- Parallel task execution
- Execution history and reporting

## 🔧 Installation

### Prerequisites
```bash
# Python 3.8+
python3 --version

# Install required packages
pip install aiohttp aiofiles psutil pyyaml python-dotenv
```

### Environment Setup
1. Ensure API key is in `/mnt/f/DevOps/.env`:
```env
AI_GATEWAY_API_KEY=vck_4FWYauJSGW8kJzjoa83ybeWdX0eOPLqq0cbce0sJevSOMOj0Zl3CKV7xc
```

2. Make scripts executable:
```bash
chmod +x /mnt/f/DevOps/Agents/*/*.py
```

## 💻 Usage Examples

### AI Agent Usage
```python
import asyncio
from ai_gateway_agent import AIGatewayAgent

async def main():
    async with AIGatewayAgent("Assistant") as agent:
        # Chat
        response = await agent.chat("How to optimize Docker images?")
        
        # Analyze code
        analysis = await agent.analyze_code(code_string, "python")
        
        # Generate script
        script = await agent.generate_script("Backup MySQL database")

asyncio.run(main())
```

### File Operations
```python
from file_ops_agent import FileOpsAgent

async def organize_files():
    agent = FileOpsAgent()
    
    # Organize downloads folder
    await agent.organize_by_type("/mnt/c/Users/Downloads")
    
    # Find duplicates in DevOps folder
    duplicates = await agent.find_duplicates("/mnt/f/DevOps")
    
    # Backup important directories
    await agent.backup_directory("/mnt/f/DevOps", "/mnt/d/Backups")

asyncio.run(organize_files())
```

### System Monitoring
```python
from system_monitor_agent import SystemMonitorAgent

async def monitor_system():
    monitor = SystemMonitorAgent({
        'cpu_percent': 80,
        'memory_percent': 85,
        'disk_percent': 90
    })
    
    # Start monitoring
    await monitor.start_monitoring(interval=5, duration=300)
    
    # Get top processes
    top_procs = await monitor.get_top_processes('cpu', limit=10)
    
    # Check services
    health = await monitor.check_service_health(['docker', 'nginx'])
    
    # Generate report
    report = monitor.generate_report()

asyncio.run(monitor_system())
```

### Workflow Orchestration
```python
from agent_orchestrator import AgentOrchestrator

async def run_workflow():
    orchestrator = AgentOrchestrator()
    
    # Register agents
    orchestrator.register_agent('file_ops', FileOpsAgent)
    orchestrator.register_agent('monitor', SystemMonitorAgent)
    
    # Load and execute workflow
    orchestrator.load_workflow('workflows/deploy_app.yaml')
    results = await orchestrator.execute_workflow('deploy_application')
    
    # Get execution report
    report = orchestrator.get_execution_report()

asyncio.run(run_workflow())
```

## 📋 Workflow Definition (YAML)

Create workflows in YAML format:

```yaml
name: deploy_application
description: Complete deployment workflow
version: '1.0'
tasks:
  - id: backup
    agent: file_ops
    action: backup_directory
    params:
      source: /app/current
      backup_location: /backups
    dependencies: []
    
  - id: test
    agent: devops
    action: run_tests
    params:
      test_suite: integration
    dependencies: []
    
  - id: deploy
    agent: devops
    action: deploy
    params:
      target: production
    dependencies: [backup, test]
    
  - id: monitor
    agent: monitoring
    action: start_monitoring
    params:
      duration: 300
    dependencies: [deploy]
```

## 🎯 Common Use Cases

### 1. Automated Backup and Cleanup
```bash
python3 -c "
import asyncio
from file_ops_agent import FileOpsAgent

async def daily_maintenance():
    agent = FileOpsAgent()
    await agent.backup_directory('/mnt/f/DevOps', '/mnt/d/Backups', compress=True)
    await agent.clean_temp_files()
    await agent.find_duplicates('/mnt/f', delete=True)

asyncio.run(daily_maintenance())
"
```

### 2. System Health Check
```bash
python3 monitoring/system_monitor_agent.py
```

### 3. AI-Assisted Troubleshooting
```python
async with AIGatewayAgent() as agent:
    solution = await agent.troubleshoot(
        error_message="Docker container keeps restarting",
        context="Running nginx with custom config"
    )
    print(solution)
```

## ⚙️ Configuration

### Alert Thresholds
Customize monitoring thresholds in `configs/thresholds.yaml`:
```yaml
cpu_percent: 80
memory_percent: 85
disk_percent: 90
temperature: 80
network_errors: 100
process_count: 500
```

### Agent Settings
Configure agents in `configs/agents.yaml`:
```yaml
ai_agent:
  model: gpt-4
  temperature: 0.7
  max_tokens: 2000

file_ops:
  enable_dry_run: false
  backup_compression: true

monitoring:
  interval: 5
  retention_days: 30
```

## 🔐 Security Notes

- API keys stored in `.env` file (excluded from git)
- Use environment variables for sensitive data
- Enable dry-run mode for testing
- Regular backup before automated operations
- Monitor agent activities via logs

## 📊 Monitoring Dashboard

Access agent metrics and status:
```bash
# View recent agent activities
cat /mnt/f/DevOps/Agents/logs/agent_activity.log

# Check system metrics
cat /mnt/f/DevOps/Agents/logs/system_metrics.json

# View workflow execution history
cat /mnt/f/DevOps/Agents/logs/workflow_history.json
```

## 🚦 Running Agents as Services

### Systemd Service (Linux)
Create `/etc/systemd/system/devops-monitor.service`:
```ini
[Unit]
Description=DevOps System Monitor Agent
After=network.target

[Service]
Type=simple
User=presidentanderson
WorkingDirectory=/mnt/f/DevOps/Agents
ExecStart=/usr/bin/python3 monitoring/system_monitor_agent.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable devops-monitor
sudo systemctl start devops-monitor
```

## 🐛 Troubleshooting

### Common Issues

1. **Import errors**: Install missing packages
   ```bash
   pip install -r requirements.txt
   ```

2. **Permission denied**: Check file permissions
   ```bash
   chmod +x agent_script.py
   ```

3. **API key not found**: Verify `.env` file
   ```bash
   cat /mnt/f/DevOps/.env | grep AI_GATEWAY_API_KEY
   ```

4. **High resource usage**: Adjust monitoring intervals
   ```python
   monitor.start_monitoring(interval=30)  # Increase interval
   ```

## 📚 Additional Resources

- [AI Gateway API Documentation](https://api.ai-gateway.com/docs)
- [Python AsyncIO Guide](https://docs.python.org/3/library/asyncio.html)
- [PSUtil Documentation](https://psutil.readthedocs.io/)
- [YAML Workflow Syntax](https://yaml.org/)

## 🤝 Contributing

To add new agents:
1. Create agent class in appropriate directory
2. Implement required async methods
3. Register with orchestrator
4. Add documentation
5. Create example workflows

## 📝 License

Internal use only - Property of DevOps Team

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintainer**: DevOps Team