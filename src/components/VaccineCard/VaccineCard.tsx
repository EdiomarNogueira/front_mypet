import styles from './styles.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from "../../hooks/useApi";
import { Link, useParams } from 'react-router-dom';
import { Pets } from '../../types/Pets';
import { User } from '../../types/User';
import sample from '../../media/images/sample.png';
import * as htmlToImage from 'html-to-image';
import QRCode from 'react-qr-code';
// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const VaccineCard = (props: { pet: Pets }) => {
    const domEl = useRef(null);
    let pet = props.pet;
    const downloadImage = async () => {
        const dataUrl = await htmlToImage.toPng(domEl.current);

        // download image
        const link = document.createElement('a');
        link.download = "html-to-img.png";
        link.href = dataUrl;
        link.click();
    }

    let species = '';
    if (pet.species = '1') {
        species = 'Cachorro';
    } else if (pet.species = '2') {
        species = 'Gato';
    } else {
        species = '- '
    }

    let sexo = '';
    if (pet.genre == '1') {
        sexo = 'Macho'
    } else if (pet.genre == '2') {
        sexo = 'Femea'
    }

    return (
        <div className={styles.vaccine_pet} >
            <button className={styles.btn_download} onClick={downloadImage}>Download Modelo Cartão de Vacinas</button>
            <div id="domEl" ref={domEl}>
                <div className={styles.area_card_vaccine}>
                    <h1>Controle de Vacinação</h1>
                    <h3>{pet.name}</h3>
                    <div className={styles.vaccine}>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}


