import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from "../../hooks/useApi";
import { Link } from 'react-router-dom';
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

    let latitude = '';
    let longitude = '';

    if (user?.latitude && user.longitude) {
        latitude = user?.latitude;
        longitude = user.longitude;
    } else {
        latitude = '-14.8642253';
        longitude = '-40.8779965,13';
    }

    var api = useApi();

    useEffect(() => {
        loadFriends();
    }, [count]);

    useEffect(() => {
        loadFriends();
    }, [currentPerPage]);

    const loadFriends = async () => {
        setLoading(true);
        let json = await api.getUserFriend(latitude, longitude, currentPerPage);
        if (json) {
            setLoading(false);
            setFriends(json.friends);
        }

    }

    const handleMoreFriends = async () => {
        setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 5);
    }

    const handleFollowUnfollow = async (id_user: any) => {
        let json = await api.postFollowUnfollow(id_user);
        console.log('amigos', json);
        if (json) {
            setIsFollowing(json.relation);

            setCount(count + 1);
        }
    }


    const handleReloadPage = async () => {
        { window.location.reload() }
    }

    return (
        <>
            <p className={styles.text_friends}>Amigos:</p>
            <div className={styles.area_section_friends}>
                {friends &&
                    <div >
                        <div className={styles.area_user} >
                            {friends.map((item, index) => (
                                <div className={styles.card_user} onClick={handleReloadPage}>
                                    <Link to={'/User/' + item.id} >
                                        <div className={styles.flex_row}>
                                            <img className={styles.avatar} src={item?.avatar} alt="avatar user" />
                                            <p>{item.name}</p>
                                        </div>
                                    </Link>
                                    <div className={styles.area_follow}>
                                        <div onClick={() => handleFollowUnfollow(item?.id)}>
                                            <p className={styles.unfollow}>Desfazer Amizade</p>
                                        </div>
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

