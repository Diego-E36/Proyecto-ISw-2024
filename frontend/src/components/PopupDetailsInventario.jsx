import CloseIcon from "@assets/XIcon.svg";
import '@styles/popupDetails.css';

const PopupDetailsInventario = ({ data, onClose }) => {
    return (
        <div className='popup-container'>
            <div className='popup-content'>
                <h2>Detalles de la bicicleta</h2>
                <button className='close-button' onClick={onClose}> <img src={CloseIcon} alt="Close" /></button>
                <p><strong>Numero de serie:</strong> {data.numeroSerie}</p>
                <p><strong>Stock:</strong> {data.cantidadStock}</p>
                <p><strong>Descripción:</strong> {data.descripcionUnidad}</p>
                <p><strong>Valor:</strong> {data.precioUnidad}</p>
                <p><strong>Marca:</strong> {data.marcaUnidad}</p>
                <p><strong>Proveedor:</strong> {data.nombre_proveedor}</p>
                <p><strong>Restock sugerido:</strong> {data.restockSugerido}</p>
                <p><strong>Umbral Minimo:</strong> {data.umbralMinimo}</p>
                <p><strong>Creada:</strong> {data.createdAt}</p>
                <p><strong>Actualizada:</strong> {data.updatedAt}</p>
            </div>
        </div>
    );
};

export default PopupDetailsInventario;