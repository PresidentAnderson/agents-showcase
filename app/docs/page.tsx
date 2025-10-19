'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Book, Code, Terminal, Rocket, Settings, Shield,
  ChevronRight, Search, Copy, Check, ExternalLink,
  FileCode, Database, Cloud, Cpu
} from 'lucide-react'
import Link from 'next/link'

export default function Docs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const quickStartSteps = [
    {
      number: '1',
      title: 'Install the SDK',
      description: 'Get started by installing our SDK in your preferred language',
      code: 'npm install @aiagents/sdk',
      language: 'bash'
    },
    {
      number: '2',
      title: 'Initialize Client',
      description: 'Create a new client instance with your API key',
      code: `import { AIAgents } from '@aiagents/sdk';

const client = new AIAgents({
  apiKey: process.env.AI_AGENTS_API_KEY
});`,
      language: 'javascript'
    },
    {
      number: '3',
      title: 'Create Your First Agent',
      description: 'Deploy an agent to handle your tasks',
      code: `const agent = await client.agents.create({
  name: 'Code Review Expert',
  type: 'code-review',
  config: {
    language: 'javascript',
    rules: ['eslint', 'prettier']
  }
});`,
      language: 'javascript'
    }
  ]

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/agents',
      description: 'List all agents'
    },
    {
      method: 'POST',
      endpoint: '/api/agents',
      description: 'Create a new agent'
    },
    {
      method: 'GET',
      endpoint: '/api/agents/:id',
      description: 'Get agent details'
    },
    {
      method: 'PUT',
      endpoint: '/api/agents/:id',
      description: 'Update agent configuration'
    },
    {
      method: 'DELETE',
      endpoint: '/api/agents/:id',
      description: 'Delete an agent'
    },
    {
      method: 'POST',
      endpoint: '/api/agents/:id/execute',
      description: 'Execute agent task'
    }
  ]

  const docSections = [
    {
      icon: Rocket,
      title: 'Getting Started',
      description: 'Learn the basics and get up and running quickly',
      link: '/docs/getting-started',
      items: ['Installation', 'Authentication', 'First Agent', 'Basic Concepts']
    },
    {
      icon: FileCode,
      title: 'API Reference',
      description: 'Complete API documentation with examples',
      link: '/docs/api',
      items: ['REST API', 'WebSocket API', 'GraphQL', 'Rate Limits']
    },
    {
      icon: Code,
      title: 'SDKs & Libraries',
      description: 'Official SDKs for popular languages',
      link: '/docs/sdks',
      items: ['JavaScript/TypeScript', 'Python', 'Go', 'Java']
    },
    {
      icon: Database,
      title: 'Agent Types',
      description: 'Explore different agent types and capabilities',
      link: '/docs/agents',
      items: ['General Purpose', 'Code Review', 'Data Analysis', 'Custom Agents']
    },
    {
      icon: Cloud,
      title: 'Deployment',
      description: 'Deploy and scale your agents',
      link: '/docs/deployment',
      items: ['Cloud Deployment', 'On-Premise', 'Docker', 'Kubernetes']
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Security best practices and compliance',
      link: '/docs/security',
      items: ['Authentication', 'Encryption', 'Compliance', 'Audit Logs']
    }
  ]

  const codeExamples = [
    {
      title: 'JavaScript',
      code: `// Execute a task with an agent
const result = await agent.execute({
  task: 'Review this pull request',
  data: {
    repo: 'user/repo',
    pr: 123
  }
});

console.log(result.summary);`
    },
    {
      title: 'Python',
      code: `# Execute a task with an agent
result = agent.execute(
    task="Analyze this dataset",
    data={
        "file": "data.csv",
        "metrics": ["mean", "std"]
    }
)

print(result.insights)`
    },
    {
      title: 'cURL',
      code: `curl -X POST https://api.aiagents.com/v1/agents/123/execute \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "Generate unit tests",
    "code": "function add(a, b) { return a + b; }"
  }'`
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              Documentation
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Developer Documentation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to integrate and deploy AI agents in your applications
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((section, index) => (
              <Card key={index} className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {section.description}
                      </p>
                      <ul className="space-y-1 mb-4">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <ChevronRight className="w-3 h-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link href={section.link}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                          View Documentation
                          <ExternalLink className="ml-1 w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Quick Start Guide
          </h2>
          
          <div className="space-y-8">
            {quickStartSteps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {step.description}
                    </p>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(step.code, `step-${index}`)}
                        className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                      >
                        {copiedCode === `step-${index}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            API Endpoints
          </h2>
          
          <Card className="border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Endpoint
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {apiEndpoints.map((endpoint, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">
                        <Badge className={`
                          ${endpoint.method === 'GET' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : ''}
                          ${endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : ''}
                          ${endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' : ''}
                          ${endpoint.method === 'DELETE' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : ''}
                        `}>
                          {endpoint.method}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-900 dark:text-white">
                        {endpoint.endpoint}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {endpoint.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Code Examples
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {codeExamples.map((example, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {example.title}
                  </h4>
                </div>
                <div className="relative">
                  <pre className="p-4 text-sm overflow-x-auto bg-gray-900 text-gray-100">
                    <code>{example.code}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(example.code, `example-${index}`)}
                    className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    {copiedCode === `example-${index}` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Need Help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our team is here to help you get the most out of AI Agents
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline">
                  Join Community
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}