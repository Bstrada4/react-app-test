import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react"

export const useForm = <T>( initState: T) => {

    const [ formData, setFormData ] = useState(initState);
    const [ errors, setErrors ] = useState<{ [key: string]: string }>({});

    const onChange = ( event: ChangeEvent<HTMLInputElement>) => {

        const { name, type, checked, value } = event.target;

        setFormData( prev => ({
            ...prev
            ,[name]: type === "checkbox" ? checked : value
        }));
    }

     // onChange para select
     const onSelectChange = (event: SelectChangeEvent) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const validateFormData = () => {
        const validationErrors: { [key: string]: string } = {};

        // Recorre las claves de formData para validar dinámicamente
        for (const key in formData) {
            if (key) {
                const value = formData[key as keyof T];

                // Validaciones personalizadas
                if (typeof value === "string" && !value.trim()) {
                    validationErrors[key] = `El campo ${key} es obligatorio`;
                } else if (typeof value === "boolean" && !value) {
                    validationErrors[key] = `Debes aceptar la ${key}`;
                }
            }
        }

        setErrors(validationErrors); // Actualiza los errores
        return validationErrors;
    };
    
    return {
        ...formData
        //PROPERTIES
        ,formData
        ,errors

        //METHODS
        ,onChange
        ,onSelectChange
        ,validateFormData
     }
}
