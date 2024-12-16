// Imports
import Table from '../components/Table';
import Search from '../components/Search';
import FormularioEditProveedores from '@components/FormularioEditProveedores.jsx';
import FormularioCreateProveedores from '@components/FormularioCreateProveedores.jsx';
import DeleteIcon from '../assets/deleteIcon.svg';
import AddIcon from '../assets/Addicon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/proveedores.css';
import useCreateProveedores from '../hooks/proveedores/useCreateProveedores';
import useEditProveedores from "../hooks/proveedores/useEditProveedores";
import useDeleteProveedores from '../hooks/proveedores/useDeleteProveedores';
import useGetProveedores from '../hooks/proveedores/useGetProveedores';

const Proveedores = () => {
    // Obtener proveedores
    const { proveedores, fetchProveedores, setProveedores } = useGetProveedores();
    const [filterRut, setFilterRut] = useState('');

    // Editar proveedor
    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProveedor,
        setDataProveedor
    } = useEditProveedores(fetchProveedores, setProveedores);

    // Eliminar proveedor
    const { handleDelete } = useDeleteProveedores(fetchProveedores, setDataProveedor);

    // Crear proveedor
    const {
        handleCreate,
        isPopupOpenCreate,
        setIsPopupOpenCreate
    } = useCreateProveedores(fetchProveedores, setProveedores);

    // Función para filtrar por rut
    const handleRutFilterChange = (e) => {
        setFilterRut(e.target.value);
    }

    // Función para seleccionar proveedor
    const handleSelectionChange = useCallback((selectedRows) => {
        setDataProveedor(selectedRows);
    }, [setDataProveedor]);

    const columns = [
        // { title: "ID", field: "id", width: 55, responsive: 0, resizable: false},
        { title: "RUT", field: "rut", width: 200, responsive: 0, resizable: false, vertAlign: "middle"},
        { title: "Nombre", field: "nombre", width: 250, responsive: 0, resizable: false, vertAlign: "middle"},
        { title: "Email", field: "email", width: 306, responsive: 0, resizable: false, vertAlign: "middle"},
        { title: "Teléfono", field: "telefono", width: 250, responsive: 0, resizable: false, vertAlign: "middle"},
        { title: "Actualizado", field: "updatedAt", width: 200, responsive: 0, resizable: false, vertAlign: "middle"},
    ];

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Proveedores</h1>
                    <div className='filter-actions'>
                        <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'RUT'} />
                        <button className='create-proveedor' onClick={() => setIsPopupOpenCreate(true)}>
                            <img src={AddIcon}/>
                        </button>
                        <button className='edit-proveedor' onClick={handleClickUpdate} disabled={dataProveedor.length === 0}>
                            {dataProveedor.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button className='delete-proveedor' disabled = {dataProveedor.length === 0} onClick = {() => handleDelete(dataProveedor)}>
                            {dataProveedor.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete"/>
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={proveedores}
                    columns={columns}
                    filter={filterRut}
                    dataToFilter={'rut'}
                    initialSortName={'id'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <FormularioCreateProveedores show={isPopupOpenCreate} setShow={setIsPopupOpenCreate} action={handleCreate} />
            <FormularioEditProveedores show={isPopupOpen} setShow={setIsPopupOpen} data={dataProveedor} action={handleUpdate} />
        </div>
    )
}

export default Proveedores;
