'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  UserCheck,
  GraduationCap,
  Shield,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Users,
  Target,
  LineChart,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function AthleteCoachTeam() {
  const [activeTab, setActiveTab] = useState('athletes')

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="font-bold text-xs uppercase tracking-wider">
            Built For The Entire Sports Ecosystem
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Tailored for Athletes, Coaches & Teams
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Whether you play casually on weekends, coach rising talent, or manage a local competitive squad.
          </p>
        </div>

        {/* 3 Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col items-center">
            
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-8 h-12">
              <TabsTrigger value="athletes" className="text-sm font-semibold flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                <span>Athletes</span>
              </TabsTrigger>
              <TabsTrigger value="coaches" className="text-sm font-semibold flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Coaches</span>
              </TabsTrigger>
              <TabsTrigger value="teams" className="text-sm font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Teams</span>
              </TabsTrigger>
            </TabsList>

            {/* Content: Athletes */}
            <TabsContent value="athletes" className="w-full">
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <Badge variant="secondary" className="mb-2 text-brand-blue font-bold">
                      FOR INDIVIDUAL PLAYERS
                    </Badge>
                    <h3 className="text-2xl font-bold text-brand-navy">
                      Build your sports identity and never miss a match.
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Connect with local athletes at your exact skill level, join active matches with 1-click RSVP, and build a verified sports resume across all the sports you play.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      'Build your universal multi-sport identity & stats',
                      'Find verified players near you within 5-15 km',
                      'Join open games and practice sessions instantly',
                      'Track match achievements, win rates & ratings',
                    ].map((point) => (
                      <div key={point} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/dashboard/profile" className="inline-block pt-2">
                    <Button variant="bright" className="font-semibold gap-2 shadow-sm">
                      <span>Create Athlete Profile</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/40 rounded-2xl p-6 border border-blue-100 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-blue-200/60">
                    <span className="text-xs font-bold text-brand-navy">Athlete Growth Velocity</span>
                    <Badge variant="bright" className="text-[10px]">+48% Matches Played</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs">
                      <span className="text-xs text-slate-500 block">Active Sports</span>
                      <span className="text-xl font-black text-brand-navy">4 Sports</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs">
                      <span className="text-xs text-slate-500 block">Verified Rating</span>
                      <span className="text-xl font-black text-brand-bright">★ 4.9 / 5.0</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white/80 rounded-xl border border-blue-100 text-xs text-slate-600">
                    "Found 3 reliable cricket turf matches every weekend with zero flake rate!"
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Content: Coaches */}
            <TabsContent value="coaches" className="w-full">
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <Badge variant="secondary" className="mb-2 text-brand-blue font-bold">
                      FOR TRAINERS & ACADEMIES
                    </Badge>
                    <h3 className="text-2xl font-bold text-brand-navy">
                      Discover rising talent and manage training sessions.
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Scout dedicated athletes based on verified match logs and stamina metrics. Schedule specialized coaching clinics and grow your coaching reputation.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      'Discover emerging talent with verified performance data',
                      'Create and monetize training batches and clinics',
                      'Manage athlete development benchmarks & drills',
                      'Build certified academy reputation and reviews',
                    ].map((point) => (
                      <div key={point} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/auth/signup" className="inline-block pt-2">
                    <Button variant="bright" className="font-semibold gap-2 shadow-sm">
                      <span>Register as Coach / Academy</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50/40 rounded-2xl p-6 border border-indigo-100 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-indigo-200/60">
                    <span className="text-xs font-bold text-brand-navy">Academy Session Roster</span>
                    <Badge variant="popular" className="text-[10px]">8 Enrolled</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded-xl border border-indigo-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-brand-navy block">Advanced Badminton Footwork</span>
                        <span className="text-[11px] text-slate-500">Tue & Thu • 6:00 PM</span>
                      </div>
                      <span className="text-xs font-bold text-green-600">Full</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-indigo-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-brand-navy block">Cricket Pace Bowling Masterclass</span>
                        <span className="text-[11px] text-slate-500">Saturday • 8:00 AM</span>
                      </div>
                      <span className="text-xs font-bold text-blue-600">2 Spots Left</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Content: Teams */}
            <TabsContent value="teams" className="w-full">
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <Badge variant="secondary" className="mb-2 text-brand-blue font-bold">
                      FOR CLUBS & LEAGUE TEAMS
                    </Badge>
                    <h3 className="text-2xl font-bold text-brand-navy">
                      Fill squad rosters and discover local tournaments.
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Never forfeit a game due to a short roster again. Find substitute players on-demand, manage team dues, and register for city tournaments seamlessly.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      'Find guest players & substitutes on match day in minutes',
                      'Create, host and manage private squad matches',
                      'Coordinate lineups, jersey colors, and ground fees',
                      'Discover and register for regional league tournaments',
                    ].map((point) => (
                      <div key={point} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/dashboard/matches" className="inline-block pt-2">
                    <Button variant="bright" className="font-semibold gap-2 shadow-sm">
                      <span>Create Team Match</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50/40 rounded-2xl p-6 border border-emerald-100 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60">
                    <span className="text-xs font-bold text-brand-navy">Squad Roster Readiness</span>
                    <Badge variant="success" className="text-[10px]">11/11 Confirmed</Badge>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">Bangalore Super Strikers FC</span>
                      <span className="text-emerald-600 font-bold">Ready for Sunday</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full" />
                    </div>
                  </div>
                  <div className="p-3 bg-white/80 rounded-xl border border-emerald-100 text-xs text-slate-600">
                    "Substitutes recruited in 5 minutes via Smart Discovery!"
                  </div>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>

      </div>
    </section>
  )
}
