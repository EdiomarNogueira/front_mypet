import styles from './styles.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';
import { SectionListRecommended } from '../SectionListRecommended/SectionListRecommended';
type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const Sidebar = () => {
    const auth = useContext(AuthContext);
    let name = auth.user?.name;
    let id_user = auth.user?.id;
    return (
        <div className={styles.sidebar_area}>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to={'/User/' + id_user}>Meu Perfil</Link></li>
                    <li><Link to="/User/config">Meus Dados</Link></li>
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to={'/user/' + name + '/mypets'}>Pets</Link></li>
                    <li><Link to="/galeria">Galeria de Fotos</Link></li>
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <SectionListRecommended />

            </div>
        </div>
    )
}


