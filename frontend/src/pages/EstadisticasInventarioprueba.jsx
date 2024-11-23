//import React from 'react';
import EstadisticasInventarioChart from '../components/EstadisticasInventarioChart.jsx';

const EstadisticasInventarioprueba = () => {
    return (
        <div className='main-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '20px', paddingTop: '20px', heigh: '100vh' }}>
            <div className='table-container' style={{ width: '80%'}}>
                <div className='top-table' style={{ marginBottom: '20px' }}>
                    <h1 className='title-table' style={{ textAlign: 'center' }}>Estadísticas del Inventario</h1>
                </div>
                <EstadisticasInventarioChart />
            </div>
        </div>
    );
};

export default EstadisticasInventarioprueba;