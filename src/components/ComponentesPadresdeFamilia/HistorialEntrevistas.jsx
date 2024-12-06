import React, { useEffect, useState } from "react";
import "./HistorialEntrevistas.css";
import { obtenerEntrevistasPorPadre } from "../../service/teoriaDeColas.service.jsx";
import MenuPadres from "./MenuPadres.jsx";

const HistorialEntrevistas = () => {
    const [citas, setCitas] = useState([]); // Estado para almacenar las citas
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    // Obtener el idPadre desde el localStorage
    let idPadre = null;
    try {
        const user = JSON.parse(localStorage.getItem("user")); // Parsear el JSON almacenado
        idPadre = user?.id; // Acceder al campo `id` dentro de `user`
    } catch (err) {
        console.error("Error al obtener el idPadre desde el localStorage:", err);
        idPadre = null;
    }

    useEffect(() => {
        // Validar que el idPadre esté disponible
        if (!idPadre) {
            setError("No se encontró el idPadre en el localStorage o está malformateado.");
            setLoading(false);
            return;
        }

        // Llamar al servicio para obtener el historial de citas
        const fetchCitas = async () => {
            try {
                setLoading(true);
                const response = await obtenerEntrevistasPorPadre(idPadre);
                setCitas(response.data.data);
                setError(null); // Reiniciar el error si se obtienen datos exitosamente
                setLoading(false);
            } catch (err) {
                console.error("Error al obtener el historial de citas:", err);
                setError("Error: No se encontraron entrevistas anteriormente realizadas. Inténtalo nuevamente.");
                setLoading(false);
            }
        };

        fetchCitas();
    }, [idPadre]);

    // Renderizar el contenido
    return (
        <div className="historial-container">
            <MenuPadres /> {/* Siempre se muestra el menú */}
            {loading ? (
                <p className="loading-text">Cargando datos...</p>
            ) : error ? (
                <p className="error-text">{error}</p>
            ) : (
                <div className="table-container">
                    <h2 className="table-title">HISTORIAL DE CITAS</h2>
                    <table className="historial-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Profesor</th>
                                <th>Materia</th>
                                <th>Hora</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.length > 0 ? (
                                citas.map((cita, index) => (
                                    <tr key={index}>
                                        <td>{cita.fecha}</td>
                                        <td>{cita.profesor}</td>
                                        <td>{cita.materia}</td>
                                        <td>{cita.horafinentrevista ? cita.horafinentrevista : "No especificada"}</td>
                                        <td>{cita.estado}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-citas">
                                        Usted no realizó entrevistas anteriormente.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HistorialEntrevistas;
