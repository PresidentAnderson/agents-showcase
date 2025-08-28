import Hero from '@/components/Hero'
import AgentShowcase from '@/components/AgentShowcase'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Hero />
      <AgentShowcase />
      <Features />
      <UseCases />
      <Footer />
    </main>
  )
}
