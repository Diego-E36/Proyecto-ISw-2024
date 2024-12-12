import Form from './Form.jsx'
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';

export default function EditBici({show, setShow, data, action}){
    const biciData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    };

    const patron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ +\s]+$/;
    const patronSN = /^[0-9a-zA-Z\s]+$/;
    const patronSL = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // Manejo del valor de venta:
    let dineroVenta;
    const dineroAInt = (str) => {
        if(str){
            return parseInt(str.replace(/[$.]/g, ''), 10);
        }
    }
    dineroVenta = dineroAInt(biciData.venta);
    if (isNaN(dineroVenta)) {
        dineroVenta = 0;
    }

    return(
        <div>
            { show && (
                <div className="bg">
                    <div className='popup'>
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Editar bicicleta"
                            fields={[
                                {
                                    label: "Número de serie",
                                    name: "numeroSerie",
                                    defaultValue: biciData.numeroSerie || "",
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
                                    defaultValue: biciData.marca || "",
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
                                    defaultValue: biciData.modelo || "",
                                    placeholder: 'Carrera 1',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: patron,
                                    patternMessage: "Debe contener solo letras y números",
                                },
                                {
                                    label: "Color",
                                    name: "color",
                                    defaultValue: biciData.color || "",
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
                                    defaultValue: biciData.tipo || "",
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
                                    defaultValue: biciData.aro || "",
                                    placeholder: '26',
                                    fieldType: 'input',
                                    type: 'text',
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
                                                <span className='tooltip-text'>Este campo es opcional, si no se ingresa un valor, se considerará que la bicicleta no está a la venta.</span>
                                            </span>
                                        </span>
                                    ),
                                    name: "venta",
                                    defaultValue: dineroVenta || "0",
                                    placeholder: '100000',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: false,
                                    min: 1,
                                }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Editar bicicleta"}
                        />
                    </div>
                </div>
            ) }
        </div>
    );
}