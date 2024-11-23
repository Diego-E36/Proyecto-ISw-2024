//import React from 'react';
import DistribucionProductosPorProveedorChart from '../components/DistribucionProductosPorProveedorChart';

const DistribucionProductosPorProveedorPage = () => {
    return (
        <div className='main-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className='table-container' style={{ width: '80%' }}>
                <div className='top-table'>
                    <h1 className='title-table' style={{ textAlign: 'center' }}>Distribución de Productos por Proveedor</h1>
                </div>
                <DistribucionProductosPorProveedorChart />
            </div>
        </div>
    );
};

export default DistribucionProductosPorProveedorPage;