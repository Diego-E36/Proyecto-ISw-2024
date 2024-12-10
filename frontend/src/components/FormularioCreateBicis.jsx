import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';

// Popup para la creación de bicicletas
export default function CreateBici({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData);
    };

    const patron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ \s]+$/;
    const patronSN = /^[0-9a-zA-Z\s]+$/;
    const patronSL = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className='popup'>
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Registrar bicicleta"
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
                                    pattern: patronSN,
                                    patternMessage: "Debe contener sólo letras y números, sin caracteres especiales",
                                },
                                {
                                    label: "Marca",
                                    name: "marca",
                                    defaultValue: "",
                                    placeholder: 'Bianchi',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: patron,
                                    patternMessage: "Debe contener solo letras y números",
                                },
                                {
                                    label: "Modelo",
                                    name: "modelo",
                                    defaultValue: "",
                                    placeholder: 'Carrera 1',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: patron,
                                    patternMessage: "Debe contener solo letras, números y espacios",
                                },
                                {
                                    label: "Color",
                                    name: "color",
                                    defaultValue: "",
                                    placeholder: 'Rojo',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 4,
                                    maxLength: 20,
                                    pattern: patronSL,
                                    patternMessage: "Debe contener solo letras",
                                },
                                {
                                    label: "Tipo",
                                    name: "tipo",
                                    defaultValue: "",
                                    placeholder: 'Mountain Bike',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: patron,
                                    patternMessage: "Debe contener solo letras y números",
                                },
                                {
                                    label: "Aro",
                                    name: "aro",
                                    defaultValue: "",
                                    placeholder: '26',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: true,
                                    min: 10,
                                    max: 35,
                                },
                                {
                                    label: (
                                        <span>
                                            Venta
                                            <span className='tooltip-icon'>
                                                <img src={QuestionIcon} />
                                                <span className='tooltip-text'>Este campo es opcional, si no se ingresa un valor, será 0 y se considerará que la bicicleta no está a la venta.</span>
                                            </span>
                                        </span>
                                    ),
                                    name: "venta",
                                    defaultValue: "0",
                                    placeholder: '100000',
                                    fieldType: 'input',
                                    type: 'number',
                                    required: false,
                                    min: 0,
                                }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Registrar bicicleta"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}