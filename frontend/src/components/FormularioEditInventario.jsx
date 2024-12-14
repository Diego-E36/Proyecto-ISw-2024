// Imports
import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';

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
    
    // Manejo del valor del precio
    let costoUnidad;
    const precioToNumber = (str) => {
        if (str) {
            return parseInt(str.replace(/[$.]/g, ''), 10);
        }
    }
    costoUnidad = precioToNumber(inventarioData.precioUnidad);
    if (isNaN(costoUnidad)) {
        costoUnidad = 0;
    }

    // // Manejo de booleano
    // const manejarBool = (bool) => {
    //     console.log("1", bool);
    //     if (bool === true) {
    //         console.log("2", bool);
    //         return true;
    //     } else {
    //         console.log("2", bool);
    //         return false;
    //     }
    // }
    
    
    // // Manejo de booleano
    // let booleano;
    // const boolToString = (bool) => {
    //     if (bool === true) {
    //         return "Sí";
    //     } else {
    //         return "No";
    //     }
    // }

    // booleano = boolToString(inventarioData.boolMateriales);

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className='popup'>
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Editar inventario"
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
                                    defaultValue: inventarioData.cantidadStock || "0",
                                    placeholder: '10',
                                    fieldType: 'input',
                                    type: 'text',
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
                                    label: (
                                        <span>
                                            Precio por unidad
                                            <span className='tooltip-icon'>
                                                <img src={QuestionIcon} />
                                                <span className='tooltip-text'>En caso de ingresar un 0, se considerará que el producto no está en venta.</span>
                                                </span>
                                        </span>
                                    ),
                                    name: "precioUnidad",
                                    defaultValue: costoUnidad ||"0",
                                    placeholder: '10000',
                                    fieldType: 'input',
                                    type: 'text',
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
                                    name: "nombre_proveedor",
                                    defaultValue: inventarioData.nombre_proveedor || "",
                                    placeholder: 'Aceites S.A.',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: alphanumericPattern,
                                    patternMessage: "Debe contener sólo letras y números",
                                },
                                {
                                    label: "Restock sugerido",
                                    name: "restockSugerido",
                                    defaultValue: inventarioData.restockSugerido || "",
                                    placeholder: '10',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true
                                },
                                {
                                    label: "Umbral mínimo",
                                    name: "umbralMinimo",
                                    defaultValue: inventarioData.umbralMinimo || "",
                                    placeholder: '5',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true
                                },
                                // {
                                //     label: "¿Son materiales?",
                                //     name: "boolMateriales",
                                //     fieldType: 'select',
                                //     defaultValue: inventarioData.boolMateriales === true ? true : false,
                                //     options: [
                                //         { value: true, label: "Sí" },
                                //         { value: false, label: "No" }
                                //     ],
                                //     required: true
                                // }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Editar inventario"}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}