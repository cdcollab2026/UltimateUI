import { Mail, MapPin, Phone, Clock3 } from 'lucide-react'

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#121212] p-8 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c96b]">Contact us</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Stop by or call ahead for rare releases and pantry orders.</h1>
            <div className="mt-8 space-y-5 text-gray-300">
              <div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 text-[#f2c96b]" /><span>248 Main Street, Downtown District</span></div>
              <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 text-[#f2c96b]" /><span>(555) 014-2789</span></div>
              <div className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 text-[#f2c96b]" /><span>hello@cellarandpantry.com</span></div>
              <div className="flex gap-3"><Clock3 className="mt-0.5 h-5 w-5 text-[#f2c96b]" /><span>Mon-Sat 10am-9pm · Sun 12pm-6pm</span></div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#121212] p-8 shadow-2xl">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center text-gray-400">
              Map placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
