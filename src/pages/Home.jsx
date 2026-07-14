import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Filter } from 'lucide-react'
import { wines } from '../data/wines'

const Home = () => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredWines = wines.filter(wine => {
    const matchesFilter = filter === 'all' || wine.type.toLowerCase() === filter.toLowerCase()
    const matchesSearch = wine.name.toLowerCase().includes(search.toLowerCase()) ||
                         wine.region.toLowerCase().includes(search.toLowerCase()) ||
                         wine.grape.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const types = ['all', 'Red', 'White', 'Sparkling']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Premium Wines
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore our curated collection of exceptional wines from around the world
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex gap-2 flex-wrap">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === type
                        ? 'bg-wine-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <input
              type="text"
              placeholder="Search wines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-wine-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Wine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWines.map(wine => (
            <Link
              key={wine.id}
              to={`/wine/${wine.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-sm font-medium text-wine-600">
                  {wine.type}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {wine.name}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {wine.region}
                </p>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {wine.rating}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-wine-600">
                    ${wine.price}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {wine.stock} in stock
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredWines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No wines found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
