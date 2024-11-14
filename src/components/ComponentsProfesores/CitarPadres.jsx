import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPadreById } from '../../service/PadreDeFamilia.jsx';
import { agendarEntrevista, enviarCorreo } from '../../service/teoriaDeColas.service.jsx';
import { getMotivos } from '../../service/motivo.service.jsx';
import { getMateria } from '../../service/materia.service.jsx';
import './CitarPadres.css';
import Header from '../Header.jsx';
import Toast from '../Toast.jsx';

const CitarPadres = () => {
  const location = useLocation();
  const { idPadre } = location.state || {};

  const [formData, setFormData] = useState({
    nombres: '',
    email: '',
    numcelular: '',
    motivo: '',
    materia: '',
    fecha: '',
    horario: '',
    descripcion: '',
  });

  const [motivos, setMotivos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '' });

  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (idPadre) {
      const fetchPadre = async () => {
        try {
          const response = await getPadreById(idPadre);
          const padre = response.data;
          setFormData({
            nombres: `${padre.nombres} ${padre.apellidopaterno} ${padre.apellidomaterno}`,
            email: padre.email,
            numcelular: padre.numcelular,
            motivo: '',
            materia: '',
            fecha: '',
            horario: '',
            descripcion: '',
          });
        } catch (error) {
          console.error('Error al obtener los datos del padre:', error);
        }
      };
      fetchPadre();
    }
  }, [idPadre]);

  useEffect(() => {
    const fetchMotivos = async () => {
      try {
        const response = await getMotivos();
        setMotivos(response.data);
      } catch (error) {
        console.error('Error al obtener motivos:', error);
      }
    };
    fetchMotivos();
  }, []);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await getMateria();
        if (response.data) {
          setMaterias(response.data);
        } else {
          setMaterias([]);
        }
      } catch (error) {
        console.error('Error al obtener materias:', error);
        setMaterias([]);
      }
    };
    fetchMaterias();
  }, []);
  

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const dayOfWeek = new Date(selectedDate).getDay();

    if (dayOfWeek === 5 || dayOfWeek === 6) {
      setToast({
        message: "No se puede seleccionar sábados o domingos. Por favor, elige un día hábil.",
        type: "error"
      });
      setFormData({ ...formData, fecha: '' });
    } else {
      setFormData({ ...formData, fecha: selectedDate });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "materia") {
      console.log(`Valor seleccionado para materia: ${value}`);
      // Convertir solo si el valor no está vacío
      const parsedValue = value !== "" ? Number(value) : "";
      console.log(`Materia seleccionada (convertida): ${parsedValue}`);
      setFormData({ ...formData, [name]: parsedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  
  
  
  

  const handleMotivoChange = (e) => {
    const selectedMotivo = motivos.find(m => m.idmotivo === parseInt(e.target.value));
    setFormData({
      ...formData,
      motivo: parseInt(e.target.value), // Convertir a número
      nombremotivo: selectedMotivo ? selectedMotivo.nombremotivo : ''
    });
  };
  
  
  // Función para limpiar solo los campos seleccionados
  const handleClear = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      motivo: '',
      materia: '',
      fecha: '',
      horario: '',
      descripcion: '',
    }));
  };
 const handleSubmit = async (e) => {
  e.preventDefault();

  const { motivo, nombremotivo, materia, fecha, descripcion } = formData;
  const idProfesor = 1;
  const idPsicologo = 2;
  const idMotivo = parseInt(motivo);
  const idMateria = parseInt(materia);
  const profesor = JSON.parse(localStorage.getItem('user'));

  console.log("Datos del formulario:");
  console.log("idPadre:", idPadre);
  console.log("idProfesor:", idProfesor);
  console.log("idPsicologo:", idPsicologo);
  console.log("idMotivo:", idMotivo);
  console.log("idMateria:", idMateria);
  console.log("fecha:", fecha);
  console.log("descripcion:", descripcion);

  // Validar que todos los campos sean válidos
  if (
    !idProfesor ||
    !idPsicologo ||
    !idPadre ||
    isNaN(idMotivo) ||
    isNaN(idMateria) ||
    !fecha ||
    !descripcion
  ) {
    setToast({ message: 'Por favor, completa todos los campos correctamente antes de enviar.', type: 'error' });
    return;
  }

  try {
    console.log("Enviando datos al backend:");
    const response = await agendarEntrevista({
      idProfesor,
      idPsicologo,
      idPadre,
      fecha,
      descripcion,
      idMotivo,
      idMateria
    });

    console.log("Respuesta del backend:", response);

    if (response.status === 201) {
      const { horario, idreservarentrevista } = response.data;

      console.log("Enviando correo de confirmación");
      await enviarCorreo({
        idPadre,
        motivo: nombremotivo,
        materia,
        fecha,
        horario,
        descripcion,
        profesor,
        idReservarEntrevista: idreservarentrevista
      });

      setToast({ message: 'Cita agendada y correo enviado exitosamente.', type: 'success' });
      handleClear();
    }
  } catch (error) {
    console.error("Error al agendar la entrevista:", error.response?.data || error.message);

    // Manejo de errores del backend
    if (error.response) {
      const backendError = error.response.data?.error;
      if (backendError === 'La entrevista excede el horario permitido') {
        setToast({ message: 'La entrevista excede el horario permitido. Intente con un horario diferente.', type: 'error' });
      } else if (backendError === 'No se encontró una hora previa para esta fecha') {
        setToast({ message: 'No se encontró una hora previa, es la primera entrevista del día.', type: 'info' });
      } else {
        setToast({ message: backendError || 'Error inesperado al agendar la entrevista.', type: 'error' });
      }
    } else {
      setToast({ message: 'Error al agendar la entrevista o enviar el correo.', type: 'error' });
    }
  }
};

  
  
  
  
  return (
    <>
      <Header title="CREACION DE UNA NUEVA CITA" subtitle={"Llene todos los campos para citar al padre de familia"} />
      <div className="citar-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group-inline">
            <div className="form-group">
              <label>Nombre del padre de familia</label>
              <input type="text" value={formData.nombres} className="form-input" readOnly />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" value={formData.email} className="form-input" readOnly />
            </div>
          </div>
          <div className="form-group">
          <select
  name="motivo"
  value={formData.motivo}
  onChange={handleMotivoChange}
  className="form-select"
  required
>
  <option value="">Selecciona el motivo</option>
  {motivos.map((motivo) => (
    <option key={motivo.idmotivo} value={motivo.idmotivo}>
      {motivo.nombremotivo}
    </option>
  ))}
</select>

<div className="form-group">
  <label>Materia</label>
  <select 
    name="materia" 
    value={formData.materia || ""} 
    onChange={handleChange} 
    className="form-select" 
    required
  >
    <option value="">Selecciona la materia</option>
    {materias.length > 0 && materias.map((materia) => (
      // Asegúrate de que materia.idMateria no sea undefined antes de usar toString()
      <option key={materia.idmateria} value={materia.idmateria ? materia.idmateria.toString() : ""}>
        {materia.nombre}
      </option>
    ))}
  </select>
</div>






          </div>
          <div className="form-group">
            <label>Fecha de la entrevista</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleDateChange} className="form-input" min={todayDate} required />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className="form-textarea" required placeholder='Escriba la descripción del mensaje'></textarea>
          </div>
          <div className="form-actions">
            <button type="button" className="form-button limpiar" onClick={handleClear}>Limpiar</button>
            <button type="submit" className="form-button enviar">Enviar</button>
          </div>
        </form>
      </div>
      {toast.message && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />}
    </>
  );
};

export default CitarPadres;
