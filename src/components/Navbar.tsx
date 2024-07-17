// "use client";

import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { getServerAuthSession } from "@/server/auth";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const session = await getServerAuthSession();
  return (
    <nav className="w-full h-fit flex flex-col md:flex-row justify-between border-black bg-theme-primary text-theme-secondary text-xl p-4 md:p-6">
      <div className="gap-3 md:flex md:gap-4">
        <Link href={"/"} className="text-lg md:text-xl">
          <FaHome />
        </Link>
        <Link href={"/save"} className="text-lg md:text-xl">
          <IoLibrarySharp />
        </Link>
      </div>
      <ul className="w-full flex-col md:w-fit md:flex-row flex gap-4  items-end">
        <li className=" hover:text-theme-natural">
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li className=" hover:text-theme-natural">
          <Link href={"/books"}>About</Link>
        </li>
        {!session?.user ? (
          <li>
            <Link className="hover:underline" href={"/login"}>
              Login
            </Link>
            /{" "}
            <Link className="hover:underline" href={"/register"}>
              Register
            </Link>
          </li>
        ) : (
          <li>
            <LogoutButton>
              <h1 className="hover:underline">Logout</h1>
            </LogoutButton>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
