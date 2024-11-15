import React from 'react';
import { Outlet } from "react-router-dom";

//FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

//CSS
import '../css/layout.css';

//IMG
import logo from '../../shared/img/logo/logo.svg';
import logoBL from '../../shared/img/logo/logo-bl.svg';
import logoMobileBL from '../../shared/img/logo/logo-mobile-bl.svg';


export const Layout = () => {
    return (
        <div className="main-layout">
            <header>
                <nav className="navBarMain">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-3 col-sm-3 col-md-2 col-lg-1">
                                <img src={ logo } alt="Logo" width="100%"/>
                            </div>

                            <div className="col-9 col-sm-9 col-md-10 col-lg-11">
                                <ul className="listInfoNavBar">
                                    <li><h5>¡Compra por este medio!</h5></li>
                                    <li><a href="tel:014116001">  <FontAwesomeIcon icon={ faPhone } /> (01) 411 6001</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="router-outlet">
                <Outlet />
            </div>

            <footer className="footerMain">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-3 col-lg-1">
                            <img src={ logoBL } alt="Logo" width="100%" className="imgLogoFooterDesktop"/>
                            <img src={ logoMobileBL } alt="Logo" width="100%" className="imgLogoFooterMobile"/>
                        </div>

                        <div className="col-12 col-md-9 col-lg-11">
                            <p className="rightAutor"> &copy; 2023 RIMAC Seguros y Reaseguros</p>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}
