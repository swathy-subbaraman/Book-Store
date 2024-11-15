import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGooglePlay, FaApple } from 'react-icons/fa';
import { MdPhone, MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* BookBliss Description */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-sky-800">Book<span className="text-amber-600">Bliss</span></h2>
          <p className="text-gray-700">
            Discover the joy of affordable book shopping with BookBliss! We bring you a world of books that you can love without breaking the bank. Whether you're a bibliophile or just starting, BookBliss has something for everyone.
          </p>
        </div>
{/* Our Links */}
<div className="space-y-2">
  <h1 className="text-2xl font-bold text-sky-800">Our Links</h1>
  <ul className="text-gray-600 space-y-1">
    <li><a href="/about" className='text-gray-600'>About Us</a></li>
    <li><a href="/contact" className='text-gray-600'>Contact Us</a></li>
    <li><a href="/blogs" className='text-gray-600'>Blogs</a></li>
    <li><a href="/wholesale" className='text-gray-600'>Wholesale</a></li>
    <li><a href="/sell" className='text-gray-600'>Sell with Us</a></li>
  </ul>
</div>

{/* Quick Links */}
<div className="space-y-2">
  <h1 className="text-2xl font-bold text-sky-800">Quick Links</h1>
  <ul className="text-gray-600 space-y-1">
    <li><a href="/track-order" className='text-gray-600'>Track Order</a></li>
    <li><a href="/faq" className='text-gray-600'>FAQs</a></li>
    <li><a href="/privacy-policy" className='text-gray-600'>Privacy Policy</a></li>
    <li><a href="/terms-conditions" className='text-gray-600'>Terms & Conditions</a></li>
  </ul>
</div>

{/* Support */}
<div className="space-y-4">
  <h1 className="text-2xl font-bold text-sky-800">Support</h1>
  <p className="flex items-center space-x-2 text-gray-600">
    <MdPhone className="text-xl text-sky-800" /> 
    <span>+1 123 456 7890</span>
  </p>
  <p className="flex items-center space-x-2 text-gray-600">
    <MdEmail className="text-xl text-sky-800" />
    <span>support@bookbliss.com</span>
  </p>
  <div className="flex space-x-3 mt-4">
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className="text-3xl text-pink-500" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF className="text-3xl text-blue-600" />
            </a><span>  </span>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter className="text-3xl text-sky-500" />
            </a>
  </div>
</div>
</div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-600">
        <p>&copy; 2024 BookBliss. All rights reserved.</p>
        <p className="mt-2">
          Our Products: <a href="/bookbliss" className="text-sky-600">BookBliss</a> | 
          <a href="/lock-the-box" className="text-sky-600"> Lock The Box</a> | 
          <a href="/book-dump" className="text-sky-600"> Dump</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
