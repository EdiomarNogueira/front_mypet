import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from "../../hooks/useApi";
import { Link, useParams } from 'react-router-dom';
import { Pets } from '../../types/Pets';
import { User } from '../../types/User';

// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const SectionFriends = () => {

    const [pets, setPets] = useState<Pets[]>([] || 0);
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    var [user, setUser] = useState<User | null>(null);
    var [friends, setFriends] = useState<User[] | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [count, setCount] = useState(0);
    const [currentPerPage, setCurrentPerPage] = useState(5);
    const params = useParams();

    let id_user = auth.user?.id;

    var api = useApi();

    const loadDadosUser = async () => {
        let $cont = 0;
        setLoading(true);
        let json = await api.getDadosUserPerfil(params.id_user);
        if (json) {
            setUser(json.user);
        }
        setLoading(false);
    }

    const loadRelations = async () => {
        setLoading(true);
        let json = await api.getUserRelations(latitude, longitude, currentPerPage, params.id_user);
        if (json) {

            setFriends(json.friends);
        }
        setLoading(false);
    }

    const handleMoreFriends = async () => {
        setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 5);
    }

    const handleFollowUnfollow = async (id_user: any) => {
        let json = await api.postFollowUnfollow(id_user);
        if (json) {

            setIsFollowing(json.relation);
            setCount(count + 1);
            handleReloadPage();
        }
    }

    const handleReloadPage = async () => {
        { window.location.reload() }
    }

    let latitude = '';
    let longitude = '';

    if (user?.latitude && user.longitude) {
        latitude = user?.latitude;
        longitude = user.longitude;
    } else {
        latitude = '-14.8642253';
        longitude = '-40.8779965,13';
    }

    useEffect(() => {
        loadDadosUser();
    }, []);


    useEffect(() => {
        loadRelations();
    }, [count]);

    useEffect(() => {
        loadRelations();
    }, [currentPerPage]);

    return (
        <>
            <p className={styles.text_friends}>Amigos:</p>
            <div className={styles.area_section_friends}>
                {friends &&
                    <div >
                        <div className={styles.area_user} >
                            {friends.map((item, index) => (
                                <div className={styles.card_user} key={index}>
                                    <Link to={'/User/' + item.id} >
                                        <div className={styles.flex_row}>
                                            <img className={styles.avatar} src={item?.avatar} alt="avatar user" loading="lazy" />
                                            <p>{item.name}</p>
                                        </div>
                                    </Link>
                                    <div className={styles.area_follow}>

                                        {id_user != item?.id &&
                                            <div onClick={() => handleFollowUnfollow(item?.id)}>
                                                <p className={styles.unfollow}>Desfazer Amizade</p>
                                            </div>
                                        }

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
            <button onClick={handleMoreFriends} className={styles.btn_verMais}>Ver mais</button>

        </>
    )
}


