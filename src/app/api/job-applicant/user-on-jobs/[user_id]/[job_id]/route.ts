import db from "@/lib/db";
import type { APIRouteParamsProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: APIRouteParamsProps) {
  const { user_id, job_id } = await props.params;

  const existingUserOnJobs = await db.usersOnJobs.findFirst({
    where: {
      user_id,
      jobs_id: job_id,
    },
  });

  return NextResponse.json({ exists: !!existingUserOnJobs });
}
