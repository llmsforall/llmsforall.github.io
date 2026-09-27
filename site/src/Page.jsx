import { useEffect } from 'react'
import lottie from 'lottie-web'
import titles from './content/titles.json'
import millieMark from '../assets/millie-web.json'
import heroAnimation from '../assets/hero_animation.json'
import home from './content/home.html?raw'
import about from './content/about.html?raw'
import blog from './content/blog.html?raw'
import blogMillie from './content/blog-millie-1-1.html?raw'
import blogCli from './content/blog-millie-cli.html?raw'
import millieCli from './content/millie-cli.html?raw'
import privacy from './content/privacy.html?raw'
import terms from './content/terms.html?raw'
import notices from './content/notices.html?raw'
import support from './content/support.html?raw'

const pages = {
  home,
  about,
  blog,
  'blog-millie-1-1': blogMillie,
  'blog-millie-cli': blogCli,
  'millie-cli': millieCli,
  privacy,
  terms,
  notices,
  support,
}

function selectPlatform(platform) {
  const tabs = [...document.querySelectorAll('[role="tab"]')]
  tabs.forEach((tab) => {
    const active = tab.dataset.platform === platform
    tab.setAttribute('aria-selected', String(active))
    tab.tabIndex = active ? 0 : -1
    const panel = document.getElementById(tab.getAttribute('aria-controls'))
    if (panel) panel.hidden = !active
  })
}

export default function Page({ id }) {
  useEffect(() => {
    document.title = titles[id]
  }, [id])

  useEffect(() => {
    if (id !== 'home') return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animations = []
    const mark = document.querySelector('[data-millie-mark]')
    if (mark) {
      animations.push(lottie.loadAnimation({
        container: mark,
        renderer: 'svg',
        loop: !reduce,
        autoplay: !reduce,
        animationData: millieMark,
      }))
    }
    const hero = document.querySelector('[data-hero-animation]')
    if (hero) {
      const animation = lottie.loadAnimation({
        container: hero,
        renderer: 'svg',
        loop: !reduce,
        autoplay: !reduce,
        animationData: heroAnimation,
      })
      if (reduce) animation.goToAndStop(228, true)
      animations.push(animation)
    }
    return () => animations.forEach((animation) => animation.destroy())
  }, [id])

  useEffect(() => {
    if (id !== 'millie-cli') return undefined
    const tabs = [...document.querySelectorAll('[role="tab"]')]
    const platformFromHash = () => (window.location.hash === '#linux' ? 'linux' : 'mac')
    const onPlatform = (event) => {
      const platform = event.currentTarget.dataset.platform
      selectPlatform(platform)
      const next = `#${platform}`
      if (window.location.hash !== next) history.replaceState(null, '', next)
    }
    selectPlatform(platformFromHash())
    const onHash = () => selectPlatform(platformFromHash())
    window.addEventListener('hashchange', onHash)
    const controls = [...document.querySelectorAll('[data-platform]')]
    controls.forEach((control) => control.addEventListener('click', onPlatform))
    const onKey = (event) => {
      const index = tabs.indexOf(event.currentTarget)
      let target
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') target = tabs[1 - index]
      if (event.key === 'Home') target = tabs[0]
      if (event.key === 'End') target = tabs[tabs.length - 1]
      if (target) {
        event.preventDefault()
        const platform = target.dataset.platform
        selectPlatform(platform)
        const next = `#${platform}`
        if (window.location.hash !== next) history.replaceState(null, '', next)
        target.focus()
      }
    }
    tabs.forEach((tab) => tab.addEventListener('keydown', onKey))
    const onCopy = async (event) => {
      const button = event.currentTarget
      const status = document.getElementById('copy-status')
      try {
        await navigator.clipboard.writeText(button.parentElement.querySelector('code').textContent)
        button.textContent = 'Copied'
        if (status) status.textContent = 'Command copied.'
        window.setTimeout(() => { button.textContent = 'Copy' }, 1800)
      } catch {
        if (status) status.textContent = 'Could not copy. Select the command and copy it manually.'
      }
    }
    const copyButtons = [...document.querySelectorAll('.copy-command')]
    copyButtons.forEach((button) => button.addEventListener('click', onCopy))
    return () => {
      window.removeEventListener('hashchange', onHash)
      controls.forEach((control) => control.removeEventListener('click', onPlatform))
      tabs.forEach((tab) => tab.removeEventListener('keydown', onKey))
      copyButtons.forEach((button) => button.removeEventListener('click', onCopy))
    }
  }, [id])

  return <div dangerouslySetInnerHTML={{ __html: pages[id] }} />
}
