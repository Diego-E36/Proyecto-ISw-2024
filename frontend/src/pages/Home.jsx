import '@styles/home.css';
import personIcon from '../assets/person_24dp_092B50_FILL0_wght400_GRAD0_opsz24.svg'

const Home = () => {

    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;

    console.log(userRole);
    console.log(user)

    if(userRole === 'invitado'){
        return(
            <div className='home-container'>
                <div className='identificacion' >
                    <img src= {personIcon} alt='personIcon'></img>
                    <p>{user.email}</p>
                </div>
                <div className='titulo'>
                    <h1>Sistema de Gestión de Negocio Bikeep</h1>
                    <p style={{fontStyle: 'italic'}}>Bienvenido {user.nombreCompleto}.</p>
                </div>
                <div className='info'>
                    <h1>Lo Sentimos, Pero...</h1>
                    <p>Para acceder a las funcionalidades del sistema debe esperar a que el administrador modifique su rol.</p>
                </div>
            </div>
        )
    }
    if(userRole === 'usuario'){
        return(
            <div className='home-container'>
                <div className='identificacion' >
                    <img src= {personIcon} alt='personIcon'></img>
                    <p>{user.email}</p>
                </div>
                <div className='titulo'>
                    <h1>Sistema de Gestión de Negocio Bikeep</h1>
                    <p style={{fontStyle: 'italic'}}>Bienvenido {user.nombreCompleto}.</p>
                </div>
                <div className='buttons-container'>
                    <div className='button-item'>
                        <a href='/servicio' className='button'>Gestión de Servicios</a>
                        <p className='description'>Administra los servicios aplicados a bicicletas.</p>
                    </div>
                    <div className='button-item-uneven'>
                        <a href='/bicicletas' className='button'>Gestión de Bicicletas</a>
                        <p className='description'>Administra las bicicletas de la empresa.</p>
                    </div>
                    <div className='button-item'>
                        <a href='/inventario' className='button'>Gestión de Inventario</a>
                        <p className='description'>Administra el inventario de la empresa.</p>
                    </div>
                </div>
            </div>
        )
    }
    if(userRole === 'administrador'){
        return(
            <div className='home-container'>
                <div className='identificacion' >
                    <img src= {personIcon} alt='personIcon'></img>
                    <p>{user.email}</p>
                </div>
                <div className='titulo'>
                    <h1>Sistema de Gestión de Negocio Bikeep</h1>
                    <p style={{fontStyle: 'italic'}}>Bienvenido {user.nombreCompleto}.</p>
                </div>
                <div className='buttons-container'>
                    <div className='button-item'>
                        <a href='/users' className='button'>Gestión de Usuarios</a>
                        <p className='description'>Administra los usuarios del sistema.</p>
                    </div>
                    <div className='button-item-uneven'>
                        <a href='/proveedores' className='button'>Gestión de Proveedores</a>
                        <p className='description'>Administra los proveedores de la empresa.</p>
                    </div>
                    <div className='button-item'>
                        <a href='/servicio' className='button'>Gestión de Servicios</a>
                        <p className='description'>Administra los servicios aplicados a bicicletas.</p>
                    </div>
                    <div className='button-item-uneven'>
                        <a href='/bicicletas' className='button'>Gestión de Bicicletas</a>
                        <p className='description'>Administra las bicicletas de la empresa.</p>
                    </div>
                    <div className='button-item'>
                        <a href='/inventario' className='button'>Gestión de Inventario</a>
                        <p className='description'>Administra el inventario de la empresa.</p>
                    </div>
                    <div className='button-item-uneven'>
                        <a href='/estadisticas' className='button'>Ver Estadísticas</a>
                        <p className='description'>Visualiza las estadísticas de la empresa.</p>
                    </div>
                    <div className='button-item'>
                        <a href='/estadisticas/bicicletas' className='button'>Ver Estadísticas de Bicicletas</a>
                        <p className='description'>Visualiza las estadísticas de las bicicletas de la empresa.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home