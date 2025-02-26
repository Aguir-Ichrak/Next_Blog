"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/sign-in");
  };
  return (
    <div className=" absolute w-full bg-[#181E2A]">
      <header className=" text-white px-6 py-4 md:px-8 lg:px-12 flex justify-between items-center rounded-lg border border-[rgba(50,65,77,0.72)] mx-4 mt-4">

        <div className="flex items-center">
          <div className="relative w-12 h-8">
            <Image
              src="/assets/images/logo.png"
              width={30}
              height={30}
              alt="author"
              layout="intrinsic"
              objectFit="cover"
              className="m-auto"
            />
          </div>
          <Link href="/" className="text-2xl font-bold">
            ElepziaBlog
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/blog/create-blog" className="hover:text-gray-300">
            Add Blog
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-5">
          <Link
            href="/auth/profile"
            className="flex items-center bg-gray-700 rounded-full w-8 h-8 "
          >
            <Image
              src="/assets/icons/user.svg"
              width={30}
              height={30}
              alt="author"
              layout="intrinsic"
              objectFit="cover"
              className="m-auto"
            />
          </Link>
          <div
            className="text-white hover:text-gray-300"
            onClick={handleLogout}
          >
            <Image
              src="/assets/icons/logout.svg"
              width={40}
              height={30}
              alt="author"
              layout="intrinsic"
              objectFit="cover"
              className="m-auto"
            />
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h14"
              ></path>
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#181E2A] absolute top-16 left-1 w-full py-4 px-6 rounded-lg m-4 border-2 border-[rgba(50,65,77,0.72)]">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link href="/blog/add-blog" className="hover:text-gray-300">
                Add Blog
              </Link>


              <Link
                href="/auth/profile"
                className="flex items-center bg-gray-700 rounded-full w-8 h-8 "
              >
                <Image
                  src="/assets/icons/user.svg"
                  width={30}
                  height={30}
                  alt="author"
                  layout="intrinsic"
                  objectFit="cover"
                  className="m-auto"
                />
              </Link>
              <div
                className="text-white hover:text-gray-300"
                onClick={handleLogout}
              >
                <Image
                  src="/assets/icons/logout.svg"
                  width={40}
                  height={30}
                  alt="author"
                  layout="intrinsic"
                  objectFit="cover"
                  className=""
                />
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
