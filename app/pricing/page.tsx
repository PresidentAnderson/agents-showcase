'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, Zap, Shield, Crown } from 'lucide-react'
import Link from 'next/link'

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      description: 'Perfect for individuals and small projects',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        { name: 'Up to 5 AI Agents', included: true },
        { name: '1,000 tasks per month', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'API access', included: false },
        { name: 'Custom integrations', included: false },
        { name: 'Priority support', included: false },
        { name: 'Advanced analytics', included: false }
      ],
      cta: 'Start Free Trial',
      highlighted: false
    },
    {
      name: 'Professional',
      icon: Shield,
      description: 'Ideal for growing teams and businesses',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { name: 'Up to 20 AI Agents', included: true },
        { name: '10,000 tasks per month', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority email support', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Priority support', included: false },
        { name: 'Dedicated account manager', included: false }
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      description: 'For large organizations with custom needs',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: [
        { name: 'Unlimited AI Agents', included: true },
        { name: 'Unlimited tasks', included: true },
        { name: 'Enterprise analytics', included: true },
        { name: '24/7 phone & email support', included: true },
        { name: 'Full API access', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Dedicated support team', included: true },
        { name: 'SLA guarantee', included: true }
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ]

  const currentPrice = (plan: typeof plans[0]) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12)
  }

  const savings = (plan: typeof plans[0]) => {
    if (billingPeriod === 'yearly') {
      const yearlySavings = (plan.monthlyPrice * 12) - plan.yearlyPrice
      return Math.floor((yearlySavings / (plan.monthlyPrice * 12)) * 100)
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            Pricing Plans
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required. 
            Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                Save up to 20%
              </Badge>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative border-gray-200 dark:border-gray-700 ${
                plan.highlighted 
                  ? 'ring-2 ring-blue-600 shadow-xl scale-105' 
                  : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4 mx-auto">
                  <plan.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${currentPrice(plan)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      /{billingPeriod === 'monthly' ? 'month' : 'month'}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && savings(plan) > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Save {savings(plan)}% annually
                    </p>
                  )}
                  {billingPeriod === 'yearly' && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Billed ${plan.yearlyPrice} per year
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <Link href={plan.name === 'Enterprise' ? '/contact' : '/signup'}>
                  <Button 
                    className={`w-full mb-6 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
                
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${
                        feature.included 
                          ? 'text-gray-700 dark:text-gray-300' 
                          : 'text-gray-400 dark:text-gray-500'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We offer flexible plans for organizations with specific requirements. 
            Let&apos;s discuss how we can help your team succeed.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Talk to Sales
            </Button>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto text-left space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I change plans later?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is there a free trial?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                All plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}