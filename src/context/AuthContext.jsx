import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [mode, setMode] = useState('signin')
  const [prompt, setPrompt] = useState('Sign in to continue')
  const [pendingRoute, setPendingRoute] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const savedUser = localStorage.getItem('ultimate-auth-user')
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      setUser(parsed)
      setIsAuthenticated(true)
    }
  }, [])

  const openAuthModal = useCallback((nextMode = 'signin', nextPrompt = 'Sign in to continue', route = null) => {
    setMode(nextMode)
    setPrompt(nextPrompt)
    setPendingRoute(route)
    setEmail('')
    setPassword('')
    setName('')
    setModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setModalOpen(false)
    setPassword('')
    setName('')
    setEmail('')
  }, [])

  const submitAuth = useCallback((event) => {
    event.preventDefault()
    if (!email || !password) return
    if (mode === 'signup' && !name) return

    const nextUser = {
      email,
      name: mode === 'signup' ? name : email.split('@')[0]
    }

    setUser(nextUser)
    setIsAuthenticated(true)
    localStorage.setItem('ultimate-auth-user', JSON.stringify(nextUser))
    setModalOpen(false)

    const targetRoute = pendingRoute
    setPendingRoute(null)
    if (targetRoute) {
      navigate(targetRoute)
    }
  }, [email, mode, name, navigate, password, pendingRoute])

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('ultimate-auth-user')
  }

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    modalOpen,
    mode,
    prompt,
    email,
    password,
    name,
    setEmail,
    setPassword,
    setName,
    openAuthModal,
    closeAuthModal,
    submitAuth,
    logout
  }), [closeAuthModal, email, isAuthenticated, modalOpen, mode, name, openAuthModal, password, prompt, submitAuth, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
