import Table from '../components/Table';

import { useCallback, useState } from 'react';

import DeleteIcon from '../assets/deleteIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';

import useGetNotificacion from '../hooks/notificaciones/useGetNotificacion';
import useDeleteNotificacion from '../hooks/notificaciones/useDeleteNotificacion';
import useGetUnreadNotificacion from '../hooks/notificaciones/useGetUnreadNotificacion';
import useMarkAsReadNotificacion from '../hooks/notificaciones/useMarkAsRead';

const Notificaciones = () => {
    const { notificaciones, fetchNotificaciones, setNotificaciones } = useGetNotificacion();
    const { handleDelete } = useDeleteNotificacion(fetchNotificaciones, setNotificaciones);

    const { unreadNotificaciones, fetchUnreadNotificaciones } = useGetUnreadNotificacion();
    const { handleMarkAsRead, isLoading } = useMarkAsReadNotificacion();

    const [filterId] = useState('');
    const [showUnread, setShowUnread] = useState(false);
    const [selectedNotificaciones, setSelectedNotificaciones] = useState([]);

    const columns = [
        { title: "ID", field: "id", width: 100, responsive: 0, resizable: false },
        { title: "Mensaje", field: "message", width: 650, responsive: 0, resizable: false },
        { title: "Estado", field: "status", width: 150, responsive: 0, resizable: false },
        { title: "Creado", field: "createdAt", width: 300, responsive: 0, resizable: false },
    ];

    const handleShowUnread = async () => {
        setShowUnread(true);
        await fetchUnreadNotificaciones(); // Llama a la función que obtiene las no leídas
    };

    const handleShowAll = async () => {
        setShowUnread(false);
        await fetchNotificaciones(); // Restaura todas las notificaciones
    };

    const handleSelectionChange = useCallback(
        (selectedRows) => {
            setSelectedNotificaciones(selectedRows);
        },
        []
    );

    const handleMarkSelectedAsRead = async () => {
        for (const notificacion of selectedNotificaciones) {
            const success = await handleMarkAsRead(notificacion.id);
            if (success) {
                // Actualiza las notificaciones después de marcarlas como leídas
                if (showUnread) {
                    fetchUnreadNotificaciones();
                } else {
                    fetchNotificaciones();
                }
            }
        }
        setSelectedNotificaciones([]); // Limpia la selección
    };

    const displayedData = showUnread ? unreadNotificaciones : notificaciones;

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Notificaciones</h1>
                    <div className='filter-actions'>
                        <button onClick={handleShowUnread} disabled={showUnread} className='unread-button'>
                            Mostrar no leídas
                        </button>
                        <button onClick={handleShowAll} disabled={!showUnread} className='all-button'>
                            Mostrar todas
                        </button>
                        <button
                            onClick={handleMarkSelectedAsRead}
                            disabled={selectedNotificaciones.length === 0 || isLoading}
                            className='mark-read-button'
                        >
                            {isLoading ? "Cargando..." : "Marcar como leídas"}
                        </button>
                        <button
                            className='delete-notificacion'
                            disabled={notificaciones.length === 0}
                            onClick={() => handleDelete(notificaciones)}
                        >
                            {notificaciones.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={displayedData}
                    columns={columns}
                    filter={filterId}
                    dataToFilter={''}
                    initialSortName={'id'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
        </div>
    );
};

export default Notificaciones;
