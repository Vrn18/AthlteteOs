'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Trophy,
  Compass,
  Calendar,
  MapPin,
  ShieldCheck,
  Star,
  Activity,
  Plus,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Radio,
  Share2,
  CreditCard,
  Award,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import {
  CURRENT_USER,
  CURRENT_USER_SPORTS,
  CURRENT_USER_KARMA,
  INITIAL_MATCHES,
  INITIAL_SOS_BROADCASTS,
  SEED_ATHLETES,
  USER_ACHIEVEMENTS,
} from '@/lib/store'
import { computeAthleteMatchScore } from '@/lib/matching-engine'
import { SOSRadarModal } from '@/components/dashboard/sos-radar-modal'

export default function DashboardPage() {
  const [matches, setMatches] = useState(INITIAL_MATCHES)
  const [isSosModalOpen, setIsSosModalOpen] = useState(false)

  // Top 3 compatible athletes near Varun
  const topCompatibleAthletes = SEED_ATHLETES.map((athlete) =>
    computeAthleteMatchScore(athlete, {
      sportId: 'cricket',
      skillLevel: 'Advanced',
      maxDistanceKm: 10,
      availability: 'Today',
    })
  ).slice(0, 3)

  const activeSos = INITIAL_SOS_BROADCASTS[0]

  return (
    <div className="space-y-8">
      
      {/* 🚨 Emergency SOS Banner (Next-Level MVP Hero Trigger) */}
      {activeSos && (
        <div className="bg-gradient-to-r from-red-900 via-red-950 to-slate-900 text-white p-4 rounded-3xl border border-red-800/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-2xl bg-red-600/40 border border-red-500 text-red-300 flex items-center justify-center shrink-0">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-[9px] font-mono font-bold py-0">
                  🔥 SOS RADAR ALERT
                </Badge>
                <span className="text-xs font-bold text-white">{activeSos.title}</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {activeSos.spots_needed} sub needed • {activeSos.location} ({activeSos.distance_km} km) • {activeSos.kickoff_time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link href="/dashboard/radar">
              <Button size="sm" variant="destructive" className="text-xs font-bold bg-red-600 hover:bg-red-700 h-8">
                Claim Spot / I'm In!
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* 1. Welcome & Athlete Identity Card */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-navy via-brand-blue to-brand-bright text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar
              src={CURRENT_USER.avatar_url}
              fallback="VG"
              className="h-16 w-16 sm:h-20 sm:w-20 border-4 border-white/20 shadow-lg"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Good evening, {CURRENT_USER.full_name}
                </h1>
                <Badge variant="bright" className="bg-sky-400 text-brand-navy font-black text-xs py-0.5 px-2">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" /> VERIFIED
                </Badge>
                <Badge variant="popular" className="font-mono text-xs">
                  💎 98% Karma
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-blue-100 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-sky-300" />
                {CURRENT_USER.city} • 1540 ELO • @{CURRENT_USER.username}
              </p>
              <p className="text-xs text-blue-100/90 max-w-xl line-clamp-1">
                {CURRENT_USER.bio}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <Link href={`/passport/${CURRENT_USER.username}`} target="_blank">
              <Button variant="outline" className="font-bold border-white/30 text-white hover:bg-white/10 text-xs">
                <Share2 className="h-3.5 w-3.5 mr-1" /> Passport Card
              </Button>
            </Link>

            <Link href="/dashboard/matches">
              <Button variant="bright" className="font-bold gap-1.5 bg-white text-brand-navy hover:bg-white/90 shadow-md text-xs">
                <Plus className="h-3.5 w-3.5" />
                <span>Host Match</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Universal Sports</span>
            <Activity className="h-4 w-4 text-brand-bright" />
          </div>
          <div className="text-2xl font-black text-brand-navy">4 Sports</div>
          <div className="text-[11px] text-brand-blue font-semibold">Cricket, Football, Badm., Run</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Skill Rating</span>
            <Trophy className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-brand-navy">{CURRENT_USER.elo_rating} ELO</div>
          <div className="text-[11px] text-green-600 font-semibold">Tier 4 Pro Division</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Win Rate</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-brand-navy">{CURRENT_USER.win_rate}%</div>
          <div className="text-[11px] text-emerald-600 font-semibold">Top 8% in Bangalore</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Anti-Ghosting Karma</span>
            <ShieldCheck className="h-4 w-4 text-brand-bright" />
          </div>
          <div className="text-2xl font-black text-brand-navy">{CURRENT_USER_KARMA.overall_karma}%</div>
          <div className="text-[11px] text-emerald-600 font-semibold">💎 Diamond Tier Reliability</div>
        </div>
      </div>

      {/* 3. Main Grid: Upcoming Matches & Recommended Discovery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Active & Joined Matches */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-brand-navy">Your Active Match Schedule</h2>
              <p className="text-xs text-slate-500">Upcoming games with confirmed rosters, turf splitting, and chat.</p>
            </div>
            <Link href="/dashboard/matches" className="text-xs font-bold text-brand-bright hover:underline flex items-center gap-1">
              Browse All ({matches.length}) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {matches.map((match) => {
              const isJoined = match.participants.some((p) => p.profile_id === CURRENT_USER.id)
              
              return (
                <div
                  key={match.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-brand-bright/40 shadow-2xs transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="brand" className="text-xs">
                          {match.sport_name}
                        </Badge>
                        <h3 className="font-bold text-brand-navy text-base">
                          {match.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {match.start_time}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {match.location}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                          <CreditCard className="h-3 w-3" /> ₹{match.fee_per_player || 200}/player
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {match.current_players}/{match.max_players} Players
                      </span>

                      {isJoined ? (
                        <Badge variant="success" className="font-bold text-xs py-1 px-2.5">
                          Joined ✓
                        </Badge>
                      ) : (
                        <Link href="/dashboard/matches">
                          <Button size="sm" variant="bright" className="text-xs font-semibold h-8 px-3">
                            Join Match
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="font-medium">Host:</span>
                      <span className="font-bold text-slate-800">{match.creator_name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href="/dashboard/matches"
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        Turf Fee Ledger →
                      </Link>

                      <Link
                        href="/dashboard/messages"
                        className="text-xs font-semibold text-brand-blue hover:text-brand-bright flex items-center gap-1"
                      >
                        <MessageSquare className="h-3.5 w-3.5" /> Group Chat →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* Right Column (4 cols): Recommended Compatible Athletes & Achievements */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recommended Athletes Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-brand-bright" />
                Smart Matches Nearby
              </h3>
              <Link href="/dashboard/discover" className="text-[11px] font-bold text-brand-bright hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {topCompatibleAthletes.map((item) => (
                <div
                  key={item.profile.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar
                      src={item.profile.avatar_url}
                      fallback={item.profile.full_name.substring(0, 2)}
                      className="h-10 w-10 border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-xs font-bold text-brand-navy">{item.profile.full_name}</h4>
                        <ShieldCheck className="h-3 w-3 text-brand-bright" />
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {item.primarySport.sport_name} • {item.scoreBreakdown.distanceKm} km away
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge variant="bright" className="text-[10px] font-bold">
                      {item.scoreBreakdown.totalScore}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/dashboard/discover" className="block">
              <Button size="sm" variant="outline" className="w-full text-xs font-semibold">
                Launch Smart Discovery Engine
              </Button>
            </Link>
          </div>

          {/* Achievements Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-amber-500" />
                Recent Achievements
              </h3>
              <Link href="/dashboard/performance" className="text-[11px] font-bold text-brand-bright hover:underline">
                History
              </Link>
            </div>

            <div className="space-y-2.5">
              {USER_ACHIEVEMENTS.map((ach) => (
                <div key={ach.id} className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 flex items-start gap-3">
                  <div className="h-8 w-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-sm">
                    🏆
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">{ach.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-snug mt-0.5">{ach.description}</p>
                    <span className="text-[10px] text-slate-400 font-semibold">{ach.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
