"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/states/user";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function UserHomePage() {
  const { user, setUser } = useUserStore();
  const router = useRouter();

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("logout error: ", error.message);
      }
      setUser(null);
      router.push("/")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div>
        <p> hi {user?.email}</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
}
