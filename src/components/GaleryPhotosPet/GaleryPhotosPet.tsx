import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../hooks/useApi';
import { Pets } from '../../types/Pets';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { Link } from 'react-router-dom';
import { Publish } from '../../types/Publish';

export const GaleryPhotosPet = (props: { posts: Publish[] }) => {
    let posts = props.posts;
    console.log('posts', posts);
    //const [posts, setPosts] = useState<Publish[]>([]);
    const [loading, setLoading] = useState(false);
    //const [currentPerPage, setCurrentPerPage] = useState(4);

    // var api = useApi();

    // useEffect(() => {
    //     loadPhotos();
    // }, [currentPerPage]);

    // const loadPhotos = async () => {
    //     setLoading(true);
    //     let json = await api.getPetPhotos(id_user, id_pet, currentPerPage);
    //     setLoading(false);
    //     setPosts(json.posts);
    // }

    // useEffect(() => {
    //     const intersectionObserver = new IntersectionObserver((entries) => {
    //         if (entries.some((entry) => entry.isIntersecting)) {
    //             console.log('está visivel', currentPerPage);
    //             setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 1);
    //         }
    //     });

    //     if (document.querySelector('#sentinela')) { // AO CARREGAR A PÁGINA PELA PRIMEIRA VEZ NÃO VAI EXISTIR A DIV, ENTÃO É PRECISO ISOLAR ESTA PARTE PARA QUANDO EXISTIR A DIV
    //         intersectionObserver.observe(document.querySelector('#sentinela')!);
    //     }
    //     return () => intersectionObserver.disconnect();
    // }, []);

    return (
        <>
            {loading &&
                <div className={styles.area_loading}>Carregando...</div>
            }
            {!loading && props.posts.length > 0 &&
                <div className={styles.area_galeria}>
                    <div className={styles.container}>

                        {props.posts.map((item, index) => (
                            <div className={styles.area_image}>
                                <p className={styles.date}>{item.date_register}</p>
                                <img className={styles.image} src={item.body} alt="avatar" />
                                <p className={styles.text}>{item.subtitle}</p>
                            </div>
                        ))}

                    </div>
                </div>

            }



        </>
    )
}
