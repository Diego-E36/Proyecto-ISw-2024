import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function sendEmail({ show, setShow, data, action }) {

    const userEmail = data && data.length > 0 ? data[0] : {};

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
                            title="Enviar email"
                            fields={[
                                {
                                    label: "Gmail",
                                    name: "email",
                                    defaultValue: userEmail.email,
                                    placeholder: "hola@gmail.com",
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 5,
                                    maxLength: 50,
                                    required: true,
                                },
                                {
                                    label: "Asunto",
                                    name: "subject",
                                    defaultValue: "",
                                    placeholder: "Aviso",
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 5,
                                    maxLength: 50,
                                    required: true,
                                },
                                {
                                    label: "Mensaje",
                                    name: "message",
                                    defaultValue: "",
                                    placeholder: "hola buenos dias",
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 5,
                                    maxLength: 500,
                                    required: true,
                                }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Enviar"}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}