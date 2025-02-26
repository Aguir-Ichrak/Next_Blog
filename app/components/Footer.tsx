import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#181E2A] text-white py-8 px-6 md:px-8 lg:px-12 border-t border-[rgba(50,65,77,0.72)] w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0 pr-6">
          <h4 className="text-lg font-bold mb-2">About</h4>
          <p className="text-gray-400 text-sm w-3/4 md:w-auto">
            With a clean and intuitive interface, the app provides an efficient
            way for writers and readers alike to connect, discover new ideas,
            and stay updated with the latest content in various categories.
          </p>
          <div className="mt-4">
            <p className="text-gray-400 text-sm">
              Email: elepzia.careers@gmail.com
            </p>
            <p className="text-gray-400 text-sm">Phone: +216 25 826 729</p>
          </div>
        </div>
        <div className="mb-6 md:mb-0 pr-6">
          <h4 className="text-lg font-bold mb-2">Link</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-bold mb-2">Category</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <Link href="/it">It</Link>
            </li>
            <li>
              <Link href="/scientific">Scientific</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-center">
        <div className="mb-2 md:mb-0">
          <Link
            href="/"
            className="flex items-center justify-center md:justify-start py-1"
          >
            <Image
              src="/assets/images/logo.png"
              alt="MetaBlog Logo"
              width={40}
              height={15}
            />
            <span className="ml-2 text-gray-400 text-xs">
              © {currentYear} ELEPZ&apos;IA Blog. All Rights Reserved.
            </span>
          </Link>
        </div>
        <div className="flex space-x-4 text-gray-400 text-sm">
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/cookie">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
