'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Trophy,
  Users,
  MapPin,
  Flame,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  Activity,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'

export function Hero() {
  const [selectedSport, setSelectedSport] = useState<'Cricket' | 'Football' | 'Badminton'>('Cricket')
  const [joined, setJoined] = useState(false)

  const sportsTagList = [
    'Cricket',
    'Football',
    'Badminton',
    'Running',
    'Swimming',
    'Tennis',
    'Basketball',
    'Chess',
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Background Subtle Tech Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-brand-blue shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand-bright" />
              <span>Next-Gen Sports Ecosystem & Digital Identity</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.1]">
                ONE PLATFORM. <br />
                <span className="text-brand-bright">EVERY ATHLETE.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl font-normal leading-relaxed pt-2">
                Build your sports identity, find athletes near you, join matches and events, and grow your game — all in one place.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
              <Link href="/dashboard/profile">
                <Button size="lg" variant="bright" className="w-full sm:w-auto font-semibold gap-2 shadow-md hover:shadow-lg">
                  <span>Create Your Athlete Profile</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/discover">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-medium border-slate-300 text-slate-700 hover:bg-slate-100">
                  Explore AthleteOS
                </Button>
              </Link>
            </div>

            {/* Sports Pills Tags */}
            <div className="pt-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                Supported Multi-Sport Ecosystem:
              </p>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {sportsTagList.map((sport, index) => (
                  <span
                    key={sport}
                    className="inline-flex items-center text-xs font-medium bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs"
                  >
                    {sport}
                    {index < sportsTagList.length - 1 && <span className="ml-2 text-slate-300">•</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust Stat Highlight */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 w-full max-w-lg">
              <div>
                <div className="text-2xl font-bold text-brand-navy">10,000+</div>
                <div className="text-xs text-muted-foreground">Active Players</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-navy">500+</div>
                <div className="text-xs text-muted-foreground">Matches / Week</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-bright">94%</div>
                <div className="text-xs text-muted-foreground">Match Match-Rate</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Athlete UI Mockup (PDF Page 3) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md relative">
              
              {/* Floating Decorative Pill */}
              <div className="absolute -top-4 -right-2 z-20 bg-brand-navy text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span>Live Interactive UI</span>
              </div>

              {/* Product Mockup Container */}
              <Card className="border-2 border-slate-200/90 shadow-xl bg-white rounded-3xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                
                {/* Mockup Top Header */}
                <div className="bg-brand-navy p-5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      fallback="VG"
                      className="border-2 border-white/20 h-11 w-11"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base text-white">Good evening, Varun</h4>
                        <ShieldCheck className="h-4 w-4 text-sky-400 fill-sky-400/20" />
                      </div>
                      <p className="text-xs text-slate-300 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-sky-400" /> Indiranagar, Bangalore
                      </p>
                    </div>
                  </div>
                  <Badge variant="bright" className="text-[11px] font-bold">
                    ★ 4.9 Pro
                  </Badge>
                </div>

                {/* Mockup Body */}
                <div className="p-5 space-y-4 bg-slate-50/50">
                  
                  {/* Selector Title */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Find Your Next Game
                    </span>
                    <span className="text-xs text-brand-bright font-semibold hover:underline cursor-pointer">
                      Filter (3)
                    </span>
                  </div>

                  {/* Sport Tabs / Pills */}
                  <div className="grid grid-cols-3 gap-2">
                    {(['Cricket', 'Football', 'Badminton'] as const).map((sport) => (
                      <button
                        key={sport}
                        onClick={() => setSelectedSport(sport)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all flex flex-col items-center gap-1 ${
                          selectedSport === sport
                            ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>{sport === 'Cricket' ? '🏏' : sport === 'Football' ? '⚽' : '🏸'}</span>
                        <span>{sport}</span>
                      </button>
                    ))}
                  </div>

                  {/* Nearby Match Card Inside Mockup */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Nearby Matches</span>
                      <span className="text-[11px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                        ● 4 Available Today
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-brand-navy">
                              {selectedSport === 'Cricket'
                                ? 'Weekend T20 Friendly'
                                : selectedSport === 'Football'
                                ? '5v5 Turf Cup Match'
                                : 'Doubles Sparring'}
                            </span>
                            <Badge variant="brand" className="text-[10px] py-0 px-1.5">
                              {selectedSport}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            {selectedSport === 'Cricket'
                              ? '4.2 km • Intermediate'
                              : selectedSport === 'Football'
                              ? '2.8 km • Advanced'
                              : '1.4 km • Intermediate'}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                          {selectedSport === 'Cricket' ? '18/22 Joined' : selectedSport === 'Football' ? '8/10 Joined' : '3/4 Joined'}
                        </span>
                      </div>

                      {/* Compatibility Indicator */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Activity className="h-3.5 w-3.5 text-brand-bright" />
                          <span className="font-semibold text-brand-navy">94%</span> Compatibility
                        </div>
                        
                        {/* Interactive Join Button */}
                        <Button
                          size="sm"
                          variant={joined ? "success" : "bright"}
                          onClick={() => setJoined(!joined)}
                          className="text-xs h-7 px-3 font-semibold transition-all"
                        >
                          {joined ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Joined ✓
                            </span>
                          ) : (
                            'Join Match'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Redirection Link to Live Dashboard */}
                  <Link
                    href="/dashboard/matches"
                    className="block w-full text-center text-xs font-semibold text-brand-blue hover:text-brand-bright py-1 transition-colors"
                  >
                    View All 18+ Live Matches in Bangalore →
                  </Link>

                </div>

              </Card>

              {/* Verified Trust Seal */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>Verified Athletes • Anti-Ghosting Reliability Rating</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
