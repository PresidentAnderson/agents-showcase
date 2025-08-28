'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  Brain, 
  Shield, 
  Clock, 
  Users, 
  Target,
  Workflow,
  BarChart3,
  Code2,
  FileCheck
} from 'lucide-react'

const features = [
  {
    title: 'Autonomous Operation',
    description: 'Agents work independently, handling complex multi-step tasks without constant supervision.',
    icon: Brain,
    color: 'blue',
    benefits: ['Self-guided execution', 'Multi-step planning', 'Adaptive problem solving']
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized for speed and efficiency, delivering results in seconds not hours.',
    icon: Zap,
    color: 'yellow',
    benefits: ['Instant responses', 'Parallel processing', 'Optimized workflows']
  },
  {
    title: 'Enterprise Security',
    description: 'Built with security-first approach, protecting sensitive data and operations.',
    icon: Shield,
    color: 'red',
    benefits: ['Data encryption', 'Access controls', 'Audit trails']
  },
  {
    title: '24/7 Availability',
    description: 'Always ready to assist, providing consistent performance around the clock.',
    icon: Clock,
    color: 'green',
    benefits: ['No downtime', 'Global accessibility', 'Consistent performance']
  },
  {
    title: 'Collaborative',
    description: 'Seamlessly integrate with existing teams and workflows.',
    icon: Users,
    color: 'purple',
    benefits: ['Team integration', 'Workflow compatibility', 'Communication tools']
  },
  {
    title: 'Precision Focused',
    description: 'Specialized agents for specific tasks ensure high-quality, accurate results.',
    icon: Target,
    color: 'orange',
    benefits: ['Task specialization', 'High accuracy', 'Quality assurance']
  },
  {
    title: 'Workflow Integration',
    description: 'Easy integration with existing tools and development environments.',
    icon: Workflow,
    color: 'teal',
    benefits: ['API integration', 'Tool compatibility', 'Custom workflows']
  },
  {
    title: 'Analytics & Insights',
    description: 'Comprehensive reporting and analytics for performance monitoring.',
    icon: BarChart3,
    color: 'indigo',
    benefits: ['Performance metrics', 'Usage analytics', 'Trend analysis']
  },
  {
    title: 'Code Intelligence',
    description: 'Advanced code analysis, review, and optimization capabilities.',
    icon: Code2,
    color: 'emerald',
    benefits: ['Code review', 'Bug detection', 'Optimization suggestions']
  },
  {
    title: 'Quality Assurance',
    description: 'Built-in quality checks and validation for all agent outputs.',
    icon: FileCheck,
    color: 'rose',
    benefits: ['Output validation', 'Quality metrics', 'Error detection']
  }
]

const getIconColorClasses = (color: string) => {
  const colorMap = {
    blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400',
    yellow: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400',
    red: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400',
    green: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400',
    purple: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400',
    orange: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400',
    teal: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20 dark:text-teal-400',
    indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400',
    emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400',
    rose: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400'
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}

export default function Features() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Why Choose Our Agents
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built for performance, security, and reliability. Our AI agents combine cutting-edge 
            technology with practical functionality to deliver exceptional results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${getIconColorClasses(feature.color)}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <Badge key={benefitIndex} variant="outline" className="text-xs mr-1 mb-1">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of teams already using AI agents to automate complex tasks, 
              improve code quality, and accelerate development cycles.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                99.9% Uptime
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Sub-second Response
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Enterprise Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}