import { redirect } from "next/navigation";

import UserInfo from "@/components/UserInfo";

import { getServerAuthSession } from "@/server/auth";
// import { IUser } from "@/types/user";
import React from "react";
import Link from "next/link";
import { IUser } from "@/types/user";
import Profile from "@/components/Profile";
import { dbConnect } from "@/mongoose/dbConnect";
import { UserModel } from "@/models/UserModel";
// import BooksPage from "../books/page";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  await dbConnect();
  let user = await UserModel.findOne({
    _id: session?.user?.id,
  });
  // console.log({session})
  if (!session?.user) redirect("/login");
  return (
    <div className="p-4 min-h-screen overflow-y-scroll bg-[url('../../public/Images/bg-img2.jpg')] bg-cover bg-center">
    <h1 className="text-2xl font-semibold md:text-3xl text-slate-700 mb-4">
      Dashboard
    </h1>
    <div className="bg-white shadow-md rounded-lg p-6">
      <UserInfo user={user as any as IUser} />
      <div className="mt-6">
        <Profile profileDetails={JSON.stringify(user)} />
      </div>
      <div className="flex justify-center mt-6">
        <Link href="/search">
          <button className="bg-theme-secondary text-theme-natural text-lg py-3 px-6 rounded-full hover:text-slate-700 hover:bg-gray-400 transition duration-300">
            Explore Books
          </button>
        </Link>
      </div>
      <div className="mt-8">
        {/* <BooksPage /> */}
      </div>
    </div>
  </div>
  

  );
}
