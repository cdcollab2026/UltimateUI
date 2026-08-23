import { useState } from 'react'
import { Mail, Lock, ArrowRight, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [mode, setMode] = useState('signin')
  const { email, password, name, setEmail, setPassword, setName, submitAuth } = useAuth()

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#121212] p-8 shadow-2xl">
          <div className="flex gap-2 rounded-full border border-white/10 p-1">
            <button onClick={() => setMode('signin')} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${mode === 'signin' ? 'bg-[#f2c96b] text-black' : 'text-gray-300'}`}>Sign In</button>
            <button onClick={() => setMode('signup')} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${mode === 'signup' ? 'bg-[#f2c96b] text-black' : 'text-gray-300'}`}>Sign Up</button>
          </div>

          <div className="mt-8 space-y-4">
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
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent outline-none" placeholder="you@example.com" />
              </div>
            </label>
            <label className="block text-sm text-gray-400">
              <span className="mb-2 block">Password</span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <Lock className="h-4 w-4 text-[#f2c96b]" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent outline-none" placeholder="••••••••" />
              </div>
            </label>
            <button type="button" onClick={submitAuth} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2c96b] px-4 py-3 font-semibold text-black">
              {mode === 'signin' ? 'Sign In' : 'Create account'}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-sm text-gray-400">Forgot password? <a href="#" className="text-[#f2c96b]">Reset it</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
