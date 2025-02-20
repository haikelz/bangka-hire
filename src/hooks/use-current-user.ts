"use client";

import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/user-current")
      .then((res) => res.json())
      .then((data) => {
        if (data.status_code === 200) {
          setUser(data.user);
        }
      })
      .catch(() => setUser(null));
  }, [setUser]);

  return user;
}
