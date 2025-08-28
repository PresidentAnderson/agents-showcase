'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Code, 
  Database, 
  FileText, 
  Laptop, 
  Shield,
  TrendingUp,
  Users2
} from 'lucide-react'

const useCases = [
  {
    title: 'Software Development',
    description: 'Accelerate development cycles with intelligent code review, testing, and optimization.',
    icon: Code,
    color: 'blue',
    agents: ['Code Review Expert', 'General Purpose Agent'],
    benefits: [
      'Automated code reviews',
      'Bug detection and fixes',
      'Performance optimization',
      'Best practice enforcement'
    ],
    metrics: '85% faster code reviews'
  },
  {
    title: 'Enterprise Operations',
    description: 'Streamline business operations with automated workflows and intelligent analysis.',
    icon: Building2,
    color: 'green',
    agents: ['General Purpose Agent', 'Data Science Analyst'],
    benefits: [
      'Process automation',
      'Document analysis',
      'Workflow optimization',
      'Compliance monitoring'
    ],
    metrics: '60% reduction in manual tasks'
  },
  {
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with advanced analysis and visualization.',
    icon: Database,
    color: 'purple',
    agents: ['Data Science Analyst', 'General Purpose Agent'],
    benefits: [
      'Pattern recognition',
      'Predictive analytics',
      'Automated reporting',
      'Data visualization'
    ],
    metrics: '3x faster insights generation'
  },
  {
    title: 'Content Management',
    description: 'Organize, analyze, and optimize content across all platforms and formats.',
    icon: FileText,
    color: 'orange',
    agents: ['Disk Organizer', 'General Purpose Agent'],
    benefits: [
      'Content organization',
      'Duplicate detection',
      'SEO optimization',
      'Format standardization'
    ],
    metrics: '70% improvement in content findability'
  },
  {
    title: 'DevOps & Infrastructure',
    description: 'Automate deployment, monitoring, and maintenance of development infrastructure.',
    icon: Laptop,
    color: 'teal',
    agents: ['General Purpose Agent', 'Code Review Expert'],
    benefits: [
      'Automated deployments',
      'Infrastructure monitoring',
      'Security scanning',
      'Performance optimization'
    ],
    metrics: '50% reduction in deployment time'
  },
  {
    title: 'Security & Compliance',
    description: 'Enhance security posture with continuous monitoring and vulnerability assessment.',
    icon: Shield,
    color: 'red',
    agents: ['Code Review Expert', 'General Purpose Agent'],
    benefits: [
      'Vulnerability scanning',
      'Compliance auditing',
      'Risk assessment',
      'Security reporting'
    ],
    metrics: '90% faster security audits'
  },
  {
    title: 'Business Intelligence',
    description: 'Drive strategic decisions with comprehensive data analysis and market insights.',
    icon: TrendingUp,
    color: 'indigo',
    agents: ['Data Science Analyst', 'General Purpose Agent'],
    benefits: [
      'Market analysis',
      'Performance metrics',
      'Trend identification',
      'Strategic planning'
    ],
    metrics: '40% improvement in decision accuracy'
  },
  {
    title: 'Team Collaboration',
    description: 'Enhance team productivity with intelligent coordination and communication tools.',
    icon: Users2,
    color: 'emerald',
    agents: ['General Purpose Agent', 'Workspace Migration Analyst'],
    benefits: [
      'Team coordination',
      'Knowledge sharing',
      'Task automation',
      'Communication optimization'
    ],
    metrics: '35% increase in team productivity'
  }
]

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20',
    green: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20',
    purple: 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20',
    orange: 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20',
    teal: 'border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/20',
    red: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
    indigo: 'border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/20',
    emerald: 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20'
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}

const getIconColorClasses = (color: string) => {
  const colorMap = {
    blue: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-800/50',
    green: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-800/50',
    purple: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-800/50',
    orange: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-800/50',
    teal: 'text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-800/50',
    red: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-800/50',
    indigo: 'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-800/50',
    emerald: 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-800/50'
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}

export default function UseCases() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Real-World Applications
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how organizations across industries are leveraging AI agents to solve complex 
            challenges and drive innovation. From startups to enterprises, our agents deliver results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon
            return (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 ${getColorClasses(useCase.color)} border-l-4`}>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${getIconColorClasses(useCase.color)}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{useCase.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Key Benefits:
                    </h4>
                    <div className="space-y-1">
                      {useCase.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Recommended Agents:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {useCase.agents.map((agent, agentIndex) => (
                        <Badge key={agentIndex} variant="outline" className="text-xs">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {useCase.metrics}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Custom Solutions Available
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                Don't see your use case? Our platform supports custom agent development and 
                integration. Work with our team to create specialized solutions for your unique requirements.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Development</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tailored agents for specific business requirements
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Expert Consultation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Strategic guidance on AI agent implementation
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ongoing Support</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Continuous optimization and performance monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}