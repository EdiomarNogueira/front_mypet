import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { Sidebar } from '../../components/SideBar/Sidebar';
import { FormUser } from '../../components/Form_User/Form_user';
import { FormPet } from '../../components/Form_Pet/Form_Pet';
import { FormAlertPet } from '../../components/Form_Alert_Pet/Form_Alert_Pet';

export const AddAlert = () => {
    const auth = useContext(AuthContext);

    return (
        <div className={styles.home}>
            <Header title="Um Novo Amigo" />
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.area_posts}>
                    <FormAlertPet />
                </div>
                <div className={styles.area_3}>
                    AREA 3
                </div>
            </div>
            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}