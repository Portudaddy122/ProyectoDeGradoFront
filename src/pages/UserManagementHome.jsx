import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import "./UserManagementHome.css";
import UserTable from "../components/UserTable";
import DynamycCard from "../components/DynamycCard";
import { getCantidadUsuariosConIngresos } from "../service/users.service.jsx"
import Header from "../components/Header";
import UsersIcon from '../assets/icons/Users.svg';
import UsersBIcon from '../assets/icons/UsersB.svg';
import { 
  getActiveUsersCount, 
  getActiveProfessorsCount, 
  getWeeklyInterviews, 
  getInterviewStatusCounts, 
  getMostRequestedSubject 
} from "../service/dashboard.service.jsx";

// Importa y registra todos los elementos necesarios de Chart.js
import { 
  Chart as ChartJS, 
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend
);

function UserManagementHome() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalIngresoUsers, setTotalIngresoUsers] = useState(0);
  const [totalProfessores, setTotalProfessores] = useState(0);
  const [entrevistasSemanales, setEntrevistassemanales] = useState(0);
  const [loading, setLoading] = useState(true);

  const [interviewStatus, setInterviewStatus] = useState({ completadas: 0, no_realizadas: 0 });
  const [mostRequestedSubjects, setMostRequestedSubjects] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userCount = await getActiveUsersCount();
        const professorCount = await getActiveProfessorsCount();
        const entrevistasSemanalesData = await getWeeklyInterviews();
        const interviewStatusData = await getInterviewStatusCounts();
        const subjectsData = await getMostRequestedSubject();
        const userCountIngresos = await getCantidadUsuariosConIngresos();
  
        setTotalUsers(userCount);
        setTotalIngresoUsers(userCountIngresos.cantidad); // Accede a la propiedad cantidad
        setTotalProfessores(professorCount);
        setEntrevistassemanales(entrevistasSemanalesData);
        setInterviewStatus(interviewStatusData);
        setMostRequestedSubjects(subjectsData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCounts();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weeklyInterviews = await getWeeklyInterviews();

        
        // Verifica que los datos sean un array con 5 elementos
        if (Array.isArray(weeklyInterviews) && weeklyInterviews.length === 5) {
          setEntrevistassemanales(weeklyInterviews);
      
        } else {
          console.error("Datos inválidos recibidos:", weeklyInterviews);
          setEntrevistassemanales([0, 0, 0, 0, 0]);
        }
      } catch (error) {
        console.error("Error al obtener entrevistas semanales:", error);
        setEntrevistassemanales([0, 0, 0, 0, 0]);
      }
    };
    fetchData();
  }, []);
  
  
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Datos para el gráfico de estado de entrevistas (Doughnut Chart)
  const interviewStatusData = {
    labels: ["Completadas", "No Realizadas"],
    datasets: [
      {
        data: [interviewStatus.completadas, interviewStatus.no_realizadas],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  // Datos para el gráfico de materias más demandadas (Bar Chart)
  const subjectsData = {
    labels: mostRequestedSubjects.map(item => item.label),
    datasets: [
      {
        label: "Cantidad",
        data: mostRequestedSubjects.map(item => item.value),
        backgroundColor: "#3f51b5",
      },
    ],
  };

  // Datos para el gráfico de entrevistas semanales (Line Chart)
  const weeklyData = {
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    datasets: [
      {
        label: "Entrevistas Realizadas",
        data: entrevistasSemanales,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        pointBackgroundColor: "#ff9800",
        pointBorderColor: "#ff9800",
        pointRadius: 5,
        fill: true,
        tension: 0.3,
      },
    ],
  };
  

  
  
  

  return (
    <>
      <section className="container-UserManagemet-Home">
        <section className="header-container">
          <Header title={"DASHBOARD"} subtitle={"BIENVENIDO AL SISTEMA IDED"} />
        </section>

        {/* Sección de Cards Dinámicos */}
        <section className="Card-Dinamc-Container">
  <DynamycCard 
    NumberUsers={totalUsers} 
    icon={UsersIcon} 
    nameTitle={"Total de Usuarios"} 
    route="/listar" 
  />
  <DynamycCard 
    NumberUsers={totalIngresoUsers} 
    icon={UsersIcon} 
    nameTitle={"Total de Usuarios Ingresados"} 
    route="/ingresos" 
  />
  <DynamycCard 
    NumberUsers={totalProfessores} 
    icon={UsersBIcon} 
    nameTitle={"Total Profesores"} 
    route="/listar" 
  />
</section>

        
        <section className="charts-section">
  {/* Fila con los tres gráficos */}
  <div className="charts-row">
    <div className="chart-container">
      <h3>Materias Más Demandadas</h3>
      <Bar data={subjectsData} />
    </div>

    <div className="chart-container">
      <h3>Estado de Entrevistas</h3>
      <Doughnut data={interviewStatusData} />
    </div>

    <div className="chart-container">
      <h3>Entrevistas Semanales</h3>
      <Line data={weeklyData} />
    </div>
  </div>
</section>

      </section>
    </>
  );
}

export default UserManagementHome;
