"use client";
import React, { useState } from "react";
import Login from "../login/login";
import SignUp from "../register/sign-up";
import { login, signup } from "@/app/auth/actions";
// Adjust with your actual component file name
export default function AuthToggle() {
  const [showLogin, setShowLogin] = useState(true); // true to show login, false to show register

  const toggleAuthMode = () => setShowLogin(!showLogin);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
      {showLogin ? (
        <Login toggleAuthMode={toggleAuthMode} login={login} />
      ) : (
        <SignUp toggleAuthMode={toggleAuthMode} signUp={signup} />
      )}
    </div>
  );
}
