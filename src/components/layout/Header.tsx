import Link from 'next/link';
import React from 'react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Massage Spa
          </Link>
          <div className="space-x-4">
            <Link href="/services" className="hover:text-gray-600">
              Services
            </Link>
            <Link href="/about" className="hover:text-gray-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-600">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;