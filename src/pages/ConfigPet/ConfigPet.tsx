import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { Sidebar } from '../../components/SideBar/Sidebar';
import { FormPet } from './components/Form_Pet/Form_Pet';
import { SidebarOngs } from '../../components/SidebarOngs/SidebarOngs';

export const ConfigPet = () => {
    const auth = useContext(AuthContext);

    return (
        <div className={styles.home}>
            <Header title="MeuPetAqui" />
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.area_posts}>
                    <FormPet />
                </div>
                <div className={styles.area_sidebar_ong}>
                    <SidebarOngs />
                </div>
            </div>



            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}