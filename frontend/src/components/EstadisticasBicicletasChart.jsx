"use strict";
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useGetBicicletasVentaMes from '@hooks/estadisticas/useGetBicicletasVentaMes.jsx';
import useGetBicicletasPorTipoMes from '@hooks/estadisticas/useGetBicicletasPorTipoMes.jsx';
import useGetBicicletasPorAroMes from '@hooks/estadisticas/useGetBicicletasPorAroMes.jsx';
import useGetAllBicicletasTipo from '@hooks/estadisticas/useGetAllBicicletasTipo.jsx';
import useGetAllBicicletasVenta from '@hooks/estadisticas/useGetAllBicicletasVenta.jsx';
import useGetAllBicicletasAro from '@hooks/estadisticas/useGetAllBicicletasAro.jsx';
import useGetBicicletasPorTipoYear from '@hooks/estadisticas/useGetBicicletasPorTipoYear.jsx';
import useGetBicicletasVentaYear from '@hooks/estadisticas/useGetBicicletasVentaYear.jsx';
import useGetBicicletasPorAroYear from '@hooks/estadisticas/useGetBicicletasPorAroYear.jsx';
import useGetBicicletasPorTipoUltimosTresMeses from '@hooks/estadisticas/useGetBicicletasPorTipoUltimosTresMeses.jsx';
import useGetBicicletasVentaUltimosTresMeses from '@hooks/estadisticas/useGetBicicletasVentaUltimosTresMeses.jsx';
import useGetBicicletasPorAroUltimosTresMeses from '@hooks/estadisticas/useGetBicicletasPorAroUltimosTresMeses.jsx';
import useGetBicicletasPorTipoDia from '@hooks/estadisticas/useGetBicicletasPorTipoDia.jsx';
import useGetBicicletasVentaDia from '@hooks/estadisticas/useGetBicicletasVentaDia.jsx';
import useGetBicicletasPorAroDia from '@hooks/estadisticas/useGetBicicletasPorAroDia.jsx';
import '@styles/Charts.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {es} from 'date-fns/locale/es';

const COLORS = [
    '#0088FE', '#22945e', '#ea341c ', '#FF8042', '#e032f1', '#6cadc8', '#FFCE56', '#4BC0C0', '#9966FF',
    '#A52A2A', '#808080', '#afa09d', '#D3D3D3'
];

const BarChartAllComponent = ({ data }) => {
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
                <Bar dataKey="cantidad" fill="#82ca9d" isAnimationActive={true}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

const BarChartTipoDiaComponent = ({ data }) => {
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
                <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
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
            <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
        </BarChart>
    </ResponsiveContainer>
    );
};

const BarChartTipoAnoComponent = ({ data }) => {
    if (!data || data.length === 0) {
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
                <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
            </BarChart>
        </ResponsiveContainer>
    );
}; 

const BarChartTipoUltimosTresMesesComponent = ({ data }) => {
    if (!data || data.length === 0) {
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
                <Bar dataKey="cantidad" fill="#8884d8" isAnimationActive={true}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

const BarChartAllVentaComponent = ({ data }) => {
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
                <Bar dataKey="bicicleta_venta" fill="#82ca9d" isAnimationActive={true}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

const BarChartVentaDiaComponent = ({ data }) => {
    if (data.length === 0) {
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
                <XAxis dataKey="modelo" angle={-40} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="venta" fill="#82ca9d" isAnimationActive={true}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

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
                <Bar dataKey="venta" fill="#82ca9d "isAnimationActive={true} />
            </BarChart>
        </ResponsiveContainer>
    );
};

const BarChartVentaYearComponent = ({ data }) => {
    if (!data || data.length === 0) {
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
                <Bar dataKey="venta" fill="#82ca9d" isAnimationActive={true}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

const BarChartVentaUltimosTresMesesComponent = ({ data }) => {
    if (!data || data.length === 0) {
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
                <Bar dataKey="venta" fill="#82ca9d" isAnimationActive={true}/>
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
                    isAnimationActive={true}
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

const PieChartAroDiaComponent = ({ data }) => {
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
                    isAnimationActive={true}
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
                isAnimationActive={true}
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

const PieChartAroYearComponent = ({ data }) => {
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
                isAnimationActive={true}
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

const PieChartAroUltimosTresMesesComponent = ({ data }) => {
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
                isAnimationActive={true}
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

const minDate = new Date(2023, 0, 1); 
const maxDate = new Date();           

const FORMATS = {
    DIA: 'DD/MM/AAAA',
    MESES: 'MM/AAAA',
    YEAR: 'AAAA'
};

const EstadisticasBicicletasChart = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterType, setFilterType] = useState('');
    const [dateError, setDateError] = useState('');
    const [inputValue, setInputValue] = useState('');
    const validDate = selectedDate instanceof Date && !isNaN(selectedDate); //ve si selectedDate es válido, si no usa una fecha por defecto
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

    const { bicicletasAllTipo, loading: loadingAllTipo, error: errorAllTipo } = useGetAllBicicletasTipo();
    const { bicicletasPorTipoDia, loading: loadingPorTipoDia, error: errorPorTipoDia } = useGetBicicletasPorTipoDia(selectedDay, selectedMonth, selectedYear);
    const { bicicletasPorTipoMes, loading: loadingPorTipoMes, error: errorPorTipoMes } = useGetBicicletasPorTipoMes(selectedMonth, selectedYear);
    const { bicicletasPorTipoYear, loading: loadingPorTipoYear, error: errorPorTipoYear } = useGetBicicletasPorTipoYear(selectedYear);
    const { bicicletasPorTipoUltimosTresMeses, loading: loadingPorTipoUltimosTresMeses, error: errorPorTipoUltimosTresMeses } = useGetBicicletasPorTipoUltimosTresMeses();
    const { bicicletasAllVenta, loading: loadingAllVenta, error: errorAllVenta } = useGetAllBicicletasVenta();
    const { bicicletasVentaDia, loading: loadingVentaDia, error: errorVentaDia } = useGetBicicletasVentaDia(selectedDay, selectedMonth, selectedYear);
    const { bicicletasVentaMes, loading: loadingVenta, error: errorVentaMes } = useGetBicicletasVentaMes(selectedMonth, selectedYear);
    const { bicicletasVentaYear, loading: loadingVentaYear, error: errorVentaYear } = useGetBicicletasVentaYear(selectedYear);
    const { bicicletasVentaUltimosTresMeses, loading: loadingVentaUltimosTresMeses, error: errorVentaUltimosTresMeses } = useGetBicicletasVentaUltimosTresMeses();
    const { bicicletasAllAro, loading: loadingAllAro, error: errorAllAro } = useGetAllBicicletasAro();
    const {bicicletasPorAroDia, loading: loadingPorAroDia, error: errorPorAroDia } = useGetBicicletasPorAroDia(selectedDay, selectedMonth, selectedYear);
    const { bicicletasPorAroMes, loading: loadingPorAroMes, error: errorPorAroMes } = useGetBicicletasPorAroMes(selectedMonth, selectedYear);
    const { bicicletasPorAroYear, loading: loadingPorAroYear, error: errorPorAroYear } = useGetBicicletasPorAroYear(selectedYear);
    const { bicicletasPorAroUltimosTresMeses, loading: loadingPorAroUltimosTresMeses, error: errorPorAroUltimosTresMeses } = useGetBicicletasPorAroUltimosTresMeses();

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
        setDateError('');
    };
    
    
    if (loadingAllTipo || loadingPorTipoDia || loadingPorTipoMes || loadingPorTipoYear || loadingPorTipoUltimosTresMeses
        ||loadingAllVenta || loadingVenta || loadingVentaYear || loadingVentaUltimosTresMeses ||loadingVentaDia
        || loadingAllAro ||loadingPorAroMes || loadingPorAroYear || loadingPorAroUltimosTresMeses|| loadingPorAroDia) return <p>Cargando...</p>;
    if (errorAllTipo) return <p>Error al cargar las estadísticas de todas las bicicletas por tipo: {errorAllTipo.message}</p>;
    if (errorPorTipoDia) return <p>Error al cargar las estadisticas de bicicletas por tipo, día, mes y año: {errorPorTipoDia.message}</p>;
    if (errorPorTipoMes) return <p>Error al cargar las estadisticas de bicicletas por tipo, mes y año: {errorPorTipoMes.message}</p>;
    if (errorPorTipoYear) return <p>Error al cargar las estadisticas de bicicletas por tipo y año: {errorPorTipoYear.message}</p>;
    if (errorPorTipoUltimosTresMeses) return <p>Error al cargar las estadisticas de bicicletas por tipo y los últimos 3 meses: {errorPorTipoUltimosTresMeses.message}</p>;
    if (errorAllVenta) return <p>Error al cargar las estadísticas de todas las bicicletas a la venta: {errorAllVenta.message}</p>;
    if (errorVentaDia) return <p>Error al cargar las estadísticas de bicicletas a la venta por día, mes y año: {errorVentaDia.message}</p>;
    if (errorVentaMes) return <p>Error al cargar las estadísticas de bicicletas a la venta por mes y año: {errorVentaMes.message}</p>;
    if (errorVentaYear) return <p>Error al cargar las estadísticas de bicicletas a la venta por año: {errorVentaYear.message}</p>;
    if (errorVentaUltimosTresMeses) return <p>Error al cargar las estadísticas de bicicletas a la venta en los últimos tres meses: {errorVentaUltimosTresMeses.message}</p>;
    if (errorAllAro) return <p>Error al cargar las estadísticas de todas las bicicletas por aro: {errorAllAro.message}</p>;
    if (errorPorAroDia) return <p>Error al cargar las estadísticas de bicicletas por aro, día, mes y año: {errorPorAroDia.message}</p>;
    if (errorPorAroMes) return <p>Error al cargar las estadísticas de bicicletas por aro por mes y año: {errorPorAroMes.message}</p>;
    if (errorPorAroYear) return <p>Error al cargar las estadísticas de bicicletas por aro y año: {errorPorAroYear.message}</p>;
    if (errorPorAroUltimosTresMeses) return <p>Error al cargar las estadísticas de bicicletas por aro y los últimos tres meses: {errorPorAroUltimosTresMeses.message}</p>;

    const renderTipoChart = () => {
        if (filterType === 'Meses') {
            return <BarChartTipoComponent data={bicicletasPorTipoMes} />;
        }else if (filterType === 'Años') {
            return <BarChartTipoAnoComponent data={bicicletasPorTipoYear} />;
        }else if (filterType === 'TresMeses') {
            return <BarChartTipoUltimosTresMesesComponent data={bicicletasPorTipoUltimosTresMeses} />;
        }else if (filterType === 'Dia') {
            return <BarChartTipoDiaComponent data={bicicletasPorTipoDia} />;
        }
        return <BarChartAllComponent data={bicicletasAllTipo} />;
    };

    const renderVentaChart = () => {
        if (filterType === 'Meses') {
            return <BarChartVentaComponent data={bicicletasVentaMes} />;
        }else if (filterType === 'Años') {
            return <BarChartVentaYearComponent data={bicicletasVentaYear} />;
        }else if (filterType === 'TresMeses') {
            return <BarChartVentaUltimosTresMesesComponent data={bicicletasVentaUltimosTresMeses} />;
        }else if (filterType === 'Dia') {
            return <BarChartVentaDiaComponent data={bicicletasVentaDia} />;
        }
        return <BarChartAllVentaComponent data={bicicletasAllVenta} />;
    };

    const renderAroChart = () => {
        if (filterType === 'Meses') {
            return <PieChartAroComponent data={bicicletasPorAroMes} />;
        }else if (filterType === 'Años') {
            return <PieChartAroYearComponent data={bicicletasPorAroYear} />;
        }else if (filterType === 'TresMeses') {
            return <PieChartAroUltimosTresMesesComponent data={bicicletasPorAroUltimosTresMeses} />;
        }else if (filterType === 'Dia') {
            return <PieChartAroDiaComponent data={bicicletasPorAroDia} />;
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
                        onChange={handleFilterChange}
                    >
                        <option value="">Seleccionar filtro</option>
                        <option value="Dia">Filtrar por Día</option>
                        <option value="Meses">Filtrar por Meses</option>
                        <option value="Años">Filtrar por Años</option>
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
                            placeholderText="DD/MM/AAAA"
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
                            dateFormat="MM/YYYY"
                            showMonthYearPicker
                            local={es}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="MM/AAAA"
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
                            dateFormat="YYYY"
                            showYearPicker
                            local={es}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="AAAA"
                            onChangeRaw={handleInputChange}
                        />
                        {dateError && <p className="error-message">{dateError}</p>}
                    </div>
                    )}
                </div>
                <div className="App-bicicletas">
                    <div className="dataCard revenueCard">
                        <h2 style={{ textAlign: 'center' }}>Gráfico de Tipos de Bicicletas</h2>
                        {renderTipoChart()}
                    </div>
                    <div className="dataCard customerCard">
                        <h2 style={{ textAlign: 'center' }}>Gráfico de Bicicletas a la Venta por Modelo</h2>
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