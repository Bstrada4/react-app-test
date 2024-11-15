import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//MATERIAL UI
import { Box, Button } from '@mui/material';

//CSS
import '../css/resumen.css';

//FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faCircleSolid, faCircleChevronLeft, faUserGroup } from '@fortawesome/free-solid-svg-icons';

export const Resumen = () => {

    const navigate = useNavigate(); // Inicializa el hook para redirigir
    const location = useLocation();
    const formData = location.state; // Aquí tienes acceso al formData

    console.log(formData);

    return (
        <>
            <section className="sectPasosCotizacion">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="listPasosCotizacion">
                                <li className="item"> <span>1</span> Planes y Coberturas</li>
                                <li className="separator">
                                    <FontAwesomeIcon icon={ faCircleSolid } />
                                    <FontAwesomeIcon icon={ faCircleSolid } />
                                    <FontAwesomeIcon icon={ faCircleSolid } />
                                    <FontAwesomeIcon icon={ faCircleSolid } />
                                </li>
                                <li className="item active"> <span>2</span> Resumen</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sectResumen">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">

                            <Box
                                sx={{
                                    textAlign: 'center'
                                    ,padding: '2rem 0'
                                    ,margin: 'auto'
                                    ,'@media (max-width: 991px)': {
                                        padding: '0',  // Elimina el padding a partir de 991px
                                    }
                                }}
                            >
                                <Button
                                    onClick={() => navigate(-1)}
                                    sx={{ color: '#4a4fff', fontSize: '1rem', mb: 2 }}
                                    className="btnBack"
                                >
                                    <FontAwesomeIcon icon={ faCircleChevronLeft } /> Volver
                                </Button>

                            </Box>
                        </div>


                        <div className="boxResumen">
                            <div className="boxHead">
                                <h2>Resumen del seguro</h2>
                            </div>

                            <div className="boxBody">
                                <p>PRECIOS CALCULADOS PARA:</p>
                                <h3><FontAwesomeIcon icon={ faUserGroup } /> { formData.name } { formData.lastName  }</h3>
                                <hr />
                                
                                <ul className="listDetail">
                                    <li>
                                        <h5><b>Responsable de pago</b></h5>
                                        <p>DNI: 444888888</p>
                                        <p>Celular: 5130216147</p>
                                    </li>
                                    <li>
                                        <h5>{ formData.plan.name }</h5>
                                    </li>
                                    <li>
                                        <h5>Costo del Plan: ${ formData.plan.price } al mes</h5>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}
