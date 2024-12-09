import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';


export default function createServicio({ show, setShow, action }) {
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
                            title="Crear Servicio"
                            fields={[

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