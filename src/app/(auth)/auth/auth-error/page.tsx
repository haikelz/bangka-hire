import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="min-h-svh w-full flex justify-center p-4 items-center">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <h1 className="font-bold text-2xl md:text-3xl text-center">
          Gagal Login menggunakan Google!
        </h1>
        <div className="space-x-3">
          <Link href="/">
            <Button>Homepage</Button>
          </Link>
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
