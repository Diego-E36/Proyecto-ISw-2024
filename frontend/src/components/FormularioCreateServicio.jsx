import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';

export default function createServicio({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData);
    };

    const serialPattern = /^[a-zA-Z0-9]+$/;
    const patronSN = /^[0-9a-zA-Z\s]+$/;
    const rutPattern = /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/
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
                            title="Crear Servicio"
                            fields={[
                                {
                                    label: (
                                        <span>
                                            RUT
                                            <span className='tooltip-icon'>
                                                <img src={QuestionIcon} />
                                                <span className='tooltip-text'>El RUT ingresado debe ser el de un usuario registrado en el sistema.</span>
                                                </span>
                                        </span>
                                    ),
                                    name: "rut",
                                    defaultValue: "",
                                    placeholder: "xxxxxxxx-x",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 9,
                                    maxLength: 12,
                                    pattern: rutPattern,
                                    patternMessage: "Formato rut inválido"
                                },
                                {
                                    label: (
                                        <span>
                                            Bicicleta
                                            <span className='tooltip-icon'>
                                                <img src={QuestionIcon} />
                                                <span className='tooltip-text'>El parámetro ingresado debe ser el número de serie de una bicicleta.</span>
                                                </span>
                                        </span>
                                    ),
                                    name: "bicicleta",
                                    defaultValue: "",
                                    placeholder: "ID0000",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: patronSN,
                                    patternMessage: "Debe contener sólo letras y números, sin caracteres especiales",
                                },

                                {
                                    label: (
                                        <span>
                                            Item
                                            <span className='tooltip-icon'>
                                                <img src={QuestionIcon} />
                                                <span className='tooltip-text'>El parámetro ingresado debe ser el número de serie de un item de inventario.</span>
                                                </span>
                                        </span>
                                    ),
                                    name: "item",
                                    defaultValue: "",
                                    placeholder: "ID000",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: serialPattern,
                                    patternMessage: "Debe contener sólo letras y números, sin caracteres especiales",
                                },
                                {
                                    label: "Tipo",
                                    name: "tipo",
                                    defaultValue: "",
                                    placeholder: "Cambio de rueda",
                                    fieldType: "input",
                                    type: "text",
                                    minLength: 3,
                                    maxLength: 100,
                                    pattern: alphaPattern,
                                    patternMessage: "Debe contener sólo letras",
                                    required: true,
                                },

                                {
                                    label: "¿Estado?",
                                    name: "estado",
                                    defaultValue: "",
                                    fieldType: "select",
                                    options: [
                                        { value: "Espera", label: "Espera" },
                                        { value: "Reparación", label: "Reparación" },
                                        { value: "Finalizado", label: "Finalizado" }
                                    ],
                                    required: true
                                },
                                {
                                    label: "Valor",
                                    name: "valor",
                                    defaultValue: "",
                                    fieldType: "input",
                                    type: "text",
                                    placeholder: 150000,
                                    required: true,
                                },
                                {
                                    label: "Descripción",
                                    name: "descripcion",
                                    defaultValue: "",
                                    fieldType: "input",
                                    type: "text",
                                    placeholder: "Cambio de rueda trasera",
                                    required: true,

                                },
                                {
                                    label: "Duración en minutos",
                                    name: "duracionMins",
                                    defaultValue: "",
                                    fieldType: "input",
                                    type: "text",
                                    placeholder: 120,
                                    required: true,
                                },
                                {
                                    label: (
                                        <span>
                                            Cantidad
                                            <span className='tooltip-icon'>
                                                <img src={QuestionIcon} />
                                                <span className='tooltip-text'>El número ingresado será restado de las unidades de inventario respectivas.</span>
                                                </span>
                                        </span>
                                    ),
                                    name: "cantidad",
                                    defaultValue: "",
                                    fieldType: "input",
                                    type: "text",
                                    placeholder: 2,
                                    required: true,
                                }

                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Registrar servicio"}
                        />
                    </div>
                </div>
            )}
        </div>
    )
};