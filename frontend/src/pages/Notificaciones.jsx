import { useState, useEffect } from 'react';
import { getAllNotificaciones, deleteNotificacion } from '@services/notificaciones.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';


import '@styles/NotificationTable.css';

// Componente para una notificación individual como fila de la tabla
const NotificacionRow = ({ id, message, status, notificationType, createdAt, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await deleteNotificacion(id); // Llama al servicio para eliminar
            if (result.success) {
                onDeleteSuccess(id);
                showSuccessAlert('¡Eliminado!','La notificación ha sido eliminada correctamente.'); // Actualiza la lista en la tabla
            } else {
                throw new Error(result.message || 'Error al eliminar la notificación');
            }
        } catch (err) {
            setError(err.message || 'Error inesperado');
        } finally {
            setLoading(false); // Detiene el indicador de carga
        }
    };

    return (
        <tr>
            <td>{id}</td>
            <td>{message}</td>
            <td>{status}</td>
            <td>{notificationType}</td>
            <td>{createdAt}</td>
            <td>
                <delete_button onClick={handleDelete} disabled={loading}>
                    {loading ? 'Eliminando...' : 'Eliminar'}
                </delete_button>
            </td>
            {error && (
                <td style={{ color: 'red' }} colSpan="2">
                    Error: {error}
                </td>
            )}
        </tr>
    );
};

const NotificacionesTable = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotificaciones = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getAllNotificaciones();
                if (result.success) {
                    setNotificaciones(result.data);
                } else {
                    throw new Error(result.message || 'Error al cargar las notificaciones');
                }
            } catch (err) {
                setError(err.message || 'Error inesperado');
            } finally {
                setLoading(false);
            }
        };

        fetchNotificaciones();
    }, []);

    const handleDeleteSuccess = (id) => {
        setNotificaciones((prevNotificaciones) =>
            prevNotificaciones.filter((notificacion) => notificacion.id !== id)
        );
    };

    if (loading) return <p>Cargando notificaciones...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (

        <div className="notification-container">
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Mensaje</th>
                        <th>Status</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {notificaciones.map((notificacion) => (
                        <NotificacionRow
                            key={notificacion.id}
                            id={notificacion.id}
                            message={notificacion.message}
                            status={notificacion.status}
                            notificationType={notificacion.notificationType}
                            createdAt={notificacion.createdAt}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NotificacionesTable;