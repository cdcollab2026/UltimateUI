import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#040404] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <p className="font-display text-5xl uppercase tracking-[0.22em] text-[#f2c96b]">Ultimate</p>
            <p className="mt-2 text-sm uppercase tracking-[0.38em] text-[#ceb56d]">Liquor & Groceries</p>
            <p className="mt-6 max-w-[22rem] text-sm leading-7 text-gray-400">
              An elite registry and tasting vault. Sourcing rare vintage spirits, old-world cellared wines, craft releases, and organic pantry delicacies since 2012.
            </p>
            <div className="mt-10 flex gap-3">
              {[...Array(4)].map((_, index) => (
                <span key={index} className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.3em] text-[#f2c96b] border-b border-[#f2c96b]/20 pb-3">Shop Collection</h3>
            <ul className="mt-6 space-y-3 text-sm text-gray-400">
              <li><Link to="/shop" className="block transition-colors duration-200 hover:text-[#f2c96b]">Fine Spirits</Link></li>
              <li><Link to="/wine" className="block transition-colors duration-200 hover:text-[#f2c96b]">Cellar Wines</Link></li>
              <li><Link to="/beer" className="block transition-colors duration-200 hover:text-[#f2c96b]">Craft Beers</Link></li>
              <li><Link to="/groceries" className="block transition-colors duration-200 hover:text-[#f2c96b]">Gourmet Groceries</Link></li>
              <li><Link to="/deals" className="block transition-colors duration-200 hover:text-[#f2c96b]">Seasonal Offers & Deals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.3em] text-[#f2c96b] border-b border-[#f2c96b]/20 pb-3">Store & Concierge</h3>
            <ul className="mt-6 space-y-4 text-sm text-gray-400">
              <li>
                <span className="block font-semibold text-white">Store Hours:</span>
                <span>Mon - Sat: 9am - 10pm</span>
              </li>
              <li>
                <span className="block font-semibold text-white">Sunday Hours:</span>
                <span>12pm - 8pm</span>
              </li>
              <li>
                <span className="block font-semibold text-white">Vault Address:</span>
                <span className="block">401 Premium Heights Boulevard, Austin, TX 78701</span>
              </li>
              <li>
                <span className="block font-semibold text-white">Phone:</span>
                <span>+1 (512) 555-0199</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.3em] text-[#f2c96b] border-b border-[#f2c96b]/20 pb-3">Customer Service</h3>
            <ul className="mt-6 space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="block transition-colors duration-200 hover:text-[#f2c96b]">About Our Vault</Link></li>
              <li><Link to="/contact" className="block transition-colors duration-200 hover:text-[#f2c96b]">Contact Concierge</Link></li>
              <li><Link to="/login" className="block transition-colors duration-200 hover:text-[#f2c96b]">My Private Profile</Link></li>
              <li><Link to="/orders" className="block transition-colors duration-200 hover:text-[#f2c96b]">Order History & Tracking</Link></li>
              <li><Link to="/addresses" className="block transition-colors duration-200 hover:text-[#f2c96b]">Addresses Book</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-sm text-gray-500">
          <p className="uppercase tracking-[0.25em] text-[0.82rem] text-gray-400">Ultimate Liquor & Groceries © 2026 · Crafted for premium taste and exceptional service</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
