import React, { useState, useEffect } from 'react'

export default function Toast() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const handler = (e) => {
      setMsg(e.detail)
      setTimeout(() => setMsg(''), 3000)
    }
    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [])

  if (!msg) return null
  return (
    <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2 rounded shadow-lg animate-fadeIn">
      {msg}
    </div>
  )
}
