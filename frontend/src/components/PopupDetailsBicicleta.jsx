import CloseIcon from "@assets/XIcon.svg";
import '@styles/popupDetails.css';

const PopupDetailsBicicletas = ({ data, onClose }) => {
    return (
        <div className='popup-container'>
            <div className='popup-content'>
                <h2>Detalles de la bicicleta</h2>
                <button className='close-button' onClick={onClose}> <img src={CloseIcon} alt="Close" /></button>
                <p><strong>Numero de serie:</strong> {data.numeroSerie}</p>
                <p><strong>Marca:</strong> {data.marca}</p>
                <p><strong>Modelo:</strong> {data.modelo}</p>
                <p><strong>Color:</strong> {data.color}</p>
                <p><strong>Tipo:</strong> {data.tipo}</p>
                <p><strong>Aro:</strong> {data.aro}</p>
                <p><strong>Venta:</strong> {data.venta}</p>
                <p><strong>Creada:</strong> {data.createdAt}</p>
                <p><strong>Actualizada:</strong> {data.updatedAt}</p>
            </div>
        </div>
    );
};

export default PopupDetailsBicicletas;