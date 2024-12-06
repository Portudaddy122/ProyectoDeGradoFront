import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPadreById } from '../../service/PadreDeFamilia.jsx';
import { agendarEntrevista, enviarCorreo } from '../../service/teoriaDeColas.service.jsx';
import { getMotivos } from '../../service/motivo.service.jsx';
import { getMateria } from '../../service/materia.service.jsx';
import './CitarPadres.css';
import Header from '../Header.jsx';
import Toast from '../Toast.jsx';
import FullScreenLoader from './ProgresoCircular.jsx';

const CitarPadres = () => {
  const location = useLocation();
  const { idPadre } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

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
        setMaterias(response.data || []);
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
    setFormData({ ...formData, [name]: name === "materia" && value !== "" ? Number(value) : value });
  };

  const handleMotivoChange = (e) => {
    const selectedMotivo = motivos.find(m => m.idmotivo === parseInt(e.target.value));
    setFormData({
      ...formData,
      motivo: parseInt(e.target.value),
      nombremotivo: selectedMotivo ? selectedMotivo.nombremotivo : ''
    });
  };

  const handleClear = () => {
    setFormData(prevFormData => ({
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
    setIsLoading(true);

    const usuario = JSON.parse(localStorage.getItem('user'));
    if (!usuario || (usuario.role !== 'Profesor' && usuario.role !== 'Psicologo')) {
      setToast({ message: 'Solo profesores y psicólogos pueden agendar citas.', type: 'error' });
      setIsLoading(false);
      return;
    }

    const idProfesor = usuario.role === 'Profesor' ? usuario.id : null;
    const idPsicologo = usuario.role === 'Psicologo' ? usuario.id : null;

    const { motivo, nombremotivo, materia, fecha, descripcion } = formData;
    const idPadre = location.state?.idPadre;
    const idMotivo = parseInt(motivo);
    const idMateria = parseInt(materia);

    if ((!idProfesor && !idPsicologo) || !idPadre || isNaN(idMotivo) || !materia || !fecha || !descripcion) {
      setToast({ message: 'Por favor, completa todos los campos correctamente.', type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await agendarEntrevista({
        idProfesor,
        idPsicologo,
        idPadre,
        fecha,
        descripcion,
        idMotivo,
        idMateria,
      });

      if (response.status === 201) {
        const { horafinentrevista, idreservarentrevista } = response.data;

        const profesorData = {
          id: usuario.id,
          nombres: usuario.nombres,
          apellidopaterno: usuario.apellidopaterno,
          apellidomaterno: usuario.apellidomaterno,
          role: usuario.role,
        };

        await enviarCorreo({
          idPadre,
          motivo: nombremotivo,
          materia: materias.find(m => m.idmateria === idMateria)?.nombre || 'Materia desconocida',
          fecha,
          horario: horafinentrevista,
          descripcion,
          profesor: profesorData,
          idReservarEntrevista: idreservarentrevista,
        });

        setToast({ message: 'Cita agendada y correo enviado exitosamente.', type: 'success' });
        handleClear();
      }
    } catch (error) {
      setToast({ message: 'Error al agendar la cita o enviar el correo.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <Header title="CREACIÓN DE UNA NUEVA CITA" subtitle="Llene todos los campos para citar al padre de familia" />
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
            <label>Motivo</label>
            <select
              name="motivo"
              value={formData.motivo}
              onChange={handleMotivoChange}
              className="form-select"
              required
            >
              <option value="">Selecciona el motivo</option>
              {motivos.map(motivo => (
                <option key={motivo.idmotivo} value={motivo.idmotivo}>{motivo.nombremotivo}</option>
              ))}
            </select>
          </div>
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
              {materias.map(materia => (
                <option key={materia.idmateria} value={materia.idmateria || ""}>{materia.nombre}</option>
              ))}
            </select>
          </div>
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
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="form-textarea"
              required
              placeholder="Escriba la descripción del mensaje"
            ></textarea>
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
