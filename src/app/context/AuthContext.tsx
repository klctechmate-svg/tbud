import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("tbud_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const signIn = (user: User) => {
    setUser(user);
    localStorage.setItem("tbud_user", JSON.stringify(user));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("tbud_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
