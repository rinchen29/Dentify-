'use client'

import { useEffect, useRef, RefObject } from 'react'

interface UseAnimateOnScrollOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Returns a ref that, when attached to a container element, will add the
 * `is-visible` class to that element and all `.animate-on-scroll` descendants
 * when they enter the viewport.
 */
export function useAnimateOnScroll<T extends HTMLElement>(
  options: UseAnimateOnScrollOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null)
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    // Observe the container itself
    el.classList.add('animate-on-scroll')
    observer.observe(el)

    // Also observe any pre-existing children marked for animation
    const children = el.querySelectorAll('.animate-on-scroll')
    children.forEach((child) => observer.observe(child))

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return ref
}
