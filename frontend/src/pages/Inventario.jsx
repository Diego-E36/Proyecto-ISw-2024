import Table from '@components/Table';
import useInventario from '@hooks/inventario/useGetInventario.jsx';
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/inventario.css';
import useEditInventario from '@hooks/inventario/useEditInventario';
import useDeleteInventario from '@hooks/inventario/useDeleteInventario';

const inventario = () => {
    const { inventario, fetchInventario, setInventario } = useInventario();
    const [filternumSerie, setFilternumSerie] = useState('');

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataInventario,
        setDataInventario
    } = useEditInventario(setInventario);

    const { handleDelete } = useDeleteInventario(fetchInventario, setDataInventario);

    const handlenumSerieFilterChange = (e) => {
        setFilternumSerie(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedInventario) => {
        setDataInventario(selectedInventario);
    }, [setDataInventario]);

    const columns = [
        { title: "Numero de Serie", field: "numeroSerie", width: 200, responsive: 0 },
        { title: "Nombre", field: "nombreStock", width: 350, responsive: 0 },
        { title: "Cantidad", field: "cantidadStock", width: 150, responsive: 3 },
        { title: "Color", field: "colorUnidad", width: 150, responsive: 2 },
        { title: "Precio", field: "precioUnidad", width: 200, responsive: 2 },
        { title: "Marca", field: "marcaUnidad", width: 200, responsive: 2 },
        { title: "Creado", field: "createdAt", width: 200, responsive: 2 },
        { title: "Actualizado", field: "updatedAt", width: 200, responsive: 2 }
    ];

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Inventario</h1>
                    <div className='filter-actions'>
                        <Search value={filternumSerie} onChange={handlenumSerieFilterChange} placeholder={'Filtrar por numero de serie'} />
                        <button onClick={handleClickUpdate} disabled={dataInventario.length === 0}>
                            {dataInventario.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button className='delete-user-button' disabled={dataInventario.length === 0} onClick={() => handleDelete(dataInventario)}>
                            {dataInventario.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={inventario}
                    columns={columns}
                    filter={filternumSerie}
                    dataToFilter={'numeroSerie'}
                    initialSortName={'nombreStock'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <Popup
                show={isPopupOpen}
                setShow={setIsPopupOpen}
                data={dataInventario}
                action={handleUpdate}
            />
        </div>
    );
};

export default inventario;