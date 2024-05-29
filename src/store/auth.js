import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider =  ({ children }) => {
    const backendserver = 'https://kukufm-backend.onrender.com'
    const [token, setToken] = useState(localStorage.getItem("token"));
    const authorizationToken = `Bearer ${token}`;
  
    const storeTokenInLS = (serverToken) => {
      setToken(serverToken);
      return localStorage.setItem("token", serverToken);
    };
    const userURL = `${backendserver}/api/users/`
    const audiobookURL = `${backendserver}/api/audiobook/`
    let isLoggedIn = !!token;
    const LogoutUser = () => {
      setToken("");
      return localStorage.removeItem("token");
    };
  
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          storeTokenInLS,
          LogoutUser,
          authorizationToken,
          userURL,
          audiobookURL
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
      throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
  };
  
