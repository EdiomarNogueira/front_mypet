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

export const SectionListRecommended = () => {

    const [pets, setPets] = useState<Pets[]>([] || 0);
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    var [user, setUser] = useState<User | null>(null);
    var [recommended, setRecommended] = useState<User[] | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [count, setCount] = useState(0);
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
        loadUsers();
    }, [count]);

    const loadUsers = async () => {
        setLoading(true);
        let json = await api.getUserNear(latitude, longitude);
        if (json) {
            setLoading(false);
            setRecommended(json.recommended);
        }

    }



    const handleFollowUnfollow = async (id_user: any) => {
        let json = await api.postFollowUnfollow(id_user);
        if (json) {
            setIsFollowing(json.relation);

            setCount(count + 1);
        }
    }

    return (
        <>
            <p className={styles.text_recommended}>Perfis Recomendados:</p>

            <div className={styles.area_section_recommended}>
                {recommended &&
                    <div >
                        <div className={styles.area_user} >
                            {recommended.map((item, index) => (
                                <div className={styles.card_user}>
                                    <Link to={'/User/' + item.id}  >
                                        <div className={styles.flex_row}>
                                            <img className={styles.avatar} src={item?.avatar} alt="avatar user" />
                                            <p>{item.name}</p>
                                        </div>
                                    </Link>
                                    <div className={styles.area_follow}>
                                        <div onClick={() => handleFollowUnfollow(item?.id)}>
                                            <p className={styles.follow}>Seguir</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}


