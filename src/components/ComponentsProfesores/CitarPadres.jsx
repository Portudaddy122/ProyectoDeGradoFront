import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPadreById } from '../../service/PadreDeFamilia.jsx';
import { agendarEntrevista } from '../../service/teoriaDeColas.service.jsx';
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

  // Fecha mínima para evitar fechas pasadas
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
    } else {
      console.error("idPadre es undefined o null");
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
        setMaterias(response.data);
      } catch (error) {
        console.error('Error al obtener materias:', error);
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
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      ...formData,
      motivo: '',
      materia: '',
      fecha: '',
      horario: '',
      descripcion: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Campos requeridos para el backend
    const { nombres, motivo, materia, fecha, horario, descripcion, numcelular } = formData;
    const idProfesor = 1; // ID del profesor (ajusta según corresponda)
    const idPsicologo = 2; // ID del psicólogo (ajusta según corresponda)
    const idMotivo = motivo; // Usa el motivo seleccionado como ID del motivo

    try {
      // Enviar solicitud al backend con los datos completos
      const response = await agendarEntrevista({
        idProfesor,
        idPsicologo,
        idPadre,      // ID del padre que se pasa desde `location.state`
        fecha,
        descripcion,
        idMotivo
      });

      if (response.status === 201) {
        // Crear el mensaje de WhatsApp
        const mensaje = `Buenas días ${nombres}, nos comunicamos del colegio instituto de Educación Bancaria, usted a sido citado a entrevista con el siguiente tema:
        - Motivo: ${motivo}
        - Materia: ${materia}
        - Fecha de la entrevista: ${fecha}
        - Horario: ${horario}
          Descripción: ${descripcion}`;
        
        // Codificar el mensaje para la URL de WhatsApp
        const urlWhatsApp = `https://wa.me/${numcelular.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');
      }
    } catch (error) {
      console.error("Error al agendar la entrevista:", error);
      alert("Error al agendar la entrevista.");
    }
  };




  return (
    <>
      <Header title="Creación de nueva cita" />
      <div className="citar-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group-inline">
            <div className="form-group">
              <label>Nombre del padre de familia</label>
              <input
                type="text"
                value={formData.nombres}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                value={formData.email}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Número del padre</label>
              <input
                type="text"
                value={formData.numcelular}
                className="form-input"
                readOnly
              />
            </div>
          </div>
          
          {/* Campos adicionales */}
          <div className="form-group-inline">
            <div className="form-group">
              <label>Motivo</label>
              <select
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
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
            </div>
            <div className="form-group">
              <label>Materia</label>
              <select
                name="materia"
                value={formData.materia}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Selecciona la materia</option>
                {materias.map((materia) => (
                  <option key={materia.idMateria} value={materia.idMateria}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group-inline">
            <div className="form-group">
              <label>Fecha de la entrevista</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleDateChange}
                className="form-input"
                min={todayDate}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Ingrese la descripción de la entrevista"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="form-button limpiar" onClick={handleClear}>
              Limpiar
            </button>
            <button type="submit" className="form-button enviar">
              Enviar
            </button>
          </div>
        </form>
      </div>
      
      {/* Mostrar Toast si hay un mensaje */}
      {toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      )}
    </>
  );
};

export default CitarPadres;
