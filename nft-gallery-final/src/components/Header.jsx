import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ theme, setTheme }){
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">NFT Gallery</Link>
        <div className="flex items-center gap-3">
          <button onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 border">{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}</button>
        </div>
      </div>
    </header>
  )
}
