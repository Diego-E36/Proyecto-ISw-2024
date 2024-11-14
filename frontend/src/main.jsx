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
import EstadisticasInventarioprueba from '@pages/EstadisticasInventarioprueba';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';

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
        path: '/inventario',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Inventario />
        </ProtectedRoute>
        ),
      },
      {
        path: '/bicicletas',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Bicicletas />
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