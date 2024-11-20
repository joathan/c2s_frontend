import React, { createContext, useState, useContext } from "react";

interface AuthContextData {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
