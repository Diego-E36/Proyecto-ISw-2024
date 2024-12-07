const Home = () => {

    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;

    if(userRole === 'invitado'){
        return (
            <div className='main-container'>
                <div className='swal2-info'>
                    <h1 className='swal2-title' style={{textAlign: 'center'}}>¡Bienvenido!</h1>
                    <div className='warning'>
                        <p>Espera a que el administrador del sistema te asigne un rol válido.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='main-container'>
            <div className='swal2-info'>
                <h1 className='swal2-title'>¡Bienvenido!</h1>
                <div className='warning'>
                    <p>Sitio aún en construcción</p>
                </div>
      </div>
    </div>
  )
}

export default Home