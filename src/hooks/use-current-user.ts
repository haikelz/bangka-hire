"use client"

import { useSession }  from "next-auth/react"

export default function useCurrentUser() {
  // mengambil data user yang sedang login
  const { data: session } = useSession()
  return session?.user
}
