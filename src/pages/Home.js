import React from 'react';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

const decodeJWT = (token) => { 
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent( 
        atob(base64).split('').map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)).join('') 
        ); 
    return JSON.parse(jsonPayload); 
};

const Home = () => {
    // Initialize cookies 
    const cookies = new Cookies();

    const location = useLocation();
    // Try to get the id_token from the url params
    const params = location.hash;
    if (params) {
        const indexOfIdToken = params.indexOf('id_token=');
        const indexOfNextAmpersand = params.indexOf('&', indexOfIdToken);
        const id_token = params.substring(indexOfIdToken + 9, indexOfNextAmpersand);

        if (id_token) {
                // Set the expiration duration for the cookie (e.g., 1 day)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1);
            cookies.set('id_token', id_token, { path: '/' , expires: expirationDate });
            // cookies.set('id_token', id_token, { path: '/' });
            const decodedToken = decodeJWT(id_token);
            const email = decodedToken.email;
            const new_email = email.replace(/@/g, '').replace(/\./g, '');
            cookies.set('email', new_email, { path: '/' });
        }
    }
    

    return (
        <>
            <Hero />
            <Cta/>
            <Footer />
        </>

    )
}

export default Home;

