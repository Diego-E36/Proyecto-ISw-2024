// Imports
import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

// Popup para la edición de inventarios
export default function EditInventario({ show, setShow, data, action }) {
    const inventarioData = data && data.length > 0 ? data[0] : {}; // Si hay datos

    // Función para enviar los datos del formulario
    const handleSubmit = (formData) => {
        action(formData);
    }

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
                                    defaultValue: inventarioData.numeroSerie || "",
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
                                    defaultValue: inventarioData.nombreStock || "",
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
                                    defaultValue: inventarioData.cantidadStock || "",
                                    placeholder: '10',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "Descripción de la unidad",
                                    name: "descripcionUnidad",
                                    defaultValue: inventarioData.descripcionUnidad || "",
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
                                    defaultValue: inventarioData.precioUnidad || "",
                                    placeholder: '10000',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "Marca del producto",
                                    name: "marcaUnidad",
                                    defaultValue: inventarioData.marcaUnidad || "",
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
                                    defaultValue: inventarioData.id_proveedor || "",
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "Restock sugerido",
                                    name: "restockSugerido",
                                    defaultValue: inventarioData.restockSugerido || "",
                                    placeholder: '10',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "Umbral mínimo",
                                    name: "umbralMinimo",
                                    defaultValue: inventarioData.umbralMinimo || "",
                                    placeholder: '5',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true
                                },
                                {
                                    label: "¿Son materiales?",
                                    name: "boolMateriales",
                                    defaultValue: inventarioData.boolMateriales || "",
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