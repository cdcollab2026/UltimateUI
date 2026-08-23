import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Package, AlertTriangle } from 'lucide-react'
import { inventory } from '../data/inventory'
import { useCart } from '../context/CartContext'

const WineDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const item = inventory.find(product => product.id === parseInt(id))

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Item not found</h2>
          <Link to="/" className="text-amber-600 hover:text-amber-700">
            Return to catalog
          </Link>
        </div>
      </div>
    )
  }

  const similarItems = inventory.filter(product => product.category === item.category && product.id !== item.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-[#f2c96b]">Home</Link>
          <span>/</span>
          <Link to={`/category/${item.subcategory?.toLowerCase() === 'spirits' ? 'spirits' : 'groceries'}`} className="hover:text-[#f2c96b]">Category</Link>
          <span>/</span>
          <span className="text-white">{item.name}</span>
        </div>
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-[#f2c96b] mb-6 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to catalog
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-96 object-cover rounded-xl" />
              {item.category === 'Allocated / Rare Spirits' ? (
                <div className="absolute top-4 left-4 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">Rare Finds</div>
              ) : null}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">{item.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-3">{item.name}</h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{item.description}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-700 p-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Package className="h-4 w-4" />
                    <span className="text-sm">Size</span>
                  </div>
                  <p className="mt-2 font-semibold text-gray-900 dark:text-white">{item.size}</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-700 p-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Availability</span>
                  </div>
                  <p className="mt-2 font-semibold text-gray-900 dark:text-white">{item.stock}</p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                  <p className="text-4xl font-bold text-amber-600">${item.price.toFixed(2)}</p>
                </div>

                {item.category === 'Allocated / Rare Spirits' ? (
                  <button className="rounded-xl border border-amber-600 px-6 py-3 font-semibold text-amber-600">Call for availability</button>
                ) : (
                  <button onClick={() => addToCart(item)} className="flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">
                    <ShoppingCart className="h-5 w-5" />
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">More in this category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarItems.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm">
                <img src={product.image} alt={product.name} className="h-36 w-full rounded-xl object-cover" />
                <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{product.category}</p>
                <p className="mt-3 text-lg font-bold text-amber-600">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WineDetail
