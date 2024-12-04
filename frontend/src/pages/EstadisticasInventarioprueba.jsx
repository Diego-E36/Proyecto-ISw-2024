//import React from 'react';
import EstadisticasInventarioChart from '../components/EstadisticasInventarioChart.jsx';

const EstadisticasInventarioprueba = () => {
    return (
        <div
            className='main-container'
            style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr', //crezcan dinámicamente
                minHeight: '100vh',
            }}
        >
            <div className='top-table' style={{ marginBottom: '20px', textAlign: 'center' }}>
            </div>
            <div className='table-container' style={{ width: '97.4%', margin: '0' }}>
                <EstadisticasInventarioChart />
            </div>
        </div>
    );
};

export default EstadisticasInventarioprueba;