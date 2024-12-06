"use strict";
//import React from 'react';
//import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import useGetNombreYCantidadInventario from '@hooks/estadisticas/useGetNombreYCantidadInventario.jsx';
import useGetDistribucionProductosPorProveedor from '@hooks/estadisticas/useGetDistribucionProductosPorProveedor.jsx';
import useProductosBajoStockYRestockSugerido from '@hooks/estadisticas/useGetProductoBajoStockYRestockSugerido.jsx';
import '@styles/Charts.css';

const BarChartComponent = ({ data }) => (
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
            animationBegin={0}
            animationDuration={1500}
            animationEasing='ease-out'
            isAnimationActive={true}
            />
        </BarChart>
    </ResponsiveContainer>
);

const DistribucionProductosPorProveedorChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="proveedor" angle={-40} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="cantidad" 
            fill="#8884d8"
            />
        </BarChart>
    </ResponsiveContainer>
);

const ProductosBajoStockYRestockChart = ({ data }) => {
    if (data.length === 0) {
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
            {data.map((producto, index) => (
                <ReferenceLine
                    key={index}
                    y={producto.umbralMinimo}
                    label={`Umbral Mínimo (${producto.umbralMinimo})`}
                    stroke="red"
                    strokeDasharray="3 3"
                />
            ))}
            <Bar 
            dataKey="cantidadStock" 
            fill="#8884d8" 
            name="Bajo Stock" 
            />
            <Bar 
            dataKey="restockSugerido" 
            fill="#82ca9d" 
            name="Restock Sugerido" 
            />
        </BarChart>
    </ResponsiveContainer>
    );
};
const EstadisticasInventarioChart = () => {
    const { inventario, loading: loadingInventario, error: errorInventario } = useGetNombreYCantidadInventario();
    const { distribucion, loading: loadingDistribucion, error: errorDistribucion } = useGetDistribucionProductosPorProveedor();
    const { productos, loading: loadingProductos, error: errorProductos } = useProductosBajoStockYRestockSugerido();

    if (loadingInventario || loadingDistribucion || loadingProductos) return <p>Cargando...</p>;
    if (errorInventario) return <p>Error al cargar las estadísticas del inventario: {errorInventario.message}</p>;
    if (errorDistribucion) return <p>Error al cargar la distribución de productos por proveedor: {errorDistribucion.message}</p>;
    if (errorProductos) return <p>Error al cargar los productos con bajo stock y restock sugerido: {errorProductos.message}</p>;
    
    return (
        <div>
            <h1 className="title-table2">Estadísticas del Inventario</h1>
            <div className="App">
                <div className="dataCard revenueCard">
                    <h2 style={{ textAlign: 'center' }}>Gráfico de Stock de Inventario</h2>
                    <BarChartComponent data={inventario} />
                </div>
                <div className="dataCard customerCard">
                    <h2 style={{ textAlign: 'center' }}>Distribución por Proveedor</h2>
                    <DistribucionProductosPorProveedorChart data={distribucion} />
                </div>
                <div className="dataCard categoryCard">
                    <h2 style={{ textAlign: 'center' }}>Bajo Stock y Restock Sugerido</h2>
                    <ProductosBajoStockYRestockChart data={productos} />
                </div>
            </div>
        </div>
    );
};

export default EstadisticasInventarioChart;