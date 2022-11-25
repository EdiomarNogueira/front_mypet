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



export const SectionConnectionsUser = () => {

    const params = useParams();
    var [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    var [friends, setFriends] = useState<User[] | null>(null);
    var [followings, setFollowings] = useState<User[] | null>(null);
    var [followers, setFollowers] = useState<User[] | null>(null);
    const [currentPerPageFriends, setCurrentPerPageFriends] = useState(5);
    const [count, setCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [viewFriends, setViewFriends] = useState(true);
    const [viewFollowers, setViewFollowers] = useState(false);
    const [viewFollowing, setViewFollowing] = useState(false);


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


    const handleFollowUnfollow = async (id_user: any) => { //<div onClick={() => handleFollowUnfollow(item?.id)}>
        let json = await api.postFollowUnfollow(id_user);
        console.log('amigos', json);
        if (json) {
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
        let json = await api.getUserRelations(latitude, longitude, currentPerPageFriends);
        if (json) {
            console.log('amigos', json);
            setLoading(false);
            setFriends(json.friends);
            setFollowings(json.following);
            setFollowers(json.followers);
        }
    }

    useEffect(() => {
        loadRelations();
    }, [count]);

    useEffect(() => {
        loadRelations();
    }, [currentPerPageFriends]);


    const handleMoreFriends = async () => { //função mostrar mais amigos
        setCurrentPerPageFriends((currentPerPageFriendsInsideState) => currentPerPageFriendsInsideState + 5);
    }


    return (
        <>
            <div className={styles.area_section_connections}>
                <div className={styles.area_secoes}>

                    <div className={styles.btn_navigate} onClick={handleFriends}>
                        <p>Amigos</p>
                        <div>{friends?.length}</div>
                    </div>

                    <div className={styles.btn_navigate} onClick={handleFollowers}>
                        <p>Seguidores</p>
                        <div>{followers?.length}</div>
                    </div>
                    <div className={styles.btn_navigate} onClick={handleFollowing}>
                        <p>Seguindo</p>
                        <div>{followings?.length}</div>
                    </div>
                </div>

                <div>
                    {viewFriends == true &&
                        <div>
                            <p>EXIBE AMIGOS</p>
                        </div>
                    }
                    {viewFollowers == true &&
                        <div>
                            <p>EXIBE SEGUIDORES</p>
                        </div>
                    }
                    {viewFollowing == true &&
                        <div>
                            <p>EXIBE SEGUINDO</p>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}


