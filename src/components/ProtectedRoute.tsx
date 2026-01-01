import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRole?: 'vendor' | 'student';
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
    const { user, token } = useAuth();

    if (!token || !user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        // Redirect based on role if they try to access unauthorized page
        if (user.role === 'vendor') {
            return <Navigate to="/vendor/dashboard" replace />;
        } else {
            return <Navigate to="/student/outlets" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
