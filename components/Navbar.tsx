'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAgentsOpen, setIsAgentsOpen] = useState(false)

  const agents = [
    { name: 'General Purpose', href: '/agents/general' },
    { name: 'Code Review Expert', href: '/agents/code-review' },
    { name: 'Data Science Analyst', href: '/agents/data-science' },
    { name: 'Disk Organizer', href: '/agents/disk-organizer' },
    { name: 'View All', href: '/agents' }
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">AI Agents</span>
            </Link>
            
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-8">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Home
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setIsAgentsOpen(!isAgentsOpen)}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Agents
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isAgentsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isAgentsOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {agents.map((agent) => (
                        <Link
                          key={agent.name}
                          href={agent.href}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsAgentsOpen(false)}
                        >
                          {agent.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Features
              </Link>
              
              <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Pricing
              </Link>
              
              <Link href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Docs
              </Link>
              
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:items-center md:gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="px-3 py-2">
              <button
                onClick={() => setIsAgentsOpen(!isAgentsOpen)}
                className="flex w-full items-center justify-between text-base font-medium text-gray-700 dark:text-gray-300"
              >
                Agents
                <ChevronDown className={`h-4 w-4 transition-transform ${isAgentsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAgentsOpen && (
                <div className="mt-2 space-y-1 pl-4">
                  {agents.map((agent) => (
                    <Link
                      key={agent.name}
                      href={agent.href}
                      className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsAgentsOpen(false)
                      }}
                    >
                      {agent.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link
              href="/features"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            
            <Link
              href="/pricing"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            
            <Link
              href="/docs"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </Link>
            
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 pb-2 space-y-2">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}