import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const apiUrl = process.env.EXPO_PUBLIC_API_URL || "https://api.example.com/";
const TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

      const bootstrapAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          // contoh fetch profile
          const res = await fetch(`${apiUrl}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const userData = await res.json();
            console.log("userData", userData)
            setUser(userData.data);
          } else {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
          }
        }
      } catch (e) {
        console.log("Auth bootstrap error", e);
      } finally {
        setLoading(false);
      }
    };

  // 🔁 bootstrap auth saat app start
  useEffect(() => {
    bootstrapAuth();
  }, []); 

  // 🔐 LOGIN
  const login = async (username, password) => {
    setLoading(true);

    try {
      console.log("login di authProvider", { username, password, apiUrl });
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const {data} = await res.json();

      if (data) {
        console.log("data login di authProvider", data.token);
        await SecureStore.setItemAsync(TOKEN_KEY, data.token);
        setUser(data.user);
        bootstrapAuth();
      }

     
    } catch (error) {
      console.log("Login error di authProvider", error);
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    setLoading(true);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
