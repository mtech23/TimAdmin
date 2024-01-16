import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
export const ProtectedRoutes = (props) => {
    const { Components } = props;
    const navigate = useNavigate();

    let login = localStorage.getItem('login');

console.log("login" , login)



    useEffect(() => {
        if (!login) {
            navigate('/login');
        } else if (!login) {
            navigate('/');
        }else if (login && location.pathname === '/TimAdmin') {
            navigate('/dashboard');
        }
    }, [navigate, login, location.pathname]);
    return (
        <>
            <Components />
        </>
    )
}
