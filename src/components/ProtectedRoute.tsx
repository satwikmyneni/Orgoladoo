import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const { session, loading } = useAuth();

    if (loading) {
        return <div className="p-20 text-center">Loading...</div>;
    }

    if (!session) {
        return <Navigate to="/admin-login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;