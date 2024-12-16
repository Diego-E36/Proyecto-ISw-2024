"use strict";
//import React from 'react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import useGetNombreYCantidadInventario from '@hooks/estadisticas/useGetNombreYCantidadInventario.jsx';
import useGetInventarioNombreCantidadMesYear from '@hooks/estadisticas/useGetInventarioNombreCantidadMesYear.jsx';
import useGetInventarioNombreCantidadYear from '@hooks/estadisticas/useGetInventarioNombreCantidadYear.jsx';
import useGetInventarioNombreCantidadUltimosTresMeses from '@hooks/estadisticas/useGetInventarioNombreCantidadUltimosTresMeses.jsx';
import useGetDistribucionProductosPorProveedor from '@hooks/estadisticas/useGetDistribucionProductosPorProveedor.jsx';
import useGetInventarioProveedorMesYear from '@hooks/estadisticas/useGetInventarioProveedorMesYear.jsx';
import useGetInventarioProveedorYear from '@hooks/estadisticas/useGetInventarioProveedorYear.jsx';
import useGetInventarioProveedorTresMeses from '@hooks/estadisticas/useGetInventarioProveedorTresMeses.jsx';
import useProductosBajoStockYRestockSugerido from '@hooks/estadisticas/useGetProductoBajoStockYRestockSugerido.jsx';
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
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-40} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar 
            dataKey="cantidadStock" fill="#8884d8" isAnimationActive={true}/>
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
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" angle={-40} textAnchor="end" interval={0} height={100} />
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
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" angle={-40} textAnchor="end" interval={0} height={100} />
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
        mes: mesesEspañol[item.mes.trim()] || item.mes.trim() // Traducir los meses
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
                <XAxis dataKey="nombre" angle={-40} textAnchor="end" interval={0} height={100} />
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
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre_proveedor" angle={-40} textAnchor="end" interval={0} height={100} />
            <YAxis />
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
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre_proveedor" angle={-40} textAnchor="end" interval={0} height={100} />
            <YAxis />
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
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre_proveedor" angle={-40} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartProveedorTresMeses = ({ data }) => {
    console.log("Datos recibidos 3 meses prov:", data); // Depuración
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos por proveedor en el inventario para mostrar en el gráfico.
            </div>
        );
    }
    const dataTransformada = transformarMeses(data);
    console.log("Datos transformados:", dataTransformada); // Depuración
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={dataTransformada} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre_proveedor" angle={-40} textAnchor="end" interval={0} height={100} />
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

const ProductosBajoStockYRestockChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos con bajo stock para mostrar en el gráfico.
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-40} textAnchor="end" interval={0} height={100} />
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
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-40} textAnchor="end" interval={0} height={100} />
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
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-40} textAnchor="end" interval={0} height={100} />
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
    console.log("Datos recibidos 3 meses bajostock:", data); // Depuración
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay productos con bajo stock para mostrar en el gráfico.
            </div>
        );
    }
    
    const dataTransformada = transformarMeses(data);

    console.log("Datos transformados 3 meses bajostock:", dataTransformada); // Depuración

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={dataTransformada} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="inventario_nombreStock" angle={-40} textAnchor="end" interval={0} height={100} />
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



const EstadisticasInventarioChart = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterType, setFilterType] = useState('');

    // Verifica si selectedDate es válido; si no, usa una fecha por defecto.
    const validDate = selectedDate instanceof Date && !isNaN(selectedDate);
    const selectedMonth = validDate ? selectedDate.getMonth() + 1 : null;
    const selectedYear = validDate ? selectedDate.getFullYear() : null;

    const handleDateChange = (date) => {
        // Asegúrate de que `date` es una instancia válida de Date
        if (date && date instanceof Date && !isNaN(date)) {
            setSelectedDate(date);
        } else {
            setSelectedDate(null); // O algún otro valor por defecto, según la lógica de tu aplicación
        }
    };
    const { inventario, loading: loadingInventario, error: errorInventario } = useGetNombreYCantidadInventario();
    const { inventarioNombreCantidadMesYear, loading: loadingInventarioNombreCantidadMesYear, error: errorInventarioNombreCantidadMesYear } = useGetInventarioNombreCantidadMesYear(selectedMonth, selectedYear);
    const { inventarioNombreCantidadYear, loading: loadingInventarioNombreCantidadYear, error: errorInventarioNombreCantidadYear } = useGetInventarioNombreCantidadYear(selectedYear);
    const { inventarioNombreCantidadUltimosTresMeses, loading: loadingInventarioNombreCantidadUltimosTresMeses, error: errorInventarioNombreCantidadUltimosTresMeses } = useGetInventarioNombreCantidadUltimosTresMeses();
    const { distribucion, loading: loadingDistribucion, error: errorDistribucion } = useGetDistribucionProductosPorProveedor();
    const { inventarioProveedorMesYear, loading: loadingInventarioProveedorMesYear, error: errorInventarioProveedorMesYear } = useGetInventarioProveedorMesYear(selectedMonth, selectedYear);
    const { inventarioProveedorYear, loading: loadingInventarioProveedorYear, error: errorInventarioProveedorYear } = useGetInventarioProveedorYear(selectedYear);
    const { inventarioProveedorTresMeses, loading: loadingInventarioProveedorTresMeses, error: errorInventarioProveedorTresMeses } = useGetInventarioProveedorTresMeses();
    const { productos, loading: loadingProductos, error: errorProductos } = useProductosBajoStockYRestockSugerido();
    const { inventarioBajoStockRestockMesYear, loading: loadingInventarioBajoStockRestockMesYear, error: errorInventarioBajoStockRestockMesYear } = useGetInventarioBajoStockRestockMesYear(selectedMonth, selectedYear);
    const { inventarioBajoStockRestockYear, loading: loadingInventarioBajoStockRestockYear, error: errorInventarioBajoStockRestockYear } = useGetInventarioBajoStockRestockYear(selectedYear);
    const { inventarioBajoStockRestockUltimosTresMeses, loading: loadingInventarioBajoStockRestockUltimosTresMeses, error: errorInventarioBajoStockRestockUltimosTresMeses } = useGetInventarioBajoStockRestockUltimosTresMeses();

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    if (loadingInventario || loadingInventarioNombreCantidadMesYear || loadingInventarioNombreCantidadYear || loadingInventarioNombreCantidadUltimosTresMeses
        ||loadingDistribucion || loadingInventarioProveedorMesYear || loadingInventarioProveedorYear || loadingInventarioProveedorTresMeses
        || loadingProductos|| loadingInventarioBajoStockRestockMesYear || loadingInventarioBajoStockRestockYear || loadingInventarioBajoStockRestockUltimosTresMeses) return <p>Cargando...</p>;
    if (errorInventario) return <p>Error al cargar las estadísticas del inventario: {errorInventario.message}</p>;
    if (errorInventarioNombreCantidadMesYear) return <p>Error al cargar las estadísticas del inventario con nombre y cantidad por mes y año: {errorInventarioNombreCantidadMesYear.message}</p>;
    if (errorInventarioNombreCantidadYear) return <p>Error al cargar las estadísticas del inventario con nombre y cantidad por año: {errorInventarioNombreCantidadYear.message}</p>;
    if (errorInventarioNombreCantidadUltimosTresMeses) return <p>Error al cargar las estadísticas del inventario con nombre y cantidad de los últimos 3 meses: {errorInventarioNombreCantidadUltimosTresMeses.message}</p>;
    if (errorDistribucion) return <p>Error al cargar la distribución de productos por proveedor: {errorDistribucion.message}</p>;
    if (errorInventarioProveedorMesYear) return <p>Error al cargar las estadísticas del inventario por proveedor por mes y año: {errorInventarioProveedorMesYear.message}</p>
    if (errorInventarioProveedorYear) return <p>Error al cargar las estadísticas del inventario por proveedor por año: {errorInventarioProveedorYear.message}</p>;
    if (errorInventarioProveedorTresMeses) return <p>Error al cargar las estadísticas del inventario por proveedor de los últimos 3 meses: {errorInventarioProveedorTresMeses.message}</p>;
    if (errorProductos) return <p>Error al cargar los productos con bajo stock y restock sugerido: {errorProductos.message}</p>;
    if (errorInventarioBajoStockRestockMesYear) return <p>Error al cargar las estadísticas del inventario con bajo stock y restock sugerido por mes y año: {errorInventarioBajoStockRestockMesYear.message}</p>;
    if (errorInventarioBajoStockRestockYear) return <p>Error al cargar las estadísticas del inventario con bajo stock y restock sugerido por año: {errorInventarioBajoStockRestockYear.message}</p>;
    if (errorInventarioBajoStockRestockUltimosTresMeses) return <p>Error al cargar las estadísticas del inventario con bajo stock y restock sugerido de los últimos 3 meses: {errorInventarioBajoStockRestockUltimosTresMeses.message}</p>;

    const renderNombreCantidadChart = () => {
        if (filterType === 'MesYear') {
            return <BarChartNombreCantidadMesYear data={inventarioNombreCantidadMesYear} />;
        }else if (filterType === 'Year') {
            return <BarChartNombreCantidadYear data={inventarioNombreCantidadYear} />;
        }else if (filterType === 'TresMeses') {
            return <BarChartNombreCantidadUltimosTresMeses data={inventarioNombreCantidadUltimosTresMeses} />;
        }
        return <BarChartAllNombreCantidadComponent data={inventario} />;
    };

    const renderProveedorChart = () => {
        if (filterType === 'MesYear') {
            return <BarChartProveedorMesYear data={inventarioProveedorMesYear} />;
        }else if (filterType === 'Year') {
            return <BarChartProveedorYear data={inventarioProveedorYear} />;
        }else if (filterType === 'TresMeses') {
            return <BarChartProveedorTresMeses data={inventarioProveedorTresMeses} />;
        }
        return <DistribucionProductosPorProveedorChart data={distribucion} />;
    };

    const renderBajoStockRestockChart = () => {
        if (filterType === 'MesYear') {
            return <BarChartBajoStockRestockMesYear data={inventarioBajoStockRestockMesYear} />;
        }else if (filterType === 'Year') {
            return <BarChartBajoStockRestockYear data={inventarioBajoStockRestockYear} />;
        }else if (filterType === 'TresMeses') {
            return <BarChartBajoStockRestockTresMeses data={inventarioBajoStockRestockUltimosTresMeses} />;
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
                    <option value="MesYear">Filtrar por Meses</option>
                    <option value="Year">Filtrar por Año</option>
                    <option value="TresMeses">Filtrar por Últimos tres Meses</option>
                </select>

            {filterType === 'MesYear' && (
                <DatePicker
                    className="month-selector"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    locale={es}
                />
            )}
            {filterType === 'Year' && (
                <DatePicker
                    className="year-selector"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy"
                    showYearPicker
                    locale={es}
                />
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