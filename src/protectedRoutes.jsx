import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './auth';
import Toast from './components/Toast';

const ProtectedRoute = ({ children, role }) => {
    const { user } = React.useContext(AuthContext);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const handleCloseToast = () => {
        setShowToast(false);
    };

    useEffect(() => {
        if (user === null) {
            setToastMessage('Usuario no autenticado. Por favor, inicia sesión.');
            setShowToast(true);
            navigate('/login');
        } else if (user && !role.includes(user.role)) {
            setToastMessage('No tienes permiso para acceder a esta página.');
            setShowToast(true);
            navigate('/unauthorized');
        }
    }, [user, role, navigate]);

    if (user === null) {
        return <div>Verificando autenticación...</div>;
    }

    if (!user || !role.includes(user.role)) {
        return null;
    }

    return (
        <>
            {showToast && (
                <Toast
                    message={toastMessage}
                    type="error"
                    onClose={handleCloseToast}
                />
            )}
            {children}
        </>
    );
};

export default ProtectedRoute;
