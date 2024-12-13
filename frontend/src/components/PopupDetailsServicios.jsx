import CloseIcon from "@assets/XIcon.svg";
import '@styles/popupDetailsServicios.css';

const PopupDetailsServicios = ({ data, onClose }) => {
    return (
        <div className='popup-container'>
            <div className='popup-content'>
                <h2>Detalles del Servicio</h2>
                <button className='close-button' onClick={onClose}> <img src={CloseIcon} alt="Close" /></button>
                <p><strong>ID:</strong> {data.id}</p>
                <p><strong>RUT:</strong> {data.rut}</p>
                <p><strong>Item:</strong> {data.item}</p>
                <p><strong>Bicicleta:</strong> {data.bicicleta}</p>
                <p><strong>Tipo:</strong> {data.tipo}</p>
                <p><strong>Estado:</strong> {data.estado}</p>
                <p><strong>Valor:</strong> {data.valor}</p>
                <p><strong>Descripción:</strong> {data.descripcion}</p>
                <p><strong>Duración:</strong> {data.duracionMins} mins</p>
                <p><strong>Creada:</strong> {data.createdAt}</p>
                <p><strong>Actualizada:</strong> {data.updatedAt}</p>
            </div>
        </div>
    );
};

export default PopupDetailsServicios;