import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginUser } from "../api/products";

interface AuthContextValue {
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "fakestore-auth-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY)
  );

  useEffect(() => {
    if (username) {
      localStorage.setItem(STORAGE_KEY, username);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [username]);

  async function login(user: string, password: string) {
    // Mock authentication flow against the Fake Store API's /auth/login endpoint.
    // The API accepts fixed demo credentials (e.g. username "mor_2314", password "83r5^_").
    await loginUser({ username: user, password });
    setUsername(user);
  }

  function logout() {
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{ username, isAuthenticated: !!username, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
