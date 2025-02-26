"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      setSuccess("Login successful!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: unknown) {
      const axiosError = err as { response: { data: { message: string } } }; // Assert the type
      setError(axiosError.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#181E2A] justify-center w-full">
      <div className="md:w-1/2 w-full bg-[#181E2A] px-10 md:px-16 flex flex-col justify-center">
        <div>
          <h2 className="text-white text-3xl font-bold mb-6">Login</h2>
          <p className="text-gray-400 mb-8">Enter your account details</p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                aria-label="Email Address"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                aria-label="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[rgba(50,65,77,0.72)] hover:bg-opacity-80 text-white font-bold py-2 px-16 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?
              <Link
                href="/auth/register"
                className="text-white hover:text-blue-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/assets/images/login.jpg"
          alt="Login"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-10 left-10 text-white">
          <p className="text-5xl font-bold mb-4">Welcome to</p>
          <p className="text-2xl font-bold mb-6">Our Blog App</p>
          <p className="text-md">Login to access your account</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
