import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Layout } from '../layout/pages/Layout';

import { SeguroSaludFlexible } from '../modules/seguroSaludFlexible/pages/SeguroSaludFlexible';
import { Planes } from '../modules/planes/pages/planes';
import { Resumen } from '../modules/planes/pages/resumen';

const PlanesWithValidation = () => {
    const location = useLocation();
    const formData = location.state;
  
    // Si no hay formData, redirigir a /seguro-salud-flexible
    if (!formData) {
      return <Navigate to="/seguro-salud-flexible" replace />;
    }

    return <Planes />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <SeguroSaludFlexible />
            },
            {
                path: "/seguro-salud-flexible",
                element: <SeguroSaludFlexible />
            },
            {
                path: "/planes",
                element: <PlanesWithValidation />
            },
            {
                path: "/planresumen",
                element: <Resumen />
            }, 
        ]
    },
    {
        path: "/*",
        element: <Navigate to="/" replace={true} />
    },
]);


 
export const Navigation = () => {
    return (
        <RouterProvider router={router} />
    )
}