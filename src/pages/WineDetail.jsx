import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Star, MapPin, Grape, Calendar } from 'lucide-react'
import { wines } from '../data/wines'
import { useCart } from '../context/CartContext'

const WineDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const wine = wines.find(w => w.id === parseInt(id))

  if (!wine) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Wine not found</h2>
          <Link to="/" className="text-wine-600 hover:text-wine-700">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-wine-600 dark:hover:text-wine-500 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Wines
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div className="relative">
              <img
                src={wine.image}
                alt={wine.name}
                className="w-full h-96 object-cover rounded-xl"
              />
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 px-4 py-2 rounded-full text-sm font-medium text-wine-600">
                {wine.type}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {wine.name}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {wine.rating}
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {wine.stock} in stock
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {wine.description}
              </p>

              {/* Wine Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Region</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{wine.region}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <Grape className="h-4 w-4" />
                    <span className="text-sm">Grape</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{wine.grape}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Vintage</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{wine.year}</p>
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price</p>
                  <p className="text-4xl font-bold text-wine-600">${wine.price}</p>
                </div>

                <button
                  onClick={() => addToCart(wine)}
                  disabled={wine.stock === 0}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all ${
                    wine.stock === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-wine-600 hover:bg-wine-700 hover:shadow-lg'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {wine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Wines */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Similar Wines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wines
              .filter(w => w.type === wine.type && w.id !== wine.id)
              .slice(0, 4)
              .map(similarWine => (
                <Link
                  key={similarWine.id}
                  to={`/wine/${similarWine.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <img
                    src={similarWine.image}
                    alt={similarWine.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {similarWine.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {similarWine.region}
                    </p>
                    <p className="text-lg font-bold text-wine-600">${similarWine.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WineDetail
