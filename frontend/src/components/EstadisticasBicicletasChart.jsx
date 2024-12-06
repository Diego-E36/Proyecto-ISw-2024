"use strict";
//import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useGetBicicletasPorTipo from '@hooks/estadisticas/useGetBicicletasPorTipo.jsx';
import useGetBicicletasVenta from '@hooks/estadisticas/useGetBicicletasVenta.jsx';
import useGetBicicletasPorAro from '@hooks/estadisticas/useGetBicicletasPorAro.jsx';
import '@styles/Charts.css';

const COLORS = [
    '#0088FE', '#22945e', '#ea341c ', '#FF8042', '#e032f1', '#6cadc8', '#FFCE56', '#4BC0C0', '#9966FF',
    '#A52A2A', '#808080', '#afa09d', '#D3D3D3'
];

const BarChartComponent = ({ data }) => (
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

const BarChartVentaComponent = ({ data }) => {
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
                    ...bici,
                    numeroSerieModelo: `${bici.numeroSerie} - ${bici.modelo}`
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="numeroSerieModelo" angle={-40} textAnchor="end" interval={0} height={100} />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => `$${value}`}/>
                <Legend verticalAlign="top" />
                <Bar dataKey="venta" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};


const PieChartAroComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height= "100%">
        <PieChart>
            <Pie
                data={data}
                dataKey="aro"
                nameKey="modelo"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" />
        </PieChart>
    </ResponsiveContainer>
);

const EstadisticasBicicletasChart = () => {
    const { bicicletasPorTipo, loading: loadingPorTipo, error: errorPorTipo } = useGetBicicletasPorTipo();
    const { bicicletasVenta, loading: loadingVenta, error: errorVenta } = useGetBicicletasVenta();
    const { bicicletasPorAro, loading: loadingPorAro, error: errorPorAro } = useGetBicicletasPorAro();
    
    if (loadingPorTipo || loadingVenta || loadingPorAro) return <p>Cargando...</p>;
    if (errorPorTipo) return <p>Error al cargar las estadísticas de bicicletas por tipo: {errorPorTipo.message}</p>;
    if (errorVenta) return <p>Error al cargar las estadísticas de bicicletas a la venta: {errorVenta.message}</p>;
    if (errorPorAro) return <p>Error al cargar las estadísticas de bicicletas por aro: {errorPorAro.message}</p>;

    return (
    <div>
        <h1 className="title-table2"> Estadísticas de Bicicletas</h1>
        <div className="App">
            <div className="dataCard revenueCard">
                <h2 style={{ textAlign: 'center' }}>Gráfico de Tipos de Bicicletas</h2>
                <BarChartComponent data={bicicletasPorTipo} />
            </div>
            <div className="dataCard customerCard">
                <h2 style={{ textAlign: 'center' }}>Gráfico de Bicicletas a la Venta</h2>
                <BarChartVentaComponent data={bicicletasVenta} />
            </div>
            <div className="dataCard categoryCard">
                <h2 style={{ textAlign: 'center' }}>Gráfico por Aro de Bicicletas</h2>
                <PieChartAroComponent data={bicicletasPorAro} />
            </div>
        </div>
    </div>
    );
};

export default EstadisticasBicicletasChart;