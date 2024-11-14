import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPadre } from '../service/PadreDeFamilia.jsx';
import UserTable from '../components/UserTable.jsx';
import Header from '../components/Header.jsx';


const UserListPadres = () => {
  const [padres, setPadres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPadres = async () => {
      try {
        const response = await getPadre();
        setPadres(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la lista de padres de familia:', error);
        setLoading(false);
      }
    };

    fetchPadres();
  }, []);

  const handleCite = (padre) => {
    navigate('/formCitas', { state: { idPadre: padre.idpadre } }); // Cambia `idpadre` a `idPadre`
};

  return (
    <>
      <Header title="GESTION DE CITAS" subtitle="Listado de los padres de familia registrados para citarlos" />
      
      <div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <UserTable users={padres} onCite={handleCite} hideDefaultActions={true} selectedDate={new Date().toLocaleDateString()} />

          
        )}
        
      </div>
    </>
  );
};

export default UserListPadres;
