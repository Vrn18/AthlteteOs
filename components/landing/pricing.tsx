'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, Minus, Zap, Sparkles, Shield, Trophy } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const comparisonRows = [
    { name: 'Universal Athlete Profile', free: '✓', pro: '✓', coach: '✓' },
    { name: 'Discover Local Athletes', free: '✓', pro: '✓', coach: '✓' },
    { name: 'Join Matches & Events', free: '✓', pro: '✓', coach: '✓' },
    { name: 'Create & Host Matches', free: '✓', pro: '✓', coach: '✓' },
    { name: 'Performance Tracking', free: 'Basic', pro: 'Advanced', coach: 'Advanced' },
    { name: 'Profile Visibility', free: 'Standard', pro: 'Boosted (3x)', coach: 'Top Tier' },
    { name: 'Advanced Match Filters', free: '—', pro: '✓', coach: '✓' },
    { name: 'Team & Squad Management', free: '—', pro: '—', coach: '✓' },
    { name: 'Coach Drills & Clinics', free: '—', pro: '—', coach: '✓' },
    { name: 'Deep Performance Analytics', free: '—', pro: '✓', coach: '✓' },
  ]

  return (
    <section id="pricing" className="py-20 bg-white border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="font-bold text-xs uppercase tracking-wider">
            Simple & Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Plans built to grow your athletic potential
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Start completely free for early network-effect community users. Upgrade anytime for pro analytics and team management.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-16">
          
          {/* Card 1: FREE */}
          <Card className="rounded-3xl border-2 border-slate-200 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <CardHeader className="space-y-4">
              <Badge variant="secondary" className="w-fit text-slate-600 font-semibold">
                COMMUNITY TIER
              </Badge>
              <div>
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-1">
                  Everything you need to discover matches and play.
                </CardDescription>
              </div>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-extrabold text-brand-navy">₹0</span>
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 border-t border-slate-100 pt-6">
              {[
                'Single universal athlete profile',
                'Join unlimited open matches',
                'Host up to 3 matches / week',
                'Direct messaging & match coordination',
                'Basic stats & match logging',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Check className="h-4 w-4 text-green-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full font-semibold border-slate-300">
                  Get Started Free
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Card 2: PRO (MOST POPULAR) */}
          <Card className="rounded-3xl border-2 border-brand-bright bg-gradient-to-b from-white to-blue-50/20 shadow-xl relative flex flex-col justify-between transform lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-blue to-brand-bright text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>MOST POPULAR</span>
            </div>

            <CardHeader className="space-y-4 pt-8">
              <Badge variant="bright" className="w-fit font-bold">
                ATHLETE PRO
              </Badge>
              <div>
                <CardTitle className="text-2xl font-bold text-brand-navy">Pro Athlete</CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-1">
                  For competitive players seeking priority matches & data.
                </CardDescription>
              </div>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-extrabold text-brand-navy">₹199</span>
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 border-t border-slate-100 pt-6">
              {[
                'Everything in Free tier',
                'Boosted profile visibility (3x discovery priority)',
                'Advanced compatibility filters & telemetry',
                'Deep performance analytics & trend charts',
                'Verified Pro badge on athlete identity',
                'Unlimited match hosting & tournament alerts',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                  <Check className="h-4 w-4 text-brand-bright shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <Link href="/dashboard" className="w-full">
                <Button variant="bright" className="w-full font-bold shadow-md hover:shadow-lg">
                  Upgrade to Athlete Pro
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Card 3: COACH / TEAM */}
          <Card className="rounded-3xl border-2 border-slate-200 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <CardHeader className="space-y-4">
              <Badge variant="secondary" className="w-fit text-slate-600 font-semibold">
                SQUADS & TRAINERS
              </Badge>
              <div>
                <CardTitle className="text-2xl font-bold">Coach / Team</CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-1">
                  For clubs, academy coaches, and team managers.
                </CardDescription>
              </div>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-extrabold text-brand-navy">₹499</span>
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 border-t border-slate-100 pt-6">
              {[
                'Everything in Pro tier',
                'Full squad roster & attendance manager',
                'Create and monetize coaching clinics',
                'Talent discovery & scouting filters',
                'Team finances & ground fees tracking',
                'Dedicated academy profile branding',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Check className="h-4 w-4 text-green-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <Link href="/dashboard" className="w-full">
                <Button variant="navy" className="w-full font-semibold">
                  Get Coach & Team Plan
                </Button>
              </Link>
            </CardFooter>
          </Card>

        </div>

        {/* Detailed Comparison Table (PDF Page 6) */}
        <div className="max-w-5xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 overflow-x-auto">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-brand-navy">Feature Architecture Matrix</h3>
            <p className="text-xs text-slate-500">Comprehensive breakdown across all subscription tiers.</p>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th className="py-3 px-4 font-bold text-brand-navy">Feature / Capability</th>
                <th className="py-3 px-4 font-bold text-slate-700 text-center">Free (₹0)</th>
                <th className="py-3 px-4 font-bold text-brand-bright text-center">Athlete Pro (₹199)</th>
                <th className="py-3 px-4 font-bold text-brand-navy text-center">Coach / Team (₹499)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.name}
                  className={`border-b border-slate-200 ${i % 2 === 0 ? 'bg-white/60' : 'bg-transparent'}`}
                >
                  <td className="py-3 px-4 font-medium text-slate-800">{row.name}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-700">{row.free}</td>
                  <td className="py-3 px-4 text-center font-bold text-brand-bright">{row.pro}</td>
                  <td className="py-3 px-4 text-center font-bold text-brand-navy">{row.coach}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}
