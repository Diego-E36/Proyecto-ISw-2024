import Table from '@components/Table';
import useUsers from '@hooks/users/useGetUsers.jsx';
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import EmailIcon from '@mui/icons-material/Email';
import { useCallback, useState, useMemo } from 'react';
import '@styles/users.css';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';
import useSendEmails from '../hooks/email/useSendEmail';
import FormularioSendEmail from '@components/FormularioSendEmail.jsx';
import ViewIcon from '../assets/ViewIcon.svg';
import EngineerIcon from '../assets/EngineerIcon.svg';
import AdminIcon from '../assets/AdminIcon.svg';
import PersonAlertIcon from '../assets/PersonAlertIcon.svg';

const Users = () => {
  const { users, fetchUsers, setUsers } = useUsers();
  const [filterRut, setFilterRut] = useState('');
  const [rolFilter, setRolFilter] = useState(null);

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser,
  } = useEditUser(setUsers);

  const { handleDelete } = useDeleteUser(fetchUsers, setDataUser);

  const {
    formState,
    setFormState,
    isPopupOpen: isEmailPopupOpen,
    setIsPopupOpen: setEmailPopupOpen,
    handleSend,
  } = useSendEmails(fetchUsers);

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedUsers) => {
      setDataUser(selectedUsers);
      if (selectedUsers.length > 0) {
        setFormState({
          ...formState,
          email: selectedUsers[0]?.email || '',
        });
      }
    },
    [setDataUser, setFormState, formState]
  );

  const columns = [
    { title: 'Nombre', field: 'nombreCompleto', width: 350, responsive: 0, vertAlign: "middle"},
    { title: 'Correo electrónico', field: 'email', width: 300, responsive: 3, vertAlign: "middle"},
    { title: 'Rol', field: 'rol', width: 200, responsive: 2, vertAlign: "middle" },
    { title: 'RUT', field: 'rut', width: 150, responsive: 2, vertAlign: "middle" },
    { title: 'Creado', field: 'createdAt', width: 200, responsive: 2, vertAlign: "middle" },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if(rolFilter === null) return true; //Mostrar todos los usuarios
      if(rolFilter === 0) return user.rol === "Administrador"; //Usuario es admin
      if(rolFilter === 1) return user.rol === "Usuario"; //Usuario es operador
      if(rolFilter === 2) return user.rol === "Invitado"; //Usuario es invitado
      return true;
    })
  }, [users, rolFilter]);

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Usuarios</h1>
          <div className="filter-actions">

            <button onClick={() => setRolFilter(null)}>
              <img src={ViewIcon}/>
              Mostrar todos
            </button>
            <button onClick={() => setRolFilter(0)}>
              <img src={AdminIcon}/>
              Administradores
            </button>
            <button onClick={() => setRolFilter(1)}>
              <img src={EngineerIcon}/>
              Operadores
            </button>
            <button onClick={() => setRolFilter(2)}>
              <img src={PersonAlertIcon}/>
              Invitados
            </button>

            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'RUT'}/>

            <button onClick={handleClickUpdate} disabled={dataUser.length === 0}>
              {dataUser.length === 0 ? (
                  <img src={UpdateIconDisable} alt="edit-disabled"/>
              ) : (
                  <img src={UpdateIcon} alt="edit"/>
              )}
            </button>
            <button disabled={dataUser.length === 0} onClick={() => handleDelete(dataUser)}>
              {dataUser.length === 0 ? (
                  <img src={DeleteIconDisable} alt="delete-disabled"/>
              ) : (
                  <img src={DeleteIcon} alt="delete"/>
              )}
            </button>
            <button className="email-user-button" disabled={dataUser.length === 0}
                    onClick={() => setEmailPopupOpen(true)}>
              <EmailIcon/>
            </button>
          </div>
        </div>
        <Table
            data={filteredUsers}
            columns={columns}
            filter={filterRut}
            dataToFilter={'rut'}
            initialSortName={'nombreCompleto'}
            onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate}/>
      {isEmailPopupOpen && (
          <FormularioSendEmail
              show={isEmailPopupOpen}
              setShow={setEmailPopupOpen}
              data={dataUser}
              action={handleSend}
          />
      )}
    </div>
  );
};

export default Users;
