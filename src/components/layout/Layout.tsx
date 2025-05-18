
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  requiresAuth?: boolean;
}

const Layout = ({ children, requiresAuth = false }: LayoutProps) => {
  const { user } = useAuth();

  // If page requires authentication and user is not logged in
  if (requiresAuth && !user) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
