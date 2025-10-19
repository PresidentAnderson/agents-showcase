#!/usr/bin/env python3
"""
Agent Orchestrator - Coordinate multiple agents and workflows
"""

import asyncio
import json
import yaml
from typing import Dict, List, Optional, Any, Callable
from datetime import datetime
from pathlib import Path
from enum import Enum
import importlib.util
import sys

class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class Task:
    """Represents a single task in the workflow"""
    
    def __init__(self, task_id: str, agent: str, action: str, params: Dict = None, dependencies: List[str] = None):
        self.id = task_id
        self.agent = agent
        self.action = action
        self.params = params or {}
        self.dependencies = dependencies or []
        self.status = TaskStatus.PENDING
        self.result = None
        self.error = None
        self.started_at = None
        self.completed_at = None
    
    def to_dict(self) -> Dict:
        return {
            'id': self.id,
            'agent': self.agent,
            'action': self.action,
            'params': self.params,
            'dependencies': self.dependencies,
            'status': self.status.value,
            'result': self.result,
            'error': self.error,
            'started_at': self.started_at.isoformat() if self.started_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }

class AgentOrchestrator:
    """Orchestrates multiple agents and complex workflows"""
    
    def __init__(self):
        self.agents = {}
        self.workflows = {}
        self.tasks = {}
        self.execution_history = []
        self.running_tasks = set()
        self.max_concurrent_tasks = 5
        
    def register_agent(self, name: str, agent_class: Any):
        """Register an agent for use in workflows"""
        self.agents[name] = agent_class
        print(f"✅ Registered agent: {name}")
    
    def load_agent_module(self, module_path: str, agent_name: str):
        """Dynamically load an agent module"""
        spec = importlib.util.spec_from_file_location(agent_name, module_path)
        module = importlib.util.module_from_spec(spec)
        sys.modules[agent_name] = module
        spec.loader.exec_module(module)
        
        # Find the agent class in the module
        for item_name in dir(module):
            item = getattr(module, item_name)
            if isinstance(item, type) and 'Agent' in item_name:
                self.register_agent(agent_name, item)
                break
    
    def load_workflow(self, workflow_file: str):
        """Load workflow definition from YAML file"""
        with open(workflow_file, 'r') as f:
            workflow = yaml.safe_load(f)
        
        workflow_name = workflow['name']
        self.workflows[workflow_name] = workflow
        print(f"📋 Loaded workflow: {workflow_name}")
        return workflow_name
    
    async def execute_workflow(self, workflow_name: str, context: Dict = None) -> Dict:
        """Execute a complete workflow"""
        if workflow_name not in self.workflows:
            raise ValueError(f"Workflow '{workflow_name}' not found")
        
        workflow = self.workflows[workflow_name]
        context = context or {}
        
        print(f"\n🚀 Starting workflow: {workflow_name}")
        print(f"📝 Description: {workflow.get('description', 'N/A')}")
        
        # Create tasks from workflow definition
        tasks = []
        for task_def in workflow['tasks']:
            task = Task(
                task_id=task_def['id'],
                agent=task_def['agent'],
                action=task_def['action'],
                params=task_def.get('params', {}),
                dependencies=task_def.get('dependencies', [])
            )
            tasks.append(task)
            self.tasks[task.id] = task
        
        # Execute tasks
        results = await self._execute_tasks(tasks, context)
        
        # Record execution
        execution_record = {
            'workflow': workflow_name,
            'started_at': datetime.now().isoformat(),
            'tasks': [t.to_dict() for t in tasks],
            'results': results
        }
        self.execution_history.append(execution_record)
        
        print(f"\n✅ Workflow '{workflow_name}' completed")
        return results
    
    async def _execute_tasks(self, tasks: List[Task], context: Dict) -> Dict:
        """Execute tasks with dependency resolution"""
        results = {}
        completed_tasks = set()
        
        while len(completed_tasks) < len(tasks):
            # Find tasks ready to run
            ready_tasks = [
                task for task in tasks
                if task.status == TaskStatus.PENDING
                and all(dep in completed_tasks for dep in task.dependencies)
                and task.id not in self.running_tasks
            ]
            
            # Limit concurrent tasks
            ready_tasks = ready_tasks[:self.max_concurrent_tasks - len(self.running_tasks)]
            
            if not ready_tasks and not self.running_tasks:
                # Deadlock or all tasks complete
                break
            
            # Start ready tasks
            task_futures = []
            for task in ready_tasks:
                self.running_tasks.add(task.id)
                task_futures.append(self._execute_task(task, context, results))
            
            # Wait for at least one task to complete
            if task_futures:
                done, pending = await asyncio.wait(task_futures, return_when=asyncio.FIRST_COMPLETED)
                
                for future in done:
                    task_id, result = await future
                    results[task_id] = result
                    completed_tasks.add(task_id)
                    self.running_tasks.discard(task_id)
            else:
                await asyncio.sleep(0.1)
        
        return results
    
    async def _execute_task(self, task: Task, context: Dict, results: Dict) -> tuple:
        """Execute a single task"""
        print(f"\n▶️ Starting task: {task.id} ({task.agent}.{task.action})")
        
        task.status = TaskStatus.RUNNING
        task.started_at = datetime.now()
        
        try:
            # Get agent
            if task.agent not in self.agents:
                raise ValueError(f"Agent '{task.agent}' not registered")
            
            agent_class = self.agents[task.agent]
            agent = agent_class()
            
            # Prepare parameters with context and previous results
            params = task.params.copy()
            params['_context'] = context
            params['_results'] = results
            
            # Execute action
            if hasattr(agent, task.action):
                action_method = getattr(agent, task.action)
                if asyncio.iscoroutinefunction(action_method):
                    result = await action_method(**params)
                else:
                    result = action_method(**params)
            else:
                raise AttributeError(f"Agent '{task.agent}' has no action '{task.action}'")
            
            task.status = TaskStatus.COMPLETED
            task.result = result
            task.completed_at = datetime.now()
            
            duration = (task.completed_at - task.started_at).total_seconds()
            print(f"✅ Task {task.id} completed in {duration:.2f}s")
            
            return task.id, result
            
        except Exception as e:
            task.status = TaskStatus.FAILED
            task.error = str(e)
            task.completed_at = datetime.now()
            
            print(f"❌ Task {task.id} failed: {e}")
            return task.id, {'error': str(e)}
    
    async def execute_parallel(self, tasks: List[Dict]) -> List:
        """Execute multiple independent tasks in parallel"""
        print(f"\n⚡ Executing {len(tasks)} tasks in parallel")
        
        task_objects = []
        for task_def in tasks:
            task = Task(
                task_id=task_def.get('id', f"parallel_{len(task_objects)}"),
                agent=task_def['agent'],
                action=task_def['action'],
                params=task_def.get('params', {})
            )
            task_objects.append(task)
        
        # Execute all tasks concurrently
        results = await asyncio.gather(
            *[self._execute_task(task, {}, {}) for task in task_objects],
            return_exceptions=True
        )
        
        return [r[1] for r in results if not isinstance(r, Exception)]
    
    def create_workflow_template(self, name: str, description: str) -> Dict:
        """Create a workflow template"""
        template = {
            'name': name,
            'description': description,
            'version': '1.0',
            'tasks': [],
            'on_success': [],
            'on_failure': [],
            'timeout': 3600,
            'retries': 3
        }
        
        return template
    
    def add_task_to_workflow(self, workflow: Dict, task_id: str, agent: str, 
                            action: str, params: Dict = None, dependencies: List[str] = None):
        """Add a task to workflow template"""
        task = {
            'id': task_id,
            'agent': agent,
            'action': action,
            'params': params or {},
            'dependencies': dependencies or []
        }
        
        workflow['tasks'].append(task)
        return workflow
    
    def save_workflow(self, workflow: Dict, filename: str):
        """Save workflow to YAML file"""
        with open(filename, 'w') as f:
            yaml.dump(workflow, f, default_flow_style=False)
        print(f"💾 Workflow saved to {filename}")
    
    def get_execution_report(self) -> Dict:
        """Generate execution report"""
        if not self.execution_history:
            return {'message': 'No executions recorded'}
        
        total_tasks = sum(len(exec['tasks']) for exec in self.execution_history)
        successful_tasks = sum(
            len([t for t in exec['tasks'] if t['status'] == 'completed'])
            for exec in self.execution_history
        )
        
        report = {
            'total_workflows': len(self.execution_history),
            'total_tasks': total_tasks,
            'successful_tasks': successful_tasks,
            'failed_tasks': total_tasks - successful_tasks,
            'success_rate': (successful_tasks / total_tasks * 100) if total_tasks > 0 else 0,
            'recent_executions': self.execution_history[-5:]
        }
        
        return report


# Example workflow YAML creation
def create_example_workflow():
    """Create an example DevOps workflow"""
    workflow = {
        'name': 'deploy_application',
        'description': 'Complete application deployment workflow',
        'version': '1.0',
        'tasks': [
            {
                'id': 'backup',
                'agent': 'file_ops',
                'action': 'backup_directory',
                'params': {
                    'source': '/app/current',
                    'backup_location': '/backups'
                },
                'dependencies': []
            },
            {
                'id': 'test',
                'agent': 'devops',
                'action': 'run_tests',
                'params': {
                    'test_suite': 'integration'
                },
                'dependencies': []
            },
            {
                'id': 'build',
                'agent': 'devops',
                'action': 'build_application',
                'params': {
                    'environment': 'production'
                },
                'dependencies': ['test']
            },
            {
                'id': 'deploy',
                'agent': 'devops',
                'action': 'deploy',
                'params': {
                    'target': 'production',
                    'strategy': 'blue-green'
                },
                'dependencies': ['backup', 'build']
            },
            {
                'id': 'monitor',
                'agent': 'monitoring',
                'action': 'start_monitoring',
                'params': {
                    'duration': 300,
                    'alert_threshold': 'high'
                },
                'dependencies': ['deploy']
            }
        ]
    }
    
    return workflow


async def main():
    """Example usage"""
    print("🤖 Agent Orchestrator Demo\n")
    
    # Create orchestrator
    orchestrator = AgentOrchestrator()
    
    # Create and save example workflow
    workflow = create_example_workflow()
    orchestrator.save_workflow(workflow, "/mnt/f/DevOps/Agents/workflows/deploy_app.yaml")
    
    # Load workflow
    workflow_name = orchestrator.load_workflow("/mnt/f/DevOps/Agents/workflows/deploy_app.yaml")
    
    # Example parallel execution
    parallel_tasks = [
        {'agent': 'monitoring', 'action': 'collect_metrics'},
        {'agent': 'file_ops', 'action': 'clean_temp_files'},
        {'agent': 'devops', 'action': 'check_services'}
    ]
    
    # Note: This would need actual agent implementations to run
    # results = await orchestrator.execute_parallel(parallel_tasks)
    
    print("\n📊 Orchestrator ready for workflow execution")
    print("Registered agents:", list(orchestrator.agents.keys()))
    print("Available workflows:", list(orchestrator.workflows.keys()))


if __name__ == "__main__":
    asyncio.run(main())