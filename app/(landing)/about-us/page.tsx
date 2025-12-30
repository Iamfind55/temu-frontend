import Image from "next/image"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* What is Temu? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
            What is Temu?
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl flex items-center justify-center">
                <Image
                  src="/images/about-01.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Temu is an e-commerce company that connects consumers with millions of merchandise partners, manufacturers and brands with the mission to empower them to live a better life. Temu is committed to bringing affordable products onto its platform to enable consumers and merchandise partners to fulfill their dreams in an inclusive environment. Temu was founded in Boston, Massachusetts in 2022.
            </p>
          </div>
        </section>

        {/* What does Temu mean? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
            What does Temu mean?
          </h2>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">
              Temu  Shop Like a Billionaire
            </p>
            <p className="text-gray-700 leading-relaxed">
              We hope that you will enjoy the affordable great products offered on our app from millions of merchandise partners, manufacturers and brands.
            </p>
          </div>
        </section>

        {/* Where are the products sold on Temu shipped from? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
            Where are the products sold on Temu shipped from?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The products from sellers on Temu are shipped using experienced and reliable logistics partners. The shipping origins vary depending on the product purchased.
          </p>
        </section>

        {/* Temu's strengths */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
            Temu's strengths
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Temu is bringing a sophisticated network of merchandise partners, manufacturers and brands of all sizes to your doorstops because of our:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Ability to <span className="font-bold">offer a wide selection of products</span>
            </li>
            <li>
              Experience in <span className="font-bold">collaborating with logistical supply chains</span>
            </li>
            <li>
              <span className="font-bold">Consumer-to-Manufacturer ("C2M")</span>
            </li>
          </ul>
        </section>

        {/* Our values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-12">
            Our values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Empowerment */}
            <div className="flex items-center gap-4">
              <div className="w-30 h-30 flex-shrink-0">
                <Image
                  src="/images/about-02.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-2">
                  Empowerment
                </h3>
                <p className="text-gray-700">
                  Everyone deserves to live the life they dream of having
                </p>
              </div>
            </div>

            {/* Inclusion and diversity */}
            <div className="flex items-center gap-4">
              <div className="w-30 h-30 flex-shrink-0">
                <Image
                  src="/images/about-03.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-2">
                  Inclusion and diversity
                </h3>
                <p className="text-gray-700">
                  Respect and embrace differences
                </p>
              </div>
            </div>

            {/* Integrity */}
            <div className="flex items-center gap-4">
              <div className="w-30 h-30 flex-shrink-0">
                <Image
                  src="/images/about-04.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-2">
                  Integrity
                </h3>
                <p className="text-gray-700">
                  Honest, ethical, and trustworthy
                </p>
              </div>
            </div>

            {/* Socially responsible */}
            <div className="flex items-center gap-4">
              <div className="w-30 h-30 flex-shrink-0">
                <Image
                  src="/images/about-05.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-2">
                  Socially responsible
                </h3>
                <p className="text-gray-700">
                  Do good for the world
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
