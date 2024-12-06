import Table from '../components/Table';
import Search from '../components/Search';
import { useCallback, useState } from 'react';


import DeleteIcon from '../assets/deleteIcon.svg';
import AddIcon from '../assets/Addicon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';


import useGetNotificacion from '../hooks/notificaciones/useGetNotificacion';
import useDeleteNotificacion from '../hooks/notificaciones/useDeleteNotificacion';




import '@styles/NotificationTable.css';



const Notificaciones = () => {
    const { notificaciones, fetchNotificaciones, setNotificaciones } = useGetNotificacion();

    const { handleDelete } = useDeleteNotificacion(fetchNotificaciones, setNotificaciones);

    const [filterId, setFilterId] = useState('');

    const columns = [
        { title: "ID", field: "id", width: 100, responsive: 0 },
        { title: "Mensaje", field: "message", width: 650, responsive: 0 },
        { title: "Estado", field: "status", width: 100, responsive: 0 },
        { title: "Mensaje", field: "notificationType", width: 100, responsive: 0 },
        { title: "Mensaje", field: "createdAt", width: 250, responsive: 0 },
    ]

    const handleIdFilterChange = (e) => {
        setFilterId(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedRows) => {
        notificaciones(selectedRows);
    }, [notificaciones]);

    return (

        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Notificaciones</h1>
                    <div className='filter-actions'>
                        <Search value={filterId} onChange={handleIdFilterChange} placeholder={'Filtrar por número de serie'} />

                        
                        <button className='delete-notificacion' disabled={notificaciones.length === 0} onClick={() => handleDelete(notificaciones)}>
                            {notificaciones.length === 0 ? (
                            <img src={DeleteIconDisable} alt="delete-disabled" />
                                ) : (
                                <img src={DeleteIcon} alt="delete"/>
                            )}
                        </button>

                    </div>
                </div>
            <Table
            data={notificaciones}
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


