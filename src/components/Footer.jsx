import React from 'react';
import { LuTruck } from "react-icons/lu";
import { FiCreditCard, FiShield } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaRegQuestionCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#111827] px-4 sm:px-8 md:px-16" id='about'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 sm:p-8">
        {[
          { icon: <LuTruck className='text-[#6366F1]' />, title: "Free Shipping", text: "On orders over $50", },
          { icon: <FiCreditCard className='text-[#6366F1]' />, title: "Secure Payment", text: "100% secure checkout" },
          { icon: <FiShield className='text-[#6366F1]' />, title: "Quality Guarantee", text: "Product quality assured" },
          { icon: <FaRegQuestionCircle className='text-[#6366F1]' />, title: "24/7 Support", text: "Dedicated support" }
        ].map((feature, index) => (
          <div key={index} className="flex items-start gap-4 p-4 sm:p-0">
            <i className="text-2xl mt-1">{feature.icon}</i>
            <div>
              <h1 className="font-semibold text-lg text-white">{feature.title}</h1>
              <p className="text-gray-200 text-sm sm:text-base">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 sm:p-8">
        <div className="space-y-4">
          <h3 className="font-bold text-xl text-white">ShopEase</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Your premier destination for quality products and exceptional customer service since 2023.
          </p>
          <div className="flex gap-4">
            {[{ Icon: FaFacebook, url: 'https://www.facebook.com/husseinabdalla010' },
            { Icon: FaTwitter, url: 'https://x.com/Hussein99432152' },
            { Icon: FaInstagram, url: 'https://www.instagram.com/husseinabdalla010/' },
            { Icon: FaPinterest, url: '#' }]
              .map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className='text-gray-300 hover:text-[#6366D7] text-lg'>
                  <social.Icon />
                </a>
              ))}
          </div>

        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl text-white">Quick Links</h3>
          <ul className="space-y-2">
            {['Home', 'Shop', 'About Us', 'Blog', 'Contact'].map((link, i) => (
              <li key={i}>
                <a href="#" className="text-gray-300 hover:text-[#6366D7] text-sm sm:text-base">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl text-white">Customer Service</h3>
          <ul className="space-y-2">
            {['My Account', 'Order Tracking', 'Wishlist', 'Shipping Policy', 'Returns & Refunds'].map((service, i) => (
              <li key={i}>
                <a href="#" className="text-gray-300 hover:text-[#6366D7] text-sm sm:text-base">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl text-white">Newsletter</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Subscribe to get updates on new arrivals, special offers and other discount information.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-2 sm:p-3 bg-[#1F2937] border border-gray-600 focus:outline-none focus:border-[#4338CA] focus:ring-1 focus:ring-[#4338CA] text-white rounded sm:rounded-r-none"
            />
            <button
              type="submit"
              className="bg-[#4a3ec7] text-white py-2 px-4 hover:bg-[#4338CA] transition whitespace-nowrap border border-[#4a3ec7] hover:border-[#4338CA] rounded sm:rounded-l-none text-sm sm:text-base"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 py-6 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-300 text-sm sm:text-base">© 2023 ShopEase. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookies Policy'].map((policy, i) => (
              <a key={i} href="#" className="text-gray-300 text-xs sm:text-sm hover:text-[#6366D7]">
                {policy}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;