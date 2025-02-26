"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Form from "@/app/components/Form";

const UpdateBlog = () => {
    const [submitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(""); 
    const [error, setError] = useState("")
const router=useRouter();
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    tags: [],
    category: "",
    image: "",
  });


  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogs/${id}`);

        setBlog({
          title: response.data.title,
          content: response.data.content,
          tags: response.data.tags,
          category: response.data.category,
          image: response.data.image,
        });
      } catch (err) {
        setError("Error fetching blog details");
      }
    };

    if (id) getBlogDetails();
  }, [id]);

  const updateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    if (!id) {
      setError("Missing Blog ID!");
      return;
    }

    try {
        const token = localStorage.getItem("token");
    
        const response = await axios.put(
          `http://localhost:3000/blogs/${id}`,
          blog,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, 
            },
          }
        );
      if (response.status === 200) {
        setSuccess("Blog updated successfully!");
        setTimeout(() => router.push("/"), 2000); 
      } else {
        setError("Failed to update blog.");
      }
    } catch (error) {
      setError("An error occurred while updating the blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        blog={blog}
        setBlog={setBlog}
        submitting={submitting}
        handleSubmit={updateBlog}
        success={success}
        error={error}
      />

    </div>
  );
};

export default UpdateBlog;
