import { useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { setUser } from '../store/slices/authSlice'; 
import { api } from '../services/api'; 
import toast from 'react-hot-toast';

// Login component
export default function Login() {
  // State to manage email and password input fields
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const navigate = useNavigate(); // Initialize navigation function

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (avoiding page reload)
    try {
      const user = await api.login(credentials); // Call API to authenticate user
      dispatch(setUser(user)); // Save user info in Redux store
      toast.success('Welcome back!'); // Show success message
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      toast.error('Invalid email or password'); 
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Container for the login form */}
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-expense-primary hover:text-expense-primary/90">
              create a new account
            </Link>
          </p>
        </div>
        
        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Email Input Field */}
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} // Update email state
              />
            </div>
            
            {/* Password Input Field */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-expense-primary focus:border-expense-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} // Update password state
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-expense-primary hover:bg-expense-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-expense-primary"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
