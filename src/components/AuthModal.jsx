import { X, Mail, Lock, ArrowRight, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AuthModal = () => {
  const {
    modalOpen,
    closeAuthModal,
    mode,
    prompt,
    email,
    password,
    name,
    setEmail,
    setPassword,
    setName,
    submitAuth,
    openAuthModal
  } = useAuth()

  if (!modalOpen) return null

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm" onClick={closeAuthModal}>
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#121212] p-8 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c96b]">Account access</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{mode === 'signin' ? 'Sign in' : 'Create your account'}</h2>
          </div>
          <button type="button" onClick={closeAuthModal} className="rounded-full border border-white/10 p-2 text-gray-300 transition hover:border-[#f2c96b] hover:text-[#f2c96b]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-7 text-gray-400">{prompt}</p>

        <form onSubmit={submitAuth} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <label className="block text-sm text-gray-400">
              <span className="mb-2 block">Full name</span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <UserRound className="h-4 w-4 text-[#f2c96b]" />
                <input value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Alex Morgan" />
              </div>
            </label>
          )}
          <label className="block text-sm text-gray-400">
            <span className="mb-2 block">Email</span>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <Mail className="h-4 w-4 text-[#f2c96b]" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent outline-none" placeholder="you@example.com" />
            </div>
          </label>
          <label className="block text-sm text-gray-400">
            <span className="mb-2 block">Password</span>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <Lock className="h-4 w-4 text-[#f2c96b]" />
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent outline-none" placeholder="••••••••" />
            </div>
          </label>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2c96b] px-4 py-3 font-semibold text-black">
            {mode === 'signin' ? 'Sign In' : 'Create account'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          <button type="button" onClick={() => openAuthModal(mode === 'signin' ? 'signup' : 'signin', mode === 'signin' ? 'Create an account for faster checkout and order updates.' : 'Welcome back — sign in to continue your order.')} className="text-[#f2c96b]">
            {mode === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </p>
        <p className="mt-2 text-center text-sm text-gray-400">
          <button type="button" className="text-[#f2c96b]">Forgot password?</button>
        </p>
      </div>
    </div>
  )
}

export default AuthModal
