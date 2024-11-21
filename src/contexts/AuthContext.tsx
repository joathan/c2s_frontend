import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  user_id: number;
  exp: number;
}

interface AuthContextData {
  token: string | null;
  userId: number | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        setUserId(decoded.user_id);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token]);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("authToken", token);

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.user_id);
    } catch (error) {
      console.error("Invalid token during login:", error);
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
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
