"use strict";
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useGetBicicletasPorTipo from '@hooks/estadisticas/useGetBicicletasPorTipo.jsx';

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

const EstadisticasBicicletasChart = () => {
    const { bicicletasPorTipo, loading, error } = useGetBicicletasPorTipo();
    const [selectedTab, setSelectedTab] = useState(0);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar las estadísticas de bicicletas: {error.message}</p>;

    const handleTabChange = (index) => {
        setSelectedTab(index);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button onClick={() => handleTabChange(0)}>Gráfico de Barras</button>
            </div>
            <div style={{ width: '100%', height: '500px', overflow: 'auto' }}>
                {selectedTab === 0 && <BarChartComponent data={bicicletasPorTipo} />}
            </div>
        </div>
    );
};

export default EstadisticasBicicletasChart;