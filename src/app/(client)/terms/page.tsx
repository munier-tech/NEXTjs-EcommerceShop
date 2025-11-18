// pages/terms-and-conditions.js
import Head from 'next/head';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms and Conditions - MassDropp</title>
        <meta name="description" content="MassDropp Terms and Conditions - Please read these terms carefully before using our services." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="text-2xl font-bold text-gray-800 mb-4 inline-block">
              Mass<span className="text-blue-600">Dropp</span>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Welcome to MassDropp. These Terms and Conditions govern your use of our website 
                  and services. By accessing or using MassDropp, you agree to be bound by these terms.
                </p>
                <p className="text-gray-700">
                  If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              {/* Definitions */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>&quot;Service&quot;</strong> refers to the MassDropp website and ecommerce platform</li>
                  <li><strong>&quot;User&quot;</strong> refers to any individual or entity accessing our Service</li>
                  <li><strong>&quot;Content&quot;</strong> refers to text, images, videos, and other materials on our platform</li>
                  <li><strong>&quot;Products&quot;</strong> refers to goods available for purchase on MassDropp</li>
                  <li><strong>&quot;Order&quot;</strong> refers to a purchase request placed through our Service</li>
                </ul>
              </section>

              {/* Account Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    To access certain features, you must register for an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and complete registration information</li>
                    <li>Maintain the security of your password</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                  <p>
                    We reserve the right to suspend or terminate accounts that violate these terms.
                  </p>
                </div>
              </section>

              {/* Products and Pricing */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Products and Pricing</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>4.1 Product Information</strong></p>
                  <p>
                    We strive to provide accurate product descriptions and images. However, we do not 
                    guarantee that product descriptions or other content is accurate, complete, or error-free.
                  </p>
                  
                  <p><strong>4.2 Pricing</strong></p>
                  <p>
                    All prices are shown in US dollars and are subject to change without notice. 
                    We reserve the right to modify or discontinue products at any time.
                  </p>
                  
                  <p><strong>4.3 Availability</strong></p>
                  <p>
                    Products are subject to availability. If a product becomes unavailable after 
                    you place an order, we will notify you and refund any payments made.
                  </p>
                </div>
              </section>

              {/* Orders and Payments */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Orders and Payments</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>5.1 Order Acceptance</strong></p>
                  <p>
                    Your order constitutes an offer to purchase. We accept your offer by 
                    sending an order confirmation email. All orders are subject to availability 
                    and validation checks.
                  </p>
                  
                  <p><strong>5.2 Payment Methods</strong></p>
                  <p>
                    We accept various payment methods including credit cards, debit cards, 
                    and digital wallets. By providing payment information, you represent 
                    that you are authorized to use the payment method.
                  </p>
                  
                  <p><strong>5.3 Taxes</strong></p>
                  <p>
                    You are responsible for any sales, use, or other taxes associated with 
                    your order, unless otherwise stated.
                  </p>
                </div>
              </section>

              {/* Shipping and Delivery */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Shipping and Delivery</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>6.1 Shipping Times</strong></p>
                  <p>
                    Estimated shipping times are provided at checkout. These are estimates 
                    only and actual delivery times may vary.
                  </p>
                  
                  <p><strong>6.2 Shipping Costs</strong></p>
                  <p>
                    Shipping costs are calculated based on the delivery address and product 
                    weight. These costs are displayed before you complete your purchase.
                  </p>
                  
                  <p><strong>6.3 Delivery Issues</strong></p>
                  <p>
                    If you experience delivery issues, please contact our customer service 
                    within 14 days of the estimated delivery date.
                  </p>
                </div>
              </section>

              {/* Returns and Refunds */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Returns and Refunds</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>7.1 Return Policy</strong></p>
                  <p>
                    We accept returns within 30 days of delivery for unused products in 
                    original packaging. Some products may be non-returnable for hygiene reasons.
                  </p>
                  
                  <p><strong>7.2 Refund Process</strong></p>
                  <p>
                    Refunds are processed within 7-10 business days after we receive and 
                    inspect the returned item. Shipping costs are non-refundable.
                  </p>
                  
                  <p><strong>7.3 Damaged or Defective Items</strong></p>
                  <p>
                    If you receive a damaged or defective item, contact us within 48 hours 
                    of delivery for a replacement or refund.
                  </p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    All content on MassDropp, including text, graphics, logos, and software, 
                    is our property or the property of our licensors and is protected by 
                    copyright and other intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, or create derivative works without 
                    our express written permission.
                  </p>
                </div>
              </section>

              {/* User Conduct */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. User Conduct</h2>
                <div className="space-y-4 text-gray-700">
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use the Service for any illegal purpose</li>
                    <li>Violate any laws in your jurisdiction</li>
                    <li>Infringe upon our intellectual property rights</li>
                    <li>Upload viruses or malicious code</li>
                    <li>Interfere with the proper functioning of the Service</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                  </ul>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    To the maximum extent permitted by law, MassDropp shall not be liable 
                    for any indirect, incidental, special, or consequential damages arising 
                    from your use of the Service.
                  </p>
                  <p>
                    Our total liability for any claim shall not exceed the amount you paid 
                    for the products giving rise to the claim.
                  </p>
                </div>
              </section>

              {/* Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Privacy</h2>
                <p className="text-gray-700">
                  Your privacy is important to us. Please review our 
                  <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 mx-1">
                    Privacy Policy
                  </Link>
                  to understand how we collect and use your information.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. We will notify 
                  users of significant changes via email or through our Service. Continued 
                  use after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              {/* Governing Law */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
                <p className="text-gray-700">
                  These terms shall be governed by and construed in accordance with the laws 
                  of the State of Delaware, without regard to its conflict of law provisions.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
                <div className="text-gray-700 space-y-2">
                  <p>For questions about these Terms and Conditions, please contact us:</p>
                  <p>Email: legal@massdropp.com</p>
                  <p>Address: 123 Commerce Street, Business District, City 12345</p>
                  <p>Phone: (555) 123-4567</p>
                </div>
              </section>

              {/* Acceptance */}
              <section className="border-t border-gray-200 pt-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h3>
                  <p className="text-gray-700">
                    By using our Service, you acknowledge that you have read, understood, 
                    and agree to be bound by these Terms and Conditions.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}