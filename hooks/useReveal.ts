'use client'
import { useEffect, useRef } from 'react'

export function useReveal(delay = 0) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.querySelectorAll<HTMLElement>('.reveal-text, .fade-up').forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 120)
            })
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}
