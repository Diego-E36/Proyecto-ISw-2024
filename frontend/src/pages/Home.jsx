import '@styles/home.css';
import personIcon from '../assets/person_24dp_092B50_FILL0_wght400_GRAD0_opsz24.svg'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import InventoryIcon from '@mui/icons-material/Inventory';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ConstructionIcon from '@mui/icons-material/Construction';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Home = () => {

    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;

    // console.log(userRole);
    // console.log(user)

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
                        <div className='icon-button'>
                            <ConstructionIcon className='iconHome'></ConstructionIcon>
                            <a href='/servicio' className='button'>Gestión de Servicios</a>
                        </div>
                        <p className='description'>Administra los servicios aplicados a bicicletas.</p>
                    </div>
                    <div className='button-item-uneven'>
                        <div className='icon-button'>
                            <PedalBikeIcon className='iconHome'></PedalBikeIcon>
                            <a href='/bicicletas' className='button'>Gestión de Bicicletas</a>
                        </div>
                        <p className='description'>Administra las bicicletas de la empresa.</p>
                    </div>
                    <div className='button-item'>
                        <div className='icon-button'>
                            <InventoryIcon className='iconHome'></InventoryIcon>
                            <a href='/inventario' className='button'>Gestión de Inventario</a>
                        </div>
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
                        <div className='icon-button'>
                            <PeopleAltIcon className='iconHome'></PeopleAltIcon>
                        <a href='/users' className='button'>Gestión de Usuarios</a>
                        </div>
                        <p className='description'>Administra los usuarios del sistema.</p>
                    </div>
                    <div className='button-item-uneven'>
                        <div className='icon-button'>
                            <ManageAccountsIcon className='iconHome'></ManageAccountsIcon>
                        <a href='/proveedores' className='button'>Gestión de Proveedores</a>
                        </div>
                        <p className='description'>Administra los proveedores de la empresa.</p>
                    </div>
                    <div className='button-item'>
                        <div className='icon-button'>
                            <ConstructionIcon className='iconHome'></ConstructionIcon>
                            <a href='/servicio' className='button'>Gestión de Servicios</a>
                        </div>
                        <p className='description'>Administra los servicios aplicados a bicicletas.</p>
                    </div>
                    <div className='button-item-uneven'>
                        <div className='icon-button'>
                            <PedalBikeIcon className='iconHome'></PedalBikeIcon>
                            <a href='/bicicletas' className='button'>Gestión de Bicicletas</a>
                        </div>
                        <p className='description'>Administra las bicicletas de la empresa.</p>
                    </div>
                    <div className='button-item'>
                        <div className='icon-button'>
                            <InventoryIcon className='iconHome'></InventoryIcon>
                            <a href='/inventario' className='button'>Gestión de Inventario</a>
                        </div>
                        <p className='description'>Administra el inventario de la empresa.</p>
                    </div>
                    <div className='button-item-uneven'>
                        <div className='icon-button'>
                            <EqualizerIcon className='iconHome'></EqualizerIcon>
                            <a href='/estadisticas' className='button'>Ver Estadísticas de Inventario</a>
                        </div>
                        <p className='description'>Visualiza las estadísticas del inventario de la empresa.</p>
                    </div>
                    <div className='button-item'>
                        <div className='icon-button'>
                            <EqualizerIcon className='iconHome'></EqualizerIcon>
                            <a href='/estadisticas/bicicletas' className='button'>Ver Estadísticas de Bicicletas</a>
                        </div>
                        <p className='description'>Visualiza las estadísticas de las bicicletas de la empresa.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home