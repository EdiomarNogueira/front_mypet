import styles from './styles.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';
import { SectionListRecommended } from '../SectionListRecommended/SectionListRecommended';
import { SectionFriends } from '../SectionFriends/SectionFriends';
type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const SidebarPerfilUser = () => {
    const auth = useContext(AuthContext);
    let id_user = auth.user?.id;
    let name = auth.user?.name;
    return (
        <div className={styles.sidebar_area}>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to={'/user/' + id_user + '/mypets'}>Pets</Link></li>
                    <li><Link to={'/user/' + id_user + '/gallery'}>Galeria de Fotos</Link></li>
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <SectionFriends />
            </div>
        </div>
    )
}


