'use client'

import React, { useState } from 'react'
import {
  Radio,
  Clock,
  MapPin,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ShieldCheck,
  Zap,
  Sparkles,
  Search,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { INITIAL_SOS_BROADCASTS, CURRENT_USER } from '@/lib/store'
import { SOSBroadcast } from '@/types/database'
import { SOSRadarModal } from '@/components/dashboard/sos-radar-modal'

export default function RadarPage() {
  const [broadcasts, setBroadcasts] = useState<SOSBroadcast[]>(INITIAL_SOS_BROADCASTS)
  const [claimedSpots, setClaimedSpots] = useState<Record<string, boolean>>({})
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false)
  const [filterSport, setFilterSport] = useState<string>('all')

  const handleClaimSpot = (sosId: string) => {
    setClaimedSpots((prev) => ({ ...prev, [sosId]: true }))
    setBroadcasts((prev) =>
      prev.map((b) => (b.id === sosId ? { ...b, spots_needed: Math.max(0, b.spots_needed - 1) } : b))
    )
  }

  const filtered = broadcasts.filter((b) =>
    filterSport === 'all' ? true : b.sport_id.toLowerCase() === filterSport.toLowerCase()
  )

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-brand-navy text-white p-6 sm:p-8 shadow-xl border border-red-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-red-600/30 border-2 border-red-500/50 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Radio className="h-8 w-8 text-red-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  SOS Sub Radar
                </h1>
                <Badge variant="destructive" className="text-xs font-mono font-bold">
                  LIVE 5.0 KM SCAN
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Emergency substitute alerts for matches starting in &lt;3 hours across Bangalore.
              </p>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={() => setIsBroadcastModalOpen(true)}
            className="font-bold gap-2 bg-red-600 hover:bg-red-700 shadow-lg"
          >
            <Radio className="h-4 w-4" />
            <span>Broadcast SOS (Need Sub)</span>
          </Button>
        </div>
      </div>

      {/* Radar Category Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterSport('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterSport === 'all'
                ? 'bg-brand-navy text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Alerts ({broadcasts.length})
          </button>
          {['cricket', 'football', 'badminton'].map((sp) => (
            <button
              key={sp}
              onClick={() => setFilterSport(sp)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                filterSport === sp
                  ? 'bg-brand-blue text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
          Proximity: Indiranagar, Bangalore (12.97° N, 77.59° E)
        </span>
      </div>

      {/* SOS Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((sos) => {
          const isClaimed = claimedSpots[sos.id]

          return (
            <Card
              key={sos.id}
              className="rounded-3xl border-2 border-red-200 hover:border-red-400 bg-white shadow-xs hover:shadow-md transition-all space-y-4 p-6 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Header Urgency Tag */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="brand" className="text-xs font-bold">
                      {sos.sport_name}
                    </Badge>
                    <Badge variant="destructive" className="text-[10px] font-bold">
                      🔥 {sos.urgency_level.toUpperCase()}
                    </Badge>
                  </div>

                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-xl border border-red-200">
                    {sos.spots_needed} Vacancy Left
                  </span>
                </div>

                {/* Match Title & Location */}
                <div>
                  <h3 className="text-lg font-bold text-brand-navy leading-snug">
                    {sos.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {sos.distance_km} km away • {sos.location}
                  </p>
                </div>

                {/* Kickoff Timer & Bounty */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-[10px] text-slate-400 font-semibold block">KICKOFF</span>
                    <span className="font-bold text-red-600 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3.5 w-3.5" /> {sos.kickoff_time}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <span className="text-[10px] text-emerald-600 font-semibold block">BOUNTY / PERK</span>
                    <span className="font-bold text-emerald-800 text-[11px] truncate block mt-0.5">
                      🎁 {sos.bounty_perk}
                    </span>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Avatar src={sos.host_avatar} fallback={sos.host_name.substring(0, 2)} className="h-7 w-7" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Organizer</span>
                      <span className="font-bold text-slate-800">{sos.host_name} (★ {sos.host_rating})</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium">
                    Expires in {sos.expires_in_minutes}m
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100">
                <Button
                  size="sm"
                  variant={isClaimed ? 'success' : 'bright'}
                  onClick={() => handleClaimSpot(sos.id)}
                  disabled={isClaimed}
                  className="w-full font-bold text-xs h-10 shadow-sm"
                >
                  {isClaimed ? (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> Spot Confirmed! Joining Match Chat...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4" /> Claim Spot / I'm In! (Instant RSVP)
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* SOS Broadcaster Modal */}
      {isBroadcastModalOpen && (
        <SOSRadarModal
          isOpen={isBroadcastModalOpen}
          onClose={() => setIsBroadcastModalOpen(false)}
        />
      )}

    </div>
  )
}
