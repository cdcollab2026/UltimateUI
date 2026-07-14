import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import WineDetail from './pages/WineDetail'
import Cart from './pages/Cart'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wine/:id" element={<WineDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
