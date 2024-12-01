//import React from 'react';
import EstadisticasBicicletasChart from '../components/EstadisticasBicicletasChart.jsx';

const EstadisticasBicicletasprueba = () => {
    return (
        <div className='main-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '20px', paddingTop: '20px', height: '100vh' }}>
            <div className='table-container' style={{ width: '80%' }}>
                <div className='top-table' style={{ marginBottom: '20px' }}>
                    <h1 className='title-table' style={{ textAlign: 'center' }}>Estadísticas de Bicicletas</h1>
                </div>
                <EstadisticasBicicletasChart />
            </div>
        </div>
    );
};

export default EstadisticasBicicletasprueba;