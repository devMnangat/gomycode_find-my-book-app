
"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <ul>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="hoc">
          <li>Client Side with HOC</li>
        </Link>
        <Link href="middleware">
          <li>Middleware</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;