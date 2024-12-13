"use strict";
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useGetBicicletasVentaMes from '@hooks/estadisticas/useGetBicicletasVentaMes.jsx';
import useGetBicicletasPorTipoMes from '@hooks/estadisticas/useGetBicicletasPorTipoMes.jsx';
import useGetBicicletasPorAroMes from '@hooks/estadisticas/useGetBicicletasPorAroMes.jsx';
import useGetAllBicicletasTipo from '@hooks/estadisticas/useGetAllBicicletasTipo.jsx';
import useGetAllBicicletasVenta from '@hooks/estadisticas/useGetAllBicicletasVenta.jsx';
import useGetAllBicicletasAro from '@hooks/estadisticas/useGetAllBicicletasAro.jsx';
import '@styles/Charts.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {es} from 'date-fns/locale/es';

const COLORS = [
    '#0088FE', '#22945e', '#ea341c ', '#FF8042', '#e032f1', '#6cadc8', '#FFCE56', '#4BC0C0', '#9966FF',
    '#A52A2A', '#808080', '#afa09d', '#D3D3D3'
];

const BarChartAllComponent = ({ data }) => {
    console.log("Datos recibidos en BarChartAllComponent:", data);
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay bicicletas para mostrar en el gráfico.
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" angle={-40} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="cantidad" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const BarChartTipoComponent = ({ data }) => {
    if (data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay bicicletas para mostrar en el gráfico
            </div>
        );
    }
    return (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tipo" angle={-40} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartAllVentaComponent = ({ data }) => {
    console.log("Datos recibidos en BarChartAllVentaComponent:", data);
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay bicicletas a la venta para mostrar en el gráfico.
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bicicleta_modelo" angle={-40} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="bicicleta_venta" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const BarChartVentaComponent = ({ data }) => {
    console.log("Datos para el gráfico de ventas:", data);
    if (data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay bicicletas a la venta para mostrar en el gráfico.
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
                data={data.map(bici => ({
                    modelo: bici.modelo,
                    venta: bici.venta
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="modelo" angle={-40} textAnchor="end" interval={0} height={100} />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => `$${value}`}/>
                <Legend verticalAlign="top" />
                <Bar dataKey="venta" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const PieChartAllAroComponent = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay bicicletas para mostrar en el gráfico
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data.map(bici => ({
                        aro: bici.aro,
                        cantidad: Number(bici.cantidad)
                    }))}
                    dataKey="cantidad"
                    nameKey="aro"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({ aro, cantidad }) => `Aro ${aro}: ${cantidad}`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`Cantidad: ${value}`, `Aro: ${name}`]} />
                <Legend verticalAlign="top" formatter={(value) => `Aro ${value}`} />
            </PieChart>
        </ResponsiveContainer>
    );
};

const PieChartAroComponent = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className='no-data-message-title'>
                No hay bicicletas para mostrar en el gráfico
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height= "100%">
        <PieChart>
            <Pie
                data={data.map(bici => ({
                    aro: bici.aro,
                    cantidad: Number(bici.cantidad)
                }))}
                dataKey="cantidad"
                nameKey="aro"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={({ aro, cantidad }) => `Aro ${aro}: ${cantidad}`}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`Cantidad: ${value}`, `Aro: ${name}`]} />
            <Legend verticalAlign="top" 
            formatter={(value) => `Aro ${value}`}/>
        </PieChart>
    </ResponsiveContainer>
    );
};

const EstadisticasBicicletasChart = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const selectedMonth = selectedDate.getMonth() + 1;
    //const selectedYear = selectedDate.getFullYear();
    const [filterType, setFilterType] = useState('');
    const { bicicletasAllTipo, loading: loadingAllTipo, error: errorAllTipo } = useGetAllBicicletasTipo();
    const { bicicletasPorTipoMes, loading: loadingPorTipoMes, error: errorPorTipoMes } = useGetBicicletasPorTipoMes(selectedMonth);
    const { bicicletasAllVenta, loading: loadingAllVenta, error: errorAllVenta } = useGetAllBicicletasVenta();
    const { bicicletasVentaMes, loading: loadingVenta, error: errorVentaMes } = useGetBicicletasVentaMes(selectedMonth);
    const { bicicletasAllAro, loading: loadingAllAro, error: errorAllAro } = useGetAllBicicletasAro();
    const { bicicletasPorAroMes, loading: loadingPorAroMes, error: errorPorAroMes } = useGetBicicletasPorAroMes(selectedMonth);

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };
    
//probando por un error
console.log("Mes seleccionado:", selectedMonth);
console.log("Datos de bicicletas a la venta:", bicicletasVentaMes);
console.log("Error:", errorVentaMes);
console.log("Cargando:", loadingVenta);

    if (loadingAllTipo || loadingPorTipoMes || loadingAllVenta || loadingVenta || loadingAllAro ||loadingPorAroMes ) return <p>Cargando...</p>;
    if (errorAllTipo) return <p>Error al cargar las estadísticas de todas las bicicletas por tipo: {errorAllTipo.message}</p>;
    if (errorPorTipoMes) return <p>Error al cargar las estadisticas de bicicletas por tipo: {errorPorTipoMes.message}</p>;
    if (errorAllVenta) return <p>Error al cargar las estadísticas de todas las bicicletas a la venta: {errorAllVenta.message}</p>;
    if (errorVentaMes) return <p>Error al cargar las estadísticas de bicicletas a la venta: {errorVentaMes.message}</p>;
    if (errorAllAro) return <p>Error al cargar las estadísticas de todas las bicicletas por aro: {errorAllAro.message}</p>;
    if (errorPorAroMes) return <p>Error al cargar las estadísticas de bicicletas por aro: {errorPorAroMes.message}</p>;

    const renderChart = () => {
        if (filterType === 'Meses') {
            return <BarChartTipoComponent data={bicicletasPorTipoMes} />;
        }
        return <BarChartAllComponent data={bicicletasAllTipo} />;
    };

    const renderVentaChart = () => {
        if (filterType === 'Meses') {
            return <BarChartVentaComponent data={bicicletasVentaMes} />;
        }
        return <BarChartAllVentaComponent data={bicicletasAllVenta} />;
    };

    const renderAroChart = () => {
        if (filterType === 'Meses') {
            return <PieChartAroComponent data={bicicletasPorAroMes} />;
        }
        return <PieChartAllAroComponent data={bicicletasAllAro} />;
    };


    return (
        <div>
            <h1 className="title-table2">Estadísticas de Bicicletas</h1>
            <p>Seleccione un filtro para ver las estadísticas correspondientes.</p>

            <div className="selectors-container">
                <select 
                    className="filter-selector" 
                    value={filterType} 
                    onChange={handleFilterChange}>
                    <option value="">Seleccionar filtro</option>
                    <option value="Meses">Filtrar por Meses</option>
                </select>

                {/* Desplegable del Calendario */}
                {filterType === 'Meses' && (
                    <DatePicker
                        className="month-selector"
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        locale={es}
                    />
                )}
            </div>
        <div className="App">
            <div className="dataCard revenueCard">
                <h2 style={{ textAlign: 'center' }}>Gráfico de Tipos de Bicicletas</h2>
                {renderChart()}
            </div>
            <div className="dataCard customerCard">
                <h2 style={{ textAlign: 'center' }}>Gráfico de Bicicletas a la Venta</h2>
                {renderVentaChart()}
            </div>
            <div className="dataCard categoryCard">
                <h2 style={{ textAlign: 'center' }}>Gráfico por Aro de Bicicletas</h2>
                {renderAroChart()}
            </div>
        </div>
    </div>
    );
};

export default EstadisticasBicicletasChart;