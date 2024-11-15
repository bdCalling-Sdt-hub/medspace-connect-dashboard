import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

function PrivateRoute({ children }: { children: JSX.Element }) {
    const { user } = useAppSelector((state) => state.auth);

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default PrivateRoute;
