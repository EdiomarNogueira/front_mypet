import { useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { SidebarPerfilUser } from './components/Sidebar_Perfil_User/Sidebar_Perfil_User';
import { SectionPerfilUser } from './components/SectionPerfilUser/SectionPerfilUser';
import { SidebarPerfilContact } from './components/Sidebar_Perfil_Contact/Sidebar_Perfil_Contact';
import { Header } from './components/Header/Header';
import { SidebarOngs } from '../../components/SidebarOngs/SidebarOngs';


export const Perfil = () => {
    const [me, setMe] = useState(false);
    const auth = useContext(AuthContext);
    let id_user = auth.user?.id;
    const params = useParams();
    const [userPage, setUserPage] = useState('');
    const [sidebarUpdated, setSidebarUpdated] = useState(false); // Estado para rastrear a atualização do Sidebar_Perfil_User

    useEffect(() => {
        if (id_user == params.id_user) {
            setMe(true);
        }
    }, []);

    const handleSidebarUpdate = () => {
        setSidebarUpdated(true); // Define o estado de atualização do Sidebar_Perfil_User como verdadeiro
    }

    useEffect(() => {

    }, [params.id_user]);

    return (
        <div className={styles.home}>
            <Header title="MeuPetAqui" />
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    <SidebarPerfilUser onUpdate={handleSidebarUpdate} />
                    {/* <SidebarPerfilContact /> */}

                    {/* {me &&
                        <SidebarPerfilUser />
                    }
                    {me == false &&
                        <SidebarPerfilContact />
                    } */}
                </div>
                <div className={styles.area_posts}>
                    <SectionPerfilUser id_user={params.id_user} sidebarUpdated={sidebarUpdated} />
                </div>
                <div className={styles.area_sidebar_ong}>
                    <SidebarOngs />
                </div>
            </div>



            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}