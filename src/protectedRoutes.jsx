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
        } else if (user && user.role !== role) {
            setToastMessage('No tienes permiso para acceder a esta página.');
            setShowToast(true);
            navigate('/unauthorized');
        }
    }, [user, role, navigate]);

    if (user === null) {
        // Puedes devolver un spinner u otro componente mientras se carga el usuario
        return <div>Verificando autenticación...</div>;
    }

    if (!user || user.role !== role) {
        return null; // Para prevenir que el contenido se renderice antes de la redirección
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
