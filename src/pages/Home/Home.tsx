import { Link, useNavigate } from 'react-router-dom';
import { Posts } from '../../components/Posts/Posts';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { Sidebar } from '../../components/SideBar/Sidebar';
import { SidebarOngs } from '../../components/SidebarOngs/SidebarOngs';

export const Home = () => {
    const auth = useContext(AuthContext);

    return (
        <div className={styles.home}>
            <Header title="MeuPetAqui" />
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.area_posts}>
                    <Posts />
                </div>
                <div className={styles.area_ongs}>
                    <SidebarOngs />
                </div>
            </div>



            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}