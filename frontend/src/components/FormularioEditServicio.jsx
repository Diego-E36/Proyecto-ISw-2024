import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';


export default function EditServicio({ show, setShow, data, action }) {

    const servicioData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    };

    const serialPattern = /^[a-zA-Z0-9]+$/;
    const patronSN = /^[0-9a-zA-Z\s]+$/;
    const patternRut = new RegExp(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/);
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
                            title="Editar Servicio"
                            fields={[
                                {
                                    label: "Rut",
                                    name: "rut",
                                    defaultValue: servicioData.rut || "",
                                    placeholder: '21.308.770-3',
                                    fieldType: "input",
                                    type: "text",
                                    minLength: 9,
                                    maxLength: 12,
                                    pattern: patternRut,
                                    patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                                },
                                {
                                    label: "Bicicleta",
                                    name: "bicicleta",
                                    defaultValue: servicioData.bicicleta || "",
                                    placeholder: '1234ABCabc',
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: patronSN,
                                    patternMessage: "Debe contener sólo letras y números, sin caracteres especiales",
                                },
                                {
                                    label: "Item",
                                    name: "item",
                                    defaultValue: servicioData.item || "",
                                    placeholder: 'ID000',
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: serialPattern,
                                    patternMessage: "Debe contener sólo letras y números, sin caracteres especiales",
                                },
                                {
                                    label: "Tipo",
                                    name: "tipo",
                                    defaultValue: servicioData.tipo || "",
                                    placeholder: 'Cambio de rueda',
                                    fieldType: 'input',
                                    type: 'text',
                                    minLength: 3,
                                    maxLength: 100,
                                    pattern: alphaPattern,
                                    patternMessage: "Debe contener sólo letras"
                                },
                                {
                                    label: "¿Estado?",
                                    name: "estado",
                                    defaultValue: servicioData.estado || "",
                                    fieldType: 'select',
                                    options: [
                                        { value: "Espera", label: "Espera" },
                                        { value: "Reparación", label: "Reparación" },
                                        { value: "Finalizado", label: "Finalizado" }
                                    ],
                                },
                                {
                                    label: "Valor",
                                    name: "valor",
                                    defaultValue: servicioData.valor || "",
                                    fieldType: 'input',
                                    type: 'text',
                                },
                                {
                                    label: "Descripción",
                                    name: "descripcion",
                                    defaultValue: servicioData.descripcion || "",
                                    fieldType: 'input',
                                    type: 'text',
                                },
                                {
                                    label: "Duración en minutos",
                                    name: "duracionMins",
                                    defaultValue: servicioData.duracionMins || "",
                                    fieldType: 'input',
                                    type: 'text'
                                },
                                {
                                    label: "Cantidad",
                                    name: "cantidad",
                                    defaultValue: "",
                                    fieldType: "input",
                                    type: "text",
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