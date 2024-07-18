"use client";

import { IUser } from "@/types/user";
import LogoutButton from "./LogoutButton";

type UserInfoProps = {
  user: IUser;
};

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="rounded-lg border shadow-lg p-10">
      <div>Id : {user?._id}</div>
      <div>Name : {user.name}</div>
      <div>Username : {user.username}</div>
      <div>Email : {user.email}</div>
      <LogoutButton>
        <h2 className="font-medium mt-2 text-red-600  hover:underline">
          Log out
        </h2>
      </LogoutButton>
    </div>
  );
}
