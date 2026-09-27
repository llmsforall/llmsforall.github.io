import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gemBurgundy from '../assets/icons/gem-burgundy.svg'
import gemSage from '../assets/icons/gem-sage.svg'

const companySizes = ['1-10', '11-50', '51-200', '201-1000', '1000+']

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Ireland', 'Australia', 'New Zealand',
  'Germany', 'France', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'Spain', 'Portugal', 'Italy', 'Poland', 'Czechia',
  'India', 'Singapore', 'Japan', 'South Korea', 'Taiwan', 'Hong Kong', 'China',
  'Israel', 'United Arab Emirates', 'Brazil', 'Mexico', 'Argentina', 'Chile',
  'South Africa', 'Other',
]

const cards = [
  {
    title: 'Fully private',
    copy: 'Runs on your device. Nothing goes to a server.',
    gem: gemBurgundy,
  },
  {
    title: 'Works offline',
    copy: 'Same answers on a plane, a train, or a dead zone.',
    gem: gemSage,
  },
  {
    title: 'Nothing to pay per query',
    copy: 'Open weights, no API key, no subscription meter',
    gem: gemBurgundy,
  },
]

const steps = ['Fill out the form', 'Book a time', 'Talk with our team']

const DEMO_ENDPOINT = import.meta.env.VITE_DEMO_ENDPOINT || '/v1/demo'

function DemoSelect({ name, label, options, value, onChange, required }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return undefined
    function onPointer(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    function onKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={`demo-select${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className={value ? 'demo-select-btn' : 'demo-select-btn is-empty'}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
      >
        {value || label}
      </button>
      <input
        className="demo-select-value"
        name={name}
        value={value}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        onChange={() => {}}
        onInvalid={(event) => {
          event.preventDefault()
          setOpen(true)
        }}
      />
      {open ? (
        <ul className="demo-select-menu" id={listId} role="listbox" aria-label={label}>
          <li className={value ? undefined : 'is-current'}>{label}</li>
          {options.map((option) => (
            <li key={option} className={value === option ? 'is-current' : undefined}>
              <button
                type="button"
                role="option"
                aria-selected={value === option}
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default function Demo() {
  const [companySize, setCompanySize] = useState('')
  const [country, setCountry] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Request a demo — LLMs For All'
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    if (submitting) return
    const data = new FormData(event.currentTarget)
    const phone = String(data.get('phone') || '').trim()
    const payload = {
      first_name: String(data.get('firstName') || '').trim(),
      last_name: String(data.get('lastName') || '').trim(),
      email: String(data.get('email') || '').trim(),
      company: String(data.get('company') || '').trim(),
      company_size: String(data.get('companySize') || '').trim(),
      country: String(data.get('country') || '').trim(),
      message: String(data.get('message') || '').trim(),
    }
    if (phone) payload.phone = phone

    setSubmitting(true)
    setError('')
    try {
      const response = await fetch(DEMO_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        setError(response.status === 400
          ? 'Check the form and try again.'
          : 'Something went wrong sending this. Please try again.')
        return
      }
      setSent(true)
    } catch {
      setError('Something went wrong sending this. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main id="main" className="demo">
      <div className="demo-hero-wrap">
        <div className="demo-hero">
          <h1>Let’s build AI that runs<br />on your devices.</h1>
          <p>Tell us what you’re building and where you want AI to run.</p>
        </div>
      </div>
      <div className="demo-body">
        <div className="demo-cards">
          {cards.map((card) => (
            <article className="demo-card" key={card.title}>
              <h2>
                <img className="gem" src={card.gem} alt="" width="36" height="36" />
                {card.title}
              </h2>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
        <div className="demo-panel">
          <ol className="demo-steps">
            {steps.map((label, index) => (
              <li key={label} className={index === 0 ? 'is-current' : undefined}>
                <span className="demo-num">{index + 1}</span>
                <span className="demo-step-label">{label}</span>
              </li>
            ))}
          </ol>
          {sent ? (
            <div className="demo-thanks" role="status">
              <h2>Thanks — you’re on the list.</h2>
              <p>We received your request and will follow up to book a time.</p>
            </div>
          ) : (
            <form className="demo-form" onSubmit={onSubmit}>
              <div className="demo-fields">
                <input name="firstName" autoComplete="given-name" placeholder="First name" aria-label="First name" required />
                <input name="lastName" autoComplete="family-name" placeholder="Last name" aria-label="Last name" required />
                <input name="email" type="email" autoComplete="email" placeholder="Work email" aria-label="Work email" required />
                <input name="company" autoComplete="organization" placeholder="Company you work for" aria-label="Company you work for" required />
                <DemoSelect name="companySize" label="Company Size" options={companySizes} value={companySize} onChange={setCompanySize} required />
                <DemoSelect name="country" label="Country" options={countries} value={country} onChange={setCountry} required />
                <input className="span-2" name="phone" type="tel" autoComplete="tel" placeholder="Phone number" aria-label="Phone number" />
                <textarea className="span-2" name="message" rows="7" placeholder="Tell us a little about your needs and how we can help." aria-label="Tell us a little about your needs and how we can help" required />
              </div>
              <p className="demo-consent">
                By submitting this form, you agree to our <Link to="/privacy">Privacy Policy</Link> and consent to being contacted by LLMs for All regarding your inquiry.
              </p>
              <button className="demo-submit" type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Submit'}
              </button>
              {error ? <p className="demo-error" role="alert">{error}</p> : null}
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
