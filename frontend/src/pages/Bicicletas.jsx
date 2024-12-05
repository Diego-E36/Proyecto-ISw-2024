import Table from '../components/Table';
import useBicicletas from '../hooks/bicicletas/useGetBicicletas';
import Search from '../components/Search';
import FormularioEditBicis from '@components/FormularioEditBicis.jsx';
import FormularioCreateBicis from '@components/FormularioCreateBicis.jsx';
import DeleteIcon from '../assets/deleteIcon.svg';
import AddIcon from '../assets/Addicon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/bicicletas.css';
import useCreateBicicleta from '../hooks/bicicletas/useCreateBicicleta';
import useEditBicicleta from "../hooks/bicicletas/useEditBicicleta";
import useDeleteBicicleta from '../hooks/bicicletas/useDeleteBicicleta';

const Bicicletas = () => {
    const { bicicletas, fetchBicicletas, setBicicletas } = useBicicletas();
    const [filterNumeroSerie, setFilterNumeroSerie] = useState('');

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataBicicleta,
        setDataBicicleta
    } = useEditBicicleta(fetchBicicletas, setBicicletas);

    const { handleDelete } = useDeleteBicicleta(fetchBicicletas, setDataBicicleta);

    const { handleCreate,
        isPopupOpenCreate,
        setIsPopupOpenCreate
    } = useCreateBicicleta(fetchBicicletas, setBicicletas);

    const handleNumeroSerieFilterChange = (e) => {
        setFilterNumeroSerie(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedRows) => {
        setDataBicicleta(selectedRows);
    }, [setDataBicicleta]);

    const columns = [
        { title: "ID", field: "id", width: 55, responsive: 0 },
        { title: "Número de Serie", field: "numeroSerie", width: 200, responsive: 0 },
        { title: "Marca", field: "marca", width: 200, responsive: 0 },
        { title: "Modelo", field: "modelo", width: 200, responsive: 0 },
        { title: "Color", field: "color", width: 200, responsive: 0 },
        { title: "Tipo", field: "tipo", width: 200, responsive: 0 },
        { title: "Aro", field: "aro", width: 200, responsive: 0 },
        { title: "Venta", field: "venta", width: 200, responsive: 0 },
    ];

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Bicicletas</h1>
                    <div className='filter-actions'>
                        <Search value={filterNumeroSerie} onChange={handleNumeroSerieFilterChange} placeholder={'Filtrar por número de serie'} />
                        <button className='create-bicicleta' onClick={() => setIsPopupOpenCreate(true)}>
                            <img src={AddIcon}/>
                        </button>
                        <button className='edit-bicicleta' onClick={handleClickUpdate} disabled={dataBicicleta.length === 0}>
                            {dataBicicleta.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button className='delete-bicicleta' disabled={dataBicicleta.length === 0} onClick={() => handleDelete(dataBicicleta)}>
                            {dataBicicleta.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete"/>
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={bicicletas}
                    columns={columns}
                    filter={filterNumeroSerie}
                    dataToFilter={'numeroSerie'}
                    initialSortName={'id'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <FormularioCreateBicis show={isPopupOpenCreate} setShow={setIsPopupOpenCreate} action={handleCreate} />
            <FormularioEditBicis show={isPopupOpen} setShow={setIsPopupOpen} data={dataBicicleta} action={handleUpdate} />
        </div>
    );
};

export default Bicicletas;
