import { createContext, useState, type ReactNode } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  login: () => {
    throw new Error("AuthProvider not detected as a parent node");
  },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | undefined>(
    () => localStorage.getItem("token") || undefined,
  );
  const [user, setUser] = useState<User | undefined>(() => {
    if (!token) {
      return;
    }
    const { sub, name, role } = JSON.parse(atob(token.split(".")[1]));
    return { id: sub, name, role };
  });

  function login(token: string) {
    const { sub, name, role } = JSON.parse(atob(token.split(".")[1]));
    const user = { id: sub, name, role };

    setToken(token);
    setUser(user);

    localStorage.setItem("token", token);
  }

  return (
    <AuthContext.Provider value={{ token, user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

type User = { id: string; name: string; role: string };

type AuthContextType = {
  token?: string;
  user?: User;
  login: (token: string) => void;
};
