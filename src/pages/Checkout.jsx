import { useEffect, useState } from 'react'
import { CheckCircle2, ShieldCheck, CreditCard, Truck, CalendarDays, PackageCheck, ClipboardCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const steps = ['Cart', 'Shipping', 'Payment', 'Review', 'Confirmation']
const trackingStages = [
  { label: 'Order Confirmed', detail: 'Your order is in review and payment is secured.' },
  { label: 'Preparing Order', detail: 'Our team is picking and packing your items.' },
  { label: 'Out for Delivery', detail: 'Your order is on the way to your selected pickup point.' },
  { label: 'Delivered', detail: 'The order has been received and completed.' }
]

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart()
  const { isAuthenticated, openAuthModal } = useAuth()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!isAuthenticated && cart.length > 0) {
      openAuthModal('signin', 'Please sign in or create an account to continue your purchase.', '/checkout')
    }
  }, [cart.length, isAuthenticated, openAuthModal])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      openAuthModal('signin', 'Please sign in or create an account to continue your purchase.', '/checkout')
      return
    }
    if (step < 3) {
      setStep(step + 1)
      return
    }
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#060606] text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="w-full rounded-[2rem] border border-white/10 bg-[#111111] p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#f2c96b]" />
            <h1 className="mt-4 text-3xl font-semibold">Order received</h1>
            <p className="mt-3 text-gray-400">Your order is confirmed. We’ll keep you updated through every stage of delivery.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {trackingStages.map((stage, index) => (
                <div key={stage.label} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
                  <div className="flex items-center gap-2 text-[#f2c96b]">
                    <ClipboardCheck className="h-4 w-4" />
                    <p className="font-semibold">{stage.label}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{stage.detail}</p>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className={`h-2 rounded-full ${index <= 1 ? 'w-full bg-[#f2c96b]' : 'w-0'}`} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/')} className="mt-8 rounded-full bg-[#f2c96b] px-5 py-3 font-semibold text-black">Return home</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-[2rem] border border-white/10 bg-[#111111] p-6 shadow-lg">
          <div className="flex items-center gap-2 text-[#f2c96b]">
            <ShieldCheck className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.3em]">Secure checkout</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {steps.map((label, index) => (
              <div key={label} className={`rounded-2xl border px-3 py-3 text-center text-sm ${step >= index + 1 ? 'border-[#f2c96b]/40 bg-[#f2c96b]/10 text-[#f2c96b]' : 'border-white/10 bg-black/20 text-gray-400'}`}>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-[#111111] p-8 shadow-2xl">
            <h1 className="text-3xl font-semibold">{step === 1 ? 'Pickup details' : step === 2 ? 'Payment' : 'Review & confirm'}</h1>

            {step === 1 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" placeholder="First name" required />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" placeholder="Last name" required />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:col-span-2" placeholder="Phone number" required />
                <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:col-span-2" placeholder="Email address" required />
                <textarea className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:col-span-2" placeholder="Pickup notes" rows="4" />
              </div>
            )}

            {step === 2 && (
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-[#f2c96b]">
                    <CreditCard className="h-5 w-5" />
                    <p className="font-semibold">Payment method</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <input className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3" placeholder="Card number" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" placeholder="MM/YY" />
                      <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" placeholder="CVC" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 text-gray-300">
                <div className="flex items-center gap-2 text-[#f2c96b]">
                  <CalendarDays className="h-5 w-5" />
                  <p className="font-semibold">Pickup window</p>
                </div>
                <p className="mt-3">We’ll hold your order for 24 hours. Please bring a valid ID for any alcohol purchase.</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                  <Truck className="h-4 w-4 text-[#f2c96b]" />
                  <span>Pickup available from the Downtown store location.</span>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="flex-1 rounded-full border border-white/10 px-5 py-3 font-semibold text-gray-300">Back</button>
              )}
              <button className="flex-1 rounded-full bg-[#f2c96b] px-5 py-3 font-semibold text-black">{step === 3 ? 'Confirm purchase' : 'Continue'}</button>
            </div>
          </form>

          <div className="rounded-[2rem] border border-white/10 bg-[#111111] p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-400">Your cart is empty.</p>
              ) : cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-gray-400">Qty {item.quantity}</p>
                  </div>
                  <p className="text-[#f2c96b]">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-400">
              <div className="flex items-center justify-between"><span>Pickup</span><span className="text-white">Free</span></div>
              <div className="mt-2 flex items-center justify-between text-lg font-semibold text-white"><span>Total</span><span className="text-[#f2c96b]">${cartTotal.toFixed(2)}</span></div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#f2c96b]/20 bg-[#f2c96b]/10 p-3 text-sm text-[#f2c96b]">
              <PackageCheck className="h-4 w-4" />
              <span>Secure, fast pickup with age verification included.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
