import React from 'react'
import Link from 'next/link'
import {
  User,
  Compass,
  Trophy,
  MessageSquare,
  ShieldCheck,
  LineChart,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ServicesSection() {
  const services = [
    {
      num: '01',
      title: 'Universal Athlete Profile',
      description: 'One single verified profile for every sport you play. Flexible multi-sport stats, positions, and skill levels.',
      icon: User,
      href: '/dashboard/profile',
      tag: 'Multi-Sport JSONB',
    },
    {
      num: '02',
      title: 'Smart Discovery',
      description: 'Find athletes, teams, coaches, and events filtered by sport, skill compatibility, distance, and availability.',
      icon: Compass,
      href: '/dashboard/discover',
      tag: 'Match Algorithm',
    },
    {
      num: '03',
      title: 'Matches & Events',
      description: 'Create or join games, practice sessions, and local tournaments with instant RSVP and live roster tracking.',
      icon: Trophy,
      href: '/dashboard/matches',
      tag: 'Live Rosters',
    },
    {
      num: '04',
      title: 'Real-Time Chat',
      description: 'Coordinate with match players and teams instantly. In-app match coordination channels with zero spam.',
      icon: MessageSquare,
      href: '/dashboard/messages',
      tag: 'Match Channels',
    },
    {
      num: '05',
      title: 'Trust & Safety',
      description: 'Verified athlete profiles, anti-ghosting reliability ratings, activity history, and community moderation.',
      icon: ShieldCheck,
      href: '/dashboard/profile',
      tag: 'Verified Identity',
    },
    {
      num: '06',
      title: 'Performance Tracking',
      description: 'Track matches played, win rates, achievements, peer ratings, and personal best metrics over time.',
      icon: LineChart,
      href: '/dashboard/performance',
      tag: 'Analytics & Badges',
    },
  ]

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" className="font-bold text-xs uppercase tracking-wider">
            Core Platform Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Everything an athlete needs, in one place.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Engineered to streamline athlete discovery, event participation, communication, and player development.
          </p>
        </div>

        {/* 6 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((srv) => {
            const Icon = srv.icon
            return (
              <Card
                key={srv.num}
                className="group hover:border-brand-bright/50 hover:shadow-lg transition-all duration-300 rounded-3xl bg-slate-50/50 hover:bg-white flex flex-col justify-between border-slate-200"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-brand-bright transition-colors font-mono">
                      {srv.num}
                    </span>
                    <div className="h-12 w-12 rounded-2xl bg-white group-hover:bg-blue-50 text-brand-navy group-hover:text-brand-bright border border-slate-200 flex items-center justify-center shadow-xs transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Badge variant="secondary" className="text-[11px] font-semibold text-slate-600">
                      {srv.tag}
                    </Badge>
                    <CardTitle className="text-xl group-hover:text-brand-bright transition-colors">
                      {srv.title}
                    </CardTitle>
                  </div>

                  <CardDescription className="text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <Link
                    href={srv.href}
                    className="inline-flex items-center text-xs font-semibold text-brand-blue group-hover:text-brand-bright gap-1.5 group-hover:translate-x-1 transition-all"
                  >
                    <span>Launch Feature Demo</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}
