import { Link, useNavigate, useParams } from 'react-router-dom';
import { Posts } from '../../components/Posts/Posts';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { Sidebar } from '../../components/SideBar/Sidebar';
import { SidebarOngs } from '../../components/SidebarOngs/SidebarOngs';
import { SectionPets } from './components/SectionPets/SectionPets';

export const OngService = () => {
    const auth = useContext(AuthContext);
    const params = useParams();
    
    return (
        <div className={styles.home}>
            <Header title="MeuPetAqui" />
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.area_posts}>
                    <SectionPets />
                </div>
                <div className={styles.area_ongs}>
                    <SidebarOngs />
                </div>
            </div>



            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}