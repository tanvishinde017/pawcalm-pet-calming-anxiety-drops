export const Stats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-6 md:grid-cols-6">
          <div className="p-6 rounded-2xl bg-gray-50 text-center hover:bg-green-50 transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-green-600">12.4K+</div>
            <div className="text-sm text-gray-500 mt-1">Happy Dogs</div>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 text-center hover:bg-green-50 transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-green-600">4.9</div>
            <div className="text-sm text-gray-500 mt-1">Avg Rating</div>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 text-center hover:bg-green-50 transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-green-600">2.4K+</div>
            <div className="text-sm text-gray-500 mt-1">5-Star Reviews</div>
          </div>
          <div className="col-span-2 p-6 rounded-2xl bg-gray-50 text-center hover:bg-green-50 transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-500 mt-1">Natural Ingredients</div>
          </div>
          <div className="col-span-2 p-6 rounded-2xl bg-gray-50 text-center hover:bg-green-50 transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-green-600">30-Day</div>
            <div className="text-sm text-gray-500 mt-1">Money-Back Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  )
}