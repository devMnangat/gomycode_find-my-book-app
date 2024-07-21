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
    <div className="p-3 min-h-fit overflow-y-scroll bg-[url('../../public/Images/bg-img2.jpg')] bg-cover bg-center h-screen">
      <h1 className="text-xl font-semibold md:text-2xl text-slate-500">
      Dashboard
      </h1>
      <div className="bg-slate-300">
        <UserInfo user={user as any as IUser} />
        <div className="flex justify-center">
          <Profile profileDetails={JSON.stringify(user)} />
          <Link href={"/search"}>
          <button className="bg-theme-secondary text-theme-natural text-lg py-3 px-5 rounded-full justify-center ">
            Explore books
          </button>
          </Link>
        </div>
        <div>
        {/* <BooksPage /> */}

        </div>
      </div>
    </div>
  );
}
