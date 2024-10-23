import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import "./UserManagementPage.css";
import UserTable from "../components/UserTable";
import DynamycCard from "../components/DynamycCard";
import Header from "../components/Header";
import UsersIcon from '../assets/icons/Users.svg';
import UsersBIcon from '../assets/icons/UsersB.svg';




function UserManagementHome() {
  const [totalUsers, setTotalUsers] = useState(0); // Estado para almacenar el total de usuarios
  const [totalProfessores, setTotalProfessores] = useState(0); // Estado para almacenar el total de profesores
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userCount = await getCountUsers(); // Llama a la función asíncrona
        const professorCount = await getCountTeachers(); // Llama a la función para obtener el conteo de profesores
        setTotalUsers(userCount); // Establece el total de usuarios
        setTotalProfessores(professorCount); // Establece el total de profesores
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    fetchCounts(); // Llama a la función al montar el componente
  }, []); // El arreglo vacío asegura que se ejecute solo al montar el componente

  if (loading) {
    return <div>Cargando...</div>; // Mensaje de carga
  }

  return (
    <>
      <section className="container-UserManagemet-Home">
        <section className="header-container">
          <Header title={"DASHBOARD"} subtitle={"BIENVENIDO AL SISTEMA IDED"} />
        </section>
        <section className="Card-Dinamc-Container">
          <DynamycCard NumberUsers={totalUsers} icon={UsersIcon} nameTitle={"Usuarios Nuevos"} />
          <DynamycCard NumberUsers={50} icon={UsersBIcon} nameTitle={"Ingresos Hoy"} />
          <DynamycCard NumberUsers={totalProfessores} icon={UsersBIcon} nameTitle={"Total Profesores "} /> {/* Usa el contador de profesores */}
        </section>
      </section>
    </>
  );
}

export default UserManagementHome;
