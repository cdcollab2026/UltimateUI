import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'
import WineDetail from './pages/WineDetail'
import Cart from './pages/Cart'
import About from './pages/About'
import Policies from './pages/Policies'
import Deals from './pages/Deals'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Login from './pages/Login'
import CategoryPage from './pages/CategoryPage'
import Checkout from './pages/Checkout'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <AuthProvider>
            <Navigation />
            <AuthModal />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<WineDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
