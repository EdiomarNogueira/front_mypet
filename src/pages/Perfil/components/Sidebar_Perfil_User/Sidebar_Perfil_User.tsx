import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';
import { SectionFriends } from '../SectionFriends/SectionFriends';
import { useApi } from '../../../../hooks/useApi';
import { User } from '../../../../types/User';
type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const SidebarPerfilUser = () => {
    const auth = useContext(AuthContext);
    let id_user = auth.user?.id;
    let name = auth.user?.name;
    var [user, setUser] = useState<User | null>(null);
    var api = useApi();
    const loadUser = async () => {
        let json = await api.getUserMe();
        setUser(json);
    }

    useEffect(() => {
        loadUser();
    }, []);
    return (
        <div className={styles.sidebar_area}>
            <div className={styles.divisao_menu}>
                <div className={styles.area_image_name_perfil}>
                    <img className={styles.avatar_perfil} src={user?.avatar} alt="avatar user" loading="lazy" />
                    <p>{user?.name}</p>
                </div>

            </div>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to={'/user/' + id_user + '/mypets'}>Pets </Link></li>
                    <li><Link to={'/user/' + id_user + '/gallery'}>Galeria de fotos</Link></li>
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <SectionFriends />
            </div>
        </div>
    )
}


