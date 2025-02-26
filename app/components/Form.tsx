"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Blog {
  title: string;
  content: string;
  tags: string[];
  category: string;
  image: string | "";
}

interface FormProps {
  type: string;
  blog: Blog;
  setBlog: (blog: Blog) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  success?: string;
  error?: string;
}

const Form = ({
  type,
  blog,
  setBlog,
  submitting,
  handleSubmit,
  success,
  error,
}: FormProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBlog({ ...blog, category: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBlog({ ...blog, image: imageUrl });
    }
  };

  return (
    <div className="w-full max-w-full flex-start flex-col pb-8 pt-32 bg-[#181E2A]">
      <h1 className="head_text text-center my-6">
        <span className="text-gray-400 font-serif text-3xl font-bold">
          {type} Your Blog
        </span>
      </h1>
      <p className="text-center text-gray-200 font-serif mx-6 text-sm">
        {type} and share insightful articles with the world, inspiring readers
        with your thoughts, experiences, and expertise.
      </p>

      {success && <p className="text-green-500 text-center">{success}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="container py-16 px-32 bg-[#181E2A] h-full m-auto"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-white text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            placeholder="Enter blog title"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-white text-sm font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            placeholder="Write your blog content here"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-white text-sm font-bold mb-2"
          >
            Tags
          </label>
          <input
            id="tags"
            type="text"
            value={blog.tags.join(", ")}
            onChange={(e) =>
              setBlog({
                ...blog,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
            placeholder="Enter tags, separated by commas"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-white text-sm font-bold mb-2"
          >
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={blog.category}
            onChange={handleCategoryChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select Category
            </option>

            <option value="It">IT</option>
            <option value="Scientific">Scientific</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-white text-sm font-bold mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {blog.image && (
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Image Preview
            </label>
            <Image
              src={blog.image}
              alt={blog.title}
              width={400}
              height={400}
              className="rounded-lg mx-auto"
            />
          </div>
        )}

        <div className="text-center flex pt-4 justify-self-center w-1/2">
          <button
            onClick={handleBack}
            className="bg-[rgba(50,65,77,0.72)] hover:bg-gray-500 text-white font-bold py-2 px-6 rounded m-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[rgba(50,65,77,0.72)] hover:bg-gray-500 text-white font-bold py-2 px-6 rounded m-auto "
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
