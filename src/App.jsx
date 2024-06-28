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
import AddBanner from './components/pages/banner/AddBanner';
import BannerList from './components/pages/banner/BannerList';
import AddAbout from './components/pages/aboutUs/AddAbout';
import ListAbout from './components/pages/aboutUs/ListAbout';
import AddRefundPolicy from './components/pages/refundpolicy/RefundPolicy';
import RefundPolicyList from './components/pages/refundpolicy/RefundPolicyList';
import AddHelpSupport from './components/pages/helpandsupport/Help';
import HelpList from './components/pages/helpandsupport/HelpList';
import TermsConditionList from './components/pages/termscondition/TermsConditionList';
import AddTermsCondition from './components/pages/termscondition/TermsCondition';
import EditAbout from './components/pages/aboutUs/EditAbout';



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
            <ForgotPassword />
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

          <Route path='/add-banner' element={
            <Protected>
              <AddBanner />
            </Protected>
          } />

          <Route path='/banner-list' element={
            <Protected>
              <BannerList />
            </Protected>
          } />

          <Route path='/add-about' element={
            <Protected>
              <AddAbout />
            </Protected>
          } />

          <Route path='/about-list' element={
            <Protected>
              <ListAbout />
            </Protected>
          } />

<Route path='/edit-aboutus/:id' element={
            <Protected>
              <EditAbout />
            </Protected>
          } />

<Route path='/add-refund-policy' element={
          <Protected>
            <AddRefundPolicy />
          </Protected>
        } />


        <Route path='/refund-policy-list' element={
          <Protected>
            < RefundPolicyList/>
          </Protected>
        } />

<Route path='/add-help-support' element={
          <Protected>
            <AddHelpSupport />
          </Protected>
        } />


        <Route path='/help-support-list' element={
          <Protected>
            <HelpList />
          </Protected>
        } />

<Route path='/terms-condition-list' element={
          <Protected>
            <TermsConditionList />
          </Protected>
        } />


        <Route path='/add-terms-condition' element={
          <Protected>
            <AddTermsCondition/>
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
