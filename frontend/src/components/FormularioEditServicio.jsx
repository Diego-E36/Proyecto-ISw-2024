import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';


export default function EditServicio({ show, setShow, data, action }) {

    const servicioData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    };



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
                                    label: "id_bicicleta",
                                    name: "id_bicicleta",
                                    defaultValue: servicioData.id_bicicleta || "",
                                    placeholder: "",
                                    fieldType: "input",
                                    type: "number",
                                    required: false,
                                    minLength: 1,
                                    maxLength: 12,
                                },

                                {
                                    label: "¿Estado?",
                                    name: "estado",
                                    defaultValue: "Espera",
                                    fieldType: 'select',
                                    options: [
                                        { value: "Espera", label: "Espera" },
                                        { value: "Reparación", label: "Reparación" },
                                        { value: "Finalizado", label: "Finalizado" }
                                    ],
                                    required: true
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