import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/dashboard/dashboard/Dashboard';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import TermsCondition from '../pages/dashboard/settings/TermsCondition';

import Notification from '../pages/dashboard/Notification';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Profile from '../pages/dashboard/profile/Profile';
import MakeAdmin from '../pages/dashboard/settings/MakeAdmin';
import FAQs from '../pages/dashboard/settings/FAQs';
import SubscriptionPackages from '../pages/dashboard/settings/SubscriptionPackages';
import UserAgreement from '../pages/dashboard/settings/UserAgreement';
import About from '../pages/dashboard/settings/About';
import Support from '../pages/dashboard/settings/Support';
import SpaceProvider from '../pages/dashboard/SpaceProvider';
import SpaceSeeker from '../pages/dashboard/SpaceSeeker';
import SpacePosts from '../pages/dashboard/SpacePosts';
import SubscribedUsers from '../pages/dashboard/SubscribedUsers';
import DealingDetails from '../pages/dashboard/DealingDetails';
import PracticeFor from '../pages/dashboard/settings/PracticeFor';
import PracticeNeed from '../pages/dashboard/settings/PracticeNeed';
import CouponManagement from '../pages/dashboard/settings/CouponMangement';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'space-provider', element: <SpaceProvider /> },
            { path: 'space-seeker', element: <SpaceSeeker /> },
            { path: 'space-post', element: <SpacePosts /> },
            { path: 'subscribed-users', element: <SubscribedUsers /> },
            { path: 'dealing-details', element: <DealingDetails /> },

            //    for settings section
            { path: 'subscriptions', element: <SubscriptionPackages /> },
            { path: 'coupon-management', element: <CouponManagement /> },
            { path: 'make-admin', element: <MakeAdmin /> },
            { path: 'terms', element: <TermsCondition /> },
            { path: 'agreement', element: <UserAgreement /> },
            { path: 'practice-type', element: <PracticeFor /> },
            { path: 'practice-need', element: <PracticeNeed /> },
            { path: 'about', element: <About /> },
            { path: 'support', element: <Support /> },
            { path: 'faqs', element: <FAQs /> },

            // others sections
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <Notification /> },
        ],
    },

    // ? for authentication sections
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
