"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

export function LoginFormJobApplicant() {
  return (
    <div>
      <div>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <p>Atau Login dengan Google</p>
        <Button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
          className="font-bold"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
