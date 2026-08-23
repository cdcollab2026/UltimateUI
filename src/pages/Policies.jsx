import { ShieldCheck, BadgeCheck, AlertTriangle } from 'lucide-react'

const Policies = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Store policies</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-3">What to know before visiting</h1>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 dark:bg-gray-700 p-5">
              <ShieldCheck className="h-6 w-6 text-amber-600" />
              <h2 className="mt-3 font-semibold text-gray-900 dark:text-white">ID required</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Valid identification is required for alcohol purchases and age-restricted items.</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-700 p-5">
              <BadgeCheck className="h-6 w-6 text-amber-600" />
              <h2 className="mt-3 font-semibold text-gray-900 dark:text-white">Pickup only</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Alcohol is available for in-store pickup only; online delivery is not offered.</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-700 p-5">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              <h2 className="mt-3 font-semibold text-gray-900 dark:text-white">Limited stock</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Allocated bourbons and rare releases may be available by inquiry only and can change quickly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Policies
