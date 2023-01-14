import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../../../hooks/useApi';
import { GaleryPhotosPet } from '../GaleryPhotosPet/GaleryPhotosPet';
import { Publish } from '../../../../types/Publish';
import { RGA } from '../RGA/RGA';
import { VaccineCard } from '../VaccineCard/VaccineCard';
import {
    setPet_Age,
    setPet_Biography,
    setPet_Birthdate,
    setPet_Breed,
    setPet_Castrated,
    setPet_Fur,
    setPet_Genre,
    setPet_Id_User,
    setPet_Latitude,
    setPet_Longitude,
    setPet_Name,
    setPet_Situation,
    setPet_Size,
    setPet_Species,
    setPet_Status,
    setPet_Tutor_Name
} from '../../../../redux/reducers/petReducer';

import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';

export const SectionToolsPet = (props: {
    id_user: Number, idpet: Number, me: Boolean, dados_pet: {
        name: String;
        id_user: Number;
        species: Number;
        breed: String;
        birthdate: String;
        biography: String;
        age: Number;
        tutor_name: String;
        castrated: Number;
        genre: Number;
        latitude: String;
        longitude: String;
        size: Number;
        fur: Number;
        situation: Number;
        status: Number;
    }
}) => {
    //let pet = props.dados_pet;
    let id_pet = props.idpet;
    let id_user = props.id_user;
    const [viewGaleria, setViewGaleria] = useState(true);
    const [viewRGA, setViewRGA] = useState(false);
    const [viewCartaoVacina, setViewCartaoVacina] = useState(false);
    const [currentPerPage, setCurrentPerPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Publish[]>([]);
    const pet = useAppSelector(state => state.pet);
    const dispatch = useDispatch();
    var api = useApi();


    const setDadosPet = async (pet_dados:
        {
            name: String;
            id_user: Number;
            species: Number;
            breed: String;
            birthdate: String;
            biography: String;
            age: Number;
            tutor_name: String;
            castrated: Number;
            genre: Number;
            latitude: String;
            longitude: String;
            size: Number;
            fur: Number;
            situation: Number;
            status: Number;
        }) => {
        dispatch(setPet_Name(pet_dados?.name));
        dispatch(setPet_Id_User(pet_dados?.id_user));
        dispatch(setPet_Species(pet_dados?.species));
        dispatch(setPet_Breed(pet_dados?.breed));
        dispatch(setPet_Birthdate(pet_dados?.birthdate));
        dispatch(setPet_Biography(pet_dados?.biography));
        dispatch(setPet_Age(pet_dados?.age));
        dispatch(setPet_Tutor_Name(pet_dados?.tutor_name));
        dispatch(setPet_Castrated(pet_dados?.castrated));
        dispatch(setPet_Genre(pet_dados?.genre));
        dispatch(setPet_Latitude(pet_dados?.latitude));
        dispatch(setPet_Longitude(pet_dados?.longitude));
        dispatch(setPet_Size(pet_dados?.size));
        dispatch(setPet_Fur(pet_dados?.fur));
        dispatch(setPet_Situation(pet_dados?.situation));
        dispatch(setPet_Status(pet_dados?.status));
    }


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
        console.log(id_user);
        console.log(id_pet);

        if (json) {
            setPosts(json.posts);
        }
        setLoading(false);
    }


    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
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
        setDadosPet(props.dados_pet);
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
            <div className={styles.secoes}>
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
                        <RGA dados_pet={pet} />
                    </div>
                }
                {viewCartaoVacina == true &&
                    <div>
                        <VaccineCard dados_pet={pet} />
                    </div>
                }

            </div>
        </>
    )
}
