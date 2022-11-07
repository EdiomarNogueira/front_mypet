import styles from './styles.module.css';
import { ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import axios from 'axios';
import { Link, redirect, useNavigate } from 'react-router-dom';

type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const Sidebar = () => {

    return (
        <div className={styles.sidebar_area}>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/User">Meus Dados</Link></li>
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to="/user/:id/mypets">Meus Pets</Link></li>
                    <li><Link to="/Encontrados">Encontrados</Link></li>
                    <li><Link to="/galeria">Galeria de Fotos</Link></li>
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to="/user/:id/mypet/:slug">Amigos</Link></li>
                </ul>
            </div>
        </div>
    )
}


