'use client'

import React, { useState } from 'react'
import {
  MessageSquare,
  Send,
  Users,
  Search,
  CheckCheck,
  Smile,
  Paperclip,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Bot,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { CURRENT_USER, INITIAL_MESSAGES, SEED_ATHLETES } from '@/lib/store'
import { Message } from '@/types/database'

interface Channel {
  id: string
  name: string
  subtitle: string
  avatar: string
  isGroup: boolean
  unreadCount?: number
  sportBadge?: string
}

const CHANNELS: Channel[] = [
  {
    id: 'conv_cricket_01',
    name: 'Weekend T20 Friendly Match',
    subtitle: 'Arjun: Awesome. I’m opening the bowling spell...',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isGroup: true,
    unreadCount: 2,
    sportBadge: 'Cricket',
  },
  {
    id: 'conv_priya_direct',
    name: 'Priya Patel (Coach)',
    subtitle: 'Hey Varun, are you ready for the 8 PM...',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isGroup: false,
    sportBadge: 'Badminton',
  },
  {
    id: 'conv_football_02',
    name: '5v5 Turf League Squad',
    subtitle: 'Rohit: Bibs and match ball packed!',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    isGroup: true,
    sportBadge: 'Football',
  },
]

const BOT_ID = 'athleteos_bot'

function getBotReply(message: string, channel: Channel) {
  const normalizedMessage = message.toLowerCase()

  if (normalizedMessage.includes('time') || normalizedMessage.includes('when')) {
    return `The next ${channel.sportBadge} session in this chat is listed for ${channel.name.includes('T20') ? 'Saturday at 6:30 PM' : 'the scheduled time above'}.`
  }

  if (
    normalizedMessage.includes('player') ||
    normalizedMessage.includes('team') ||
    normalizedMessage.includes('join')
  ) {
    return 'I can help coordinate the roster. Open Matches to see open spots, or ask the group who is available.'
  }

  if (
    normalizedMessage.includes('location') ||
    normalizedMessage.includes('where') ||
    normalizedMessage.includes('venue')
  ) {
    return 'The venue is listed in the match details. Check the match card or ask the host to confirm the latest location.'
  }

  if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
    return `Hey! I’m AthleteOS Bot. I can help with ${channel.sportBadge.toLowerCase()} match timings, venues, and roster coordination.`
  }

  return 'Got it. I’m here to help with match timings, venues, and finding players. Try asking “When is the match?” or “Who can join?”'
}

export default function MessagesPage() {
  const [activeChannelId, setActiveChannelId] = useState<string>('conv_cricket_01')
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [inputMessage, setInputMessage] = useState('')

  const activeChannel = CHANNELS.find((c) => c.id === activeChannelId) || CHANNELS[0]

  const currentChannelMessages = messages.filter((m) => m.conversation_id === activeChannelId)

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage
    if (!text.trim()) return

    const messageText = text.trim()
    const conversationId = activeChannelId
    const channel = activeChannel

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversation_id: conversationId,
      sender_id: CURRENT_USER.id,
      sender_name: CURRENT_USER.full_name,
      sender_avatar: CURRENT_USER.avatar_url,
      message: messageText,
      created_at: 'Just now',
      is_match_channel: channel.isGroup,
    }

    setMessages((prev) => [...prev, newMsg])
    setInputMessage('')

    window.setTimeout(() => {
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        conversation_id: conversationId,
        sender_id: BOT_ID,
        sender_name: 'AthleteOS Bot',
        sender_avatar: '',
        message: getBotReply(messageText, channel),
        created_at: 'Just now',
        is_match_channel: channel.isGroup,
      }

      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  const quickPresets = [
    'Pitch confirmed! See everyone 15m early.',
    'Need 1 more player! Anyone free?',
    'Bringing extra equipment & balls.',
    'What jersey color are we wearing?',
  ]

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-brand-bright" />
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
            Sports Community Chat
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Coordinate ground timings, team formations, and match logistics without noisy WhatsApp spam.
        </p>
      </div>

      {/* Main Chat Interface Window */}
      <div className="h-[620px] bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Channels Column */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0">
          <div className="p-4 border-b border-slate-200 bg-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Conversations ({CHANNELS.length})
            </h3>
            <div className="relative">
              <Input
                placeholder="Search chats & athletes..."
                className="text-xs h-9 pl-8 bg-slate-50"
              />
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {CHANNELS.map((channel) => {
              const isActive = channel.id === activeChannelId
              return (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannelId(channel.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-xs'
                      : 'hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      src={channel.avatar}
                      fallback={channel.name.substring(0, 2)}
                      className="h-10 w-10 border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs truncate">{channel.name}</span>
                      </div>
                      <p
                        className={`text-[11px] truncate mt-0.5 ${
                          isActive ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {channel.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {channel.sportBadge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {channel.sportBadge}
                      </span>
                    )}
                    {channel.unreadCount && !isActive && (
                      <span className="h-4 w-4 rounded-full bg-brand-bright text-white text-[9px] font-bold flex items-center justify-center">
                        {channel.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div className="flex-1 flex flex-col justify-between bg-white h-full min-w-0">
          
          {/* Chat Pane Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <Avatar
                src={activeChannel.avatar}
                fallback={activeChannel.name.substring(0, 2)}
                className="h-10 w-10 border border-slate-200"
              />
              <div>
                <h4 className="font-bold text-sm text-brand-navy flex items-center gap-2">
                  <span>{activeChannel.name}</span>
                  {activeChannel.isGroup ? (
                    <Badge variant="brand" className="text-[10px] py-0 px-1.5">
                      Match Roster Channel
                    </Badge>
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-brand-bright" />
                  )}
                </h4>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
                  Active participants • Real-time synchronization
                </p>
              </div>
            </div>

            <Badge variant="secondary" className="text-xs">
              {activeChannel.sportBadge}
            </Badge>
          </div>

          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {currentChannelMessages.map((msg) => {
              const isMe = msg.sender_id === CURRENT_USER.id
              const isBot = msg.sender_id === BOT_ID

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    isBot ? (
                      <div className="h-8 w-8 rounded-full bg-brand-bright text-white flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4" />
                      </div>
                    ) : (
                      <Avatar
                        src={msg.sender_avatar}
                        fallback={msg.sender_name.substring(0, 2)}
                        className="h-8 w-8 border border-slate-200 shrink-0"
                      />
                    )
                  )}

                  <div
                    className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm space-y-1 shadow-2xs ${
                      isMe
                        ? 'bg-brand-blue text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    {!isMe && (
                      <span className={`text-[10px] font-bold block ${isBot ? 'text-brand-bright' : 'text-brand-blue'}`}>
                        {msg.sender_name}
                        {isBot && <Sparkles className="inline-block h-3 w-3 ml-1" />}
                      </span>
                    )}
                    <p className="leading-relaxed">{msg.message}</p>
                    <div
                      className={`text-[10px] flex items-center justify-end gap-1 ${
                        isMe ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.created_at}</span>
                      {isMe && <CheckCheck className="h-3.5 w-3.5 text-sky-300" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Presets Bar */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
              Quick Coordination:
            </span>
            {quickPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => handleSendMessage(preset)}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-slate-600 hover:text-brand-blue border border-slate-200 text-[11px] font-medium whitespace-nowrap transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder={`Message ${activeChannel.name}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="text-xs h-10 flex-1"
              />
              <Button type="submit" variant="bright" size="sm" className="h-10 px-4 font-bold gap-1.5">
                <span>Send</span>
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>

        </div>

      </div>

    </div>
  )
}
