import { useState } from "react";
import { sendEmail } from "@services/email.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

const useSendEmails = (fetchEmail) => {
    const [formState, setFormState] = useState({
    email: "",
    subject: "",
    message: "",
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const sendEmails = async (formData) => {
        try {
            const response = await sendEmail(formData);
            if (response.error || response.status === "Client error") {
                showErrorAlert(response.message , "Error al enviar el correo");
            } else {
                showSuccessAlert("Correo enviado exitosamente");
                fetchEmail();
                setIsPopupOpen(false);
            }
        } catch (error) {
            showErrorAlert("Ocurrió un error inesperado al enviar el correo");
            console.error("Error: ", error);
        }
    };

    const handleSend = async (formData) => {
        await sendEmails(formData);
    };

    return {
        sendEmails,
        formState,
        setFormState,
        isPopupOpen,
        setIsPopupOpen,
        handleSend,
    };
};

export default useSendEmails;


