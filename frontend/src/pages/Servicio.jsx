import Table from '../components/Table';
import { useCallback, useState } from 'react';
import AddIcon from '../assets/Addicon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import Search from '../components/Search';
import FormularioCreateServicio from '@components/FormularioCreateServicio.jsx';
import FormularioEditServicio from '@components/FormularioEditServicio.jsx';
import useGetServicios from '../hooks/servicios/useGetServicio';
import useCreateServicios from '../hooks/servicios/useCreateServicio';
import useEditServicios from '../hooks/servicios/useUpdateServicio';
import '@styles/servicio.css';

const Servicios = () => {

    const { servicios, fetchServicios, setServicios } = useGetServicios();

    const [filterRut, setFilterRut] = useState('');

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

    const columns = [
        { title: "ID", field: "id", width: 55, responsive: 0 , rezisable: false },
        { title: "Rut", field: "rut", width: 150, responsive: 0 , rezisable: false },
        { title: "Item", field: "item", width: 150, responsive: 0 , rezisable: false },
        { title: "Bicicleta", field: "bicicleta", width: 150, responsive: 0 , rezisable: false },
        { title: "Tipo", field: "tipo", width: 150, responsive: 0 , rezisable: false },
        { title: "Estado", field: "estado", width: 150, responsive: 0 , rezisable: false },
        { title: "Valor", field: "valor", width: 150, responsive: 0 , rezisable: false },
        { title: "Descripción", field: "descripcion", width: 150, responsive: 0 , rezisable: false },
        { title: "Duración", field: "duracionMins", width: 150, responsive: 0 , rezisable: false },
        { title: "Creada", field: "createdAt", width: 150, responsive: 0 , rezisable: false },
        { title: "Actualizada", field: "updatedAt", width: 150, responsive: 0 , rezisable: false },
    ];

    const handleSelectionChange = useCallback((selectedRows) => {
        setDataServicio(selectedRows);
    }, [setDataServicio]);


    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Servicios</h1>
                    <div className='filter-actions'>
                    <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
                        <button onClick={() => setIsPopupOpenCreate(true)}>
                            <img src={AddIcon}/>
                        </button>

                        <button className='edit-servicio' onClick={handleClickUpdate} disabled={dataServicio.length === 0}>
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
        </div>
    );
};

export default Servicios;

