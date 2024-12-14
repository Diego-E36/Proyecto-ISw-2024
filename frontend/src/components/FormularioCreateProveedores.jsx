// Imports
import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

// Popup para la creación de proveedores
export default function createProveedor({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData);
    };

    // Patrones para validación de campos
    const rutPattern = /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/
    const nombrePattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/
    const telefonoPattern = /^[+]?[0-9]+$/

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className='popup'>
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Crear proveedor"
                            fields={[
                                {
                                    label: "RUT del proveedor",
                                    name: "rut",
                                    defaultValue: "",
                                    placeholder: "XXXXXXXX-X",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 9,
                                    maxLength: 12,
                                    pattern: rutPattern,
                                    patternMessage: "Formato RUT inválido"
                                },
                                {
                                    label: "Nombre",
                                    name: "nombre",
                                    defaultValue: "",
                                    placeholder: "John Doe",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    maxLength: 50,
                                    pattern: nombrePattern,
                                    patternMessage: "El nombre solo puede contener letras y números"
                                },
                                {
                                    label: "Email",
                                    name: "email",
                                    defaultValue: "",
                                    placeholder: "john.doe@gmail.cl",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    maxLength: 50,
                                },
                                {
                                    label: "Teléfono",
                                    name: "telefono",
                                    defaultValue: "",
                                    placeholder: "+56912345678",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 9,
                                    maxLength: 12,
                                    pattern: telefonoPattern,
                                    patternMessage: "El teléfono solo puede contener números y el símbolo +"
                                }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Registrar proveedor"}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}