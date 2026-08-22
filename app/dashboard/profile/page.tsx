'use client'

import React, { useState } from 'react'
import {
  User,
  ShieldCheck,
  MapPin,
  Star,
  Trophy,
  Edit3,
  Check,
  Plus,
  Activity,
  Calendar,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { SimpleSelect } from '@/components/ui/select'
import {
  CURRENT_USER,
  CURRENT_USER_SPORTS,
  USER_ACHIEVEMENTS,
  USER_PERFORMANCE,
} from '@/lib/store'
import { AthleteSport, SkillLevel } from '@/types/database'

function AthleteProfileView() {
  const [profile, setProfile] = useState(CURRENT_USER)
  const [sports, setSports] = useState<AthleteSport[]>(CURRENT_USER_SPORTS)
  const [activeSportId, setActiveSportId] = useState<string>('cricket')
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [tempBio, setTempBio] = useState(profile.bio)

  // Edit sport stat modal
  const [editStatModal, setEditStatModal] = useState<boolean>(false)
  const [selectedSportToEdit, setSelectedSportToEdit] = useState<AthleteSport | null>(null)
  const [newStatKey, setNewStatKey] = useState('')
  const [newStatValue, setNewStatValue] = useState('')

  const activeSport = sports.find((s) => s.sport_id === activeSportId) || sports[0]

  const handleSaveBio = () => {
    setProfile({ ...profile, bio: tempBio })
    setIsEditingBio(false)
  }

  const handleUpdateSportSkill = (skill: SkillLevel) => {
    setSports((prev) =>
      prev.map((s) => (s.sport_id === activeSportId ? { ...s, skill_level: skill } : s))
    )
  }

  const handleAddCustomMetric = () => {
    if (!newStatKey.trim() || !newStatValue.trim() || !selectedSportToEdit) return
    const updatedSports = sports.map((s) => {
      if (s.id === selectedSportToEdit.id) {
        return {
          ...s,
          sport_data: {
            ...s.sport_data,
            [newStatKey.trim()]: newStatValue.trim(),
          },
        }
      }
      return s
    })
    setSports(updatedSports)
    setNewStatKey('')
    setNewStatValue('')
    setEditStatModal(false)
  }

  return (
    <div className="space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <Avatar
              src={profile.avatar_url}
              fallback="VG"
              className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-brand-bright shadow-md"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
                  {profile.full_name}
                </h1>
                <Badge variant="bright" className="font-bold text-xs py-0.5 px-2.5">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" /> VERIFIED ATHLETE
                </Badge>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span className="font-mono font-semibold text-brand-blue">@{profile.username}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" /> {profile.city}
                </span>
                <span>•</span>
                <span className="text-amber-500 font-bold flex items-center gap-0.5">
                  ★ {profile.rating} Rating
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingBio(!isEditingBio)}
              className="text-xs font-semibold gap-1.5"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>{isEditingBio ? 'Cancel Edit' : 'Edit Bio'}</span>
            </Button>
          </div>

        </div>

        {/* Bio Section */}
        {isEditingBio ? (
          <div className="space-y-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            <label className="text-xs font-bold text-brand-navy">Edit Your Athlete Bio</label>
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-input bg-white focus:outline-none focus:ring-2 focus:ring-brand-bright"
            />
            <Button size="sm" variant="bright" onClick={handleSaveBio} className="text-xs font-semibold">
              <Check className="h-3.5 w-3.5 mr-1" /> Save Changes
            </Button>
          </div>
        ) : (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {profile.bio}
          </div>
        )}

      </div>

      {/* Multi-Sport Profile Section */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="brand" className="text-xs font-bold">Multi-Sport Profile</Badge>
              <h2 className="text-xl font-bold text-brand-navy">Universal Sports Telemetry</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Switch sports dynamically. Your profile records distinct positions and skill metrics for each.
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedSportToEdit(activeSport)
              setEditStatModal(true)
            }}
            className="text-xs font-semibold gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Custom Metric</span>
          </Button>
        </div>

        {/* Sport Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sports.map((sport) => {
            const isSelected = sport.sport_id === activeSportId
            return (
              <button
                key={sport.id}
                onClick={() => setActiveSportId(sport.sport_id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'border-brand-bright bg-blue-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">
                    {sport.sport_name === 'Cricket'
                      ? '🏏'
                      : sport.sport_name === 'Football'
                      ? '⚽'
                      : sport.sport_name === 'Badminton'
                      ? '🏸'
                      : '🏃‍♂️'}
                  </span>
                  <Badge variant={isSelected ? 'bright' : 'secondary'} className="text-[10px] py-0 px-1.5">
                    {sport.skill_level}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-navy">{sport.sport_name}</h4>
                  <p className="text-[10px] text-slate-500">{sport.experience_years} years exp</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Sport Details */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-brand-navy">{activeSport.sport_name}</span>
              <span className="text-xs text-slate-500 font-medium">Telemetry Record</span>
            </div>

            {/* Skill Level Quick Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Skill Level:</span>
              <SimpleSelect
                value={activeSport.skill_level}
                onChange={(val) => handleUpdateSportSkill(val as SkillLevel)}
                options={[
                  { label: 'Beginner', value: 'Beginner' },
                  { label: 'Intermediate', value: 'Intermediate' },
                  { label: 'Advanced', value: 'Advanced' },
                  { label: 'Semi-Pro', value: 'Semi-Pro' },
                  { label: 'Professional', value: 'Professional' },
                ]}
                className="w-36 text-xs h-8"
              />
            </div>
          </div>

          {/* Key-Value Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(activeSport.sport_data).map(([key, val]) => (
              <div key={key} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="text-sm font-black text-brand-navy mt-1 block truncate">
                  {String(val)}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Achievements & Milestones Showcase */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <h3 className="text-xl font-bold text-brand-navy">Verified Achievements & Accolades</h3>
          </div>
          <Badge variant="popular" className="text-xs">3 Badges Unlocked</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {USER_ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/60 to-orange-50/30 border border-amber-200/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">🏆</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  {ach.date}
                </span>
              </div>
              <h4 className="font-bold text-sm text-brand-navy">{ach.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{ach.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Metric Modal */}
      {editStatModal && selectedSportToEdit && (
        <Dialog open={editStatModal} onOpenChange={setEditStatModal}>
          <DialogHeader>
            <DialogTitle>Add Telemetry Attribute to {selectedSportToEdit.sport_name}</DialogTitle>
            <DialogDescription>
              Add a custom value for any sport metric.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Metric Name (e.g. battingStyle, topSpeedKmph, preferredSide)
              </label>
              <Input
                placeholder="e.g. smashSpeedKmph"
                value={newStatKey}
                onChange={(e) => setNewStatKey(e.target.value)}
                className="text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Metric Value
              </label>
              <Input
                placeholder="e.g. 260 km/h"
                value={newStatValue}
                onChange={(e) => setNewStatValue(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEditStatModal(false)}>
              Cancel
            </Button>
            <Button variant="bright" size="sm" onClick={handleAddCustomMetric}>
              Save to Athlete Profile
            </Button>
          </DialogFooter>
        </Dialog>
      )}

    </div>
  )
}

export default function ProfilePage() {
  return <AthleteProfileView />
}
