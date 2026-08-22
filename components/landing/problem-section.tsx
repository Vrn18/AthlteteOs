import React from 'react'
import {
  MessageSquare,
  Smartphone,
  Users2,
  XCircle,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Search,
  Trophy,
  Activity,
  Flame,
  Zap,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ProblemSection() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="font-bold text-xs uppercase tracking-wider">
            The Fragmentation Problem
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Your sports life shouldn't be scattered across five different places.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Athletes depend on chaotic WhatsApp groups, separate fitness apps, and disorganized local networks. AthleteOS brings everything into one unified digital ecosystem.
          </p>
        </div>

        {/* Visual Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card 1: TODAY (Fragmented) */}
          <div className="rounded-3xl border-2 border-red-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-bl-2xl border-l border-b border-red-200 flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-red-600" />
              <span>TODAY: FRAGMENTED</span>
            </div>

            <div className="space-y-6 pt-3">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="text-red-500 font-extrabold">✕</span> Disconnected & Frustrating
              </h3>

              {/* 3 Fragmented Pillars */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-red-50/60 rounded-2xl border border-red-100 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-xs text-slate-800">WhatsApp</span>
                  <span className="text-[11px] text-slate-500 mt-1">Finding players in endless spam chats</span>
                </div>

                <div className="p-3 bg-red-50/60 rounded-2xl border border-red-100 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-xs text-slate-800">Fitness App</span>
                  <span className="text-[11px] text-slate-500 mt-1">Tracking stats trapped in silos</span>
                </div>

                <div className="p-3 bg-red-50/60 rounded-2xl border border-red-100 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2">
                    <Users2 className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-xs text-slate-800">Local Groups</span>
                  <span className="text-[11px] text-slate-500 mt-1">Finding games with zero skill matching</span>
                </div>
              </div>

              {/* Down arrows to fragmented result */}
              <div className="flex justify-center text-red-400">
                <span className="text-sm font-semibold">↓↓↓</span>
              </div>

              <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 text-center text-xs font-semibold text-red-700">
                ⚠️ Result: Missed matches, last-minute dropouts, skill mismatches & lost performance history.
              </div>
            </div>
          </div>

          {/* Card 2: ATHLETEOS (Unified One Platform) */}
          <div className="rounded-3xl border-2 border-brand-bright/40 bg-gradient-to-b from-white to-blue-50/30 p-6 sm:p-8 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-bright text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>ATHLETEOS: ONE PLATFORM</span>
            </div>

            <div className="space-y-6 pt-3">
              <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <span className="text-brand-bright font-extrabold">✓</span> Unified & Intelligent Flow
              </h3>

              {/* 5 Seamless Steps Flow */}
              <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 p-3.5 bg-white rounded-2xl border border-blue-100 shadow-sm text-center">
                <div className="flex flex-col items-center p-1.5">
                  <span className="text-xs font-bold text-brand-blue">01 Profile</span>
                  <span className="text-[10px] text-slate-500">Universal ID</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <div className="flex flex-col items-center p-1.5">
                  <span className="text-xs font-bold text-brand-blue">02 Discover</span>
                  <span className="text-[10px] text-slate-500">Smart Match</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <div className="flex flex-col items-center p-1.5">
                  <span className="text-xs font-bold text-brand-blue">03 Match</span>
                  <span className="text-[10px] text-slate-500">Instant RSVP</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <div className="flex flex-col items-center p-1.5">
                  <span className="text-xs font-bold text-brand-blue">04 Chat</span>
                  <span className="text-[10px] text-slate-500">Coordinate</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <div className="flex flex-col items-center p-1.5">
                  <span className="text-xs font-bold text-brand-bright">05 Play</span>
                  <span className="text-[10px] text-slate-500">Track & Grow</span>
                </div>
              </div>

              {/* Verified Result Banner */}
              <div className="p-3.5 bg-green-50 rounded-xl border border-green-200 text-center text-xs font-semibold text-green-800 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <span>One verified identity, automated compatibility matching, and instant coordination.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
