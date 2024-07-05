import { redirect } from "next/navigation";

import UserInfo from "@/components/UserInfo";

import { getServerAuthSession } from "@/server/auth";
import { IUser } from "@/types/user";
import React from "react";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  // console.log({session})
  if (!session?.user) redirect("/login");
  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold md:text-2xl">
      Dashboard
      </h1>
      <div>
        <UserInfo user={session?.user as IUser} />
        <div>
          <Link href={"/books"}>
          <button className="bg-theme-secondary text-theme-natural text-lg py-3 px-5 rounded-full">
            Explore books
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
