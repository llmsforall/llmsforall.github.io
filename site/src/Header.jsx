import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/Logo.png'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="home-header">
      <Link className="home-wordmark" to="/" aria-label="LLMs For All home">
        <img className="mark" src={logo} width="32" height="32" alt="" />
        <span>LLMsForALL</span>
      </Link>
      <nav className="home-nav" aria-label="Main navigation">
        <Link to="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
        <Link to="/blog" aria-current={pathname === '/blog' ? 'page' : undefined}>Blog</Link>
        <a href="https://github.com/llmsforall">Github</a>
        <Link to="/about" aria-current={pathname === '/about' ? 'page' : undefined}>About</Link>
        <Link className="demo-btn" to="/demo" aria-current={pathname === '/demo' ? 'page' : undefined}>Request a demo</Link>
      </nav>
    </header>
  )
}
