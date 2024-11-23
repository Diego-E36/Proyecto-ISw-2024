//import React from 'react';
import ProductosBajoStockChart from '../components/EstadisticasInventarioChart.jsx';

const ProductosBajoStock = () => {
    return (
        <div className='main-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className='table-container' style={{ width: '80%' }}>
                <div className='top-table'>
                    <h1 className='title-table' style={{ textAlign: 'center' }}>Productos con Bajo Stock y Restock Sugerido</h1>
                </div>
                <ProductosBajoStockChart />
            </div>
        </div>
    );
};

export default ProductosBajoStock;