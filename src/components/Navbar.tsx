
// "use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full">
      <ul className="w-[500px] flex justify-between">
       <li>
        <Link href={"/"}>Home</Link></li>
        <li>
        <Link href={"/dashboard"}>Dashboard</Link></li>
        <li>
        <Link href={"/about"}>About</Link></li>
        <li>
        <Link href={"/login"}>Login</Link>
       </li>
      </ul>
    </nav>
  );
};

export default Navbar;