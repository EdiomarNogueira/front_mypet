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
                <Link to="/ongs/pets/adocao">
                    <div className={styles.divisao_menu}>
                        <ul>
                            <li>Para Adoção</li>
                        </ul>
                    </div>
                </Link>
                <Link to="/ongs/pets/tratamento">
                    <div className={styles.divisao_menu}>
                        <ul>
                            <li>Ajude o Tratamento</li>
                        </ul>
                    </div>
                </Link>
                <Link to="/ongs/pets/perdidos">
                    <div className={styles.divisao_menu}>
                        <ul>
                            <li>Perdidos</li>
                        </ul>
                    </div>
                </Link>
                <Link to="/ongs/pets/encontrados">
                    <div className={styles.divisao_menu}>
                        <ul>
                            <li>Encontrados</li>
                        </ul>
                    </div>
                </Link>
            </div>
        </div >
    )
}


