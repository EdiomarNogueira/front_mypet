import styles from './styles.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';
type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const SidebarPerfilUser = () => {
    const auth = useContext(AuthContext);
    let name = auth.user?.name;
    let id_user = auth.user?.id;
    return (
        <div className={styles.sidebar_area}>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                </ul>
            </div>
            <div>
                Listar amigos
            </div>
        </div>
    )
}


