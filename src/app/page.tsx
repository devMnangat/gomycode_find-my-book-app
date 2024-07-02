import { getServerAuthSession } from "@/server/auth";
// import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const authSession = await getServerAuthSession();
  console.log({authSession})
  // if(!authSession?.user) redirect("/login")
  return (
    <main className="flex items-center justify-center h-screen">
            {!authSession?.user && (
        <Link
          className="font-medium text-3xl mt-2 text-blue-600 hover:underline"
          href="/login"
        >
          Login to Continue
        </Link>
      )}
    </main>
  );
}
