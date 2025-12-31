import { updateSession } from "@/supabase/proxy";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/home/:path*", "/login", "/(user)/:path*", "/account/:path*"],
};
