import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Store, Moon, Sun, User } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navigation = () => {
  const { theme, toggleTheme } = useTheme()
  const { cartCount } = useCart()
  const { openAuthModal, isAuthenticated, user } = useAuth()
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Store className="h-8 w-8 text-[#f2c96b]" />
          <span className="font-display text-lg text-white sm:text-xl">Ultimate Liquor & Groceries</span>
        </Link>

        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/" className="text-sm font-medium text-gray-300 transition hover:text-[#f2c96b]">Home</Link>
            <Link to="/deals" className="text-sm font-medium text-gray-300 transition hover:text-[#f2c96b]">Deals</Link>
            <Link to="/about" className="text-sm font-medium text-gray-300 transition hover:text-[#f2c96b]">About</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-300 transition hover:text-[#f2c96b]">Contact</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={() => openAuthModal('signin', 'Sign in to continue', location.pathname)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-gray-200 transition hover:border-[#f2c96b] hover:text-[#f2c96b]">
              <User className="h-4 w-4" />
              {isAuthenticated ? user?.name || 'Account' : 'Account'}
            </button>
            <Link to="/cart" className="relative rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:border-[#f2c96b] hover:text-[#f2c96b]">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f2c96b] text-[10px] font-semibold text-black">
                  {cartCount}
                </span>
              )}
            </Link>
            <button type="button" onClick={toggleTheme} className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:border-[#f2c96b] hover:text-[#f2c96b]">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
