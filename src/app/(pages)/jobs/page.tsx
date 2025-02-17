import db from "@/lib/db";

import Client from "./client";

export default async function Jobs() {
  const response = await db.user.findMany();
  console.log(response);
  return (
    <div>
      <div>
        <p>Ini kumpulan Jobs</p>
        <Client />
      </div>
    </div>
  );
}
