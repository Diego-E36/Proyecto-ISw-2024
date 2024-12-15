// Imports
import Table from "../components/Table";
import Search from "../components/Search";
import FormularioEditInventario from "@components/FormularioEditInventario.jsx";
import FormularioCreateInventario from "@components/FormularioCreateInventario.jsx";
import DeleteIcon from "../assets/deleteIcon.svg";
import AddIcon from "../assets/Addicon.svg";
import UpdateIcon from "../assets/updateIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import { useCallback, useState, useMemo } from "react";
import "@styles/inventario.css";
import useCreateInventario from "../hooks/inventario/useCreateInventario";
import useEditInventario from "../hooks/inventario/useEditInventario";
import useDeleteInventario from "../hooks/inventario/useDeleteInventario";
import useGetInventario from "../hooks/inventario/useGetInventario";
import ViewIcon from '../assets/ViewIcon.svg';
import MoneyIcon from '../assets/MoneyIcon.svg';
import ToolIcon from '../assets/HandymanIcon.svg';
import PopupDetailsInventario from "@components/PopupDetailsInventario.jsx";

const Inventario = () => {
    // Obtener inventario
    const { inventario, fetchInventario, setInventario } = useGetInventario();
    const [filterNumeroSerie, setFilterNumeroSerie] = useState("");
    const [materialesFilter, setMaterialesFilter] = useState(null);
    const [isPopupOpenDetails, setIsPopupOpenDetails] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    // Editar inventario
    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataInventario,
        setDataInventario,
    } = useEditInventario(fetchInventario, setInventario);

    // Eliminar inventario
    const { handleDelete } = useDeleteInventario(fetchInventario, setDataInventario);

    // Crear inventario
    const {
        handleCreate,
        isPopupOpenCreate,
        setIsPopupOpenCreate,
    } = useCreateInventario(fetchInventario, setInventario);

    // Función para filtrar por numeroSerie
    const handleIDFilterChange = (e) => {
        setFilterNumeroSerie(e.target.value);
    };

    // Función para seleccionar inventario
    const handleSelectionChange = useCallback((selectedRows) => {
        setDataInventario(selectedRows);
        if (selectedRows.length > 0) {
            setSelectedRow(selectedRows[0]);
            setIsPopupOpenDetails(true);
        } else {
            setSelectedRow(null);
        }
    }, [setDataInventario]);

    const columns = [
        // { title: "ID", field: "id", width: 55, responsive: 0, resizable: false },
        { title: "Número de serie", field: "numeroSerie", width: 200, responsive: 0, resizable: false, vertAlign: "middle"},
        { title: "Nombre", field: "nombreStock", width: 200, responsive: 0, resizable: false, vertAlign: "middle"},
        { title: "Descripción", field: "descripcionUnidad", width: 300, responsive: 0, resizable: false, vertAlign: "middle"},
        { title: "Precio", field: "precioUnidad", width: 200, responsive: 0, resizable: false, vertAlign: "middle"},
        { title: "Marca", field: "marcaUnidad", width: 200, responsive: 0, resizable: false, vertAlign: "middle"},
        { title: "Proveedor", field: "nombre_proveedor", width: 200, responsive: 0, resizable: false, vertAlign: "middle" },
        // { title: "Restock sugerido", field: "restockSugerido", width: 200, responsive: 0, resizable: false },
        { title: "Actualizado", field: "updatedAt", width: 200, responsive: 0, resizable: false, vertAlign: "middle"},
    ];

    // Filtrar inventario según si se trata de un material o no, basándose en el valo del atributo precioUnidad
    const filteredInventario = useMemo(() => {
        return inventario.filter((inventario) => {
            if(materialesFilter === null) return true; //Mostrar todo el inventario.
            if(materialesFilter === 0) return inventario.precioUnidad === "No está a la venta"; // Es material
            if(materialesFilter === 1) return inventario.precioUnidad !== "No está a la venta"; // No es material
            return true;
        })
    }, [inventario, materialesFilter]);

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="top-table">
                    <h1 className="title-table">Inventario</h1>
                    <div className="filter-actions">

                        <button onClick={() => setMaterialesFilter(null)}>
                            <img src={ViewIcon}/>
                            Mostrar todos
                        </button>
                        <button onClick={() => setMaterialesFilter(0)}>
                            <img src={ToolIcon}/>
                            Productos no a la venta
                        </button>
                        <button onClick={() => setMaterialesFilter(1)}>
                            <img src={MoneyIcon}/>
                            Productos a la venta
                        </button>

                        <Search value={filterNumeroSerie} onChange={handleIDFilterChange}
                                placeholder={"Número de serie"}/>
                        <button onClick={() => setIsPopupOpenCreate(true)}>
                            <img src={AddIcon}/>
                        </button>
                        <button onClick={handleClickUpdate} disabled={dataInventario.length === 0}>
                            {dataInventario.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled"/>
                            ) : (
                                <img src={UpdateIcon} alt="edit"/>
                            )}
                        </button>
                        <button className="delete-inventario" disabled={dataInventario.length === 0}
                                onClick={() => handleDelete(dataInventario)}>
                            {dataInventario.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled"/>
                            ) : (
                                <img src={DeleteIcon} alt="delete"/>
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={filteredInventario}
                    columns={columns}
                    filter={filterNumeroSerie}
                    dataToFilter={"numeroSerie"}
                    initialSortName={"id"}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <FormularioCreateInventario show={isPopupOpenCreate} setShow={setIsPopupOpenCreate} action={handleCreate}/>
            <FormularioEditInventario show={isPopupOpen} setShow={setIsPopupOpen} data={dataInventario} action={handleUpdate} />
            {isPopupOpenDetails && selectedRow && (
                                        <PopupDetailsInventario
                                            data={selectedRow}
                                            onClose={() => setIsPopupOpenDetails(false)}
                                        />
                                    )}
        </div>
    )
}

export default Inventario;
