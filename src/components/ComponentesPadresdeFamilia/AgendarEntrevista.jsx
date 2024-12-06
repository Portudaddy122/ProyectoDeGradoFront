import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { getMotivos } from '../../service/motivo.service';
import { crearReservaEntrevista } from '../../service/teoriaDeColas.service';
import './AgendarEntrevista.css';
import MenuPadres from './MenuPadres';
import DynamicModalForUsers from '../../components/DynamicModelForUsers'; // Importar el componente DynamicModalForUsers

registerLocale('es', es);

const AgendarEntrevista = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { idProfesor, nombre, materia, dia, horainicio, horafin } = location.state || {};
    const [motivos, setMotivos] = useState([]);
    const [idMotivo, setIdMotivo] = useState('');
    const [fecha, setFecha] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [modalContent, setModalContent] = useState(''); // Contenido del modal

    useEffect(() => {
        const fetchMotivos = async () => {
            try {
                const response = await getMotivos();
                setMotivos(response.data);
            } catch (error) {
                console.error('Error al cargar motivos:', error);
            }
        };

        fetchMotivos();
    }, []);

    const isDayEnabled = (date) => {
        const today = new Date();
        if (date < today) {
            return false;
        }

        const dayOfWeek = date.getDay();

        const daysMap = {
            Lunes: 1,
            Martes: 2,
            Miércoles: 3,
            Jueves: 4,
            Viernes: 5,
            Sábado: 6,
            Domingo: 0,
        };

        return dayOfWeek === daysMap[dia];
    };

    const handleAgendar = async () => {
        if (!idProfesor || !idMotivo || !fecha) {
            setModalContent('Por favor complete todos los campos obligatorios.');
            setShowModal(true);
            return;
        }

        const data = {
            idProfesor,
            idPadre: 1,
            fecha: fecha.toISOString().split('T')[0],
            idMotivo,
            horainicio,
        };

        try {
            const response = await crearReservaEntrevista(data);

            const { horafinentrevista } = response.data.data;

            // Configurar el contenido del modal con los detalles de la entrevista
            setModalContent(
                <div>
                    <p><strong>Profesor:</strong> {nombre}</p>
                    <p><strong>Materia:</strong> {materia}</p>
                    <p><strong>Día:</strong> {dia}</p>
                    <p><strong>Fecha:</strong> {data.fecha}</p>
                    <p><strong>Hora de Inicio de entrevistas:</strong> {horainicio}</p>
                    <p><strong>Hora en la que usted esta citado:</strong> {horafinentrevista}</p>
                </div>
            );
            setShowModal(true);

            // Redirigir después de cerrar el modal
            setTimeout(() => {
                setShowModal(false);
                navigate('/listaprofesoresentrevistas');
            }, 5000);
        } catch (error) {
            console.error('Error al agendar entrevista:', error);
            setModalContent('Hubo un error al agendar la entrevista.');
            setShowModal(true);
        }
    };

    return (
        <div className="container">
            <MenuPadres />
            <h1 className="title">HORARIO DE ENTREVISTA</h1>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>Nombre del Profesor</th>
                        <th>Materia</th>
                        <th>Día</th>
                        <th>Hora de Inicio</th>
                        <th>Hora de Fin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{nombre || 'No disponible'}</td>
                        <td>{materia || 'No disponible'}</td>
                        <td>{dia || 'No disponible'}</td>
                        <td>{horainicio || 'No disponible'}</td>
                        <td>{horafin || 'No disponible'}</td>
                    </tr>
                </tbody>
            </table>
            <div className="date-picker motive-dropdown">
                <label>Seleccione la Fecha:</label>
                <DatePicker
                    selected={fecha}
                    onChange={(date) => setFecha(date)}
                    filterDate={isDayEnabled}
                    minDate={new Date()}
                    locale="es"
                    placeholderText="Seleccione una fecha válida"
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            <div className="motive-selection">
                <select
                    className="motive-dropdown"
                    value={idMotivo}
                    onChange={(e) => setIdMotivo(e.target.value)}
                >
                    <option value="" disabled>
                        Seleccione el motivo
                    </option>
                    {motivos.map((motivo) => (
                        <option key={motivo.idmotivo} value={motivo.idmotivo}>
                            {motivo.nombremotivo}
                        </option>
                    ))}
                </select>
            </div>
            <div className="action-buttons">
                <button className="cancel-button" onClick={() => navigate('/listaprofesoresentrevistas')}>
                    Cancelar
                </button>
                <button className="confirm-button" onClick={handleAgendar}>
                    Agendar
                </button>
            </div>

            {/* Modal dinámico para mostrar los detalles */}
            <DynamicModalForUsers
                isOpen={showModal}
                title="Detalles de la Entrevista"
                content={modalContent}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default AgendarEntrevista;
