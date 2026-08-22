import React from 'react'
import {
  UserPlus,
  Dumbbell,
  Compass,
  Trophy,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Check,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Create Profile',
      desc: 'Set up your single universal athlete identity and bio.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Select Sports',
      desc: 'Add Cricket, Football, Badminton or any sport with your stats.',
      icon: Dumbbell,
    },
    {
      step: '03',
      title: 'Discover People',
      desc: 'Find players, coaches, and tournaments near your location.',
      icon: Compass,
    },
    {
      step: '04',
      title: 'Join or Create Match',
      desc: 'RSVP to open turf games or host your own match.',
      icon: Trophy,
    },
    {
      step: '05',
      title: 'Chat & Coordinate',
      desc: 'Finalize timings, ground venue, and jerseys in real-time.',
      icon: MessageSquare,
    },
    {
      step: '06',
      title: 'Play • Track • Improve',
      desc: 'Play your game, log match scores, and build verified ratings.',
      icon: TrendingUp,
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="font-bold text-xs uppercase tracking-wider">
            Simple 6-Step Mental Model
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            How AthleteOS Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From creating your profile to playing on the field in under 2 minutes.
          </p>
        </div>

        {/* Desktop Horizontal Process Grid */}
        <div className="hidden lg:grid grid-cols-6 gap-4 max-w-7xl mx-auto relative">
          {/* Connector Line behind steps */}
          <div className="absolute top-1/3 left-10 right-10 h-0.5 bg-blue-200 -z-0" />

          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.step} className="relative z-10 flex flex-col items-center text-center group">
                <div className="h-16 w-16 rounded-2xl bg-white border-2 border-slate-200 group-hover:border-brand-bright group-hover:shadow-md flex items-center justify-center text-brand-navy group-hover:text-brand-bright transition-all duration-200 mb-4">
                  <Icon className="h-7 w-7" />
                </div>
                
                <span className="text-xs font-black font-mono text-brand-bright mb-1">
                  STEP {item.step}
                </span>
                
                <h4 className="text-sm font-bold text-brand-navy mb-1 leading-snug">
                  {item.title}
                </h4>
                
                <p className="text-xs text-slate-500 leading-normal">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Mobile & Tablet Vertical Timeline */}
        <div className="lg:hidden max-w-md mx-auto space-y-4">
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs"
              >
                <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black font-mono text-brand-bright">
                      {item.step}
                    </span>
                    <h4 className="text-sm font-bold text-brand-navy">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
