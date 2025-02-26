"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  createdAt: string;
}

const BlogDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(`http://localhost:3000/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setBlog(response.data);
      } catch (err) {
        setError("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blog) return <p className="text-white">Blog not found</p>;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); 
      await axios.delete(`http://localhost:3000/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => router.push("/"), 2000); 
    } catch (err) {
      setError("Failed to delete the blog.");
    }
  };

  return (
    <div className="px-6 md:px-8 lg:px-12 h-full bg-[#181E2A] text-white pb-8 pt-32">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="bg-[rgba(50,65,77,0.72)] rounded-md inline-block px-3 py-2 text-sm mb-4">
            Category : {blog.category}
          </div>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="text-gray-400 text-sm">
            By Author | {new Date(blog.createdAt).toDateString()}
          </div>
        </div>

        <div className="mb-12">
          {blog.image && blog.image !== "" ? (
            <Image
              src={blog.image}
              alt={blog.title}
              width={400}
              height={400}
              className="rounded-lg mx-auto"
            />
          ) : (
            <div className="flex items-center text-gray-500">
              <Image
                src="/assets/icons/no-image-icon.svg"
                alt="No Image Available"
                width={40}
                height={40}
                className="mr-2"
              />
              <span>No image available</span>
            </div>
          )}
        </div>

        <div className="prose lg:prose-xl text-gray-300">
          <p>{blog.content}</p>
        </div>

        <div className="flex my-8 space-x-4 mt-12 justify-center">
          <button
            onClick={() => {
              window.location.href = `/blog/update/${id}`;
            }}
            className="p-3 border-2 border-[rgba(50,65,77,0.72)] rounded-full"
          >
            <Image src="/assets/icons/update.svg" alt="update" width={20} height={20} />
          </button>

          <button
            onClick={handleDelete}
            className="p-3 border-2 border-[rgba(50,65,77,0.72)] rounded-full"
          >
            <Image src="/assets/icons/delete.svg" alt="delete" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
