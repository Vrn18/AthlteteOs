'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trophy, ArrowRight, ShieldCheck, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('varun@athleteos.in')
  const [password, setPassword] = useState('••••••••')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 group mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md">
            <Trophy className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-brand-navy">
            Athlete<span className="text-brand-bright">OS</span>
          </span>
        </Link>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
          Welcome back to AthleteOS
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Sign in to access your matches, community chats, and verified profile.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="rounded-3xl border-2 border-slate-200 bg-white shadow-lg p-6 sm:p-8">
          <div className="mb-6 bg-blue-50/80 p-3.5 rounded-2xl border border-blue-200 text-xs text-brand-blue flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-bright shrink-0" />
              <span><strong>Demo Mode:</strong> Click below to sign in instantly as Varun.</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="athlete@example.com"
                  className="pl-9 text-xs"
                />
                <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <a href="#" className="text-[11px] font-semibold text-brand-bright hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-9 text-xs"
                />
                <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <Button
              type="submit"
              variant="bright"
              disabled={isLoading}
              className="w-full font-bold h-11 text-sm shadow-md mt-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In to AthleteOS'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Don't have an athlete account?{' '}
              <Link href="/auth/signup" className="font-bold text-brand-bright hover:underline">
                Create free profile
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
