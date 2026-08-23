import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Maya T.',
    quote: 'The inventory feels beautifully curated—rare pours, everyday staples, and everything in between.',
    rating: 5
  },
  {
    name: 'Derek L.',
    quote: 'Easy to find what I needed, and the pickup process felt polished and trustworthy.',
    rating: 5
  },
  {
    name: 'Nina P.',
    quote: 'I love that it feels like a boutique bottle shop but still has the pantry basics I need.',
    rating: 5
  }
]

const Reviews = () => {
  return (
    <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#15110a] to-[#0f0f0f] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c96b]">Customer reviews</p>
          <h2 className="mt-2 text-2xl font-semibold">Trusted by neighbors and collectors alike.</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-gray-400">4.9/5 average from 240+ reviews</div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <div className="flex items-center gap-1 text-[#f2c96b]">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Quote className="mt-1 h-5 w-5 text-[#f2c96b]" />
              <p className="text-sm leading-7 text-gray-400">{review.quote}</p>
            </div>
            <p className="mt-4 font-semibold text-white">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Reviews
