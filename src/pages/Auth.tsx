
import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/account';
  
  // If user is already authenticated, redirect them
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {activeTab === 'login' ? 'Sign In' : 'Create an Account'}
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
