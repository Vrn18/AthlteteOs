'use client'

import React, { useState } from 'react'
import {
  Flame,
  Radio,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  Zap,
  Users,
  Sparkles,
  X,
} from 'lucide-react'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { SimpleSelect } from '@/components/ui/select'
import { SOSBroadcast, Match } from '@/types/database'
import { INITIAL_SOS_BROADCASTS, INITIAL_MATCHES } from '@/lib/store'

export function SOSRadarModal({
  isOpen,
  onClose,
  initialMatch,
}: {
  isOpen: boolean
  onClose: () => void
  initialMatch?: Match
}) {
  const [broadcasts, setBroadcasts] = useState<SOSBroadcast[]>(INITIAL_SOS_BROADCASTS)
  const [activeTab, setActiveTab] = useState<'view' | 'broadcast'>('broadcast')
  const [isScanning, setIsScanning] = useState(false)
  const [broadcastSuccess, setBroadcastSuccess] = useState(false)

  // Broadcast form state
  const [spotsNeeded, setSpotsNeeded] = useState(1)
  const [bountyPerk, setBountyPerk] = useState('Turf fee covered by team')
  const [kickoffTime, setKickoffTime] = useState('Tonight in 45 mins')
  const [urgency, setUrgency] = useState<'critical' | 'high' | 'medium'>('critical')

  const handleTriggerBroadcast = (e: React.FormEvent) => {
    e.preventDefault()
    setIsScanning(true)

    setTimeout(() => {
      setIsScanning(false)
      setBroadcastSuccess(true)

      const newBroadcast: SOSBroadcast = {
        id: `sos_${Date.now()}`,
        match_id: initialMatch?.id || 'match_custom',
        sport_id: initialMatch?.sport_id || 'cricket',
        sport_name: initialMatch?.sport_name || 'Cricket',
        sport_icon: initialMatch?.sport_icon || 'Bat',
        title: initialMatch?.title || 'Urgent T20 Leather Ball Match',
        location: initialMatch?.location || 'Play Arena, Sarjapur Road',
        distance_km: 1.8,
        spots_needed: Number(spotsNeeded),
        kickoff_time: kickoffTime,
        expires_in_minutes: 40,
        host_name: 'Varun Gangam',
        host_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        host_rating: 4.9,
        bounty_perk: bountyPerk,
        urgency_level: urgency,
      }

      setBroadcasts([newBroadcast, ...broadcasts])
    }, 1200)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center animate-pulse">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-black text-brand-navy flex items-center gap-2">
                <span>SOS Sub Radar</span>
                <Badge variant="destructive" className="text-[10px] uppercase font-mono">
                  5 KM Emergency Ping
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Pings active, verified players in Indiranagar & nearby within 60 seconds.
              </DialogDescription>
            </div>
          </div>
        </div>
      </DialogHeader>

      <div className="py-2 space-y-4">
        {/* Mode Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'broadcast'
                ? 'bg-white text-brand-navy shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Broadcast SOS (Need Subs)
          </button>
          <button
            onClick={() => setActiveTab('view')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'view'
                ? 'bg-white text-brand-navy shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Live Emergency Alerts ({broadcasts.length})
          </button>
        </div>

        {/* Tab 1: Broadcast SOS Form */}
        {activeTab === 'broadcast' && (
          <div className="space-y-4">
            {broadcastSuccess ? (
              <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3 animate-in zoom-in-95">
                <div className="h-12 w-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-green-900">
                  SOS Ping Dispatched to 42 Nearby Athletes!
                </h4>
                <p className="text-xs text-green-700 max-w-sm mx-auto">
                  Notification pushed to players within 5 km whose status is "Available Today". First responder to claim the spot will be added directly to your match chat.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setBroadcastSuccess(false)
                    setActiveTab('view')
                  }}
                  className="text-xs font-semibold"
                >
                  View Active SOS Queue
                </Button>
              </div>
            ) : isScanning ? (
              <div className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4 relative overflow-hidden">
                {/* Sonar Radar Animation */}
                <div className="relative h-28 w-28 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-red-500/40 animate-ping" />
                  <div className="absolute inset-4 rounded-full border border-sky-400/40 animate-pulse" />
                  <div className="h-12 w-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                    <Radio className="h-6 w-6 animate-spin" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Scanning 5.0 KM Proximity...</h4>
                  <p className="text-xs text-slate-400">Filtering verified players matching skill tier</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTriggerBroadcast} className="space-y-3">
                <div className="p-3 bg-red-50/70 rounded-xl border border-red-200 text-xs text-red-800 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Emergency Mode:</strong> Use this when you have an unexpected dropout within 3 hours of kickoff.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Substitutes Needed
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={spotsNeeded}
                      onChange={(e) => setSpotsNeeded(Number(e.target.value))}
                      required
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Urgency Level
                    </label>
                    <SimpleSelect
                      value={urgency}
                      onChange={(val) => setUrgency(val as any)}
                      options={[
                        { label: '🔥 Critical (< 1 hour)', value: 'critical' },
                        { label: '⚡ High (< 3 hours)', value: 'high' },
                        { label: '⏳ Medium (Same day)', value: 'medium' },
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Kickoff Start Time *
                  </label>
                  <Input
                    value={kickoffTime}
                    onChange={(e) => setKickoffTime(e.target.value)}
                    required
                    placeholder="e.g. In 40 minutes (6:30 PM)"
                    className="text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Bounty / Incentive for Sub (Optional)
                  </label>
                  <Input
                    value={bountyPerk}
                    onChange={(e) => setBountyPerk(e.target.value)}
                    placeholder="e.g. Free energy drink & covered turf fee"
                    className="text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  variant="destructive"
                  className="w-full font-bold text-xs h-10 gap-2 shadow-md bg-red-600 hover:bg-red-700 mt-2"
                >
                  <Radio className="h-4 w-4" />
                  <span>Activate SOS Radar Broadcast</span>
                </Button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Live SOS Feed */}
        {activeTab === 'view' && (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {broadcasts.map((sos) => (
              <div
                key={sos.id}
                className="p-3.5 rounded-2xl bg-white border-2 border-red-200 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {sos.sport_name === 'Cricket' ? '🏏' : sos.sport_name === 'Football' ? '⚽' : '🏸'}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-brand-navy leading-snug">{sos.title}</h4>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {sos.distance_km} km away • {sos.location}
                      </p>
                    </div>
                  </div>

                  <Badge variant="destructive" className="text-[10px] font-bold py-0.5">
                    {sos.spots_needed} Spot(s) Left
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                  <div className="flex items-center gap-1 text-red-600 font-semibold">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{sos.kickoff_time}</span>
                  </div>

                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-medium">
                    🎁 {sos.bounty_perk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DialogFooter>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
