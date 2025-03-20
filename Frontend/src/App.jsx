import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import Friends from './pages/Friends';
import Groups from './pages/Groups';
import GroupDetail from './pages/GroupDetail';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="expenses"
              element={
                <PrivateRoute>
                  <Expenses />
                </PrivateRoute>
              }
            />
            <Route
              path="expenses/add"
              element={
                <PrivateRoute>
                  <AddExpense />
                </PrivateRoute>
              }
            />
            <Route
              path="friends"
              element={
                <PrivateRoute>
                  <Friends />
                </PrivateRoute>
              }
            />
            <Route
              path="groups"
              element={
                <PrivateRoute>
                  <Groups />
                </PrivateRoute>
              }
            />
            <Route
              path="groups/:groupId"
              element={
                <PrivateRoute>
                  <GroupDetail />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;