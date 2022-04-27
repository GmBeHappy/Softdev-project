import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import SellerGuard from '../guards/SellerGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: <Register />
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify/:token', element: <VerifyCode /> },
        { path: 'verify-email', element: <VerifyEmail /> }
      ]
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/main" replace /> },
        { path: 'main', element: <GeneralMain /> },
        { path: 'chat', element: <Chat /> },
        { path: 'account', element: <UserAccount /> },
        {
          path: 'post',
          children: [
            { element: <Navigate to="/dashboard/post/create" replace />, index: true },
            {
              path: 'create',
              element: (
                <SellerGuard>
                  <CreateNewPost />
                </SellerGuard>
              )
            },
            { path: 'edit/:id', element: <CreateNewPost /> }
          ]
        },
        { path: 'verify-identity', element: <VerifyID /> },
        { path: 'package-management', element: <Payment /> }
      ]
    },
    {
      path: 'post',
      element: <MainLayout />,
      children: [
        { path: 'details/:id', element: <Details /> },
        { path: 'search/:searchFor/:keyword', element: <Search /> },
        { path: 'search/:searchFor', element: <Search /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <LandingPage /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
        { path: 'packages', element: <Packages /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS
// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
const VerifyEmail = Loadable(lazy(() => import('../pages/authentication/VerifyEmail')));
// Dashboard
const GeneralMain = Loadable(lazy(() => import('../pages/dashboard/GeneralMain')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const CreateNewPost = Loadable(lazy(() => import('../pages/dashboard/CreateNewPost')));
const VerifyID = Loadable(lazy(() => import('../pages/dashboard/VerifyID')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const Search = Loadable(lazy(() => import('../pages/Search')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Packages = Loadable(lazy(() => import('../pages/Packages')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Details = Loadable(lazy(() => import('../pages/Details')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
