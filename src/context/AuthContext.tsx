// contexts/AuthContext.tsx
"use client";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient, type Session, type User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  session: Session | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase: SupabaseClient = createClient();
  const router = useRouter();
  useEffect(() => {
    // Immediately invoked async function inside the useEffect
    (async () => {
      const currentSession = await supabase.auth.getSession();
      setSession(currentSession.data.session || null);
      setUser(currentSession?.data.session?.user || null);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Context Session Event: ", event, session);

        setSession(session);
        setUser(session?.user || null);

        if (event === "INITIAL_SESSION") {
          // handle initial session
        } else if (event === "SIGNED_IN") {
          // handle sign in event
        } else if (event === "SIGNED_OUT") {
          // handle sign out event
        } else if (event === "PASSWORD_RECOVERY") {
          // handle password recovery event
        } else if (event === "TOKEN_REFRESHED") {
          // handle token refreshed event
        } else if (event === "USER_UPDATED") {
          // handle user updated event
        }
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("context login email", email + " " + password);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      console.log("context login data", data);
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("logged out");
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      console.log("context sign up data", data);
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const value = useMemo(
    () => ({
      session,
      user,
      login,
      logout,
      signUp,
    }),
    [session, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
