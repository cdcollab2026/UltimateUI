import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, ShoppingBasket, Sparkles, ShieldCheck, ChevronRight } from 'lucide-react'
import Reviews from './Reviews'
import { inventory } from '../data/inventory'
import { useCart } from '../context/CartContext'

const categories = [
  { key: 'all', label: 'All Items' },
  { key: 'Spirits', label: 'Spirits' },
  { key: 'Allocated / Rare Spirits', label: 'Allocated' },
  { key: 'Beer', label: 'Beer' },
  { key: 'Wine', label: 'Wine' },
  { key: 'Soda & Mixers', label: 'Mixers' },
  { key: 'Snacks & Candy', label: 'Snacks' },
  { key: 'Grocery / Food', label: 'Groceries' },
  { key: 'Household Products', label: 'Household' }
]

const categoryTiles = [
  { title: 'Spirits', description: 'Whiskey, vodka, gin, rum, tequila', href: '/category/spirits' },
  { title: 'Allocated / Rare', description: 'Blanton’s, E.H. Taylor, Weller', href: '/category/allocated' },
  { title: 'Wine', description: 'Red, white, sparkling, and premium bottles', href: '/category/wine' },
  { title: 'Beer', description: 'Craft, lager, and seasonal favorites', href: '/category/beer' },
  { title: 'Mixers', description: 'Soda, tonic, and cocktail essentials', href: '/category/mixers' },
  { title: 'Snacks', description: 'Chips, candy, chocolate, and bar bites', href: '/category/snacks' },
  { title: 'Groceries', description: 'Rice, noodles, beans, starches, pantry staples', href: '/category/groceries' },
  { title: 'Household', description: 'Paper goods, cleaners, and every day essentials', href: '/category/household' }
]

const Home = () => {
  const { addToCart } = useCart()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showAgeGate, setShowAgeGate] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)

  useEffect(() => {
    const hasSeenGate = sessionStorage.getItem('age-gate-seen')
    if (!hasSeenGate) {
      setShowAgeGate(true)
    }
  }, [])

  const handleAgeConfirm = () => {
    sessionStorage.setItem('age-gate-seen', 'true')
    setShowAgeGate(false)
  }

  const filteredItems = useMemo(() => {
    const term = search.toLowerCase()
    const items = inventory.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      const matchesSearch = item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term) || item.tag.toLowerCase().includes(term)
      const matchesStock = !inStockOnly || item.status === 'In Stock'
      return matchesCategory && matchesSearch && matchesStock
    })

    return items.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return a.name.localeCompare(b.name)
    })
  }, [activeCategory, inStockOnly, search, sortBy])

  const featuredItems = inventory.filter(item => item.featured)
  const previewItems = filteredItems.slice(0, 12)

  return (
    <div className="min-h-screen text-white">
      {showAgeGate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#121212] p-8 text-center shadow-2xl">
            <ShieldCheck className="mx-auto h-12 w-12 text-[#f2c96b]" />
            <h2 className="mt-4 text-2xl font-semibold">Age verification required</h2>
            <p className="mt-3 text-gray-400">You must be 21 or older to view alcohol inventory. By continuing, you confirm your age.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={handleAgeConfirm} className="rounded-full bg-[#f2c96b] px-5 py-3 font-semibold text-black">I am 21+</button>
              <button onClick={() => setShowAgeGate(false)} className="rounded-full border border-white/10 px-5 py-3 font-semibold text-gray-300">Exit</button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-[#f2c96b]/20 bg-[linear-gradient(135deg,rgba(242,201,107,0.24),rgba(0,0,0,0.8)),url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f2c96b]">Boutique spirits & pantry essentials</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">Ultimate Liquor & Groceries</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-200">A curated collection of premium pours, craft beer, wine, and pantry staples designed with the same care as the bottles on our shelves.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/deals" className="rounded-full bg-[#f2c96b] px-5 py-3 font-semibold text-black transition hover:scale-[1.01]">Shop featured offers</Link>
              <Link to="/contact" className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur">Visit the store</Link>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-3 rounded-[1.5rem] border border-[#f2c96b]/15 bg-gradient-to-r from-[#17120b] to-[#101010] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f2c96b]">Explore your favorites</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white">Discover spirits, groceries, and rare finds in one curated stop.</h2>
            </div>
            <div className="inline-flex items-center rounded-full border border-[#f2c96b]/20 bg-[#f2c96b]/10 px-4 py-2 text-sm font-semibold text-[#f2c96b]">
              Curated for every kind of host
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categoryTiles.map((tile) => (
              <Link key={tile.title} to={tile.href} className="card-hover rounded-[1.5rem] border border-white/10 bg-[#111111] p-5 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c96b]">{tile.title}</p>
                <p className="mt-2 text-sm leading-7 text-gray-400">{tile.description}</p>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-white">Explore <ChevronRight className="ml-1 h-4 w-4" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-6 shadow-lg">
            <div className="flex items-center gap-2 text-gray-300">
              <Search className="h-5 w-5 text-[#f2c96b]" />
              <span className="font-semibold">Fast search</span>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by product name" className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0" />
              <button onClick={() => setInStockOnly(v => !v)} className={`rounded-2xl px-4 py-3 font-semibold ${inStockOnly ? 'bg-[#f2c96b] text-black' : 'bg-white/10 text-gray-200'}`}>
                {inStockOnly ? 'In stock only' : 'Show all'}
              </button>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-6 shadow-lg">
            <div className="flex items-center gap-2 text-gray-300">
              <Filter className="h-5 w-5 text-[#f2c96b]" />
              <span className="font-semibold">Sort & filter</span>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white">
                <option value="name">Alphabetical</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white">
                {categories.map(category => <option key={category.key} value={category.key}>{category.label}</option>)}
              </select>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-[#f2c96b]/15 bg-gradient-to-br from-[#1c1408] to-[#101010] p-8 shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c96b]">Featured products</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Limited release bourbons and sought-after pours.</h2>
              <p className="mt-3 max-w-2xl text-gray-300">From Blanton’s to E.H. Taylor and Weller, the rarest bottles are highlighted with a limited stock badge and a direct notify option.</p>
            </div>
            <button className="rounded-full border border-[#f2c96b]/40 bg-[#f2c96b]/10 px-5 py-3 font-semibold text-[#f2c96b]">Notify me about releases</button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredItems.map(item => (
              <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 card-hover">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#f2c96b]/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f2c96b]">Limited Stock</span>
                  <span className="text-sm text-gray-400">{item.size}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-400">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-semibold text-[#f2c96b]">${item.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(item)} className="rounded-full bg-[#f2c96b] px-3 py-2 text-sm font-semibold text-black">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Reviews />

        <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#111111] p-8 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c96b]">Newsletter</p>
              <h2 className="mt-2 text-2xl font-semibold">Stay in the loop for allocations, bundles, and seasonal arrivals.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input placeholder="Email address" className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" />
              <button className="rounded-full bg-[#f2c96b] px-5 py-3 font-semibold text-black">Subscribe</button>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <ShoppingBasket className="h-5 w-5 text-[#f2c96b]" />
            <h2 className="text-xl font-semibold">Catalog preview</h2>
          </div>
          {previewItems.length === 0 ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-8 text-center text-gray-400 shadow-lg">No products match your search yet.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {previewItems.map((item) => (
                <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 card-hover">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f2c96b]">{item.category}</p>
                      <h4 className="mt-2 font-semibold text-white">{item.name}</h4>
                    </div>
                    {item.category === 'Allocated / Rare Spirits' ? (
                      <span className="rounded-full border border-[#f2c96b]/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f2c96b]">Rare</span>
                    ) : null}
                  </div>
                  <img src={item.image} alt={item.name} className="mt-4 h-40 w-full rounded-2xl object-cover" />
                  <p className="mt-3 text-sm leading-7 text-gray-400">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>{item.size}</span>
                    <span>{item.status}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#f2c96b]">${item.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(item)} className="rounded-full bg-[#f2c96b] px-3 py-2 text-sm font-semibold text-black">Add</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
