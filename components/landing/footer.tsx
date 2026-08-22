import React from 'react'
import Link from 'next/link'
import { Trophy, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
                <Trophy className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Athlete<span className="text-brand-bright">OS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              One platform for every athlete. Connecting players, coaches, and sports communities through universal profiles and intelligent discovery.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Built for sports enthusiasts with Next.js & Supabase</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard/discover" className="hover:text-white transition-colors">
                  Discover Athletes
                </Link>
              </li>
              <li>
                <Link href="/dashboard/matches" className="hover:text-white transition-colors">
                  Matches & Games
                </Link>
              </li>
              <li>
                <Link href="/dashboard/messages" className="hover:text-white transition-colors">
                  Community Chat
                </Link>
              </li>
              <li>
                <Link href="/dashboard/performance" className="hover:text-white transition-colors">
                  Performance Tracking
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="hover:text-white transition-colors">
                  Universal Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#athletes" className="hover:text-white transition-colors">
                  Athletes Network
                </Link>
              </li>
              <li>
                <Link href="#coaches" className="hover:text-white transition-colors">
                  Coaches & Trainers
                </Link>
              </li>
              <li>
                <Link href="#teams" className="hover:text-white transition-colors">
                  Teams & Clubs
                </Link>
              </li>
              <li>
                <Link href="/dashboard/matches" className="hover:text-white transition-colors">
                  Tournaments & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  About AthleteOS
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  Athlete Login
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  Careers (Hiring!)
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 AthleteOS. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Safety Guidelines
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
