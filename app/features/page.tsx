'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Zap, Shield, Code, Brain, Cloud, Lock, 
  Gauge, Users, Globe, Smartphone, Layers, 
  RefreshCw, BarChart, Terminal, Puzzle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default function Features() {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'Advanced AI Models',
      description: 'Powered by state-of-the-art language models and machine learning algorithms for superior performance.',
      benefits: ['GPT-4 and Claude integration', 'Custom model training', 'Multi-modal capabilities']
    },
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Optimized infrastructure ensures your agents complete tasks in seconds, not minutes.',
      benefits: ['Parallel processing', 'Edge computing', 'Real-time responses']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols to keep your data safe and compliant.',
      benefits: ['SOC 2 certified', 'GDPR compliant', 'End-to-end encryption']
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Comprehensive APIs and SDKs for seamless integration with your existing tools.',
      benefits: ['RESTful API', 'WebSocket support', 'Multiple SDK languages']
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built for teams with role-based access control and collaborative workflows.',
      benefits: ['Shared workspaces', 'Permission management', 'Audit logs']
    },
    {
      icon: Cloud,
      title: 'Cloud Native',
      description: 'Fully managed cloud infrastructure that scales automatically with your needs.',
      benefits: ['Auto-scaling', '99.9% uptime SLA', 'Global CDN']
    }
  ]

  const capabilities = [
    { icon: Terminal, name: 'Code Generation', description: 'Generate production-ready code in any language' },
    { icon: BarChart, name: 'Data Analysis', description: 'Process and analyze large datasets instantly' },
    { icon: Globe, name: 'Multi-language', description: 'Support for 100+ programming and natural languages' },
    { icon: Smartphone, name: 'Mobile Ready', description: 'Access your agents from any device, anywhere' },
    { icon: Layers, name: 'Integration Hub', description: 'Connect with 500+ third-party services' },
    { icon: RefreshCw, name: 'Auto Updates', description: 'Always get the latest features and improvements' },
    { icon: Puzzle, name: 'Custom Plugins', description: 'Extend functionality with custom plugins' },
    { icon: Gauge, name: 'Performance Monitoring', description: 'Real-time metrics and performance insights' },
    { icon: Lock, name: 'Access Control', description: 'Fine-grained permissions and security policies' }
  ]

  const comparisonData = [
    { feature: 'Setup Time', traditional: '2-4 weeks', aiAgents: '5 minutes' },
    { feature: 'Processing Speed', traditional: '10-30 min/task', aiAgents: '10-30 sec/task' },
    { feature: 'Accuracy Rate', traditional: '85-90%', aiAgents: '95-99%' },
    { feature: 'Scalability', traditional: 'Limited', aiAgents: 'Unlimited' },
    { feature: 'Cost per Task', traditional: '$15-50', aiAgents: '$0.10-1' },
    { feature: '24/7 Availability', traditional: 'No', aiAgents: 'Yes' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            Platform Features
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Automate & Scale
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the powerful features that make our AI agents the perfect solution 
            for automating complex tasks and scaling your operations.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Capabilities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive suite of tools and features designed for modern teams
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <capability.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {capability.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose AI Agents?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              See how we compare to traditional automation solutions
            </p>
          </div>
          
          <Card className="border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      Traditional Solutions
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      AI Agents Platform
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {comparisonData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">
                        {row.traditional}
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          {row.aiAgents}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your free trial today and see how AI agents can transform your workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}