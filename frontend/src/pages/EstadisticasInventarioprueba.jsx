//import React from 'react';
import EstadisticasInventarioChart from '../components/EstadisticasInventarioChart';

const EstadisticasInventarioprueba = () => {
    return (
        <div className='main-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className='table-container' style={{ width: '80%' }}>
                <div className='top-table'>
                    <h1 className='title-table' style={{ textAlign: 'center' }}>Estadísticas del Inventario</h1>
                </div>
                <EstadisticasInventarioChart />
            </div>
        </div>
    );
};

export default EstadisticasInventarioprueba;