import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some premium wines to get started
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-wine-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-700 transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
            Browse Wines
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Cart Items */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {cart.map(item => (
              <div key={item.id} className="p-6 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <Link
                    to={`/wine/${item.id}`}
                    className="text-lg font-semibold text-gray-900 dark:text-white hover:text-wine-600 dark:hover:text-wine-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.region} • {item.year}
                  </p>
                  <p className="text-lg font-bold text-wine-600 mt-2">${item.price}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-300">Shipping</span>
              <span className="text-gray-900 dark:text-white">Free</span>
            </div>
            <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
              <span className="text-2xl font-bold text-wine-600">${cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Cart
              </button>
              <button className="flex-1 px-6 py-3 rounded-lg bg-wine-600 text-white font-semibold hover:bg-wine-700 transition-colors flex items-center justify-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="font-semibold text-gray-900 dark:text-white">Secure Payment</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encryption</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="font-semibold text-gray-900 dark:text-white">Fast Delivery</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">2-3 business days</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="font-semibold text-gray-900 dark:text-white">Quality Guarantee</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">100% authentic wines</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
