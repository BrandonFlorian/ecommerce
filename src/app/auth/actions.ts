"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error, data } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    console.log("error", error);
    redirect("/");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        username: formData.get("username") as string,
      },
    },
  };

  const { error, data } = await supabase.auth.signUp(payload);
  if (error) {
    console.log("error", error);
    redirect("/");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("error", error);
  }
  revalidatePath("/", "layout");
  redirect("/");
}
