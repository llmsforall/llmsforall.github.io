import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Metadata from './Metadata.jsx'

function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return false
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  target.scrollIntoView({ behavior, block: 'start' })
  return true
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  const home = pathname === '/'
  const shell = home ? 'home' : pathname === '/millie/cli' ? 'cli-shell' : pathname === '/demo' ? 'demo-shell' : pathname === '/about' ? 'about-shell' : pathname === '/blog' ? 'blog-shell' : undefined
  const pathRef = useRef(pathname)

  useEffect(() => {
    const id = hash.startsWith('#') ? decodeURIComponent(hash.slice(1)) : ''
    const pathChanged = pathRef.current !== pathname
    pathRef.current = pathname
    if (id && scrollToSection(id)) return
    if (pathChanged) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className={shell}>
      <Metadata />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
