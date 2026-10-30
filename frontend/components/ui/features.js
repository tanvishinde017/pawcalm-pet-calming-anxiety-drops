export const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Our Calming Drops?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Formulated by veterinarians and made with premium natural ingredients to support your dog's well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Droplets}
            title="Fast-Acting Formula"
            description="Our drops begin working within 20-30 minutes, perfect for unexpected stressful situations like thunderstorms or car rides."
          />
          <FeatureCard
            icon={PawPrint}
            title="Veterinarian Recommended"
            description="All our products are vet-approved and made in FDA-registered facilities with premium, tested ingredients."
          />
          <FeatureCard
            icon={Leaf}
            title="100% Natural"
            description="No artificial additives, fillers, or harmful chemicals. Gentle on your dog's stomach and safe for long-term use."
          />
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-6">
        <icon className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}