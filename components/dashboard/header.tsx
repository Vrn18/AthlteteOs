'use client'

import React from 'react'
import Link from 'next/link'
import {
  Bell,
  Search,
  ShieldCheck,
  Plus,
  Flame,
  Menu,
  Activity,
  User,
} from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CURRENT_USER } from '@/lib/store'

export function DashboardHeader({ onToggleMobileMenu }: { onToggleMobileMenu?: () => void }) {
  return (
    <header className="h-16 bg-white/90 backdrop-blur-sm border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Active Sport:</span>
          <Badge variant="brand" className="text-xs">🏏 Cricket (Advanced)</Badge>
          <Badge variant="secondary" className="text-xs">⚽ Football</Badge>
          <Badge variant="secondary" className="text-xs">🏸 Badminton</Badge>
        </div>
      </div>

      {/* Right: Actions & User Avatar */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/matches">
          <Button size="sm" variant="bright" className="text-xs font-semibold gap-1.5 shadow-xs">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Host Match</span>
          </Button>
        </Link>

        {/* Notifications Icon */}
        <Link
          href="/dashboard/messages"
          className="relative p-2 text-slate-500 hover:text-brand-blue hover:bg-slate-50 rounded-xl transition-colors"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>

        {/* User Pill */}
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2.5 pl-2 pr-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors"
        >
          <Avatar
            src={CURRENT_USER.avatar_url}
            fallback="VG"
            className="h-8 w-8 border border-brand-bright"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-brand-navy leading-none">
              {CURRENT_USER.full_name}
            </span>
            <span className="text-[10px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">
              <ShieldCheck className="h-3 w-3" /> Verified Athlete
            </span>
          </div>
        </Link>
      </div>
    </header>
  )
}
