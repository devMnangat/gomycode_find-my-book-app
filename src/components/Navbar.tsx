// "use client";

import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="w-full h-fit flex flex-col md:flex-row justify-between border-black bg-theme-primary text-theme-secondary text-xl p-4 md:p-6">
      <div className="gap-3 md:flex md:gap-4">
        <Link href={"/"}>
          <FaHome />
        </Link>
        <Link href={"/save"}>
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
        <li>
          <Link className="hover:underline" href={"/login"}>
            Login
          </Link>
          /{" "}
          <Link className="hover:underline" href={"/register"}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
