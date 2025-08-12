import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NftModal from './NftModal'

export default function NftCard({ nft, isFav, onToggleFav }){
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-card hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img src={nft.image.src} alt={nft.title} className="card-img" loading="lazy" />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded bg-black/60 text-white text-xs">{nft.category}</span>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <button onClick={onToggleFav} className={`px-2 py-1 rounded ${isFav ? 'bg-red-600 text-white' : 'bg-white/80 dark:bg-gray-700 text-gray-800'}`} aria-label="favorite">♥</button>
            <button onClick={()=> setOpen(true)} className="px-2 py-1 rounded bg-white/80 dark:bg-gray-700" aria-label="view">🔍</button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white"><Link to={`/nft/${nft.id}`}>{nft.title}</Link></h3>
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{nft.price} {nft.currency}</div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{nft.artist.name}</p>
        </div>
      </div>
      {open && <NftModal nft={nft} onClose={()=> setOpen(false)} onToggleFav={onToggleFav} isFav={isFav} />}
    </>
  )
}
