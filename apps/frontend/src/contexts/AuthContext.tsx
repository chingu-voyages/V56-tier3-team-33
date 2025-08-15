import { createContext, useContext, useState, type ReactNode } from "react";

const AuthContext = createContext<AuthContextType>({
  login: () => {
    throw new Error("AuthProvider not detected as a parent node");
  },
  logout: () => {
    throw new Error("AuthProvider not detected as a parent node");
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | undefined>(
    () => localStorage.getItem("token") || undefined,
  );
  const [user, setUser] = useState<User | undefined>(() => {
    if (token) {
      return decodeUserFromToken(token);
    }
  });

  function login(token: string) {
    const user = decodeUserFromToken(token);

    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  }

  function logout() {
    setToken(undefined);
    setUser(undefined);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function decodeUserFromToken(token: string): User {
  try {
    const { sub, name, role } = JSON.parse(atob(token.split(".")[1]));
    return { id: sub, name, role };
  } catch (err) {
    throw new Error("Invalid token format.", { cause: err });
  }
}

type User = { id: string; name: string; role: string };

type AuthContextType = {
  token?: string;
  user?: User;
  login: (token: string) => void;
  logout: () => void;
};
