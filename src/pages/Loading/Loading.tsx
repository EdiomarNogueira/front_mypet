import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Home } from '../Home/Home';
import { Login } from '../Login';
import styles from './styles.module.css';

export const Loading = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();



    if (!auth.user) {
        navigate('/auth/login');

    } else {
        navigate('/Home');

    }

    navigate('/Home');

  
    return (
        <div className={styles.home}>
            <h1>Carregando</h1>
        </div>
    );
}