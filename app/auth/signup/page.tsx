'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trophy, ArrowRight, ShieldCheck, Mail, Lock, User, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { SimpleSelect } from '@/components/ui/select'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [primarySport, setPrimarySport] = useState('cricket')
  const [city, setCity] = useState('Bangalore')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard/profile')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
          Create Your Athlete Identity
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Join the single platform for every sport you play.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="rounded-3xl border-2 border-slate-200 bg-white shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="e.g. Varun Gangam"
                  className="pl-9 text-xs"
                />
                <User className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Sport
                </label>
                <SimpleSelect
                  value={primarySport}
                  onChange={setPrimarySport}
                  options={[
                    { label: '🏏 Cricket', value: 'cricket' },
                    { label: '⚽ Football', value: 'football' },
                    { label: '🏸 Badminton', value: 'badminton' },
                    { label: '🏃‍♂️ Running', value: 'running' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City
                </label>
                <SimpleSelect
                  value={city}
                  onChange={setCity}
                  options={[
                    { label: 'Bangalore', value: 'Bangalore' },
                    { label: 'Mumbai', value: 'Mumbai' },
                    { label: 'Delhi NCR', value: 'Delhi NCR' },
                    { label: 'Hyderabad', value: 'Hyderabad' },
                  ]}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  required
                  placeholder="At least 8 characters"
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
              {isLoading ? 'Creating Athlete Profile...' : 'Complete Registration'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-bold text-brand-bright hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
