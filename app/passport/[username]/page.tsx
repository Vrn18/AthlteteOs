'use client'

import React from 'react'
import Link from 'next/link'
import {
  Trophy,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  Share2,
  Activity,
  Award,
  Zap,
} from 'lucide-react'
import { AthletePassportCard } from '@/components/dashboard/athlete-passport-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CURRENT_USER, CURRENT_USER_KARMA, CURRENT_USER_SPORTS } from '@/lib/store'

export default function PublicPassportPage({ params }: { params: { username: string } }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-brand-bright selection:text-white">
      
      {/* Top Brand Bar */}
      <header className="border-b border-white/10 px-6 py-4 bg-slate-900/50 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
              <Trophy className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Athlete<span className="text-brand-bright">OS</span>
            </span>
          </Link>

          <Link href="/auth/signup">
            <Button size="sm" variant="bright" className="text-xs font-bold gap-1.5 shadow-md">
              <span>Claim Your Athlete Passport</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Passport Showcase */}
      <main className="container mx-auto max-w-4xl px-4 py-12 space-y-12">
        
        {/* Intro Tag */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Official Verified Athletic Passport</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {CURRENT_USER.full_name}'s Sports Identity
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Indiranagar, Bangalore • Tier 4 Pro • Diamond Anti-Ghosting Karma
          </p>
        </div>

        {/* 3D Passport Component */}
        <div className="max-w-md mx-auto">
          <AthletePassportCard
            athlete={CURRENT_USER}
            karma={CURRENT_USER_KARMA}
            sports={CURRENT_USER_SPORTS}
          />
        </div>

        {/* Viral Conversion Box */}
        <div className="bg-gradient-to-r from-blue-900/60 via-brand-navy to-indigo-950 p-8 rounded-3xl border border-white/10 text-center space-y-4 shadow-2xl max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Ready to track your sports life on one platform?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Join thousands of cricketers, footballers, and badminton players in Bangalore. Build your verified passport, find matches in minutes, and never miss a game.
          </p>
          <div className="pt-2">
            <Link href="/auth/signup">
              <Button size="lg" variant="bright" className="font-bold text-sm px-8 shadow-xl">
                Create Free Athlete Passport
              </Button>
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © 2026 AthleteOS • Verified Sports Identity System
      </footer>

    </div>
  )
}
