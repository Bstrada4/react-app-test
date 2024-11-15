import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import Button from '@mui/material/Button';

//CSS
import '../css/SeguroSaludFlexible.css';

//IMG
import imgFamily from '../img/family.png';
import blurOne from '../../../shared/img/blur/blur-asset.png';
import blurTwo from '../../../shared/img/blur/blur-asset2.png';
import { useForm } from '../../../hooks/useForm';

export const SeguroSaludFlexible = () => {

    const navigate = useNavigate(); // Inicializa el hook para redirigir

    const { formData, onChange, onSelectChange, errors, validateFormData,
        sTipoDocumento
        ,sDocumento
        ,sCelular
        ,bPoliticaPriv
        ,bPoliticaCom
    } = useForm({
        sTipoDocumento  : '1'
        ,sDocumento     : ''
        ,sCelular       : ''
        ,bPoliticaPriv  : false
        ,bPoliticaCom   : false
    });

    const onSubmit = (event: FormEvent<HTMLElement>) => {
        event.preventDefault();

        // Validar campos
        const errors = validateFormData();
        if (Object.keys(errors).length > 0) {
            console.log("Errores de validación", errors);
            return; // Si hay errores, no enviamos el formulario
        }
        console.log( formData );
        navigate('/planes', { state: formData });
    }

    return (
        <div>
            <section className="sectSeguroSaludFlexible">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-xl-5">
                            <img src={ imgFamily } alt="" width="100%" className="imgFamilyDesktop" />
                        </div>
                        
                        <div className="col-lg-6 col-xl-7">
                            <form noValidate onSubmit={ onSubmit }>
                                <div className="boxSeguroSaludFlexible">
                                    <div className="boxHead">
                                        <div className="boxTitle">
                                            <span>Seguro Salud Flexible</span>
                                            <h3>Creado para ti y tu <br className="hideBr" /> familia</h3>                                            
                                        </div>
                                        <div className="boxImgFamily"><img src={ imgFamily } alt="" width="100%" className="imgFamilyMobile" /></div>
                                        <div className="boxDescription"><p>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</p></div>
                                    </div>

                                    <div className="boxBody">
                                        <div className="inputDNI">
                                            <FormControl
                                                fullWidth
                                                sx={{
                                                    maxWidth: 150,
                                                    borderTopLeftRadius: '5px',
                                                    borderBottomLeftRadius: '5px',
                                                    borderRight: 'none', // Elimina el borde derecho para que se vea unido con el campo de texto
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#5E6488', // Color del borde en estado normal
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#5E6488', // Color del borde al pasar el cursor
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            border: '1px solid #5E6488', // Color del borde cuando está enfocado
                                                        },
                                                    },
                                                }}
                                            >
                                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                                <Select                                                    
                                                    sx={{
                                                        borderRadius: 'inherit', // Mantén el borde redondeado en el lado izquierdo
                                                        padding: '5px',
                                                        borderRight: 'none'
                                                    }}
                                                    value={ sTipoDocumento }
                                                    name="sTipoDocumento"
                                                    onChange={ onSelectChange }
                                                >
                                                    <MenuItem value={ 1 }>DNI</MenuItem>
                                                    <MenuItem value={ 2 }>CE</MenuItem>
                                                </Select>
                                            </FormControl>

                                            <TextField
                                                label="Nro. de Documento"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    minWidth: 200,
                                                    borderTopRightRadius: "8px",
                                                    borderBottomRightRadius: "8px",
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 'inherit', // Mantén el borde redondeado en el lado derecho
                                                        padding: '5px',
                                                        '& fieldset': {
                                                            borderColor: '#5E6488', // Color del borde en estado normal
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#5E6488', // Color del borde al pasar el cursor
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            border: '1px solid #5E6488', // Color del borde cuando está enfocado
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: '#7d7d7d', // Color de la etiqueta
                                                        top: "5px",
                                                        '&.MuiInputLabel-shrink': {
                                                            top: "0"
                                                        },
                                                    },
                                                }}
                                                required
                                                name="sDocumento"
                                                value={ sDocumento }
                                                onChange={ onChange  }
                                                error={!!errors.sDocumento}  // Muestra el error si existe
                                                helperText={errors.sDocumento || ''}  // Muestra el mensaje de error
                                            />
                                        </div>

                                        <div className="inputCelular">
                                            <TextField
                                                label="Celular"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ 
                                                    mt: 2,
                                                    minWidth: 150,
                                                    borderRadius: "8px",
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 'inherit', // Mantén el borde redondeado en el lado derecho
                                                        borderLeft: 'none', // Elimina el borde izquierdo para unirlo al select
                                                        padding: '5px',
                                                        '& fieldset': {
                                                            borderColor: '#5E6488', // Color del borde en estado normal
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#5E6488', // Color del borde al pasar el cursor
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            border: '1px solid #5E6488', // Color del borde cuando está enfocado
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: '#7d7d7d', // Color de la etiqueta
                                                        top: "5px",
                                                        '&.MuiInputLabel-shrink': {
                                                            top: "0"
                                                        },
                                                    },
                                                }}
                                                required
                                                value={ sCelular }
                                                name="sCelular"
                                                onChange={ onChange }
                                                error={!!errors.sCelular}  // Muestra el error si existe
                                                helperText={errors.sCelular || ''}  // Muestra el mensaje de error
                                            />
                                        </div>

                                        <div className="inputCheckbox">
                                            <FormGroup> 
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            //defaultChecked
                                                            sx={{
                                                                color: '#000000', // Color no seleccionado
                                                                '&.Mui-checked': { color: '#000000', /*Color cuando está seleccionado*/ },
                                                            }}
                                                            value={ bPoliticaPriv }
                                                            name="bPoliticaPriv"
                                                            onChange={ onChange }
                                                        />}
                                                    label="Acepto lo Política de Privacidad"
                                                />
                                                <FormControlLabel 
                                                    required
                                                    control={
                                                        <Checkbox
                                                            sx={{
                                                                color: '#000000', // Color no seleccionado
                                                                '&.Mui-checked': { color: '#000000', /*Color cuando está seleccionado*/ },
                                                            }}
                                                            value={ bPoliticaCom }
                                                            name="bPoliticaCom"
                                                            onChange={ onChange }
                                                        />
                                                    }
                                                    label="Acepto la Política Comunicaciones Comerciales"
                                                />
                                            </FormGroup>

                                            <Box>
                                                <Link href="#" className="linkTermino">Aplican Términos y Condiciones.</Link>
                                            </Box>
                                        </div>
                                    </div>

                                    <div className="boxFoot">
                                        <Button
                                            variant="contained" 
                                            disableElevation
                                            className="btnCotizar"
                                            style={{
                                                borderRadius: 35,
                                                backgroundColor: "#000000",
                                                padding: "18px 36px",
                                                fontSize: "18px",
                                                fontWeight: "700",
                                                textTransform: "capitalize",
                                                marginTop: "30px",
                                                width: "250px",
                                                letterSpacing: "1.5px"
                                            }}
                                            type="submit"
                                        >
                                            Cotiza aquí
                                        </Button>
                                    </div>

                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="blurOne"> <img src={ blurOne } alt="" width="100%" /></div>
                <div className="blurTwo"> <img src={ blurTwo } alt="" width="100%" /></div>
            </section>
        </div>
    )
}
