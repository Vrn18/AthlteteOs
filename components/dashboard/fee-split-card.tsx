'use client'

import React, { useState } from 'react'
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { INITIAL_FEE_LEDGERS, CURRENT_USER } from '@/lib/store'

export function FeeSplitCard({ matchId = 'match_01' }: { matchId?: string }) {
  const [ledger, setLedger] = useState(INITIAL_FEE_LEDGERS[matchId] || INITIAL_FEE_LEDGERS.match_01)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const paidCount = ledger.players.filter((p) => p.status === 'paid').length
  const totalAmountCollected = paidCount * ledger.per_player_cost

  const handleSimulatePayment = () => {
    setPaymentSuccess(true)
    setTimeout(() => {
      setIsQrModalOpen(false)
      setPaymentSuccess(false)
    }, 1500)
  }

  return (
    <Card className="rounded-3xl border-2 border-slate-200 bg-white shadow-2xs overflow-hidden">
      <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-brand-navy">
                Turf Cost Split & UPI Escrow
              </CardTitle>
              <p className="text-[11px] text-slate-500">
                Automated ground fee division with anti-ghosting deposit lock.
              </p>
            </div>
          </div>

          <Badge variant="success" className="text-[10px] font-bold">
            <Lock className="h-3 w-3 mr-1" /> Escrow Protected
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Cost Summary Bar */}
        <div className="grid grid-cols-3 gap-3 p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-100 text-center">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block">TOTAL TURF</span>
            <span className="text-base font-black text-brand-navy">₹{ledger.total_turf_cost}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block">PER PLAYER</span>
            <span className="text-base font-black text-emerald-700">₹{ledger.per_player_cost}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block">COLLECTED</span>
            <span className="text-base font-black text-brand-blue">
              ₹{totalAmountCollected} ({paidCount} Paid)
            </span>
          </div>
        </div>

        {/* Players Payment Ledger */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Squad Payment Status:
          </span>

          <div className="space-y-1.5">
            {ledger.players.map((p) => (
              <div
                key={p.profile_id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar src={p.avatar} fallback={p.name.substring(0, 2)} className="h-7 w-7 border" />
                  <span className="font-bold text-slate-800">{p.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-700">₹{p.amount}</span>
                  {p.status === 'paid' ? (
                    <Badge variant="success" className="text-[9px] py-0 px-1.5 font-bold">
                      Paid ✓
                    </Badge>
                  ) : (
                    <Badge variant="brand" className="text-[9px] py-0 px-1.5 font-bold">
                      Deposit Locked 🔒
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pay Action Button */}
        <Button
          size="sm"
          variant="bright"
          onClick={() => setIsQrModalOpen(true)}
          className="w-full font-bold text-xs h-9 gap-1.5 shadow-sm"
        >
          <QrCode className="h-4 w-4" />
          <span>Pay / View Match UPI QR (₹{ledger.per_player_cost})</span>
        </Button>
      </CardContent>

      {/* Simulated UPI QR Modal */}
      {isQrModalOpen && (
        <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
          <DialogHeader>
            <DialogTitle>Match Fee UPI QR Settlement</DialogTitle>
            <DialogDescription>
              Instant escrow verification for Sarjapur Play Arena T20 match.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 text-center space-y-4">
            {paymentSuccess ? (
              <div className="p-6 bg-green-50 rounded-2xl border border-green-200 text-center space-y-2 animate-in zoom-in-95">
                <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
                <h4 className="text-sm font-bold text-green-900">Payment Verified (₹200)</h4>
                <p className="text-xs text-green-700">Roster spot locked with match receipt #ATH-4892.</p>
              </div>
            ) : (
              <>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 inline-block mx-auto shadow-inner">
                  {/* Mock QR SVG */}
                  <div className="h-44 w-44 bg-white p-3 rounded-xl border border-slate-300 flex flex-col items-center justify-center space-y-2">
                    <QrCode className="h-28 w-28 text-brand-navy" />
                    <span className="text-[9px] font-mono text-slate-500 font-bold">athleteos.match01@upi</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xl font-black text-brand-navy">₹{ledger.per_player_cost}.00</div>
                  <p className="text-xs text-slate-500">Scan via GPay, PhonePe, or Paytm</p>
                </div>

                <Button
                  variant="bright"
                  size="sm"
                  onClick={handleSimulatePayment}
                  className="w-full font-bold text-xs h-9"
                >
                  Simulate Successful UPI Payment
                </Button>
              </>
            )}
          </div>
        </Dialog>
      )}
    </Card>
  )
}
