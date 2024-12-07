import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import Bicicletas from '@pages/Bicicletas';
import Inventario from '@pages/Inventario';
import Proveedores from '@pages/Proveedores';
import NotificacionesTable from '@pages/Notificaciones';
import EstadisticasInventarioprueba from '@pages/EstadisticasInventarioprueba';
import EstadisticasBicicletasprueba from '@pages/EstadisticasBicicletasprueba';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
//import '@styles/index.css'; si lo activo, se desconfigura to

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/users',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Users />
        </ProtectedRoute>
        ),
      },
      {
        path: '/proveedores',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Proveedores />
        </ProtectedRoute>
        ),
      },
      {
        path: '/inventario',
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
          <Inventario />
        </ProtectedRoute>
        ),
      },
      {
        path: '/bicicletas',
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
          <Bicicletas />
        </ProtectedRoute>
        )
      },
      {
        path: '/notificaciones',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <NotificacionesTable />
        </ProtectedRoute>
        )
      },
      {
        path: '/estadisticas',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <EstadisticasInventarioprueba />
        </ProtectedRoute>
        )
      },
      {
        path: '/estadisticas/bicicletas',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <EstadisticasBicicletasprueba />
        </ProtectedRoute>
        )
      }
    ]
  },

  {
    path: '/auth',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)