import React, { useMemo, useState, useEffect } from 'react'
import Header from '../components/Header'
import NftCard from '../components/NftCard'
import nfts from '../data/nfts.json'
import useDebounce from '../utils/useDebounce'

export default function GalleryPage({ theme, setTheme }){
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [artist, setArtist] = useState('all')
  const [sort, setSort] = useState('newest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [favorites, setFavorites] = useState(()=> JSON.parse(localStorage.getItem('favs')||'[]'))

  useEffect(()=> localStorage.setItem('favs', JSON.stringify(favorites)),[favorites])

  const debounced = useDebounce(query, 300)
  const categories = useMemo(()=> ['all', ...Array.from(new Set(nfts.map(n=> n.category)))] ,[])
  const artists = useMemo(()=> ['all', ...Array.from(new Set(nfts.map(n=> n.artist.name)))] ,[])

  const filtered = useMemo(()=>{
    const q = debounced.trim().toLowerCase()
    let out = nfts.slice()
    if(category !== 'all') out = out.filter(n=> n.category === category)
    if(artist !== 'all') out = out.filter(n=> n.artist.name === artist)
    if(q) out = out.filter(n=> (n.title + ' ' + n.artist.name + ' ' + (n.tags||[]).join(' ')).toLowerCase().includes(q))
    if(minPrice) out = out.filter(n=> n.price >= parseFloat(minPrice))
    if(maxPrice) out = out.filter(n=> n.price <= parseFloat(maxPrice))
    if(sort === 'price-asc') out.sort((a,b)=> a.price - b.price)
    if(sort === 'price-desc') out.sort((a,b)=> b.price - a.price)
    if(sort === 'newest') out.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    if(sort === 'oldest') out.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt))
    return out
  },[category, artist, debounced, minPrice, maxPrice, sort])

  const toggleFav = (id)=> setFavorites(s => s.includes(id) ? s.filter(x=> x!==id) : [...s, id])

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <main className="max-w-6xl mx-auto p-4">
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title, artist or tags" className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent" />
            <select value={category} onChange={e=> setCategory(e.target.value)} className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              {categories.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={artist} onChange={e=> setArtist(e.target.value)} className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              {artists.map(a=> <option key={a} value={a}>{a}</option>)}
            </select>
            <input value={minPrice} onChange={e=> setMinPrice(e.target.value)} placeholder="min price" className="px-3 py-2 rounded-lg border w-24 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
            <input value={maxPrice} onChange={e=> setMaxPrice(e.target.value)} placeholder="max price" className="px-3 py-2 rounded-lg border w-24 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
            <select value={sort} onChange={e=> setSort(e.target.value)} className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">{filtered.length} items</div>
            <div className="text-sm">Favorites: {favorites.length}</div>
          </div>
        </div>

        <div className="masonry">
          {filtered.map(n => (
            <div key={n.id} className="masonry-item">
              <NftCard nft={n} isFav={favorites.includes(n.id)} onToggleFav={()=> toggleFav(n.id)} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
