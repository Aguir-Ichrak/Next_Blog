"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (pathname !== "/auth/sign-in" && pathname !== "/auth/register") {
        router.push("/auth/sign-in");
      }
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (isAuthenticated === null) {
    return <div className="text-white">Loading...</div>;
  }

  const isAuthPage = pathname === "/auth/sign-in" || pathname === "/auth/register";

  return (
    <div>
      {!isAuthPage && isAuthenticated && <Header />}
      <main className="bg-[#181E2A]">{children}</main>
      {!isAuthPage && isAuthenticated && <Footer />}</div>
  );
}
