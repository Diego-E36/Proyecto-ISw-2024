import { Link, Outlet } from 'react-router-dom';

const EstadisticasPage = () => {
    return (
        <div className='main-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <h1>Estadísticas</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Link to="inventario" style={{ margin: '0 10px' }}>Inventario</Link>
                <Link to="bicicletas" style={{ margin: '0 10px' }}>Bicicletas</Link>
                <Link to="reparaciones" style={{ margin: '0 10px' }}>Reparaciones</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default EstadisticasPage;