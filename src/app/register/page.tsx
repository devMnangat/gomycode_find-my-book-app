"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

type SignupInput = {
  name: string;
  email: string;
  password: string;
};

type PageProps = {
  searchParams: { error?: string };
};

export default function SignupPage({ searchParams }: PageProps) {
  const [inputs, setInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    if (res.ok) {
        alert("Registration successful")
      await signIn("credentials", {
        username: inputs.email,
        password: inputs.password,
        callbackUrl: "/dashboard",
      });
    } else {
        alert("Registration failed. Try again.")
      console.error("Error registering user");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Registration</h1>
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
            name="name"
            type="text"
            autoComplete="off"
            required
            value={inputs.name || ""}
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
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="relative mt-2">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-gray-400" />
          </span>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            required
            value={inputs.password || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-0 pl-10 pr-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Register
        </button>
      </div>
      
      <div className="text-center">
        <p className="text-sm">
          Already have an account? <Link className="hover:underline text-indigo-600" href={"/login"}>Login</Link>
        </p>
      </div>
    </form>
        </div>
      </div>
    </>
  );
}
