
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // In a real application, these functions would interact with a backend
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation
      // In a real app, you would call your authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = { id: '1', name: 'Test User', email };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success("Successfully logged in");
    } catch (error) {
      toast.error("Failed to log in");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = { id: '1', name, email };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Failed to create account");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      isLoading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
