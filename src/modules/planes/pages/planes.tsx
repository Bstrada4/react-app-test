import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserData } from '../../../interfaces/userData';
import { fetchUserData } from '../../../apis/fetchUserData';
import { fetchPlans } from '../apis/fetchPlans';
import { calculateAge } from '../utils/calculateAge';

//MATERIAL UI
import { Box, Button, Typography, Card, CardContent } from '@mui/material';

//CSS
import '../css/planes.css';

//FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircle as faCircleSolid, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';

//IMG
import iconForMe from '../img/iconforme.svg';
import iconForAnyOne from '../img/iconforanyone.svg';

//LIBRERIAS
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { PlansData } from '../interfaces/planData';


export const Planes = () => {

    const navigate = useNavigate(); // Inicializa el hook para redirigir
    const location = useLocation();
    const formData = location.state; // Aquí tienes acceso al formData

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const onInit = () => {
        if (formData == null) {
            navigate('/');
        }
    }
    useEffect(() => {
        onInit(); // Llamar a la función al inicio del efecto
    }, [formData, navigate]);
    
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        fetchPlansForOption(); // Llama la función para obtener los planes según la opción seleccionada   
    };

    /*************/
    const [ userData, setUserData ] = useState<UserData | null>(null);
    
    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData();
                setUserData(data);
                
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Error desconocido');
                }
            } finally {
                setLoading(false);
            }
        };
    
        getUserData();
    }, []);

    /***************************************/

    const [ plansData, setPlans ] = useState<PlansData | null>(null);
    
    const fetchPlansForOption = async () => {
        setLoading(true);
        try {
            const data = await fetchPlans(); // Hacemos la búsqueda de planes pasando la opción
            setPlans(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Error desconocido');
            }
        } finally {
            setLoading(false);
        }
    };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;


    const userAge = userData ? calculateAge(userData.birthDay) : 0;
    const validPlans = plansData?.list.filter((plan) => userAge <= plan.age);
    
    const applyDiscount = (price: number) => {
        if (selectedOption === 'paraAlguienMas') {
          return price * 0.95; // Aplica el 5% de descuento
        }
        return price;
    }

    const onClickPlanSelected = ( plan: any ) => {

        const infoCliente = {
            ...userData
            ,plan
        }
        console.log(infoCliente);

        navigate('/planresumen', { state: infoCliente });
    }
    
    return (
        <>
            <section className="sectPasosCotizacion">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="listPasosCotizacion">
                                <li className="item active"> <span>1</span> Planes y Coberturas</li>
                                <li className="separator">
                                    <FontAwesomeIcon icon={ faCircleSolid } />
                                    <FontAwesomeIcon icon={ faCircleSolid } />
                                    <FontAwesomeIcon icon={ faCircleSolid } />
                                    <FontAwesomeIcon icon={ faCircleSolid } />
                                </li>
                                <li className="item"> <span>2</span> Resumen</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sectPlanes">
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

                                <Typography variant="h4" component="h1" className="titleCotizacion"> { userData?.name }, ¿Para quién deseas <br className="brTitlePlans"/> cotizar? </Typography>
                                <Typography variant="body1" className="textCotizacion"> Selecciona la opción que se ajuste más a tus necesidades. </Typography>

                                <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', gap: '1.5rem' }}>
                                    {/* Opción "Para mí" */}
                                    <Card
                                        onClick={() => handleOptionSelect('paraMi')}
                                        sx={{
                                            width: 350,
                                            cursor: 'pointer',
                                            border: selectedOption === 'paraMi' ? '3px solid #000000' : '3px solid #ddd',
                                            boxShadow: selectedOption === 'paraMi' ? '0px 4px 10px rgba(74, 79, 255, 0.2)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '20px',
                                            padding: '25px',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '@media (max-width: 767px)': {
                                                width: '100% !important', // Cambia el ancho al 100% en pantallas pequeñas
                                            },
                                        }}
                                        className="boxCardCotizacionOption"
                                    >
                                        <CardContent className="boxContentCardCotizacionOption">
                                            { 
                                                (selectedOption === 'paraMi') ?
                                                    <FontAwesomeIcon icon={ faCircleCheck } className="iconCheck" />
                                                    : <FontAwesomeIcon icon={ faCircleRegular } className="iconNotCheck" />
                                            }
                                            <img src={ iconForMe } alt="" />
                                            <Typography variant="h6">Para mí</Typography>
                                            <Typography variant="body2" color="text.secondary">Cotiza tu seguro de salud y agrega familiares si así lo deseas. </Typography>
                                        </CardContent>
                                    </Card>

                                    {/* Opción "Para alguien más" */}
                                    <Card
                                        onClick={() => handleOptionSelect('paraAlguienMas')}
                                        sx={{
                                            width: 350,
                                            cursor: 'pointer',
                                            border: selectedOption === 'paraAlguienMas' ? '3px solid #000000' : '3px solid #ddd',
                                            boxShadow: selectedOption === 'paraAlguienMas' ? '0px 4px 10px rgba(74, 79, 255, 0.2)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '20px',
                                            padding: '25px',
                                            '&:hover': {
                                            transform: 'scale(1.05)',
                                            },
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '@media (max-width: 767px)': {
                                                width: '100% !important', // Cambia el ancho al 100% en pantallas pequeñas
                                            },
                                        }}
                                    >
                                        <CardContent className="boxContentCardCotizacionOption">
                                            { 
                                                (selectedOption === 'paraAlguienMas') 
                                                    ? <FontAwesomeIcon icon={ faCircleCheck } className="iconCheck" />
                                                    : <FontAwesomeIcon icon={ faCircleRegular } className="iconNotCheck"  />
                                            }
                                            <img src={ iconForAnyOne } alt="" />
                                            <Typography variant="h6">Para alguien más</Typography>
                                            <Typography variant="body2" color="text.secondary"> una cotización para uno de tus familiares o cualquier persona. </Typography>

                                        </CardContent>
                                    </Card>
                                </Box>

                                {/* Contenido Condicional */}
                                <Box sx={{ mt: 4, p: 2 }}>
                                    { validPlans && validPlans?.length > 0 ? (  // Verifica si hay elementos en validPlans
                                    <Swiper
                                        slidesPerView={3}
                                        spaceBetween={30}
                                        freeMode={true}
                                        pagination={{ clickable: true }}
                                        modules={[FreeMode, Pagination]}
                                        className="mySwiper"
                                        breakpoints={{
                                            991   : {  slidesPerView: 3, spaceBetween: 20 }
                                            ,767  : {  slidesPerView: 2, spaceBetween: 20 }
                                            ,0    : {  slidesPerView: 1, spaceBetween: 0 }
                                            // Aquí puedes agregar más configuraciones para otros tamaños de pantalla si lo necesitas
                                        }}
                                    >
                                        {/* {selectedOption === 'paraMi' && validPlans?.map((plan, index) => ( */}
                                        {validPlans?.map((plan, index) => (
                                        <SwiperSlide style={{padding: '20px 5px', paddingBottom: '40px'}} key={index}>
                                            <Box
                                                sx={{ mt: 4, p: 2, borderRadius: 5, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}
                                                className="boxPlan"
                                            >
                                                <div className="boxHead">
                                                    <img src={ iconForAnyOne } alt="" />
                                                    <h3>{ plan.name }</h3>
                                                    <h5>COSTO DEL PLAN</h5>
                                                    <h4>${ applyDiscount(plan.price).toFixed(2) }</h4>                                         
                                                </div>

                                                <div className="boxBody">
                                                    <hr />
                                                    <ul>
                                                        {plan.description.map((desc, idx) => (
                                                            <li key={idx}>{desc}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="boxFoot">
                                                    <Button
                                                        variant="contained" 
                                                        disableElevation
                                                        className="btnCotizar"
                                                        style={{
                                                            borderRadius: 35,
                                                            backgroundColor: "#FF1C44",
                                                            padding: "18px 36px",
                                                            fontSize: "18px",
                                                            fontWeight: "700",
                                                            textTransform: "capitalize",
                                                            marginTop: "30px",
                                                            width: "250px",
                                                            letterSpacing: "1.5px"
                                                        }}
                                                        onClick={() => onClickPlanSelected(plan)}
                                                    >
                                                        Seleccionar Plan
                                                    </Button>
                                                </div>
                                            </Box>
                                        </SwiperSlide>                                        
                                        ))}
                                    </Swiper>
                                    ) : (
                                        <Typography variant="body1" sx={{ color: '#888' }}>
                                            No hay planes disponibles.
                                        </Typography>
                                    )}

                                    {/* {selectedOption === 'paraAlguienMas' && (
                                    
                                    )} */}

                                    {!selectedOption && (
                                    <Typography variant="body1" sx={{ color: '#888' }}>
                                        Selecciona una opción para ver más detalles.
                                    </Typography>
                                    )}
                                </Box>
                                {/* Contenido Condicional */}
                            </Box>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
