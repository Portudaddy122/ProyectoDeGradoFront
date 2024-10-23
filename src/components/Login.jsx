import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth.jsx';
import loginService from '../service/login.service.jsx';  // Importa el servicio de login
import Toast from '../components/Toast';  // Importa el componente Toast para mostrar errores
import './Login.css';
import EyeIcon from '../assets/icons/Eye.svg';  // Importa el ícono del ojo
import logo from '../assets/icons/logo.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // Para alternar la visibilidad de la contraseña
  const [error, setError] = useState('');  // Para manejar errores
  const [showToast, setShowToast] = useState(false);  // Para mostrar u ocultar el Toast
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const data = await loginService.login(email, password);
        login(data.token, data.user);
    
        // Redirigir basado en el rol del usuario
        if (data.user.role === 'Administrador') {
          navigate('/admin');
        } else if (data.user.role === 'Profesor') {
          navigate('/profesor');  // Aquí redirigimos a la ruta correcta
        } else if (data.user.role === 'Padre De Familia') {
          navigate('/padre');
        } else {
          navigate('/unauthorized');
        }
      } catch (err) {
        setError(err.message || 'Error al iniciar sesión');
      }
    };    

    try {
      const data = await loginService.login(email, password);
      login(data.token, data.user);

      if (data.user.role === 'Administrador') {
        navigate('/');
      } else if (data.user.role === 'Profesor') {
        navigate('/profesor');
      } else {
        navigate('/unauthorized');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setShowToast(true);  // Muestra el Toast al haber error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);  // Cambia el estado para mostrar o ocultar la contraseña
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src={logo}  // Placeholder del logo
          alt="IDEB Logo"
          className="login-logo"
        />
        <h2>BIENVENIDO</h2>
        <p>INICIA SESIÓN PARA INGRESAR</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}  // Cambia entre "text" y "password"
              placeholder="Ingresa tu contraseña"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={EyeIcon}  // Ícono del ojo
              alt="Mostrar/Ocultar contraseña"
              className="eye-icon"
              onClick={togglePasswordVisibility}  // Alterna la visibilidad de la contraseña
            />
          </div>
          <button type="submit" className="login-button">
            Siguiente
          </button>
        </form>
        <div className="register-link">
          <p>
            ¿No tienes una cuenta? <a href="/register">Regístrate</a>
          </p>
        </div>
      </div>
      {showToast && (
        <Toast
          message={error}
          type="error"
          onClose={() => setShowToast(false)}  // Oculta el Toast después de un tiempo
        />
      )}
    </div>
  );
}

export default Login;
