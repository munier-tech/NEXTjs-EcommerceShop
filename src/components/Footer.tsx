import Link from 'next/link'
import Container from './Container'
import FooterTop from './FooterTop'
import Logo from './Logo'
import SocialMedia from './SocialMedia'

const Footer = () => {

  const quickLinks = [
    { title: 'About us', href: '/about' },
    { title: 'Contact us', href: '/contact' },
    { title: 'Terms & Conditions', href: '/terms' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'FAQs', href: '/faqs' },
    { title: 'Help', href: '/help' },
  ]
  
  const categories = [
    { title: 'Mobiles', href: '/mobiles' },
    { title: 'Appliances', href: '/appliances' },
    { title: 'SmartPhones', href: '/smartphones' },
    { title: 'Air Conditioners', href: '/air-conditioners' },
    { title: 'Kitchen Appliances', href: '/kitchen-appliances' },
  ]

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="border-b border-gray-300">
        <FooterTop />
      </div>
      <Container>
        <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Logo />
            </div>
            <p className="text-gray-600 leading-relaxed">
              Discover limited edition products with exclusive pricing and premium quality.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              <SocialMedia
                className="border border-gray-300 text-gray-500 rounded-lg p-3 hover:text-white hover:bg-green-500 hover:border-green-500 transition-all duration-300 transform hover:scale-110"
                iconClassName="h-5 w-5"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="font-bold text-xl text-gray-800">Quick Links</h2>
            <div className="grid gap-3">
              {quickLinks.map((item) => (
                <Link 
                  key={item.title} 
                  href={item.href} 
                  className="text-gray-600 hover:text-green-500 transition-all duration-300 transform hover:translate-x-2"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="font-bold text-xl text-gray-800">Categories</h2>
            <div className="grid gap-3">
              {categories.map((item) => (
                <Link 
                  key={item.title} 
                  href={`/category${item.href}`}
                  className="text-gray-600 hover:text-green-500 transition-all duration-300 transform hover:translate-x-2 capitalize"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="font-bold text-xl text-gray-800">Newsletter</h2>
            <p className="text-gray-600 leading-relaxed">
              Subscribe to our newsletter to get the latest updates and exclusive offers.
            </p>
            <form className="space-y-3">
              <input 
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                required
              />
              <button 
                type="submit"
                className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </footer>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-8 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} 
              <span className="mx-1 font-semibold text-gray-800">Shop</span> 
              All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/terms" className="hover:text-green-500 transition-colors duration-300">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-green-500 transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/cookies" className="hover:text-green-500 transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer