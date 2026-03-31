'use client'

import { useEffect, useState } from 'react'
import { Mail, Trash2, Loader2, RefreshCw, MailOpen, MessageSquare, Phone, Clock } from 'lucide-react'

type MessageStatus = 'UNREAD' | 'READ' | 'REPLIED'

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  status: MessageStatus
  createdAt: string
}

const STATUS_STYLES: Record<MessageStatus, string> = {
  UNREAD:  'bg-blue-50 text-blue-700 border-blue-200',
  READ:    'bg-slate-50 text-slate-500 border-slate-200',
  REPLIED: 'bg-teal-50 text-teal-700 border-teal-200',
}

const STATUS_LABELS: Record<MessageStatus, string> = {
  UNREAD: 'Unread', READ: 'Read', REPLIED: 'Replied',
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      setMessages(data.messages ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMessages() }, [])

  const markStatus = async (id: string, status: MessageStatus) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, status } : m))
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : s)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message? This cannot be undone.')) return
    setDeletingId(id)
    await fetch(`/api/contact/${id}`, { method: 'DELETE' })
    setMessages(msgs => msgs.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
    setDeletingId(null)
  }

  const openMessage = (msg: Message) => {
    setSelected(msg)
    if (msg.status === 'UNREAD') markStatus(msg.id, 'READ')
  }

  const unreadCount = messages.filter(m => m.status === 'UNREAD').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            Contact Messages
            {unreadCount > 0 && (
              <span className="text-xs font-bold bg-blue-700 text-white px-2 py-0.5 rounded-full">{unreadCount} new</span>
            )}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{messages.length} total messages from the contact form</p>
        </div>
        <button onClick={fetchMessages} className="btn-outline text-sm py-2 px-4">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium mb-1">No messages yet</p>
          <p className="text-slate-400 text-sm">Messages submitted via the Contact page will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Message list */}
          <div className="lg:col-span-2 space-y-2">
            {messages.map(msg => (
              <button
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selected?.id === msg.id
                    ? 'border-blue-300 bg-blue-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    {msg.status === 'UNREAD' && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    )}
                    <p className={`text-sm font-semibold truncate ${msg.status === 'UNREAD' ? 'text-slate-900' : 'text-slate-600'}`}>
                      {msg.name}
                    </p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${STATUS_STYLES[msg.status]}`}>
                    {STATUS_LABELS[msg.status]}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mb-1">{msg.email}</p>
                {msg.subject && (
                  <p className="text-xs font-medium text-slate-500 truncate mb-1">{msg.subject}</p>
                )}
                <p className="text-xs text-slate-400 line-clamp-2">{msg.message}</p>
                <p className="text-[10px] text-slate-300 mt-2">
                  {new Date(msg.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </button>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden sticky top-4">
                {/* Detail header */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display font-bold text-slate-900">{selected.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <a href={`mailto:${selected.email}`} className="flex items-center gap-1 text-xs text-blue-700 hover:underline">
                        <Mail className="w-3 h-3" />{selected.email}
                      </a>
                      {selected.phone && (
                        <a href={`tel:${selected.phone}`} className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-700">
                          <Phone className="w-3 h-3" />{selected.phone}
                        </a>
                      )}
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {new Date(selected.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_STYLES[selected.status]}`}>
                    {STATUS_LABELS[selected.status]}
                  </span>
                </div>

                {/* Subject + message body */}
                <div className="p-6">
                  {selected.subject && (
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Subject</p>
                  )}
                  {selected.subject && (
                    <p className="text-sm font-semibold text-slate-700 mb-4">{selected.subject}</p>
                  )}
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Message</p>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your enquiry'}`}
                    onClick={() => markStatus(selected.id, 'REPLIED')}
                    className="btn-primary text-sm py-2 px-4"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Reply via Email
                  </a>
                  {selected.status !== 'READ' && (
                    <button onClick={() => markStatus(selected.id, 'READ')} className="btn-outline text-sm py-2 px-4">
                      <MailOpen className="w-3.5 h-3.5" />
                      Mark Read
                    </button>
                  )}
                  {selected.status !== 'REPLIED' && (
                    <button onClick={() => markStatus(selected.id, 'REPLIED')} className="btn-outline text-sm py-2 px-4">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Mark Replied
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selected.id)}
                    disabled={deletingId === selected.id}
                    className="ml-auto p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === selected.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Mail className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
