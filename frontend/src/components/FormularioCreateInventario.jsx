// Imports
import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

// Popup para la creación de inventarios
export default function CreateInventario({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData);
    };

    // Patrones para validación de campos
    const serialPattern = /^[a-zA-Z0-9]+$/
    const alphanumericPattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/
    const alphaPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className='popup'>
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Crear inventario"
                            fields={[
                                {
                                    label: "Número de serie",
                                    name: "numeroSerie",
                                    defaultValue: "",
                                    placeholder: '1234ABCabc',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: serialPattern,
                                    patternMessage: "Debe contener sólo letras y números, sin caracteres especiales",
                                },
                                {
                                    label: "Nombre del stock",
                                    name: "nombreStock",
                                    defaultValue: "",
                                    placeholder: 'Producto',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 5,
                                    maxLength: 255,
                                    pattern: alphanumericPattern,
                                    patternMessage: "Debe contener sólo letras y números",
                                },
                                {
                                    label: "Cantidad en stock",
                                    name: "cantidadStock",
                                    defaultValue: "",
                                    placeholder: '10',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "Descripción de la unidad",
                                    name: "descripcionUnidad",
                                    defaultValue: "",
                                    placeholder: 'Producto de calidad',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 3,
                                    maxLength: 100,
                                    pattern: alphaPattern,
                                    patternMessage: "Debe contener sólo letras",
                                },
                                {
                                    label: "Precio por unidad",
                                    name: "precioUnidad",
                                    defaultValue: "",
                                    placeholder: '10000',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "Marca del producto",
                                    name: "marcaUnidad",
                                    defaultValue: "",
                                    placeholder: 'Marca',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: alphanumericPattern,
                                    patternMessage: "Debe contener sólo letras y números",
                                },
                                {
                                    label: "Proveedor",
                                    name: "id_proveedor",
                                    defaultValue: "",
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "Restock sugerido",
                                    name: "restockSugerido",
                                    defaultValue: "",
                                    placeholder: '10',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "Umbral mínimo",
                                    name: "umbralMinimo",
                                    defaultValue: "",
                                    placeholder: '5',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "¿Son materiales?",
                                    name: "boolMateriales",
                                    defaultValue: "",
                                    fieldType: 'input',
                                    type: 'checkbox',
                                    required: false
                                }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Crear inventario"}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}