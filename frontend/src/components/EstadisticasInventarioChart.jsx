"use strict";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import useGetNombreYCantidadInventario from '@hooks/estadisticas/useGetNombreYCantidadInventario.jsx';

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

const EstadisticasInventarioChart = () => {
    const { inventario, loading, error } = useGetNombreYCantidadInventario();

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar las estadísticas: {error.message}</p>;

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ width: '30%' }}>
                <BarChartComponent data={inventario} />
            </div>
            <div style={{ width: '30%' }}>
                <PieChartComponent data={inventario} />
            </div>
            <div style={{ width: '30%' }}>
                <AreaChartComponent data={inventario} />
            </div>
        </div>
    );
};

export default EstadisticasInventarioChart;