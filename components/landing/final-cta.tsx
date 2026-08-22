import React from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Trophy, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function FinalCTA() {
  const checklist = [
    'Build your single universal athlete profile',
    'Discover verified players & nearby teams',
    'Find and register for local sporting events',
    'Create, host, and join matches with 1-click RSVP',
    'Chat and coordinate with your sports community',
    'Track performance milestones, win-rates & stamina',
    'Build your verified athletic reputation and ranking',
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto rounded-3xl bg-brand-navy text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-slate-800">
          
          {/* Subtle Decorative Background Element */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-bright/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8 text-center sm:text-left">
            
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Ready in 2 minutes • 100% Free to Get Started</span>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Everything you need to play your sport better.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-normal">
                Join thousands of athletes in Bangalore who have stopped using disorganized group chats and upgraded to AthleteOS.
              </p>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom CTA & Sub-tagline */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-200">
                  Your sport. Your people. Your community.
                </p>
                <p className="text-xs text-slate-400">
                  Universal digital identity for modern sports enthusiasts.
                </p>
              </div>

              <Link href="/dashboard/profile" className="w-full sm:w-auto">
                <Button size="lg" variant="bright" className="w-full sm:w-auto font-bold gap-2 text-base px-8 shadow-lg hover:shadow-xl">
                  <span>Create Free Athlete Profile</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
