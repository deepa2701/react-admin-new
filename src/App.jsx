import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import Profile from './components/pages/user/Profile';
import UserList from './components/pages/user/UserList';
import ForgotPassword from './components/login/ForgotPassword';
import Example from './Example';



function App() {
  console.log("isLogin:", isLogin());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            isLogin() ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
          }
        />

        <Route path='/login' element={
          <Public>
            <Login />
          </Public>
        } />

<Route path='/forgot-password' element={
          <Public>
            <ForgotPassword/>
          </Public>
        } />


        <Route path='/register' element={
          <Public>
            <Register />
          </Public>
        } />


        <Route element={<Layout />}>
          <Route path='/dashboard' element={
            <Protected>
              <Dashboard />
            </Protected>
          } />

          <Route path='/profile' element={
            <Protected>
              <Profile />
            </Protected>
          } />

          <Route path='/userlist' element={
            <Protected>
              <UserList />
            </Protected>
          } />

        </Route>

        <Route path='/logout' element={<Logout />} />

        <Route path='/example' element={<Example />} />
      </Routes>
    </BrowserRouter>
  );
}

// const token123 = localStorage.getItem("token");
// console.log(token123,"rrrrrrr")


const isLogin = () => !!localStorage.getItem("token");

export const Protected = ({ children }) => {
  return isLogin() ? children : <Navigate to='/login' />;
}

export const Public = ({ children }) => {
  return isLogin() ? <Navigate to='/' /> : children;
}


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate('/login');
  }, [navigate]);

  return null;
}

export default App;
