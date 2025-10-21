'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  Bot, 
  BarChart3, 
  Settings, 
  CreditCard,
  LogOut,
  Plus,
  Play,
  Pause,
  Trash2,
  Clock,
  Activity,
  Users
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const stats = [
    { label: 'Active Agents', value: '12', change: '+2', icon: Bot },
    { label: 'Tasks Completed', value: '1,284', change: '+18%', icon: Activity },
    { label: 'Time Saved', value: '48h', change: '+12%', icon: Clock },
    { label: 'Team Members', value: '8', change: '+1', icon: Users }
  ]

  const agents = [
    { 
      id: 1,
      name: 'Code Review Expert',
      status: 'active',
      tasks: 234,
      efficiency: '98%',
      lastActive: '2 min ago'
    },
    {
      id: 2,
      name: 'Data Science Analyst',
      status: 'active',
      tasks: 156,
      efficiency: '95%',
      lastActive: '15 min ago'
    },
    {
      id: 3,
      name: 'General Purpose Agent',
      status: 'paused',
      tasks: 89,
      efficiency: '92%',
      lastActive: '1 hour ago'
    },
    {
      id: 4,
      name: 'Disk Organizer',
      status: 'inactive',
      tasks: 45,
      efficiency: '88%',
      lastActive: '3 hours ago'
    }
  ]

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'agents', label: 'My Agents', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'inactive': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Welcome back</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">John Doe</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
            </div>
            
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="absolute bottom-6 left-6 right-6">
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Monitor your AI agents and track performance</p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <Card key={stat.label} className="border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="w-8 h-8 text-blue-600" />
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          {stat.change}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Agents List */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Your Agents</CardTitle>
                    <CardDescription>Manage and monitor your AI agents</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Agent
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agents.map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                              <span>{agent.tasks} tasks</span>
                              <span>•</span>
                              <span>{agent.efficiency} efficiency</span>
                              <span>•</span>
                              <span>{agent.lastActive}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {agent.status === 'active' ? (
                            <Button size="sm" variant="ghost">
                              <Pause className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'agents' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Agents</h1>
              <p className="text-gray-600 dark:text-gray-400">Configure and manage your AI agents</p>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400">Track performance and usage metrics</p>
            </div>
          )}
          
          {activeTab === 'billing' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Billing</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your subscription and payment methods</p>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
              <p className="text-gray-600 dark:text-gray-400">Configure your account and preferences</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}