'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trophy, Menu, X, ArrowRight, Activity, ShieldCheck, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md transition-transform group-hover:scale-105">
            <Trophy className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-brand-navy">
              Athlete<span className="text-brand-bright">OS</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium -mt-1">
              Sports Tech Platform
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <Link
            href="#discover"
            className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-lg transition-colors"
          >
            Discover
          </Link>
          <Link
            href="#how-it-works"
            className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-lg transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#services"
            className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-lg transition-colors"
          >
            Services
          </Link>
          <Link
            href="#pricing"
            className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-lg transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="px-3.5 py-2 text-sm font-semibold text-brand-bright hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Activity className="h-4 w-4" />
            Live App Demo
          </Link>
        </nav>

        {/* Right: Auth CTAs */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-slate-700 hover:text-brand-blue font-medium">
              Log In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="bright" className="shadow-sm flex items-center gap-1.5 font-semibold">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/dashboard">
            <Button size="sm" variant="bright" className="text-xs px-3">
              App
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-brand-blue rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <nav className="flex flex-col space-y-2">
            <Link
              href="#discover"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Discover
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              How It Works
            </Link>
            <Link
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Services
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-semibold text-brand-bright hover:bg-blue-50 rounded-lg flex items-center gap-2"
            >
              <Activity className="h-4 w-4" /> Live Dashboard & Features
            </Link>
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Log In
              </Button>
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="bright" className="w-full justify-center">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
