"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../app/components/Pagination";
import axios from "axios";

interface Blog {
  title: string;
  content: string;
  tags: [];
  image: string; 
  category: string; 
  id: string;
}

const fetchBlogs = async (search = "", page = 1) => {
  try {
    const response = await axios.get(`http://localhost:3000/blogs`, {
      params: { search, page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

const HomePage = () => {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs(searchQuery, currentPage).then((data) => {
      if (data) {
        setBlogs(data?.blogs || []);
                setTotalPages(data.totalPages || 1);
      }
    });
  }, [currentPage, searchQuery]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#181E2A] text-white pb-8 pt-32 px-6 md:px-8 lg:px-12 h-full">
      <div className="container mx-auto">
        <h2 className="text-gray-400 font-serif text-3xl font-bold mb-6">All Blogs</h2>
        <div className="mb-6">
          <div className="relative">
                    <input
                      type="text"
                      placeholder="Search blogs by title"
                      className="bg-gray-700 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
            onChange={handleSearchChange}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Image src="/assets/icons/search.svg" alt="Search Icon" width={20} height={20} />
                    </div>
                  </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[rgba(50,65,77,0.72)] rounded-lg p-4"
            >

              <Link href={`/blog/${blog.id}`}>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400} 
                  height={250}
                  className="rounded-t-lg mb-4 object-cover h-[14rem]"
                />
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{blog.category}</p>
                <p className="text-gray-500 text-xs">{blog.content}</p>
              </Link>
            </div>
          ))}
        </div>
        <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default HomePage;
