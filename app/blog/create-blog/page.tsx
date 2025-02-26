"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/app/components/Form";
import axios from "axios";

const CreateBlog = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [submitting, setIsSubmitting] = useState(false);
  interface Blog {
    title: string;
    content: string;
    tags: string[];
    category: string;
    image: string;
  }

  const [blog, setBlog] = useState<Blog>({
    title: "",
    content: "",
    tags: [],
    category: "",
    image: "",
  });

  const createBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", blog.content);

      formData.append("tags", JSON.stringify(blog.tags));
      blog.tags.forEach((tag, index) => {
        formData.append("tags[" + index + "]", JSON.stringify(tag));
      });
      formData.append("category", blog.category);
      if (blog.image) {
        formData.append("image", blog.image);
      }

      const token = localStorage.getItem("token");
      if (token) {
        const userId = localStorage?.user?.id || "";
        formData.append("userId", userId);

        const response = await axios.post(
          "http://localhost:3000/blogs",
          { ...blog },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          setSuccess("Blog created successfully!");

          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setError("Failed to create the blog.");
        }
      } else {
        setError("Token is missing.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      blog={blog}
      setBlog={setBlog}
      submitting={submitting}
      handleSubmit={createBlog}
      success={success}
      error={error}
    />
  );
};

export default CreateBlog;
