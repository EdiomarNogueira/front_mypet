import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { useApi } from "../../hooks/useApi";
import { Link, useParams } from 'react-router-dom';
import { User } from '../../types/User';
import { AuthContext } from '../../contexts/Auth/AuthContext';

// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const SectionConnectionsUser = () => {

    var [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    var [friends, setFriends] = useState<User[]>([]);
    var [followings, setFollowings] = useState<User[]>([]);
    var [followers, setFollowers] = useState<User[]>([]);
    const [currentPerPageFriends, setCurrentPerPageFriends] = useState(10);
    const [count, setCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [viewFriends, setViewFriends] = useState(true);
    const [viewFollowers, setViewFollowers] = useState(false);
    const [viewFollowing, setViewFollowing] = useState(false);
    const [qtnFriends, setQtnFriends] = useState(Number);
    const [qtnFollowers, setQtnFollowers] = useState(Number);
    const [qtnFollowing, setQtnFollowing] = useState(Number);
    const params = useParams();


    var api = useApi();
    const auth = useContext(AuthContext);
    const loadDadosUser = async () => {
        let $cont = 0;
        setLoading(true);
        let json = await api.getDadosUserPerfil(auth.user?.id);
        if (json) {
            setUser(json.user);
        }
        setLoading(false);
    }

    const handleVerificFollow = async (id_user: any) => {
        let json = await api.getVerificFollow(id_user);
        if(json) {
            console.log(json);
        }
    }

    const handleFollowUnfollow = async (id_user: any) => { //<div onClick={() => handleFollowUnfollow(item?.id)}>
        let json = await api.postFollowUnfollow(id_user);
        if (json) {
            console.log(json.relation);
            setIsFollowing(json.relation);
            setCount(count + 1);
        }
    }

    const handleFriends = async () => {
        setViewFriends(true);
        setViewFollowers(false);
        setViewFollowing(false);
    }

    const handleFollowers = async () => {
        setViewFriends(false);
        setViewFollowers(true);
        setViewFollowing(false);
    }

    const handleFollowing = async () => {
        setViewFriends(false);
        setViewFollowers(false);
        setViewFollowing(true);
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

    var api = useApi();


    const loadRelations = async () => {
        setLoading(true);
        let json = await api.getUserRelations(latitude, longitude, currentPerPageFriends, params.id_user);
        if (json) {
            setFriends(json.friends);
            setFollowings(json.following);
            setFollowers(json.followers);

            setQtnFriends(json.qtnFriends);
            setQtnFollowers(json.qtnFollowers);
            setQtnFollowing(json.qtnFollowing);
        }
        setLoading(false);

    }


    useEffect(() => {
        loadRelations();
    }, [count]);

    useEffect(() => {
        loadRelations();
    }, [currentPerPageFriends]);

    const handleMoreFriends = async () => { //função mostrar mais amigos
        setCurrentPerPageFriends((currentPerPageFriendsInsideState) => currentPerPageFriendsInsideState + 10);
    }


    return (
        <>
            <div className={styles.area_section_connections}>
                <div className={styles.area_secoes}>

                    <div className={styles.btn_navigate} onClick={handleFriends}>
                        <p>Amigos</p>
                        <div>{qtnFriends}</div>
                    </div>

                    <div className={styles.btn_navigate} onClick={handleFollowers}>
                        <p>Seguidores</p>
                        <div>{qtnFollowers}</div>
                    </div>
                    <div className={styles.btn_navigate} onClick={handleFollowing}>
                        <p>Seguindo</p>
                        <div>{qtnFollowing}</div>
                    </div>
                </div>

                <div className={styles.area_relations_list}>
                    {viewFriends == true &&
                        <div className={styles.list_relations}>
                            {/* <List_Relations relations={friends} /> */}
                            {friends.map((item, index) => (

                                <div className={styles.area_user}>
                                    <div className={styles.flex_row}>
                                        <Link to={'/User/' + item.id} >
                                            <div className={styles.flex_row}>
                                                <img className={styles.avatar} src={item.avatar} alt="" />
                                                <p>{item.name}</p>
                                            </div>
                                        </Link>
                                        <p>{item.isFollowing}</p>
                                        <div onClick={() => handleFollowUnfollow(item.id)} className={styles.follow_unfollow}>
                                            {!item.isFollowing && item.id != auth.user?.id &&
                                                <p className={styles.follow}>Seguir</p>
                                            }
                                            {item.isFollowing && item.id != auth.user?.id &&
                                                <p className={styles.unfollow}>Não seguir</p>
                                            }
                                            {item.id == auth.user?.id &&
                                                <p>Eu</p>
                                            }
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    }
                    {viewFollowers == true &&
                        <div className={styles.list_relations}>
                            {/* <List_Relations relations={followers} /> */}
                            {followers.map((item, index) => (
                                <div className={styles.area_user}>
                                    <div className={styles.flex_row}>
                                        <Link to={'/User/' + item.id} >
                                            <div className={styles.flex_row}>
                                                <img className={styles.avatar} src={item.avatar} alt="" />
                                                <p>{item.name}</p>
                                            </div>
                                        </Link>
                                        <p>{item.isFollowing}</p>
                                        <div onClick={() => handleFollowUnfollow(item.id)} className={styles.follow_unfollow}>
                                            {!item.isFollowing && item.id != auth.user?.id &&
                                                <p className={styles.follow}>Seguir</p>
                                            }
                                            {item.isFollowing && item.id != auth.user?.id &&
                                                <p className={styles.unfollow}>Não seguir</p>
                                            }
                                            {item.id == auth.user?.id &&
                                                <p>Eu</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {viewFollowing == true &&
                        <div className={styles.list_relations}>
                            {/* <List_Relations relations={followings} /> */}
                            {followings.map((item, index) => (
                                <div className={styles.area_user}>
                                    <div className={styles.flex_row}>
                                        <Link to={'/User/' + item.id} >
                                            <div className={styles.flex_row}>
                                                <img className={styles.avatar} src={item.avatar} alt="" />
                                                <p>{item.name}</p>
                                            </div>
                                        </Link>
                                        <p>{item.isFollowing}</p>
                                        <div onClick={() => handleFollowUnfollow(item.id)} className={styles.follow_unfollow}>
                                            {!item.isFollowing && item.id != auth.user?.id &&
                                                <p className={styles.follow}>Seguir</p>
                                            }
                                            {item.isFollowing && item.id != auth.user?.id &&
                                                <p className={styles.unfollow}>Não seguir</p>
                                            }
                                            {item.id == auth.user?.id &&
                                                <p>Eu</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    <div className={styles.area_btn}>
                        <button onClick={handleMoreFriends} className={styles.btn_verMais}>Ver mais</button>

                    </div>

                </div>

            </div>
        </>
    )
}


