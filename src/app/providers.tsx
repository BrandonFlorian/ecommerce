"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { type Session } from "@supabase/supabase-js";
import { AuthProvider } from "@/context/AuthContext";
export default function RootStyleRegistry({
  children,
}: //session,
Readonly<{
  children: React.ReactNode;
  //session: Session | null;
}>) {
  return (
    <NextUIProvider>
      <AuthProvider>{children}</AuthProvider>
    </NextUIProvider>
  );
}
