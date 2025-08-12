import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import GalleryPage from './pages/GalleryPage'
import DetailsPage from './pages/DetailsPage'

export default function App(){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  useEffect(()=>{ document.documentElement.classList.toggle('dark', theme === 'dark'); localStorage.setItem('theme', theme) },[theme])

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Routes>
        <Route path="/" element={<GalleryPage theme={theme} setTheme={setTheme} />} />
        <Route path="/nft/:id" element={<DetailsPage theme={theme} setTheme={setTheme} />} />
      </Routes>
    </div>
  )
}
