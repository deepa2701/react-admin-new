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
// import AddAbout from './components/pages/aboutUs/AddAbout';
// import ListAbout from './components/pages/aboutUs/ListAbout';
// import AddRefundPolicy from './components/pages/refundpolicy/RefundPolicy';
// import RefundPolicyList from './components/pages/refundpolicy/RefundPolicyList';
// import AddHelpSupport from './components/pages/helpandsupport/Help';
// import HelpList from './components/pages/helpandsupport/HelpList';
// import TermsConditionList from './components/pages/termscondition/TermsConditionList';
// import AddTermsCondition from './components/pages/termscondition/TermsCondition';
// import EditAbout from './components/pages/aboutUs/EditAbout';
import CreateJackpot from './components/pages/jackpot/CreateJackpot';
// import EditRefundPolicy from './components/pages/refundpolicy/EditRefundPolicy';
// import EditHelp from './components/pages/helpandsupport/EditHelp';
// import EditTermsCondition from './components/pages/termscondition/EditTermsCondition';
import About from './components/setting/About';
import RefundPolicy from './components/setting/RefundPolicy';
import HelpSupport from './components/setting/HelpSupport';
import TermsCondition from './components/setting/TermsCondition';
import JackpotList from './components/pages/jackpot/JackpotList';
import KycList from './components/pages/kyc/KycList';
import AddNotification from './components/pages/notification/AddNotification';
import NotificationList from './components/pages/notification/NotificationList';
import WinnerListing from './components/pages/jackpotResult/WinnerListing';
import RandomResult from './components/pages/jackpotResult/RandomResult';
import ManualResult from './components/pages/jackpotResult/ManualResult';
import EditUser from './components/pages/user/EditUser';



function App() {
  // console.log("isLogin:", isLogin());

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



<Route path='/edit-user/:id' element={
            <Protected>
              <EditUser />
            </Protected>
          } />

          <Route path='/create-jackpot' element={
            <Protected>
              < CreateJackpot />
            </Protected>
          } />

          <Route path='/jackpot-list' element={
            <Protected>
              < JackpotList />
            </Protected>
          } />

          <Route path='/winner-list' element={
            <Protected>
              <WinnerListing />
            </Protected>
          } />

          <Route path='/random-result' element={
            <Protected>
              <RandomResult />
            </Protected>
          } />

          <Route path='/result' element={
            <Protected>
              <ManualResult />
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

          <Route path='/about-us' element={
            <Protected>
              <About />
            </Protected>
          } />

          {/* <Route path='/about-list' element={
            <Protected>
              <ListAbout />
            </Protected>
          } />

          <Route path='/edit-aboutus/:id' element={
            <Protected>
              <EditAbout />
            </Protected>
          } /> */}

          <Route path='/refund-policy' element={
            <Protected>
              <RefundPolicy />
            </Protected>
          } />


          {/* <Route path='/refund-policy-list' element={
            <Protected>
              < RefundPolicyList />
            </Protected>
          } />

          <Route path='/edit-refunnd-policy/:id' element={
            <Protected>
              <EditRefundPolicy />
            </Protected>
          } /> */}

          <Route path='/help-support' element={
            <Protected>
              <HelpSupport />
            </Protected>
          } />


          {/* <Route path='/help-support-list' element={
            <Protected>
              <HelpList />
            </Protected>
          } />

          <Route path='/edit-help-support/:id' element={
            <Protected>
              <EditHelp />
            </Protected>
          } /> */}

          <Route path='/terms-condition' element={
            <Protected>
              <TermsCondition />
            </Protected>
          } />


          {/* <Route path='/add-terms-condition' element={
            <Protected>
              <AddTermsCondition />
            </Protected>
          } />

          <Route path='/edit-terms-condition/:id' element={
            <Protected>
              <EditTermsCondition />
            </Protected>
          } /> */}


          <Route path='/kyc' element={
            <Protected>
              <KycList />
            </Protected>
          } />

          <Route path='/add-notification' element={
            <Protected>
              <AddNotification />
            </Protected>
          } />

          <Route path='/notification-list' element={
            <Protected>
              <NotificationList />
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
