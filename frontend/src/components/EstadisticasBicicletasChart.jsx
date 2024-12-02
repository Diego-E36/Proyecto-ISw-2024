"use strict";
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useGetBicicletasPorTipo from '@hooks/estadisticas/useGetBicicletasPorTipo.jsx';
import useGetBicicletasVenta from '@hooks/estadisticas/useGetBicicletasVenta.jsx';
import useGetBicicletasPorAro from '@hooks/estadisticas/useGetBicicletasPorAro.jsx';

const COLORS = [
    '#0088FE', '#22945e', '#ea341c ', '#FF8042', '#e032f1', '#6cadc8', '#FFCE56', '#4BC0C0', '#9966FF',
    '#A52A2A', '#808080', '#afa09d', '#D3D3D3'
];

const BarChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tipo" angle={-60} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
);

const BarChartVentaComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data.map(bici => ({ ...bici, numeroSerieModelo: `${bici.numeroSerie} - ${bici.modelo}` }))} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="numeroSerieModelo" angle={-60} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="venta" fill="#82ca9d" />
        </BarChart>
    </ResponsiveContainer>
);


const PieChartAroComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={500}>
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
    const [selectedTab, setSelectedTab] = useState(0);

    if (loadingPorTipo || loadingVenta || loadingPorAro) return <p>Cargando...</p>;
    if (errorPorTipo) return <p>Error al cargar las estadísticas de bicicletas por tipo: {errorPorTipo.message}</p>;
    if (errorVenta) return <p>Error al cargar las estadísticas de bicicletas a la venta: {errorVenta.message}</p>;
    if (errorPorAro) return <p>Error al cargar las estadísticas de bicicletas por aro: {errorPorAro.message}</p>;

    const handleTabChange = (index) => {
        setSelectedTab(index);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button onClick={() => handleTabChange(0)}>Gráfico de Barras por Tipo</button>
                <button onClick={() => handleTabChange(1)}>Gráfico de Barras por Venta</button>
                <button onClick={() => handleTabChange(2)}>Gráfico de Torta por Aro</button>
            </div>
            <div style={{ width: '100%', height: '500px', overflow: 'auto' }}>
                {selectedTab === 0 && <BarChartComponent data={bicicletasPorTipo} />}
                {selectedTab === 1 && <BarChartVentaComponent data={bicicletasVenta} />}
                {selectedTab === 2 && <PieChartAroComponent data={bicicletasPorAro} />}
            </div>
        </div>
    );
};

export default EstadisticasBicicletasChart;