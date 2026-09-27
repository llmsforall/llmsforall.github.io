import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import pages from './metadata.json'
import { routePath } from './routePath.js'

export default function Metadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    const page = pages[routePath(pathname)]
    if (!page) return
    document.title = page.title
    document.head.querySelectorAll('[data-page-meta]').forEach((node) => node.remove())
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = page.canonical
    canonical.dataset.pageMeta = ''
    document.head.appendChild(canonical)
    for (const attributes of page.meta) {
      const meta = document.createElement('meta')
      for (const [key, value] of Object.entries(attributes)) meta.setAttribute(key, value)
      meta.dataset.pageMeta = ''
      document.head.appendChild(meta)
    }
  }, [pathname])
  return null
}
