import { useState } from 'react';
import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function SendEmail({ show, setShow, data, action }) {
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el bloqueo del envío

    const userEmail = data && data.length > 0 ? data[0] : {};

    const handleSubmit = async (formData) => {
        if (isSubmitting) return; // Evita múltiples envíos
        setIsSubmitting(true); // Bloquea el botón de envío

        try {
            await action(formData); // Espera a que se complete la acción
            setShow(false); // Cierra el popup tras un envío exitoso
        } catch (error) {
            console.error("Error enviando el formulario:", error);
        } finally {
            setIsSubmitting(false); // Desbloquea el botón, independientemente del resultado
        }
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Cerrar" />
                        </button>
                        <Form
                            title="Enviar email"
                            fields={[
                                {
                                    label: "Gmail",
                                    name: "email",
                                    defaultValue: userEmail.email,
                                    placeholder: "hola@gmail.com",
                                    fieldType: "input",
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
                                    fieldType: "input",
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
                                    fieldType: "input",
                                    type: "text",
                                    minLength: 5,
                                    maxLength: 500,
                                    required: true,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={isSubmitting ? "Enviando..." : "Enviar"} // Cambia el texto del botón durante el envío
                            disabled={isSubmitting} // Deshabilita el botón durante el envío
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
