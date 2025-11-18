// pages/about.js
import Container from '@/components/Container';
import Link from 'next/link';

export default function About() {
  return (
    <Container className="min-h-screen bg-gray-50">
      {/* Head section without unused import */}
      <div>
        <title>About Us - MassDropp | Online Ecommerce Platform</title>
        <meta name="description" content="Learn about MassDropp&apos;s mission to revolutionize online shopping with quality products and exceptional service." />
        <link rel="icon" href="/favicon.ico" />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black rounded-xl to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About MassDropp</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Revolutionizing online shopping with quality products, competitive prices, and exceptional customer service.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">Our Story</h3>
                  <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                  <p className="text-gray-600 max-w-md">
                    Founded in 2025, MassDropp began with a simple mission: to make quality products accessible to everyone at affordable prices.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">From Humble Beginnings to Ecommerce Excellence</h2>
              <p className="text-gray-600 mb-4">
                MassDropp started as a small venture with just five team members and a big dream. We noticed that many online marketplaces were either too expensive or offered poor quality products. We set out to change that.
              </p>
              <p className="text-gray-600 mb-4">
                Through strategic partnerships with manufacturers and a focus on customer satisfaction, we&apos;ve grown into a trusted ecommerce platform serving thousands of customers worldwide.
              </p>
              <p className="text-gray-600">
                Today, we continue to innovate and expand our product offerings while staying true to our core values of quality, affordability, and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                To democratize online shopping by providing access to high-quality products at competitive prices, while delivering an exceptional customer experience that builds trust and loyalty.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-600 text-white p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                To become the world&apos;s most customer-centric online marketplace, where people can find anything they want to buy online, with the confidence that they&apos;re getting the best value for their money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product in our catalog undergoes rigorous testing to meet our high standards.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="bg-green-100 text-green-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Value</h3>
              <p className="text-gray-600">
                We work directly with manufacturers to eliminate middlemen, passing the savings directly to our customers.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in building a community of satisfied customers who trust us to deliver exceptional products and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Our diverse team of professionals is dedicated to making MassDropp the best online shopping experience for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Hanad siciid Abdilahi", role: "CEO & Founder", img: "/api/placeholder/200/200" },
              { name: "Hanad Siciid Abdilahi", role: "Head of Operations", img: "/api/placeholder/200/200" },
              { name: "Muniir Mohamed Yusuf", role: "Developer and tech lead", img: "/api/placeholder/200/200" }
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center shadow-sm">
                <div className="bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience MassDropp?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who shop smarter with MassDropp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/shop" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Start Shopping
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}