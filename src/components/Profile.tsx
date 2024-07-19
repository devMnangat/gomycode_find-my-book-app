"use client";
import { IUser } from "@/types/user";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

interface SignupInput extends Partial<IUser> {
  
};

type PageProps = {
  searchParams?: { error?: string };
  profileDetails: string;
};


export default function Profile({ searchParams, profileDetails }: PageProps) {
    let user: IUser = JSON.parse(profileDetails);
    const [inputs, setInputs] = useState(user);
    const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    const res = await fetch(`/api/users/${user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
  
    if (res.ok) {
      toast.success("User profile updated successfully");
      router.refresh();
    
    } else {
      const errorData = await res.json();
      if (errorData.message === "Username already exists") {
        toast.error("Username already exists. Please choose a different username.");
      } else {
        toast.error("Registration failed. Try again.");
      }
      console.error("Error registering user");
    }
  };
  

  return (
    <>
      <div className="flex h-fit flex-1 flex-col justify-center px-6 lg:px-8 my-4">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Update your profile
              </h1>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  readOnly={true}
                  onClick={(e) => {
                    e.preventDefault();
                    // Cast e.target to HTMLInputElement to access removeAttribute
                    const target = e.target as HTMLInputElement;
                    target.removeAttribute("readOnly");
                  }}
                  value={inputs.name as string || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 pl-10 pr-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  required
                  value={inputs.username as string || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 pl-10 pr-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="on"
                  required
                  value={inputs.email || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 pl-10 pr-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>

            
          </form>
        </div>
      </div>
    </>
  );
}
