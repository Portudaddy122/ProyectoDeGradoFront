import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getEstudianteById } from '../../service/Estudiante.service.jsx';
import { createActaReunion } from '../../service/actas.service.jsx';
import { getMotivos } from '../../service/motivo.service.jsx';
import { getMateria } from '../../service/materia.service.jsx';
import './FormActas.css';
import Header from '../Header';
import imgEstudiantes from '../../assets/image/Estudiantes.png';
import Toast from '../Toast';

function FormActas() {
  const location = useLocation();
  const [estudiante, setEstudiante] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '', show: false });
  const [motivos, setMotivos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({
    idreservarentrevista: '',
    idmotivo: '',
    idmateria: '',
    fechadecreacion: new Date().toISOString().split('T')[0], // Fecha del día actual
    descripcion: '',
    estado: true,
  });

  useEffect(() => {
    const idreservarentrevista = location.state?.idreservarentrevista;
    const idestudiante = location.state?.idestudiante;


    if (idreservarentrevista) {
      setFormData((prev) => ({
        ...prev,
        idreservarentrevista,
        idestudiante
      }));

      if (idestudiante) {
        getEstudianteById(idestudiante)
          .then((response) => {
            setEstudiante(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener el estudiante:', error);
            setToast({
              message: 'Error al cargar los datos del estudiante.',
              type: 'error',
              show: true,
            });
          });
      } else {
        setToast({
          message: 'No se encontró un identificador del estudiante.',
          type: 'error',
          show: true,
        });
      }
    } else {
      setToast({
        message: 'No se puede crear una acta del estudiante. Debe existir una entrevista',
        type: 'error',
        show: true,
      });
    }

    getMotivos()
      .then((response) => {
        setMotivos(response.data);
      })
      .catch((error) => console.error('Error al obtener motivos:', error));

    getMateria()
      .then((response) => {
        setMaterias(response.data);
      })
      .catch((error) => console.error('Error al obtener materias:', error));
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    setFormData({
      idreservarentrevista: estudiante?.idreservaentrevista || '',
      idmotivo: '',
      idmateria: '',
      fechadecreacion: new Date().toISOString().split('T')[0],
      descripcion: '',
      estado: true,
    });
  };

  const handleSubmit = () => {

    if (!formData.idreservarentrevista || !formData.idestudiante) {
      setToast({
        message: 'No se puede crear el acta sin un identificador de reserva.',
        type: 'error',
        show: true,
      });
      return;
    }

    createActaReunion(formData)
      .then(() => {
        setToast({ message: 'Acta creada exitosamente', type: 'success', show: true });
        setFormData({
            idreservarentrevista: estudiante?.idreservaentrevista || '',
            idestudiante: estudiante?.idestudiante || '',
            idmotivo: '',
            idmateria: '',
            fechadecreacion: new Date().toISOString().split('T')[0],
            descripcion: '',
            estado: true,
        }); 
    })
      
      .catch((error) => {
        console.error('Error al crear el acta:', error);
        setToast({
          message: 'Error al crear el acta. Verifica los datos e inténtalo nuevamente.',
          type: 'error',
          show: true,
        });
      });
  };

  return (
    <>
      <Header title="GESTIÓN DE ACTAS" subtitle="Llene los campos de la Acta" />
      <div className="form-actas-container">
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ message: '', type: '', show: false })}
          />
        )}
        <h2 className="title">Creación de nueva acta</h2>
        <div className="form-header">
          <label className="student-label">Nombre del estudiante</label>
          <input
            type="text"
            className="student-input"
            placeholder={
              estudiante
                ? `${estudiante.nombres} ${estudiante.apellidopaterno} ${estudiante.apellidomaterno}`
                : 'Cargando...'
            }
            disabled
          />
        </div>
        <div className="form-content">
          <div className="student-info">
            <div className="student-photo">
              <img src={imgEstudiantes} alt="Estudiante" />
            </div>
            <div className="info-card">
              <p>
                <strong>Nombre estudiante:</strong>{' '}
                {estudiante
                  ? `${estudiante.nombres} ${estudiante.apellidopaterno} ${estudiante.apellidomaterno}`
                  : 'Cargando...'}
              </p>
            
            </div>
          </div>
          <div className="form-fields">
            <div className="field-group">
              <label>Motivo</label>
              <select name="idmotivo" value={formData.idmotivo} onChange={handleChange}>
                <option value="">Selecciona el motivo</option>
                {motivos.map((motivo) => (
                  <option key={motivo.idmotivo} value={motivo.idmotivo}>
                    {motivo.nombremotivo}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-group">
              <label>Materia</label>
              <select name="idmateria" value={formData.idmateria} onChange={handleChange}>
                <option value="">Selecciona la materia</option>
                {materias.map((materia) => (
                  <option key={materia.idmateria} value={materia.idmateria}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-group">
              <label>Fecha</label>
              <input
                type="date"
                name="fechadecreacion"
                value={formData.fechadecreacion}
                readOnly
                style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
              />
            </div>
            <div className="field-group">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ingrese la descripción de la entrevista"
              />
            </div>
            <div className="form-buttons">
              <button type="button" className="clear-button" onClick={handleClear}>
                Limpiar
              </button>
              <button type="button" className="create-button" onClick={handleSubmit}>
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormActas;
