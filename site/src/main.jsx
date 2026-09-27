import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import '../styles.css'
import { routePath } from './routePath.js'

// Keep links ending in index.html compatible with the original static site.
if (window.location.pathname.endsWith('/index.html')) {
  history.replaceState(null, '', routePath(window.location.pathname) + window.location.search + window.location.hash)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
