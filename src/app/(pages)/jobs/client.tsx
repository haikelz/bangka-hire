"use client";

import db from "@/lib/db";

export default function Client() {
  async function handleSubmit(e) {
    e.preventDefault();
    await db.user.create({
      data: {
        email: "gdsfg@gmail.com",
        name: "Test",
        password: "1234124",
      },
    });
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
