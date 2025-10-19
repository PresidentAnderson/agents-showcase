#!/usr/bin/env python3
"""
System Monitoring Agent - Real-time system monitoring and alerting
"""

import os
import psutil
import asyncio
import json
import aiohttp
from datetime import datetime
from typing import Dict, List, Optional, Callable
from pathlib import Path
import subprocess

class SystemMonitorAgent:
    """Agent for monitoring system resources and health"""
    
    def __init__(self, alert_thresholds: Optional[Dict] = None):
        self.thresholds = alert_thresholds or {
            'cpu_percent': 80,
            'memory_percent': 85,
            'disk_percent': 90,
            'temperature': 80,  # Celsius
            'network_errors': 100,
            'process_count': 500
        }
        self.alerts = []
        self.metrics_history = []
        self.monitoring = False
        
    async def start_monitoring(self, interval: int = 5, duration: Optional[int] = None):
        """Start continuous monitoring"""
        self.monitoring = True
        print(f"🚀 Starting system monitoring (interval: {interval}s)")
        
        start_time = datetime.now()
        
        try:
            while self.monitoring:
                metrics = await self.collect_metrics()
                self.metrics_history.append(metrics)
                
                # Check thresholds and trigger alerts
                await self.check_thresholds(metrics)
                
                # Print current status
                self._print_metrics(metrics)
                
                # Check duration
                if duration and (datetime.now() - start_time).seconds >= duration:
                    break
                
                await asyncio.sleep(interval)
                
        except KeyboardInterrupt:
            print("\n🛑 Monitoring stopped")
        finally:
            self.monitoring = False
    
    async def collect_metrics(self) -> Dict:
        """Collect system metrics"""
        metrics = {
            'timestamp': datetime.now().isoformat(),
            'cpu': {
                'percent': psutil.cpu_percent(interval=1),
                'count': psutil.cpu_count(),
                'freq': psutil.cpu_freq().current if psutil.cpu_freq() else 0,
                'load_avg': os.getloadavg() if hasattr(os, 'getloadavg') else [0, 0, 0]
            },
            'memory': {
                'total': psutil.virtual_memory().total,
                'used': psutil.virtual_memory().used,
                'percent': psutil.virtual_memory().percent,
                'available': psutil.virtual_memory().available,
                'swap_percent': psutil.swap_memory().percent
            },
            'disk': {},
            'network': {
                'bytes_sent': psutil.net_io_counters().bytes_sent,
                'bytes_recv': psutil.net_io_counters().bytes_recv,
                'packets_sent': psutil.net_io_counters().packets_sent,
                'packets_recv': psutil.net_io_counters().packets_recv,
                'errors': psutil.net_io_counters().errin + psutil.net_io_counters().errout
            },
            'processes': {
                'total': len(psutil.pids()),
                'running': len([p for p in psutil.process_iter(['status']) 
                               if p.info['status'] == psutil.STATUS_RUNNING])
            }
        }
        
        # Disk usage for each partition
        for partition in psutil.disk_partitions():
            try:
                usage = psutil.disk_usage(partition.mountpoint)
                metrics['disk'][partition.mountpoint] = {
                    'total': usage.total,
                    'used': usage.used,
                    'free': usage.free,
                    'percent': usage.percent
                }
            except:
                pass
        
        # Temperature sensors (if available)
        try:
            temps = psutil.sensors_temperatures()
            if temps:
                metrics['temperature'] = {}
                for name, entries in temps.items():
                    metrics['temperature'][name] = entries[0].current
        except:
            metrics['temperature'] = {}
        
        return metrics
    
    async def check_thresholds(self, metrics: Dict):
        """Check metrics against thresholds and generate alerts"""
        alerts = []
        
        # CPU check
        if metrics['cpu']['percent'] > self.thresholds['cpu_percent']:
            alerts.append({
                'level': 'WARNING',
                'type': 'CPU',
                'message': f"High CPU usage: {metrics['cpu']['percent']}%",
                'value': metrics['cpu']['percent'],
                'threshold': self.thresholds['cpu_percent']
            })
        
        # Memory check
        if metrics['memory']['percent'] > self.thresholds['memory_percent']:
            alerts.append({
                'level': 'WARNING',
                'type': 'MEMORY',
                'message': f"High memory usage: {metrics['memory']['percent']}%",
                'value': metrics['memory']['percent'],
                'threshold': self.thresholds['memory_percent']
            })
        
        # Disk check
        for mount, usage in metrics['disk'].items():
            if usage['percent'] > self.thresholds['disk_percent']:
                alerts.append({
                    'level': 'CRITICAL' if usage['percent'] > 95 else 'WARNING',
                    'type': 'DISK',
                    'message': f"High disk usage on {mount}: {usage['percent']}%",
                    'value': usage['percent'],
                    'threshold': self.thresholds['disk_percent']
                })
        
        # Process count check
        if metrics['processes']['total'] > self.thresholds['process_count']:
            alerts.append({
                'level': 'WARNING',
                'type': 'PROCESSES',
                'message': f"High process count: {metrics['processes']['total']}",
                'value': metrics['processes']['total'],
                'threshold': self.thresholds['process_count']
            })
        
        # Trigger alerts
        for alert in alerts:
            await self._trigger_alert(alert)
    
    async def _trigger_alert(self, alert: Dict):
        """Trigger an alert"""
        alert['timestamp'] = datetime.now().isoformat()
        self.alerts.append(alert)
        
        # Print alert
        level_emoji = {'INFO': 'ℹ️', 'WARNING': '⚠️', 'CRITICAL': '🚨'}.get(alert['level'], '📢')
        print(f"\n{level_emoji} ALERT: {alert['message']}")
    
    def _print_metrics(self, metrics: Dict):
        """Print metrics in a formatted way"""
        print(f"\n📊 System Metrics - {metrics['timestamp']}")
        print(f"├─ CPU: {metrics['cpu']['percent']}% | Load: {metrics['cpu']['load_avg'][0]:.2f}")
        print(f"├─ Memory: {metrics['memory']['percent']}% | "
              f"Used: {self._format_bytes(metrics['memory']['used'])} / "
              f"{self._format_bytes(metrics['memory']['total'])}")
        
        for mount, usage in metrics['disk'].items():
            if mount in ['/', '/mnt/c', '/mnt/f']:  # Show main mounts
                print(f"├─ Disk {mount}: {usage['percent']}% | "
                      f"Free: {self._format_bytes(usage['free'])}")
        
        print(f"├─ Network: ↑{self._format_bytes(metrics['network']['bytes_sent'])} "
              f"↓{self._format_bytes(metrics['network']['bytes_recv'])}")
        print(f"└─ Processes: {metrics['processes']['total']} total, "
              f"{metrics['processes']['running']} running")
    
    async def get_top_processes(self, sort_by: str = 'cpu', limit: int = 10) -> List[Dict]:
        """Get top processes by CPU or memory usage"""
        processes = []
        
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']):
            try:
                processes.append({
                    'pid': proc.info['pid'],
                    'name': proc.info['name'],
                    'cpu': proc.info['cpu_percent'],
                    'memory': proc.info['memory_percent']
                })
            except:
                pass
        
        # Sort by specified metric
        sort_key = 'cpu' if sort_by == 'cpu' else 'memory'
        processes.sort(key=lambda x: x[sort_key], reverse=True)
        
        return processes[:limit]
    
    async def check_service_health(self, services: List[str]) -> Dict[str, bool]:
        """Check if specific services are running"""
        health = {}
        
        for service in services:
            try:
                # Check if service is running (systemd)
                result = subprocess.run(
                    ['systemctl', 'is-active', service],
                    capture_output=True,
                    text=True
                )
                health[service] = result.stdout.strip() == 'active'
            except:
                # Try checking by process name
                health[service] = any(p.name() == service 
                                     for p in psutil.process_iter(['name']))
        
        return health
    
    async def monitor_logs(self, log_files: List[str], patterns: List[str]):
        """Monitor log files for specific patterns"""
        print(f"📝 Monitoring logs for patterns: {patterns}")
        
        # Track file positions
        file_positions = {}
        
        while self.monitoring:
            for log_file in log_files:
                if not os.path.exists(log_file):
                    continue
                
                # Get current file size
                current_size = os.path.getsize(log_file)
                last_position = file_positions.get(log_file, 0)
                
                if current_size > last_position:
                    # Read new content
                    with open(log_file, 'r') as f:
                        f.seek(last_position)
                        new_content = f.read()
                        
                        # Check for patterns
                        for pattern in patterns:
                            if pattern in new_content:
                                await self._trigger_alert({
                                    'level': 'WARNING',
                                    'type': 'LOG',
                                    'message': f"Pattern '{pattern}' found in {log_file}",
                                    'log_file': log_file,
                                    'pattern': pattern
                                })
                    
                    file_positions[log_file] = current_size
            
            await asyncio.sleep(5)
    
    def _format_bytes(self, bytes_value: int) -> str:
        """Format bytes to human readable format"""
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if bytes_value < 1024.0:
                return f"{bytes_value:.1f}{unit}"
            bytes_value /= 1024.0
        return f"{bytes_value:.1f}PB"
    
    def save_metrics(self, filename: str = "metrics.json"):
        """Save collected metrics to file"""
        with open(filename, 'w') as f:
            json.dump({
                'metrics': self.metrics_history,
                'alerts': self.alerts
            }, f, indent=2)
        print(f"💾 Metrics saved to {filename}")
    
    def generate_report(self) -> Dict:
        """Generate monitoring report"""
        if not self.metrics_history:
            return {'error': 'No metrics collected'}
        
        # Calculate averages
        cpu_avg = sum(m['cpu']['percent'] for m in self.metrics_history) / len(self.metrics_history)
        mem_avg = sum(m['memory']['percent'] for m in self.metrics_history) / len(self.metrics_history)
        
        report = {
            'monitoring_period': {
                'start': self.metrics_history[0]['timestamp'],
                'end': self.metrics_history[-1]['timestamp'],
                'samples': len(self.metrics_history)
            },
            'averages': {
                'cpu_percent': round(cpu_avg, 2),
                'memory_percent': round(mem_avg, 2)
            },
            'peaks': {
                'cpu_percent': max(m['cpu']['percent'] for m in self.metrics_history),
                'memory_percent': max(m['memory']['percent'] for m in self.metrics_history)
            },
            'alerts_triggered': len(self.alerts),
            'alert_summary': {}
        }
        
        # Count alerts by type
        for alert in self.alerts:
            alert_type = alert['type']
            report['alert_summary'][alert_type] = report['alert_summary'].get(alert_type, 0) + 1
        
        return report


async def main():
    """Example usage"""
    print("🤖 System Monitor Agent Demo\n")
    
    # Create monitor with custom thresholds
    monitor = SystemMonitorAgent({
        'cpu_percent': 70,
        'memory_percent': 80,
        'disk_percent': 85,
        'process_count': 300
    })
    
    # Start monitoring for 30 seconds
    await monitor.start_monitoring(interval=5, duration=30)
    
    # Get top processes
    top_procs = await monitor.get_top_processes(sort_by='cpu', limit=5)
    print("\n🔝 Top 5 CPU consumers:")
    for proc in top_procs:
        print(f"  {proc['name']}: {proc['cpu']}% CPU, {proc['memory']:.1f}% Memory")
    
    # Check service health
    services = ['docker', 'ssh', 'nginx']
    health = await monitor.check_service_health(services)
    print("\n🏥 Service Health:")
    for service, status in health.items():
        status_icon = "✅" if status else "❌"
        print(f"  {status_icon} {service}: {'Running' if status else 'Not running'}")
    
    # Generate report
    report = monitor.generate_report()
    print("\n📈 Monitoring Report:")
    print(json.dumps(report, indent=2))
    
    # Save metrics
    monitor.save_metrics("/mnt/f/DevOps/Agents/logs/system_metrics.json")


if __name__ == "__main__":
    asyncio.run(main())