//import React from 'react';
import EstadisticasBicicletasChart from '../components/EstadisticasBicicletasChart.jsx';

const EstadisticasBicicletasprueba = () => {
    return (
        <div
            className='main-container'
            style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr', // Fila superior para el título, la segunda crece dinámicamente
                minHeight: '100vh',
            }}
        >
            <div className='top-table' style={{ marginBottom: '20px', textAlign: 'center' }}>
            </div>
            <div className='table-container' style={{ width: '97.4%', margin: '0' }}>
                <EstadisticasBicicletasChart />
            </div>
        </div>
    );
};

export default EstadisticasBicicletasprueba;