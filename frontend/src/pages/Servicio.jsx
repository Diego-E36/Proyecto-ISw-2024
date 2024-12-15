import { useState, useCallback } from 'react';
import Table from '@components/Table.jsx';
import AddIcon from '../assets/Addicon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import Search from '@components/Search.jsx';
import FormularioCreateServicio from '@components/FormularioCreateServicio.jsx';
import FormularioEditServicio from '@components/FormularioEditServicio.jsx';
import useGetServicios from '../hooks/servicios/useGetServicio';
import useCreateServicios from '../hooks/servicios/useCreateServicio';
import useEditServicios from '../hooks/servicios/useUpdateServicio';
import '@styles/servicio.css';
import PopupDetailsServicios from "@components/PopupDetailsServicios.jsx";

const Servicios = () => {
    const { servicios, fetchServicios, setServicios } = useGetServicios();
    const [filterRut, setFilterRut] = useState('');
    const [selectedRow, setSelectedRow] = useState(null); // Estado para la fila seleccionada
    const [isPopupOpenDetails, setIsPopupOpenDetails] = useState(false); // Estado del popup de detalles

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataServicio,
        setDataServicio
    } = useEditServicios(fetchServicios, setServicios);

    const {
        handleCreate,
        isPopupOpenCreate,
        setIsPopupOpenCreate
    } = useCreateServicios(fetchServicios, setServicios);

    const handleRutFilterChange = (e) => {
        setFilterRut(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedRows) => {
        setDataServicio(selectedRows);
        if (selectedRows.length > 0) {
            setSelectedRow(selectedRows[0]); // Guardar los datos de la fila seleccionada
            setIsPopupOpenDetails(true); // Mostrar el popup con los detalles
        } else {
            setSelectedRow(null);
        }
    }, [setDataServicio]);

    const columns = [
        { title: "RUT", field: "rut", width: 208, responsive: 0 , rezisable: false, vertAlign: "middle"},
        { title: "Bicicleta", field: "bicicleta", width: 300, responsive: 0 , rezisable: false, vertAlign: "middle"},
        { title: "Estado", field: "estado", width: 300, responsive: 0 , rezisable: false, vertAlign: "middle"},
        { title: "Cantidad Usada", field: "cantidad", width: 200, responsive: 0 , rezisable: false, vertAlign: "middle"},
        { title: "Creada", field: "createdAt", width: 200, responsive: 0 , rezisable: false, vertAlign: "middle"},
        { title: "Actualizada", field: "updatedAt", width: 200, responsive: 0 , rezisable: false, vertAlign: "middle"},
    ];

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Servicios</h1>
                    <div className='filter-actions'>
                        <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'RUT de usuario'} />
                        <button onClick={() => setIsPopupOpenCreate(true)}>
                            <img src={AddIcon} alt="Add" />
                        </button>
                        <button
                            className='edit-servicio'
                            onClick={handleClickUpdate}
                            disabled={dataServicio.length === 0}
                        >
                            {dataServicio.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={servicios}
                    columns={columns}
                    filter={filterRut}
                    dataToFilter={'rut'}
                    initialSortName={'id'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <FormularioCreateServicio show={isPopupOpenCreate} setShow={setIsPopupOpenCreate} action={handleCreate} />
            <FormularioEditServicio show={isPopupOpen} setShow={setIsPopupOpen} data={dataServicio} action={handleUpdate} />
            {isPopupOpenDetails && selectedRow && (
                <PopupDetailsServicios
                    data={selectedRow}
                    onClose={() => setIsPopupOpenDetails(false)}
                />
            )}
        </div>
    );
};

export default Servicios;
