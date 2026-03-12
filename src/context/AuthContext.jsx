import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import loginService from '../services/login'

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPortfolioUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const login = useCallback(async (username) => {
    try {
      const authenticatedUser = await loginService.login(username);

      window.localStorage.setItem(
        'loggedPortfolioUser', JSON.stringify(authenticatedUser)
      );

      setUser(authenticatedUser);
    } catch (error) {
      console.error("Login failed", error);
      alert("Could not log in");
    }
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem('loggedPortfolioUser');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
