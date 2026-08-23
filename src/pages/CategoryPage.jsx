import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Search, Filter, ArrowRight, SlidersHorizontal } from 'lucide-react'
import { inventory } from '../data/inventory'
import { useCart } from '../context/CartContext'

const categoryMap = {
  spirits: 'Spirits',
  allocated: 'Allocated / Rare Spirits',
  beer: 'Beer',
  wine: 'Wine',
  mixers: 'Soda & Mixers',
  snacks: 'Snacks & Candy',
  groceries: 'Grocery / Food',
  household: 'Household Products'
}

const slugOptions = [
  { slug: 'spirits', label: 'Spirits' },
  { slug: 'allocated', label: 'Allocated' },
  { slug: 'beer', label: 'Beer' },
  { slug: 'wine', label: 'Wine' },
  { slug: 'mixers', label: 'Mixers' },
  { slug: 'snacks', label: 'Snacks' },
  { slug: 'groceries', label: 'Groceries' },
  { slug: 'household', label: 'Household' }
]

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const CategoryPage = () => {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [stockFilter, setStockFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')

  const selectedCategory = categoryMap[slug] || 'All Items'
  const items = useMemo(() => {
    const term = search.toLowerCase()
    return inventory.filter((item) => {
      const matchesCategory = selectedCategory === 'All Items' || item.category === selectedCategory
      const matchesSearch = item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term) || item.tag.toLowerCase().includes(term)
      const matchesStock = stockFilter === 'all' || (stockFilter === 'in-stock' ? item.status === 'In Stock' : item.status !== 'In Stock')
      const matchesPrice = priceFilter === 'all' || (priceFilter === 'under-20' ? item.price < 20 : item.price >= 20)
      const matchesBrand = brandFilter === 'all' || item.tag === brandFilter
      return matchesCategory && matchesSearch && matchesStock && matchesPrice && matchesBrand
    })
  }, [brandFilter, priceFilter, search, selectedCategory, slug, stockFilter])

  const sortedItems = useMemo(() => {
    const list = [...items]
    if (sortBy === 'price-low') return list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') return list.sort((a, b) => b.price - a.price)
    if (sortBy === 'newest') return list.sort((a, b) => b.id - a.id)
    if (sortBy === 'popular') return list.sort((a, b) => b.price - a.price)
    return list.sort((a, b) => a.name.localeCompare(b.name))
  }, [items, sortBy])

  const groupedItems = useMemo(() => {
    // Only group alphabetically when sorting by name. For other sorts (price, newest,
    // popular) show a flat, fully-sorted list so the user sees correct ordering.
    if (sortBy !== 'name') return null
    const grouped = {}
    sortedItems.forEach((item) => {
      const letter = item.name[0].toUpperCase()
      if (!grouped[letter]) grouped[letter] = []
      grouped[letter].push(item)
    })
    return grouped
  }, [sortedItems, sortBy])

  const brandOptions = ['all', ...new Set(inventory.map((item) => item.tag))]
  const isGroceryCategory = slug === 'groceries'
  const groceryHighlights = sortedItems.filter((item) => item.category === 'Grocery / Food').slice(0, 3)

  const scrollToLetter = (letter) => {
    document.getElementById(`section-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-[#f2c96b]">Home</Link>
          <span>/</span>
          <span>{selectedCategory}</span>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-[#101010] p-6 shadow-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c96b]">Category page</p>
              <h1 className="mt-2 font-display text-3xl text-white">{selectedCategory}</h1>
              <p className="mt-3 max-w-2xl text-gray-400">Browse this section alphabetically, filter by style or price, and shop with confidence.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {slugOptions.map((option) => (
                <Link key={option.slug} to={`/category/${option.slug}`} className={`rounded-full px-3 py-2 text-sm font-semibold ${slug === option.slug ? 'bg-[#f2c96b] text-black' : 'border border-white/10 text-gray-300 hover:border-[#f2c96b] hover:text-[#f2c96b]'}`}>
                  {option.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {isGroceryCategory && (
          <section className="mt-6 rounded-[1.75rem] border border-[#f2c96b]/20 bg-[#111111] p-6 shadow-lg">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c96b]">Grocery spotlight</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Curated pantry essentials for home and hospitality.</h2>
                <p className="mt-4 text-gray-300">From everyday staples to snackable treats, this grocery collection is built to complement our beverage selection and make meal prep easier.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/category/groceries" className="rounded-full bg-[#f2c96b] px-5 py-3 font-semibold text-black">Shop groceries</Link>
                  <Link to="/category/snacks" className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white">Browse snacks</Link>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <h3 className="text-lg font-semibold text-white">Top grocery picks</h3>
                <div className="mt-4 space-y-3 text-sm text-gray-300">
                  {groceryHighlights.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-white/10 bg-[#0e0e0e] p-3">
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-gray-400">{item.size} · ${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-5 shadow-lg">
            <div className="flex items-center gap-2 text-[#f2c96b]">
              <SlidersHorizontal className="h-5 w-5" />
              <h2 className="font-semibold">Filters</h2>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block text-sm text-gray-400">
                <span className="mb-2 block">Search</span>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                  <Search className="h-4 w-4 text-[#f2c96b]" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name or style" className="w-full bg-transparent outline-none" />
                </div>
              </label>

              <label className="block text-sm text-gray-400">
                <span className="mb-2 block">Sort</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-white">
                  <option value="name">Alphabetical</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Popular</option>
                </select>
              </label>

              <label className="block text-sm text-gray-400">
                <span className="mb-2 block">Stock</span>
                <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-white">
                  <option value="all">All</option>
                  <option value="in-stock">In stock</option>
                  <option value="limited">Limited / allocated</option>
                </select>
              </label>

              <label className="block text-sm text-gray-400">
                <span className="mb-2 block">Price</span>
                <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-white">
                  <option value="all">Any price</option>
                  <option value="under-20">Under $20</option>
                  <option value="20-plus">$20+</option>
                </select>
              </label>

              <label className="block text-sm text-gray-400">
                <span className="mb-2 block">Style / brand</span>
                <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-white">
                  {brandOptions.map((option) => (
                    <option key={option} value={option}>{option === 'all' ? 'All styles' : option}</option>
                  ))}
                </select>
              </label>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-4 shadow-lg sticky top-16 z-20">
              <div className="flex flex-wrap gap-2">
                {sortBy === 'name' ? (
                  alphabet.map((letter) => (
                    <button key={letter} onClick={() => scrollToLetter(letter)} className="rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-gray-300 transition hover:border-[#f2c96b] hover:text-[#f2c96b]">
                      {letter}
                    </button>
                  ))
                ) : (
                  <div className="text-sm text-gray-400">Sorted by: <span className="font-semibold text-white">{sortBy === 'price-low' ? 'Price: Low → High' : sortBy === 'price-high' ? 'Price: High → Low' : sortBy === 'newest' ? 'Newest' : sortBy === 'popular' ? 'Popular' : 'Custom'}</span></div>
                )}
              </div>
            </div>

            {/** If groupedItems is null, show the flat sorted list. Otherwise show alphabetical groups. */}
            {(!groupedItems || Object.keys(groupedItems).length === 0) && sortedItems.length === 0 ? (
              <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-8 text-center text-gray-400">No items match your current filters.</div>
            ) : groupedItems ? (
              Object.keys(groupedItems).sort().map((letter) => (
                <div key={letter} id={`section-${letter}`} className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-5 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-2xl text-white">{letter}</h3>
                    <span className="text-sm text-gray-400">{groupedItems[letter].length} items</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {groupedItems[letter].map((item) => (
                      <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
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
                          <div className="flex items-center gap-2">
                            <Link to={`/product/${item.id}`} className="rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-gray-300">View</Link>
                            <button onClick={() => addToCart(item)} className="rounded-full bg-[#f2c96b] px-3 py-2 text-sm font-semibold text-black">Add</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.75rem] border border-white/10 bg-[#111111] p-5 shadow-lg">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {sortedItems.map((item) => (
                    <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
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
                        <div className="flex items-center gap-2">
                          <Link to={`/product/${item.id}`} className="rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-gray-300">View</Link>
                          <button onClick={() => addToCart(item)} className="rounded-full bg-[#f2c96b] px-3 py-2 text-sm font-semibold text-black">Add</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
