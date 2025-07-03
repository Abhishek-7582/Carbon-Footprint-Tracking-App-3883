import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('marketplace_user');
        const savedAuth = localStorage.getItem('marketplace_auth');
        
        if (savedUser && savedAuth === 'true') {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear corrupted data
        localStorage.removeItem('marketplace_user');
        localStorage.removeItem('marketplace_auth');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    // Get all registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('marketplace_users') || '[]');
    
    // Find user with matching email (case-insensitive)
    const foundUser = registeredUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase()
    );
    
    if (!foundUser) {
      throw new Error('No account found with this email address');
    }
    
    // Validate password
    if (foundUser.password !== password) {
      throw new Error('Invalid password');
    }
    
    // Create user session (remove password for security)
    const userSession = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      accountType: foundUser.accountType,
      isSeller: foundUser.accountType === 'seller',
      createdAt: foundUser.createdAt
    };
    
    // Set authentication state
    setUser(userSession);
    setIsAuthenticated(true);
    
    // Persist authentication
    localStorage.setItem('marketplace_user', JSON.stringify(userSession));
    localStorage.setItem('marketplace_auth', 'true');
    
    return userSession;
  };

  const logout = () => {
    // Clear all authentication data
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('marketplace_user');
    localStorage.removeItem('marketplace_auth');
  };

  const register = async (userData) => {
    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('marketplace_users') || '[]');
    
    // Check if email already exists (case-insensitive)
    const emailExists = existingUsers.some(user => 
      user.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (emailExists) {
      throw new Error('An account with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      isSeller: userData.accountType === 'seller',
      createdAt: new Date().toISOString()
    };
    
    // Save to users list
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('marketplace_users', JSON.stringify(updatedUsers));
    
    // Auto-login the new user
    const userSession = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      accountType: newUser.accountType,
      isSeller: newUser.isSeller,
      createdAt: newUser.createdAt
    };
    
    setUser(userSession);
    setIsAuthenticated(true);
    localStorage.setItem('marketplace_user', JSON.stringify(userSession));
    localStorage.setItem('marketplace_auth', 'true');
    
    return userSession;
  };

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('marketplace_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};