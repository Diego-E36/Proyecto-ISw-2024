"use strict";
//import React from 'react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import useGetNombreYCantidadInventario from '@hooks/estadisticas/useGetNombreYCantidadInventario.jsx';
import useGetDistribucionProductosPorProveedor from '@hooks/estadisticas/useGetDistribucionProductosPorProveedor.jsx';
import useProductosBajoStockYRestockSugerido from '@hooks/estadisticas/useGetProductoBajoStockYRestockSugerido.jsx';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

const BarChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-60} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidadStock" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
);

const PieChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={500}>
        <PieChart>
            <Pie
                data={data}
                dataKey="cantidadStock"
                nameKey="nombreStock"
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

const AreaChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={500}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-60} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Area type="monotone" dataKey="cantidadStock" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    </ResponsiveContainer>
);

const DistribucionProductosPorProveedorChart = ({ data }) => (
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

const ProductosBajoStockYRestockChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreStock" angle={-60} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidadStock" fill="#8884d8" name="Bajo Stock" />
            <Bar dataKey="restockSugerido" fill="#82ca9d" name="Restock Sugerido" />
        </BarChart>
    </ResponsiveContainer>
);


const EstadisticasInventarioChart = () => {
    const { inventario, loading: loadingInventario, error: errorInventario } = useGetNombreYCantidadInventario();
    const { distribucion, loading: loadingDistribucion, error: errorDistribucion } = useGetDistribucionProductosPorProveedor();
    const { productos, loading: loadingProductos, error: errorProductos } = useProductosBajoStockYRestockSugerido();
    const [selectedTab, setSelectedTab] = useState(0);

    if (loadingInventario || loadingDistribucion || loadingProductos) return <p>Cargando...</p>;
    if (errorInventario) return <p>Error al cargar las estadísticas del inventario: {errorInventario.message}</p>;
    if (errorDistribucion) return <p>Error al cargar la distribución de productos por proveedor: {errorDistribucion.message}</p>;
    if (errorProductos) return <p>Error al cargar los productos con bajo stock y restock sugerido: {errorProductos.message}</p>;
    
    const handleTabChange = (index) => {
        setSelectedTab(index);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '20px', marginTop: '20px' }}>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button onClick={() => handleTabChange(0)}>Gráfico de Barras</button>
                <button onClick={() => handleTabChange(1)}>Gráfico de Torta</button>
                <button onClick={() => handleTabChange(2)}>Gráfico de Área</button>
                <button onClick={() => handleTabChange(3)}>Distribución por Proveedor</button>
                <button onClick={() => handleTabChange(4)}>Bajo Stock y Restock Sugerido</button>
            </div>
            <div style={{ width: '100%', height: '500px', overflow: 'auto' }}>
                {selectedTab === 0 && <BarChartComponent data={inventario} />}
                {selectedTab === 1 && <PieChartComponent data={inventario} />}
                {selectedTab === 2 && <AreaChartComponent data={inventario} />}
                {selectedTab === 3 && <DistribucionProductosPorProveedorChart data={distribucion} />}
                {selectedTab === 4 && <ProductosBajoStockYRestockChart data={productos} />}
            </div>
        </div>
    );
};

export default EstadisticasInventarioChart;