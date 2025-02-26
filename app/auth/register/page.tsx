"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = "http://localhost:3000/auth/register";
  const router = useRouter();
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        username,
        email,
        password,
        role,
      });

      setSuccess("Signup successful! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 2000);
    } catch (err) {
      console.error(err);
    
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }   } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/register.png')" }}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="p-8 w-96 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Signup
          </h2>
          <p className="text-gray-300 mb-6 text-center">
            Just some details to get you in!
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-white text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-white text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-white text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-white text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-white text-sm font-bold mb-2"
              >
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-[#181E2A] hover:bg-[rgba(50,65,77,0.72)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>

            <div className="mt-6 flex items-center justify-center">
              <div className="border-t border-gray-400 w-1/2"></div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already Registered?
                <a
                  href="/auth/sign-in"
                  className="text-[#181E2A] hover:text-[rgba(50,65,77,0.72)]"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
