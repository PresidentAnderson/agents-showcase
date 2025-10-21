'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bot, Code, Database, HardDrive, Brain, Search,
  Filter, Star, Users, TrendingUp,
  ArrowRight, Sparkles
} from 'lucide-react'
import Link from 'next/link'

export default function Agents() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const agents = [
    {
      id: 'general-purpose',
      name: 'General Purpose Agent',
      icon: Brain,
      category: 'general',
      description: 'A versatile AI agent capable of handling a wide range of tasks from research to analysis.',
      features: ['Multi-domain expertise', 'Natural language processing', 'Task automation'],
      stats: { users: '10K+', rating: 4.9, tasks: '1M+' },
      badge: 'Most Popular',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'code-review',
      name: 'Code Review Expert',
      icon: Code,
      category: 'development',
      description: 'Specialized in reviewing code, identifying bugs, and suggesting optimizations.',
      features: ['Multi-language support', 'Security analysis', 'Performance optimization'],
      stats: { users: '5K+', rating: 4.8, tasks: '500K+' },
      badge: 'Developer Favorite',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'data-science',
      name: 'Data Science Analyst',
      icon: Database,
      category: 'analytics',
      description: 'Advanced data analysis, visualization, and machine learning model development.',
      features: ['Statistical analysis', 'ML model training', 'Data visualization'],
      stats: { users: '3K+', rating: 4.7, tasks: '250K+' },
      badge: 'Analytics Pro',
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'disk-organizer',
      name: 'Disk Organizer',
      icon: HardDrive,
      category: 'utilities',
      description: 'Intelligent file organization and disk space management for optimal performance.',
      features: ['Smart categorization', 'Duplicate detection', 'Automated cleanup'],
      stats: { users: '8K+', rating: 4.6, tasks: '750K+' },
      badge: 'Efficiency Expert',
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 'research-assistant',
      name: 'Research Assistant',
      icon: Search,
      category: 'research',
      description: 'Comprehensive research capabilities with citation management and fact-checking.',
      features: ['Academic research', 'Citation management', 'Fact verification'],
      stats: { users: '4K+', rating: 4.8, tasks: '300K+' },
      badge: 'Academic Choice',
      color: 'from-indigo-600 to-purple-600'
    },
    {
      id: 'content-creator',
      name: 'Content Creator',
      icon: Sparkles,
      category: 'creative',
      description: 'Generate high-quality content for blogs, social media, and marketing campaigns.',
      features: ['SEO optimization', 'Multi-format support', 'Brand voice matching'],
      stats: { users: '6K+', rating: 4.7, tasks: '400K+' },
      badge: 'Creative Partner',
      color: 'from-pink-600 to-rose-600'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Agents', count: agents.length },
    { id: 'general', name: 'General', count: 1 },
    { id: 'development', name: 'Development', count: 1 },
    { id: 'analytics', name: 'Analytics', count: 1 },
    { id: 'utilities', name: 'Utilities', count: 1 },
    { id: 'research', name: 'Research', count: 1 },
    { id: 'creative', name: 'Creative', count: 1 }
  ]

  const filteredAgents = selectedCategory === 'all' 
    ? agents 
    : agents.filter(agent => agent.category === selectedCategory)

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch(sortBy) {
      case 'popular':
        return parseInt(b.stats.users) - parseInt(a.stats.users)
      case 'rating':
        return b.stats.rating - a.stats.rating
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            AI Agents Marketplace
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Powerful AI Agents
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from our collection of specialized agents designed to automate tasks, 
            boost productivity, and deliver exceptional results.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 bg-white/20">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAgents.map((agent) => (
              <Card key={agent.id} className="border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${agent.color} rounded-xl flex items-center justify-center`}>
                      <agent.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                      {agent.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Features */}
                    <div className="space-y-2">
                      {agent.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {agent.stats.users}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Users</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {agent.stats.rating}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Rating</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="w-3 h-3 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {agent.stats.tasks}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Tasks</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link href={`/agents/${agent.id}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Deploy Agent
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Agent CTA */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-12 text-center">
              <Bot className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Need a Custom Agent?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Can&apos;t find the perfect agent for your needs? Our team can help you create 
                a custom AI agent tailored to your specific requirements.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Request Custom Agent
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}