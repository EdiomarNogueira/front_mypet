import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { Sidebar } from '../../components/SideBar/Sidebar';
import { FormUser } from './components/Form_User/Form_user';

export const ConfigUser = () => {
    const auth = useContext(AuthContext);

    return (
        <div className={styles.home}>
            <Header title="Um Novo Amigo" />
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.area_posts}>
                    <FormUser />
                </div>
                <div className={styles.area_3}>
                    AREA 3
                </div>
            </div>



            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}