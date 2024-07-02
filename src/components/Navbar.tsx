
// "use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-orange-600 text-gray-300 text-xl p-5 md:p-7">
      <ul className="w-[500px] flex justify-between">
       <li className=" hover:text-white">
        <Link href={"/"}>Home</Link></li>
        <li className=" hover:text-white">
        <Link href={"/dashboard"}>Dashboard</Link></li>
        <li className=" hover:text-white">
        <Link href={"/about"}>About</Link></li>
        <li className=" hover:text-white">
        <Link href={"/login"}>Login</Link>
       </li>
      </ul>
    </nav>
  );
};

export default Navbar;