import { Link } from 'react-router-dom'
import { ShoppingCart, Wine, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

const Navigation = () => {
  const { theme, toggleTheme } = useTheme()
  const { cartCount } = useCart()

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wine className="h-8 w-8 text-wine-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Wine Shop</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-wine-600 dark:hover:text-wine-500 transition-colors">
              Home
            </Link>
            
            <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-wine-600 dark:hover:text-wine-500 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-wine-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
