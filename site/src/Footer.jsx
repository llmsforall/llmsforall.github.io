import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'

export default function Footer() {
  return (
    <footer className="home-footer">
      <div className="footer-grid">
        <Link className="home-wordmark" to="/" aria-label="LLMs For All home">
          <img className="mark" src={logo} width="32" height="32" alt="" />
          <span>LLMsForALL</span>
        </Link>
        <div>
          <h2>Software</h2>
          <a href="https://apps.apple.com/us/app/millie-by-llms-for-all/id6800522384">Millie for iPhone</a>
          <Link to="/#cli">Millie CLI</Link>
          <Link to="/#models">Models</Link>
        </div>
        <div>
          <h2>Resources</h2>
          <a href="https://github.com/llmsforall">GitHub</a>
          <a href="https://huggingface.co/llmsforall">Hugging Face</a>
        </div>
        <div>
          <h2>Company</h2>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <a href="mailto:support@llmsforall.com">support@llmsforall.com</a>
        </div>
      </div>
      <p className="copyright">© 2026 LLMs for All, Inc. All rights reserved.</p>
    </footer>
  )
}
