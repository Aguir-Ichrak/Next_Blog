"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation"; 

interface userData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<userData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        notFound(); 
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();

        setUserData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        notFound(); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>Profile not found</p>;
  }
  return (
    <div className="bg-[#181E2A] text-white px-24 py-[10rem] rounded-lg shadow-lg h-full">
      <div className="flex flex-col items-center h-full">
        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image
            src="/assets/icons/user.svg"
            alt="author"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">{userData.username}</h2>
        <p className="text-xmd mb-2">{userData.email}</p>
        <p className="text-gray-400 text-center mb-4">{userData.role}</p>
        <p className="text-gray-300 text-center">
          Meet {userData.username}, a passionate individual with a strong
          background in technology and a deep interest in making an impact in the
          industry. They are currently working as an {userData.role}.
        </p>

        <div className="flex mt-6 space-x-4">
          <Link href="/fb">
            <Image src="/assets/icons/facebook.svg" alt="Facebook" width={25} height={25} />
          </Link>
          <Link href="/twit">
            <Image src="/assets/icons/twitter.svg" alt="Twitter" width={25} height={25} />
          </Link>
          <Link href="/insta">
            <Image
              src="/assets/icons/instagram.svg"
              alt="Instagram"
              width={25}
              height={25}
            />
          </Link>
          <Link href="youtube">
            <Image src="/assets/icons/youtube.svg" alt="YouTube" width={25} height={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
