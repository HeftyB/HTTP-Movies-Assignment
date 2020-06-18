import { useState } from 'react'

export default function useForm(initialValue) {
    const [values, setValues] = useState(initialValue);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessMessage(true);
        localStorage.clear()
      };

    return [values, handleChanges, setValues, handleSubmit, showSuccessMessage]
}