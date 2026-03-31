'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface SiteConfig {
  id: string
  clinicName: string
  tagline: string
  phone: string
  whatsapp: string
  email: string
  address: string
  city: string
  logoUrl: string | null
}

const DEFAULT: SiteConfig = {
  id: '',
  clinicName: 'Dentify',
  tagline: 'Your Smile Deserves the Best Care',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'hello@dentify.com',
  address: 'B-12, Sector 18, Noida',
  city: 'Uttar Pradesh 201301',
  logoUrl: null,
}

interface ContextValue {
  config: SiteConfig
  refetch: () => Promise<void>
}

const SiteConfigContext = createContext<ContextValue>({
  config: DEFAULT,
  refetch: async () => {},
})

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT)

  const refetch = useCallback(async () => {
    try {
      const res = await fetch('/api/config')
      const d = await res.json()
      if (d.config) setConfig(d.config)
    } catch {}
  }, [])

  useEffect(() => { refetch() }, [refetch])

  return (
    <SiteConfigContext.Provider value={{ config, refetch }}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  return useContext(SiteConfigContext).config
}

export function useSiteConfigRefetch() {
  return useContext(SiteConfigContext).refetch
}
