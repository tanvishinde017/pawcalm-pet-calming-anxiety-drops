'use client';

export const CTA = () => {
  return (
    <section className="py-24 bg-green-600 text-white overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Give Your Dog the Calm They Deserve</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of happy pet owners who've seen the difference natural calming can make.
        </p>
        <form className="max-w-md mx-auto space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/40 transition-colors"
            />
          </div>
          <button type="submit" className="btn-primary px-8 py-3 rounded-full font-medium transition-colors hover:opacity-90">
            Get Started
          </button>
        </form>
      </div>
      <div className="absolute right-0 top-0 -translate-y-1/2 bg-white/10 opacity-30">
        <FaHeart className="text-4xl animate-spin"></FaHeart>
      </div>
    </section>
  )
}