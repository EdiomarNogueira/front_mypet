import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../hooks/useApi';
import { Pets } from '../../types/Pets';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { Link } from 'react-router-dom';

export const GaleryPhotosPet = (props: { idpet: String }) => {

    let id_pet = props.idpet;
    console.log('id pet',props.idpet);

    return (
        <>
            <div>
                <p>gerar galeria do pet: {id_pet}</p>
            </div>
        </>
    )
}
