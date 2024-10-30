import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './auth';  // Proveedor de autenticación
import ProtectedRoute from './protectedRoutes.jsx'; // Ruta protegida
import Menu from './components/Menu';
import UserManagementHome from './pages/UserManagementHome.jsx';
import UserManagementPage from './pages/UserManagementPage.jsx';
import Login from './components/Login.jsx';
import UserManagementForm from './pages/UserManagementForm.jsx';
import UserProfesorHome from './pages/UserProfesorHome.jsx';
import Unauthorized from './components/Unauthorized'; // Asegúrate de crear o importar este componente
import FormActas from './components/FormActas.jsx';
import MenuProfesores from './components/MenuProfesores.jsx';
import InicioProfesores from './components/ComponentsProfesores/InicioProfesores.jsx';
import UserListPadres from './pages/UserListPadres.jsx';
import CitarPadres from './components/ComponentsProfesores/CitarPadres.jsx';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const hideMenuRoutes = ["/login", "/unauthorized"];
  const shouldShowMenu = !hideMenuRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {shouldShowMenu && <Menu />}
      <div style={{ marginLeft: shouldShowMenu ? '250px' : '0', padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} /> {/* Agregar la ruta */}

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute role="Administrador">
                <UserManagementHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listar"
            element={
              <ProtectedRoute role="Administrador">
                <UserManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agregar"
            element={
              <ProtectedRoute role="Administrador">
                <UserManagementForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editar"
            element={
              <ProtectedRoute role="Administrador">
                <UserManagementPage />
              </ProtectedRoute>
            }
          />


          <Route
            path="/profesor"
            element={
              <ProtectedRoute role="Profesor">
                <UserProfesorHome />
              </ProtectedRoute>
            }
          />




          <Route
            path="/psicologo"
            element={
              <ProtectedRoute role="Psicologo">
                <UserProfesorHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crearActa"
            element={
              <ProtectedRoute role="Psicologo">
                <FormActas/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/psicologoHome"
            element={
              <ProtectedRoute role="Psicologo">
                <InicioProfesores/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/psicologoListPadres"
            
            element={
              <ProtectedRoute role="Psicologo">
                <UserListPadres/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/form-actas"
            
            element={
              <ProtectedRoute role="Psicologo">
                <FormActas/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/formCitas"
            
            element={
              <ProtectedRoute role="Psicologo">
                <CitarPadres/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
