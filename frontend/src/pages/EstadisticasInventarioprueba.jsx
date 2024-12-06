//import React from 'react';
import EstadisticasInventarioChart from '../components/EstadisticasInventarioChart.jsx';
import '@styles/Charts.css';

const EstadisticasInventarioprueba = () => {
    return (
        <div className='main-container'>
            <div className='top-table'>
            </div>
            <div className='table-container'>
                <EstadisticasInventarioChart />
            </div>
        </div>
    );
};

export default EstadisticasInventarioprueba;