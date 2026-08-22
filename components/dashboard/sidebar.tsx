'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Compass,
  Trophy,
  MessageSquare,
  User,
  LineChart,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Smart Discovery', href: '/dashboard/discover', icon: Compass, badge: 'Scoring' },
  { label: 'Matches & Events', href: '/dashboard/matches', icon: Trophy, badge: '4 Open' },
  { label: 'Community Chat', href: '/dashboard/messages', icon: MessageSquare, badge: '2' },
  { label: 'Universal Profile', href: '/dashboard/profile', icon: User },
  { label: 'Performance', href: '/dashboard/performance', icon: LineChart },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      {/* Top Logo & App Title */}
      <div>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
              <Trophy className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-brand-navy">
                Athlete<span className="text-brand-bright">OS</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold -mt-1">
                Dashboard Core
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Main Features
          </span>

          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group',
                  isActive
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-navy'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'h-4 w-4 transition-colors',
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-brand-bright'
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      'text-[10px] px-2 py-0.5 rounded-full font-bold',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-50 text-brand-bright'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom User Card & Pro Status */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-3.5 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-brand-navy flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-brand-bright" />
              Athlete Pro Tier
            </span>
            <Badge variant="bright" className="text-[9px] py-0 px-1.5">Active</Badge>
          </div>
          <p className="text-[10px] text-slate-500">
            3x Boosted Discovery & Multi-Sport Telemetry
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-brand-blue hover:bg-slate-50 rounded-xl transition-colors"
        >
          <span className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Back to Landing Page
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        </Link>
      </div>
    </aside>
  )
}
