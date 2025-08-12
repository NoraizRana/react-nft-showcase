import React from 'react'
import { Link } from 'react-router-dom'

export default function NftModal({ nft, onClose, onToggleFav, isFav }){
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-black/5 dark:bg-gray-800 p-4 flex items-center justify-center">
            <img src={nft.image.src} alt={nft.title} className="max-h-[70vh] object-contain" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold">{nft.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">by {nft.artist.name}</p>
            <div className="mt-4 text-lg font-semibold">{nft.price} {nft.currency}</div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">{nft.description}</p>

            <div className="mt-6 flex gap-3">
              <button onClick={onToggleFav} className={`px-4 py-2 rounded ${isFav ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{isFav ? 'Unfavorite' : 'Add to favorites'}</button>
              <a href={nft.externalUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded border">View on marketplace</a>
              <Link to={`/nft/${nft.id}`} className="px-4 py-2 rounded border">Open details page</Link>
              <button onClick={onClose} className="px-4 py-2 rounded border">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
