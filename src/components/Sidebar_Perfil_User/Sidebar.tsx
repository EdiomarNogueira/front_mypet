import styles from './styles.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';
import { SectionListRecommended } from '../SectionListRecommended/SectionListRecommended';
type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const SidebarPerfilUser = () => {
    const auth = useContext(AuthContext);

    return (
        <div className={styles.sidebar_area}>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                </ul>

            </div>
            <div className={styles.divisao_menu}>
                {/* <SectionListRecommended /> */}
            </div>
        </div>
    )
}


