import Table from '../components/Table';

import {  useCallback, useMemo, useState } from 'react';

import DeleteIcon from '../assets/deleteIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';

import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";

import useGetNotificacion from '../hooks/notificaciones/useGetNotificacion';
import useDeleteNotificacion from '../hooks/notificaciones/useDeleteNotificacion';
import useMarkAsReadNotificacion from '../hooks/notificaciones/useMarkAsRead';

import '@styles/notificaciones.css';



const Notificaciones = () => {
    const { notificaciones, fetchNotificaciones, setNotificaciones } = useGetNotificacion();
    const [ notificacionesFilter, setnotificacionesFilter ] = useState(null);

    const {
        handleMarkAsRead,
        dataNotificaciones,
        setDataNotificaciones,
    } = useMarkAsReadNotificacion(fetchNotificaciones, setNotificaciones);

    const { handleDelete } = useDeleteNotificacion(fetchNotificaciones, setDataNotificaciones);

    const columns = [
        { title: "Mensaje", field: "message", width: 756, responsive: 0, resizable: false, vertAlign: "middle", headerSort: false},
        { title: "Estado", field: "status", width: 150, responsive: 0, resizable: false, vertAlign: "middle", headerSort: false},
        { title: "Creado", field: "createdAt", width: 300, responsive: 0, resizable: false, vertAlign: "middle"},
    ];

    const handleSelectionChange = useCallback((selectedRows) => {
            setDataNotificaciones(selectedRows);
        }, [setDataNotificaciones]
    );

    const filteresNotificaciones = useMemo(() => {
        return notificaciones.filter((notificaciones) => {
            if(notificacionesFilter === null) return true;
            if(notificacionesFilter === 0) return notificaciones.status === "No leído";
            return true;
        })
    }, [notificaciones, notificacionesFilter]);

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Notificaciones</h1>
                    <div className='filter-actions'>
                        <button onClick={() => setnotificacionesFilter(null)}>
                            Mostrar todos
                        </button>
                        <button onClick={() => setnotificacionesFilter(0)}>
                            Mostrar no leídas
                        </button>
                        <button onClick={handleMarkAsRead} disabled={dataNotificaciones.length === 0}>
                            {dataNotificaciones.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled"/>
                            ) : (
                                <img src={UpdateIcon} alt="edit"/>
                            )}
                        </button>
                        <button className='delete-notificacion' disabled={dataNotificaciones.length === 0}
                            onClick={() => handleDelete(dataNotificaciones)}>
                            {dataNotificaciones.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={filteresNotificaciones}
                    columns={columns}
                    filter={""}
                    dataToFilter={"id"}
                    initialSortName={'id'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
        </div>
    );
};

export default Notificaciones;