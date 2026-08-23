import { Sparkles, Gift, ShieldCheck } from 'lucide-react'

const deals = [
  { title: 'Weekend Pairing Bundle', body: 'Buy two bottles of wine and save 15% on mixers and snacks.', badge: 'Limited' },
  { title: 'Rare Bourbon Notify List', body: 'Join the waitlist for early access to allocated releases.', badge: 'New' },
  { title: 'Pantry Essentials Pack', body: 'Stock up on rice, beans, noodles, and paper goods for under $20.', badge: 'Value' }
]

const Deals = () => {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1c1408] via-[#111111] to-[#060606] p-8 shadow-2xl">
          <div className="flex items-center gap-3 text-[#f2c96b]">
            <Sparkles className="h-6 w-6" />
            <p className="text-sm font-semibold uppercase tracking-[0.3em]">Current deals</p>
          </div>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Handpicked offers for your cellar and pantry.</h1>
          <p className="mt-4 max-w-2xl text-gray-300">From rare spirit alerts to pantry bundles, our offers are designed to feel as curated as the inventory itself.</p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {deals.map((deal) => (
              <div key={deal.title} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <div className="flex items-center justify-between">
                  <Gift className="h-6 w-6 text-[#f2c96b]" />
                  <span className="rounded-full border border-[#f2c96b]/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#f2c96b]">{deal.badge}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">{deal.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-400">{deal.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#f2c96b]/20 bg-[#f2c96b]/10 p-6">
            <div className="flex items-center gap-3 text-[#f2c96b]">
              <ShieldCheck className="h-5 w-5" />
              <p className="font-semibold">Trust signals</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-gray-300">ID verification is required for alcohol purchases, and checkout is secured with trusted payment processing for peace of mind.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deals
