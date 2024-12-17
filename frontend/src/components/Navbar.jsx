import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import InventoryIcon from '@mui/icons-material/Inventory';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ConstructionIcon from '@mui/icons-material/Construction';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Badge from '@mui/material/Badge';


import useGetNotificacion from '../hooks/notificaciones/useGetNotificacion';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const { unreadCount } = useGetNotificacion();

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    
    
    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        if (!menuOpen) {
            removeActiveClass();
        } else {
            addActiveClass();
        }
        setMenuOpen(!menuOpen);
    };

    const removeActiveClass = () => {
        const activeLinks = document.querySelectorAll('.nav-menu ul li a.active');
        activeLinks.forEach(link => link.classList.remove('active'));
    };

    const addActiveClass = () => {
        const links = document.querySelectorAll('.nav-menu ul li a');
        links.forEach(link => {
            if (link.getAttribute('href') === location.pathname) {
                link.classList.add('active');
            }
        });
    };

    // Para que cada vez que cambie de link al hacer click se actualice el active
    useEffect(() => {
        const links = document.querySelectorAll('.nav-menu ul li a');
        links.forEach(link => {
            if (link.getAttribute('href') === location.pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }, [location.pathname]);

    return (
        <>
            <nav className="horizontal-navbar">
            <div className="navbar-content">
                <div className="navbar-title">Bikeep</div>
                <div className="navbar-icons">
                    {(userRole === 'administrador' || userRole === 'usuario') && (
                        <Badge badgeContent={unreadCount} color="error">
                        {unreadCount > 0 ? (
                            <NotificationsActiveIcon
                                className="icon unread-icon"
                                onClick={() => navigate('/notificaciones')}
                            />
                        ) : (
                            <NotificationsIcon
                                className="icon"
                                onClick={() => navigate('/notificaciones')}
                            />
                        )}
                    </Badge>
                    )}
                    <Brightness4Icon className="icon" onClick={toggleDarkMode} />
                </div>
            </div>
        </nav>
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink 
                            to="/home" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            <HomeIcon className="icon" /> Inicio
                        </NavLink>
                    </li>
                    {(userRole === 'administrador') && (
                    <li>
                        <NavLink 
                            to="/users" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            <PeopleAltIcon className="icon" /> Usuarios
                        </NavLink>
                    </li>
                    )}
                    {(userRole === 'administrador') && (
                    <li>
                        <NavLink 
                            to="/proveedores" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            <ManageAccountsIcon className="icon" /> Proveedores
                        </NavLink>
                    </li>
                    )}
                    {(userRole === 'administrador' || userRole === 'usuario') && (
                        <li>
                            <NavLink
                                to="/servicio"
                                onClick={() => {
                                    setMenuOpen(false);
                                    addActiveClass();
                                }}
                                activeClassName="active"
                                >
                                    <ConstructionIcon className="icon" /> Servicio
                            </NavLink>
                        </li>
                    )}
                    {(userRole === 'administrador' || userRole === 'usuario') && (
                        <li>
                            <NavLink
                                to="/bicicletas"
                                onClick={() => {
                                    setMenuOpen(false);
                                    addActiveClass();
                                }}
                                activeClassName="active"
                                >
                                    <PedalBikeIcon className="icon" /> Bicicletas
                            </NavLink>
                        </li>
                    )}
                    {(userRole === 'administrador' || userRole === 'usuario') && (
                        <li>
                            <NavLink
                                to="/inventario"
                                onClick={() => {
                                    setMenuOpen(false);
                                    addActiveClass();
                                }}
                                activeClassName="active"
                                >
                                <InventoryIcon className="icon" />Inventario
                            </NavLink>
                        </li>
                    )}
                    {userRole === 'administrador' && (
                        <li>
                        <details>
                            <summary>
                                <EqualizerIcon className="icon" />Estadísticas
                            </summary>
                            <ul>
                                <li>
                                    <NavLink
                                        to="/estadisticas"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            addActiveClass();
                                        }}
                                        activeClassName="active"
                                    >
                                        Inventario
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/estadisticas/bicicletas"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            addActiveClass();
                                        }}
                                        activeClassName="active"
                                    >
                                        Bicicletas
                                    </NavLink>
                                </li>
                            </ul>
                        </details>
                    </li>
                    )}
                    <li className="logout">
                        <NavLink 
                            to="/auth" 
                            onClick={() => { 
                                logoutSubmit(); 
                                setMenuOpen(false); 
                            }} 
                            activeClassName="active"
                        >
                            <ExitToAppIcon className="icon" />Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    </>
    );
};

export default Navbar;