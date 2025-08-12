import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import nfts from '../data/nfts.json'
import NftCard from '../components/NftCard'
import useDebounce from '../utils/useDebounce'

export default function DetailsPage({ theme, setTheme }){
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [sortRelated, setSortRelated] = useState('newest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [favorites, setFavorites] = useState(()=> JSON.parse(localStorage.getItem('favs')||'[]'))

  useEffect(()=> localStorage.setItem('favs', JSON.stringify(favorites)),[favorites])

  useEffect(()=>{
    const found = nfts.find(x=> String(x.id) === String(id))
    setItem(found || null)
  },[id])

  const related = useMemo(()=>{
    if(!item) return []
    let out = nfts.filter(n=> n.category === item.category && n.id !== item.id)
    if(minPrice) out = out.filter(n=> n.price >= parseFloat(minPrice))
    if(maxPrice) out = out.filter(n=> n.price <= parseFloat(maxPrice))
    if(sortRelated === 'price-asc') out.sort((a,b)=> a.price - b.price)
    if(sortRelated === 'price-desc') out.sort((a,b)=> b.price - a.price)
    if(sortRelated === 'newest') out.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    return out
  },[item, sortRelated, minPrice, maxPrice])

  const toggleFav = (id)=> setFavorites(s => s.includes(id) ? s.filter(x=> x!==id) : [...s, id])

  if(!item) return <div>Loading…</div>

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow">
            <img src={item.image.src} alt={item.title} className="w-full h-auto" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 my-2">by {item.artist.name}</p>
            <div className="text-lg font-semibold my-4">{item.price} {item.currency}</div>
            <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
            <div className="mt-6 flex gap-3">
              <button onClick={()=> toggleFav(item.id)} className="px-4 py-2 rounded bg-indigo-600 text-white">Favorite</button>
              <a href={item.externalUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded border">View external</a>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Related in {item.category}</h2>
          <div className="mb-4 flex gap-3 items-center">
            <select value={sortRelated} onChange={e=> setSortRelated(e.target.value)} className="px-3 py-2 rounded border bg-white dark:bg-gray-800">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
            <input value={minPrice} onChange={e=> setMinPrice(e.target.value)} placeholder="min price" className="px-3 py-2 rounded border w-24 bg-white dark:bg-gray-800" />
            <input value={maxPrice} onChange={e=> setMaxPrice(e.target.value)} placeholder="max price" className="px-3 py-2 rounded border w-24 bg-white dark:bg-gray-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map(r=> <NftCard key={r.id} nft={r} isFav={favorites.includes(r.id)} onToggleFav={()=> toggleFav(r.id)} />)}
          </div>
        </section>
      </main>
    </div>
  )
}
