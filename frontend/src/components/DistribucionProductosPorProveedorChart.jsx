"use strict";
//import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useGetDistribucionProductosPorProveedor from '@hooks/estadisticas/useGetDistribucionProductosPorProveedor.jsx';

const BarChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="proveedor" angle={-60} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
);

const DistribucionProductosPorProveedorChart = () => {
    const { distribucion, loading, error } = useGetDistribucionProductosPorProveedor();

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar la distribución de productos por proveedor: {error.message}</p>;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '80%' }}>
                <BarChartComponent data={distribucion} />
            </div>
        </div>
    );
};

export default DistribucionProductosPorProveedorChart;