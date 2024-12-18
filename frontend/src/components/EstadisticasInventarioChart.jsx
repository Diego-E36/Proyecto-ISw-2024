"use strict";
//import React from 'react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import useGetNombreYCantidadInventario from '@hooks/estadisticas/useGetNombreYCantidadInventario.jsx';
import useGetInventarioNombreCantidadDia from '@hooks/estadisticas/useGetInventarioNombreCantidadDia.jsx';
import useGetInventarioNombreCantidadMesYear from '@hooks/estadisticas/useGetInventarioNombreCantidadMesYear.jsx';
import useGetInventarioNombreCantidadYear from '@hooks/estadisticas/useGetInventarioNombreCantidadYear.jsx';
import useGetInventarioNombreCantidadUltimosTresMeses from '@hooks/estadisticas/useGetInventarioNombreCantidadUltimosTresMeses.jsx';
import useGetDistribucionProductosPorProveedor from '@hooks/estadisticas/useGetDistribucionProductosPorProveedor.jsx';
import useGetInventarioProveedorDia from '@hooks/estadisticas/useGetInventarioProveedorDia.jsx';
import useGetInventarioProveedorMesYear from '@hooks/estadisticas/useGetInventarioProveedorMesYear.jsx';
import useGetInventarioProveedorYear from '@hooks/estadisticas/useGetInventarioProveedorYear.jsx';
import useGetInventarioProveedorTresMeses from '@hooks/estadisticas/useGetInventarioProveedorTresMeses.jsx';
import useProductosBajoStockYRestockSugerido from '@hooks/estadisticas/useGetProductoBajoStockYRestockSugerido.jsx';
import useGetInventarioBajoStockRestockDia from '@hooks/estadisticas/useGetInventarioBajoStockRestockDia.jsx';
import useGetInventarioBajoStockRestockMesYear from '@hooks/estadisticas/useGetInventarioBajoStockRestockMesYear.jsx';
import useGetInventarioBajoStockRestockYear from '@hooks/estadisticas/useGetInventarioBajoStockRestockYear.jsx';
import useGetInventarioBajoStockRestockUltimosTresMeses from '@hooks/estadisticas/useGetInventarioBajoStockRestockUltimosTresMeses.jsx';
import '@styles/Charts.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {es} from 'date-fns/locale/es';

const BarChartAllNombreCantidadComponent = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 50, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-52} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar 
            dataKey="cantidadStock" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartNombreCantidadDia = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 50, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" angle={-52} textAnchor="end" interval={0} height={100} tick={{ fontSize: 16 }}/>
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartNombreCantidadMesYear = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 50, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" angle={-52} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar
            dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartNombreCantidadYear = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 50, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" angle={-52} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const mesesEspañol = {
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre"
};

const transformarMeses = (data) =>
    data.map((item) => ({
        ...item,
        mes: mesesEspañol[item.mes.trim()] || item.mes.trim() 
    }));


const BarChartNombreCantidadUltimosTresMeses = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos en el inventario para mostrar en el gráfico.
            </div>
        );
    }

    const dataTransformada = transformarMeses(data);

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={dataTransformada} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" angle={-52} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}>
                    <LabelList dataKey="mes" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

const DistribucionProductosPorProveedorChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos por proveedor en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre_proveedor" angle={-52} textAnchor="end" interval={0} height={100} />
            <YAxis allowDataOverflow={true}/>
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartProveedorDia = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos por proveedor en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre_proveedor" angle={-52} textAnchor="end" interval={0} height={100} />
            <YAxis allowDataOverflow={true}/>
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartProveedorMesYear = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos por proveedor en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre_proveedor" angle={-52} textAnchor="end" interval={0} height={100} />
            <YAxis allowDataOverflow={true}/>
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartProveedorYear = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos por proveedor en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre_proveedor" angle={-52} textAnchor="end" interval={0} height={100} />
            <YAxis allowDataOverflow={true}/>
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartProveedorTresMeses = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos por proveedor en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    const dataTransformada = transformarMeses(data);
    return (
        <ResponsiveContainer width="100%" height={490}>
            <BarChart data={dataTransformada} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre_proveedor" angle={-51} textAnchor="end" interval={0} height={100} />
                <YAxis allowDataOverflow={true}/>
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}>
                    <LabelList dataKey="mes" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

const ProductosBajoStockYRestockChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos con bajo stock para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-51} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar 
            dataKey="cantidadStock" 
            fill="#8884d8" 
            name="Bajo Stock" 
            isAnimationActive={true}
            />
            <Bar 
            dataKey="restockSugerido" 
            fill="#82ca9d" 
            name="Restock Sugerido" 
            isAnimationActive={true}
            />
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartBajoStockRestockDia = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos con bajo stock para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-51} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar
            dataKey="cantidadStock"
            fill="#8884d8"
            name="Bajo Stock"
            isAnimationActive={true}
            />
            <Bar
            dataKey="restockSugerido"
            fill="#82ca9d"
            name="Restock Sugerido"
            isAnimationActive={true}
            />
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartBajoStockRestockMesYear = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos con bajo stock para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-51} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar
            dataKey="cantidadStock"
            fill="#8884d8"
            name="Bajo Stock"
            isAnimationActive={true}
            />
            <Bar
            dataKey="restockSugerido"
            fill="#82ca9d"
            name="Restock Sugerido"
            isAnimationActive={true}
            />
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartBajoStockRestockYear = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos con bajo stock para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={490}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-51} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar
            dataKey="cantidadStock"
            fill="#8884d8"
            name="Bajo Stock"
            isAnimationActive={true}
            />
            <Bar
            dataKey="restockSugerido"
            fill="#82ca9d"
            name="Restock Sugerido"
            isAnimationActive={true}
            />
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartBajoStockRestockTresMeses = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos con bajo stock para mostrar en el gráfico.
            </div>
        );
    }
    
    const dataTransformada = transformarMeses(data);

    return (
        <ResponsiveContainer width="100%" height={490}>
            <BarChart data={dataTransformada} margin={{ top: 20, right: 30, left: 40, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="inventario_nombreStock" angle={-51} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="inventario_cantidadStock" fill="#8884d8" name="Bajo Stock" isAnimationActive={true} />
                <Bar dataKey="inventario_restockSugerido" fill="#82ca9d" name="Restock Sugerido" isAnimationActive={true}>
                    <LabelList dataKey="mes" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};


const minDate = new Date(2023, 0, 1); 
const maxDate = new Date();           

const FORMATS = {
    DIA: 'DD/MM/AAAA',
    MESES: 'MM/AAAA',
    YEAR: 'AAAA'
};

const EstadisticasInventarioChart = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterType, setFilterType] = useState('');
    const [dateError, setDateError] = useState('');
    const [inputValue, setInputValue] = useState('');
    const validDate = selectedDate instanceof Date && !isNaN(selectedDate);
    const selectedDay = validDate ? selectedDate.getDate() : null;
    const selectedMonth = validDate ? selectedDate.getMonth() + 1 : null;
    const selectedYear = validDate ? selectedDate.getFullYear() : null;

    const handleDateChange = (date) => {
        if (date === null || !date || isNaN(date)) {
            switch (filterType) {
                case 'Dia':
                    setDateError(`Debes ingresar la fecha en formato ${FORMATS.DIA}`);
                    break;
                case 'Meses':
                    setDateError(`Debes ingresar la fecha en formato ${FORMATS.MESES}`);
                    break;
                case 'Años':
                    setDateError(`Debes ingresar la fecha en formato ${FORMATS.YEAR}`);
                    break;
                default:
                    setDateError('Debes ingresar la fecha');
                    break;
            }
            return;
        }
        setDateError('');
        setSelectedDate(date);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const dateParts = inputValue.split('/').map(part => parseInt(part, 10));
            
            if (dateParts.length === 3) {
                const [day, month, year] = dateParts;
    
                if (day < 1 || day > 31) {
                    setDateError('El día debe estar entre 1 y 31.');
                    return;
                }
                if (month < 1 || month > 12) {
                    setDateError('El mes debe estar entre 1 y 12.');
                    return;
                }
                if (year < 2023 || year > new Date().getFullYear()) {
                    setDateError('El año debe estar entre 2023 y el año actual.');
                    return;
                }
    
                const futuro = new Date(year, month - 1, day);
                const today = new Date();
    
                if (futuro > today) {
                    setDateError('La fecha no puede ser mayor a la fecha actual.');
                    return;
                }

                setSelectedDate(futuro);
                setDateError('');
            } 
            else {
                setDateError('Formato de fecha incorrecto.');
            }
        }
    };
    

    const { inventario, loading: loadingInventario, error: errorInventario } = useGetNombreYCantidadInventario();
    const { inventarioNombreCantidadDia, loading: loadingInventarioNombreCantidadDia, error: errorInventarioNombreCantidadDia } = useGetInventarioNombreCantidadDia(selectedDay, selectedMonth, selectedYear);
    const { inventarioNombreCantidadMesYear, loading: loadingInventarioNombreCantidadMesYear, error: errorInventarioNombreCantidadMesYear } = useGetInventarioNombreCantidadMesYear(selectedMonth, selectedYear);
    const { inventarioNombreCantidadYear, loading: loadingInventarioNombreCantidadYear, error: errorInventarioNombreCantidadYear } = useGetInventarioNombreCantidadYear(selectedYear);
    const { inventarioNombreCantidadUltimosTresMeses, loading: loadingInventarioNombreCantidadUltimosTresMeses, error: errorInventarioNombreCantidadUltimosTresMeses } = useGetInventarioNombreCantidadUltimosTresMeses();
    const { distribucion, loading: loadingDistribucion, error: errorDistribucion } = useGetDistribucionProductosPorProveedor();
    const { inventarioProveedorDia, loading: loadingInventarioProveedorDia, error: errorInventarioProveedorDia } = useGetInventarioProveedorDia(selectedDay, selectedMonth, selectedYear);
    const { inventarioProveedorMesYear, loading: loadingInventarioProveedorMesYear, error: errorInventarioProveedorMesYear } = useGetInventarioProveedorMesYear(selectedMonth, selectedYear);
    const { inventarioProveedorYear, loading: loadingInventarioProveedorYear, error: errorInventarioProveedorYear } = useGetInventarioProveedorYear(selectedYear);
    const { inventarioProveedorTresMeses, loading: loadingInventarioProveedorTresMeses, error: errorInventarioProveedorTresMeses } = useGetInventarioProveedorTresMeses();
    const { productos, loading: loadingProductos, error: errorProductos } = useProductosBajoStockYRestockSugerido();
    const { inventarioBajoStockRestockDia, loading: loadingInventarioBajoStockRestockDia, error: errorInventarioBajoStockRestockDia } = useGetInventarioBajoStockRestockDia(selectedDay, selectedMonth, selectedYear);
    const { inventarioBajoStockRestockMesYear, loading: loadingInventarioBajoStockRestockMesYear, error: errorInventarioBajoStockRestockMesYear } = useGetInventarioBajoStockRestockMesYear(selectedMonth, selectedYear);
    const { inventarioBajoStockRestockYear, loading: loadingInventarioBajoStockRestockYear, error: errorInventarioBajoStockRestockYear } = useGetInventarioBajoStockRestockYear(selectedYear);
    const { inventarioBajoStockRestockUltimosTresMeses, loading: loadingInventarioBajoStockRestockUltimosTresMeses, error: errorInventarioBajoStockRestockUltimosTresMeses } = useGetInventarioBajoStockRestockUltimosTresMeses();

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
        setDateError('');
    };

    if (loadingInventario || loadingInventarioNombreCantidadDia || loadingInventarioNombreCantidadMesYear || loadingInventarioNombreCantidadYear || loadingInventarioNombreCantidadUltimosTresMeses 
        ||loadingDistribucion || loadingInventarioProveedorDia || loadingInventarioProveedorMesYear || loadingInventarioProveedorYear || loadingInventarioProveedorTresMeses 
        || loadingProductos|| loadingInventarioBajoStockRestockDia || loadingInventarioBajoStockRestockMesYear || loadingInventarioBajoStockRestockYear || loadingInventarioBajoStockRestockUltimosTresMeses) return <p>Cargando...</p>;
    if (errorInventario) return <p>Error al cargar las estadísticas del inventario: {errorInventario.message}</p>;
    if (errorInventarioNombreCantidadDia) return <p>Error al cargar las estadísticas del inventario con nombre y cantidad por día: {errorInventarioNombreCantidadDia.message}</p>;
    if (errorInventarioNombreCantidadMesYear) return <p>Error al cargar las estadísticas del inventario con nombre y cantidad por mes y año: {errorInventarioNombreCantidadMesYear.message}</p>;
    if (errorInventarioNombreCantidadYear) return <p>Error al cargar las estadísticas del inventario con nombre y cantidad por año: {errorInventarioNombreCantidadYear.message}</p>;
    if (errorInventarioNombreCantidadUltimosTresMeses) return <p>Error al cargar las estadísticas del inventario con nombre y cantidad de los últimos 3 meses: {errorInventarioNombreCantidadUltimosTresMeses.message}</p>;
    if (errorDistribucion) return <p>Error al cargar la distribución de productos por proveedor: {errorDistribucion.message}</p>;
    if (errorInventarioProveedorDia) return <p>Error al cargar las estadísticas del inventario por proveedor por día: {errorInventarioProveedorDia.message}</p>;
    if (errorInventarioProveedorMesYear) return <p>Error al cargar las estadísticas del inventario por proveedor por mes y año: {errorInventarioProveedorMesYear.message}</p>
    if (errorInventarioProveedorYear) return <p>Error al cargar las estadísticas del inventario por proveedor por año: {errorInventarioProveedorYear.message}</p>;
    if (errorInventarioProveedorTresMeses) return <p>Error al cargar las estadísticas del inventario por proveedor de los últimos 3 meses: {errorInventarioProveedorTresMeses.message}</p>;
    if (errorProductos) return <p>Error al cargar los productos con bajo stock y restock sugerido: {errorProductos.message}</p>;
    if (errorInventarioBajoStockRestockDia) return <p>Error al cargar las estadísticas del inventario con bajo stock y restock sugerido por día: {errorInventarioBajoStockRestockDia.message}</p>;
    if (errorInventarioBajoStockRestockMesYear) return <p>Error al cargar las estadísticas del inventario con bajo stock y restock sugerido por mes y año: {errorInventarioBajoStockRestockMesYear.message}</p>;
    if (errorInventarioBajoStockRestockYear) return <p>Error al cargar las estadísticas del inventario con bajo stock y restock sugerido por año: {errorInventarioBajoStockRestockYear.message}</p>;
    if (errorInventarioBajoStockRestockUltimosTresMeses) return <p>Error al cargar las estadísticas del inventario con bajo stock y restock sugerido de los últimos 3 meses: {errorInventarioBajoStockRestockUltimosTresMeses.message}</p>;

    const renderNombreCantidadChart = () => {
        if (filterType === 'Meses') {
            return <BarChartNombreCantidadMesYear data={inventarioNombreCantidadMesYear} />;
        }else if (filterType === 'Años') {
            return <BarChartNombreCantidadYear data={inventarioNombreCantidadYear} />;
        }else if (filterType === 'TresMeses') {
            return <BarChartNombreCantidadUltimosTresMeses data={inventarioNombreCantidadUltimosTresMeses} />;
        }else if (filterType === 'Dia') {
            return <BarChartNombreCantidadDia data={inventarioNombreCantidadDia} />;
        }
        return <BarChartAllNombreCantidadComponent data={inventario} />;
    };

    const renderProveedorChart = () => {
        if (filterType === 'Meses') {
            return <BarChartProveedorMesYear data={inventarioProveedorMesYear} />;
        }else if (filterType === 'Year') {
            return <BarChartProveedorYear data={inventarioProveedorYear} />;
        }else if (filterType === 'TresMeses') {
            return <BarChartProveedorTresMeses data={inventarioProveedorTresMeses} />;
        }else if (filterType === 'Dia') {
            return <BarChartProveedorDia data={inventarioProveedorDia} />;
        }
        return <DistribucionProductosPorProveedorChart data={distribucion} />;
    };

    const renderBajoStockRestockChart = () => {
        if (filterType === 'Meses') {
            return <BarChartBajoStockRestockMesYear data={inventarioBajoStockRestockMesYear} />;
        }else if (filterType === 'Años') {
            return <BarChartBajoStockRestockYear data={inventarioBajoStockRestockYear} />;
        }else if (filterType === 'TresMeses') {
            return <BarChartBajoStockRestockTresMeses data={inventarioBajoStockRestockUltimosTresMeses} />;
        }else if (filterType === 'Dia') {
            return <BarChartBajoStockRestockDia data={inventarioBajoStockRestockDia} />;
        }
        return <ProductosBajoStockYRestockChart data={productos} />;
    };

    return (
        <div>
            <h1 className="title-table2">Estadísticas del Inventario</h1>
            <p>Seleccione un filtro para ver las estadísticas correspondientes.</p>
        
            <div className="selectors-container">
                <select
                    className="filter-selector"
                    value={filterType}
                    onChange={handleFilterChange}
                >
                    <option value="">Seleccionar filtro</option>
                    <option value="Dia">Filtrar por Día</option>
                    <option value="Meses">Filtrar por Meses</option>
                    <option value="Años">Filtrar por Año</option>
                    <option value="TresMeses">Filtrar por Últimos tres Meses</option>
                </select>

            {filterType === 'Dia' && (
            <div className="datepicker-container">
                <DatePicker
                    className="day-selector"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    onKeyDown={handleKeyDown}
                    dateFormat="dd/MM/yyyy"
                    locale={es}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText='DD/MM/AAAA'
                    value={inputValue}
                    onChangeRaw={handleInputChange}
                />
                {dateError && <p className="error-message">{dateError}</p>}
            </div>
            )}
            {filterType === 'Meses' && (
            <div className="datepicker-container">
                <DatePicker
                    className="month-selector"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    onKeyDown={handleKeyDown}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    locale={es}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText='MM/AAAA'
                    onChangeRaw={handleInputChange}
                />
                {dateError && <p className="error-message">{dateError}</p>}
            </div>
            )}
            {filterType === 'Años' && (
            <div className="datepicker-container">
                <DatePicker
                    className="year-selector"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    onKeyDown={handleKeyDown}
                    dateFormat="yyyy"
                    showYearPicker
                    locale={es}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText='AAAA'
                    onChangeRaw={handleInputChange}
                />
                {dateError && <p className="error-message">{dateError}</p>}
            </div>
            )}
            </div>
            <div className="App-inventario">
                <div className="dataCard revenueCard">
                    <h2 style={{ textAlign: 'center' }}>Gráfico de Stock de Inventario</h2>
                    {renderNombreCantidadChart()}
                </div>
                <div className="dataCard customerCard">
                    <h2 style={{ textAlign: 'center' }}>Distribución por Proveedor</h2>
                    {renderProveedorChart()}
                </div>
                <div className="dataCard categoryCard">
                    <h2 style={{ textAlign: 'center' }}>Bajo Stock y Restock Sugerido</h2>
                    {renderBajoStockRestockChart()}
                </div>
            </div>
        </div>
    );
};

export default EstadisticasInventarioChart;