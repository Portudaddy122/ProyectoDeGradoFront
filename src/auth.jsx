import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // Agrega un estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            const tokenExpiry = JSON.parse(atob(storedToken.split('.')[1])).exp * 1000;
            const now = new Date().getTime();

            if (tokenExpiry > now) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } else {
                logout();
            }
        }

        setLoading(false);
    }, []);

    const login = (token, userData) => {
        setToken(token);
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return <div>Cargando...</div>; // Puedes cambiar esto a un spinner o mensaje de carga
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
