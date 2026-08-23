import { MapPin, Phone, Clock3 } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">About the store</p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-3">A neighborhood stop for bottles, basics, and everything in between</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              Corner Cart mixes liquor, pantry staples, and household essentials in one easy-to-shop catalog. Customers can browse by category, search by product, and ask about rare finds without the usual clutter.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-amber-50 dark:bg-gray-700 p-4">
                <p className="font-semibold text-gray-900 dark:text-white">Pickup & ordering</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Call ahead for large orders or limited stock items.</p>
              </div>
              <div className="rounded-xl bg-amber-50 dark:bg-gray-700 p-4">
                <p className="font-semibold text-gray-900 dark:text-white">Local favorites</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">We carry staples, chillers, mixers, snacks, and select rare spirits.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Visit us</h2>
            <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-300">
              <div className="flex gap-3"><MapPin className="h-5 w-5 text-amber-600 mt-1" /><span>248 Main Street, Downtown District</span></div>
              <div className="flex gap-3"><Phone className="h-5 w-5 text-amber-600 mt-1" /><span>(555) 014-2789</span></div>
              <div className="flex gap-3"><Clock3 className="h-5 w-5 text-amber-600 mt-1" /><span>Mon-Sat: 10am-9pm • Sun: 12pm-6pm</span></div>
            </div>
            <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Map preview placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
