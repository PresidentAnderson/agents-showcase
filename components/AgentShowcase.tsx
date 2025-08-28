'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Code, Database, FileSearch, Shield, Users } from 'lucide-react'

const agents = [
  {
    id: 'general-purpose',
    name: 'General Purpose Agent',
    description: 'Versatile AI agent for research, code searching, and multi-step task execution',
    icon: Bot,
    capabilities: ['Research', 'Code Search', 'Task Automation', 'File Analysis'],
    color: 'blue',
    featured: true
  },
  {
    id: 'code-review-expert',
    name: 'Code Review Expert',
    description: 'Expert code reviewer analyzing for best practices, bugs, and security',
    icon: Code,
    capabilities: ['Code Analysis', 'Security Review', 'Performance Optimization', 'Best Practices'],
    color: 'green',
    featured: true
  },
  {
    id: 'data-science-analyst',
    name: 'Data Science Analyst',
    description: 'Specialized in data analysis, pattern recognition, and insights generation',
    icon: Database,
    capabilities: ['Data Analysis', 'Pattern Recognition', 'Visualization', 'Statistical Analysis'],
    color: 'purple',
    featured: true
  },
  {
    id: 'disk-organizer',
    name: 'Disk Organizer',
    description: 'File system expert for organizing, cleaning, and managing storage',
    icon: FileSearch,
    capabilities: ['File Organization', 'Duplicate Detection', 'Storage Optimization', 'Cleanup'],
    color: 'orange',
    featured: false
  },
  {
    id: 'workspace-migration',
    name: 'Workspace Migration Analyst',
    description: 'Specializes in Google Workspace data migration and analysis',
    icon: Users,
    capabilities: ['Data Migration', 'Account Analysis', 'Deduplication', 'Organization'],
    color: 'teal',
    featured: false
  },
  {
    id: 'security-auditor',
    name: 'Security Auditor',
    description: 'Security-focused agent for vulnerability assessment and protection',
    icon: Shield,
    capabilities: ['Security Audit', 'Vulnerability Scanning', 'Risk Assessment', 'Compliance'],
    color: 'red',
    featured: false
  }
]

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    green: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    orange: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    teal: 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
    red: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}

export default function AgentShowcase() {
  const featuredAgents = agents.filter(agent => agent.featured)
  const otherAgents = agents.filter(agent => !agent.featured)

  return (
    <section className="py-20 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Meet Our AI Agents
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Specialized agents designed to excel at specific tasks. Each agent brings 
            unique capabilities and expertise to solve complex problems efficiently.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Featured Agents
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredAgents.map((agent) => {
              const IconComponent = agent.icon
              return (
                <Card key={agent.id} className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${getColorClasses(agent.color)}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">Featured</Badge>
                    </div>
                    <CardTitle className="text-xl">{agent.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Capabilities:</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((capability) => (
                          <Badge key={capability} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Specialized Agents
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {otherAgents.map((agent) => {
              const IconComponent = agent.icon
              return (
                <Card key={agent.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${getColorClasses(agent.color)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((capability) => (
                        <Badge key={capability} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}