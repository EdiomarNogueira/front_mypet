import styles from './styles.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';
type Props = {
    text?: string;
}

export const SidebarOngs = () => {
    const auth = useContext(AuthContext);
    let name = auth.user?.name;
    let id_user = auth.user?.id;
    return (
        <div className={styles.sidebar_area}>
            <div >
                <div className={styles.sidebar_area_ongs}>
                    <h2>Pets De Ongs</h2>
                </div>
                <div className={styles.divisao_menu}>
                    <ul>
                        <li><Link to="/">Para Adoção</Link></li>
                    </ul>
                </div>
                <div className={styles.divisao_menu}>
                    <ul>
                        <li><Link to="/">Ajude o Tratamento</Link></li>
                    </ul>
                </div>
                <div className={styles.divisao_menu}>
                    <ul>
                        <li><Link to="/">Perdidos</Link></li>
                    </ul>
                </div>
                <div className={styles.divisao_menu}>
                    <ul>
                        <li><Link to="/">Encontrados</Link></li>
                    </ul>
                </div>


            </div>
        </div >
    )
}


