import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../hooks/useApi';
import { Pets } from '../../types/Pets';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { Link } from 'react-router-dom';
import { GaleryPhotosPet } from '../GaleryPhotosPet/GaleryPhotosPet';
import { Publish } from '../../types/Publish';
import { RGA } from '../RGA/RGA';
import { VaccineCard } from '../VaccineCard/VaccineCard';

export const SectionToolsPet = (props: { id_user: Number, idpet: Number, me: Boolean, pet: Pets }) => {
    let pet = props.pet
    let id_pet = props.idpet;
    let id_user = props.id_user;
    const [viewGaleria, setViewGaleria] = useState(true);
    const [viewRGA, setViewRGA] = useState(false);
    const [viewCartaoVacina, setViewCartaoVacina] = useState(false);
    const [currentPerPage, setCurrentPerPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Publish[]>([]);
    var api = useApi();

    const handleGaleria = async () => {
        setViewGaleria(true);
        setViewRGA(false);
        setViewCartaoVacina(false);
        setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 3);
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


    const loadPhotos = async () => {
        setLoading(true);
        let json = await api.getPetPhotos(id_user, id_pet, currentPerPage);
        setLoading(false);
        setPosts(json.posts);
    }


    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                console.log('está visivel', currentPerPage);
                setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 3);
            }
        });

        if (document.querySelector('#sentinela')) { // AO CARREGAR A PÁGINA PELA PRIMEIRA VEZ NÃO VAI EXISTIR A DIV, ENTÃO É PRECISO ISOLAR ESTA PARTE PARA QUANDO EXISTIR A DIV
            intersectionObserver.observe(document.querySelector('#sentinela')!);
        }
        return () => intersectionObserver.disconnect();
    }, []);


    useEffect(() => {
        loadPhotos();
    }, [currentPerPage]);

    return (
        <>
            <div className={styles.area_secoes}>

                <div onClick={handleGaleria}>
                    <p>Galeria de Fotos</p>
                </div>
                {props.me &&
                    <>
                        <div onClick={handleRGA}>
                            <p>RGA</p>
                        </div>
                        <div onClick={handleCartaoVacina}>
                            <p>Cartão de vacinas</p>
                        </div>
                    </>
                }

            </div>
            <div>
                {viewGaleria == true &&
                    <div>
                        <div className={styles.area_galeria_pet}>
                            <GaleryPhotosPet posts={posts} />
                        </div>
                        <div className={styles.sentinela} id='sentinela' />

                    </div>
                }
                {viewRGA == true &&
                    <div className={styles.area_rga}>
                        <RGA pet={pet} />
                    </div>
                }
                {viewCartaoVacina == true &&
                    <div>
                        <VaccineCard pet={pet} />
                    </div>
                }

            </div>
        </>
    )
}
