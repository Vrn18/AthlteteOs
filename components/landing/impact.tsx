import React from 'react'
import {
  Sparkles,
  Compass,
  Users2,
  Trophy,
  ArrowRight,
  TrendingUp,
  HeartHandshake,
  Target,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function ImpactSection() {
  const cards = [
    {
      label: 'ONE IDENTITY',
      sub: 'For every sport you play',
      desc: 'No more separate profiles or lost records. Single verified athletic passport.',
      icon: Sparkles,
    },
    {
      label: 'ONE DISCOVERY',
      sub: 'Find people near you',
      desc: 'Algorithm matching based on proximity, skill level, and active availability.',
      icon: Compass,
    },
    {
      label: 'ONE COMMUNITY',
      sub: 'Players + Coaches + Teams',
      desc: 'Connecting grassroots casual athletes to elite coaching and tournament leagues.',
      icon: Users2,
    },
    {
      label: 'ONE PLATFORM',
      sub: 'Play • Train • Compete',
      desc: 'Complete sports lifecycle management from match RSVP to performance tracking.',
      icon: Trophy,
    },
  ]

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="font-bold text-xs uppercase tracking-wider">
            Why AthleteOS Matters
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            The Transformative Sports Multiplier
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Connecting isolated players into thriving, self-sustaining local sporting hubs.
          </p>
        </div>

        {/* 4 Large Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.label}
                className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-brand-bright/50 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center border border-blue-100">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-wide text-brand-navy font-mono">
                    {card.label}
                  </h3>
                  <h4 className="text-base font-bold text-brand-bright mt-0.5">
                    {card.sub}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Impact Progression Banner (PDF Page 7) */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-navy via-brand-blue to-brand-bright text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center">
          <span className="text-xs uppercase tracking-widest text-blue-200 font-bold block mb-4">
            Ecosystem Flywheel Impact Progression
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base font-bold">
            <span className="bg-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-sm border border-white/20">
              More Connections
            </span>
            <ArrowRight className="h-4 w-4 text-blue-300 shrink-0" />
            <span className="bg-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-sm border border-white/20">
              More Opportunities
            </span>
            <ArrowRight className="h-4 w-4 text-blue-300 shrink-0" />
            <span className="bg-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-sm border border-white/20">
              Stronger Communities
            </span>
            <ArrowRight className="h-4 w-4 text-blue-300 shrink-0" />
            <span className="bg-white text-brand-navy px-4 py-1.5 rounded-xl font-extrabold shadow-md">
              Better Athlete Growth
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
