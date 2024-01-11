import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Cookies from 'universal-cookie';

const NavLinks = () => {
    const cookies = new Cookies();
    const id_token = cookies.get('id_token');

    const handleLogout = () => {
        cookies.remove('id_token');
        cookies.remove('email');
    };

    return (
        <>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/messages">
                Messages
            </HashLink>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/upload-audio">
                Upload Audio
            </HashLink>
            {id_token ? (
                <a 
                    onClick={handleLogout}
                    className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" 
                    href="https://xwang.auth.us-west-2.amazoncognito.com/logout?client_id=24r2m807jokm1ugg04234bgv09&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fxwang.engineer">
                    Log Out
                </a>
                ) : (
                <a 
                    className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" 
                    href="https://xwang.auth.us-west-2.amazoncognito.com/login?client_id=24r2m807jokm1ugg04234bgv09&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fxwang.engineer">
                    Log In
                </a>
            )}
        </>
    )
}

export default NavLinks;