import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../hooks/useApi';
import { Pets } from '../../types/Pets';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { Link } from 'react-router-dom';
import { GaleryPhotosPet } from '../GaleryPhotosPet/GaleryPhotosPet';

export const SectionToolsPet = (props: { idpet: String }) => {

    let id_pet = props.idpet;
    const [viewGaleria, setViewGaleria] = useState(true);
    const [viewRGA, setViewRGA] = useState(false);
    const [viewCartaoVacina, setViewCartaoVacina] = useState(false);

    const handleGaleria = async () => {
        setViewGaleria(true);
        setViewRGA(false);
        setViewCartaoVacina(false);
    }

    const handleRGA = async () => {
        setViewGaleria(false);
        setViewRGA(true);
        setViewCartaoVacina(false);
    }

    const handleCartaoVacina = async () => {
        setViewGaleria(false);
        setViewRGA(false);
        setViewCartaoVacina(true);
    }

    return (
        <>
            <div className={styles.area_secoes}>

                <div onClick={handleGaleria}>
                    <p>Galeria de Fotos</p>
                </div>
                <div onClick={handleRGA}>
                    <p>RGA</p>
                </div>
                <div onClick={handleCartaoVacina}>
                    <p>Cartão de vacinas</p>
                </div>

            </div>
            <div>
                {viewGaleria == true &&
                    <div className={styles.area_galeria_pet}>
                        <GaleryPhotosPet idpet={id_pet} />
                    </div>
                }
                {viewRGA == true &&
                    <div>
                        <p>EXIBE RGA</p>
                    </div>
                }
                {viewCartaoVacina == true &&
                    <div>
                        <p>EXIBE Cartão De Vacinas</p>
                    </div>
                }
            </div>
        </>
    )
}
