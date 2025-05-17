
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Please log in to view your account</h1>
            <Button 
              onClick={() => navigate('/login')} 
              className="mt-4"
            >
              Sign In
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Welcome, {user.name}!
              </h2>
              
              <nav className="space-y-2">
                <a href="#profile" className="block p-3 rounded-md bg-gray-100 font-medium">
                  Profile Information
                </a>
                <a href="#orders" className="block p-3 rounded-md hover:bg-gray-100 transition-colors">
                  Order History
                </a>
                <a href="#addresses" className="block p-3 rounded-md hover:bg-gray-100 transition-colors">
                  Addresses
                </a>
                <a href="#payment" className="block p-3 rounded-md hover:bg-gray-100 transition-colors">
                  Payment Methods
                </a>
                <a href="#preferences" className="block p-3 rounded-md hover:bg-gray-100 transition-colors">
                  Preferences
                </a>
              </nav>
              
              <div className="mt-6">
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <div id="profile" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <div className="text-gray-900">{user.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="text-gray-900">{user.email}</div>
                  </div>
                </div>
                <div>
                  <Button>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
            
            <div id="orders" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Order History</h2>
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't placed any orders yet.</p>
                <Button 
                  variant="link" 
                  onClick={() => navigate('/products')}
                >
                  Start Shopping
                </Button>
              </div>
            </div>
            
            <div id="addresses" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Addresses</h2>
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't added any addresses yet.</p>
                <Button>
                  Add Address
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
