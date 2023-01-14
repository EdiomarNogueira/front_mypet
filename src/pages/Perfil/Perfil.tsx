import { useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { SidebarPerfilUser } from './components/Sidebar_Perfil_User/Sidebar_Perfil_User';
import { SectionPerfilUser } from './components/SectionPerfilUser/SectionPerfilUser';
import { SidebarPerfilContact } from './components/Sidebar_Perfil_Contact/Sidebar_Perfil_Contact';
import { Header } from './components/Header/Header';


export const Perfil = () => {
    const [me, setMe] = useState(false);
    const auth = useContext(AuthContext);
    let id_user = auth.user?.id;
    const params = useParams();


    useEffect(() => {
        if (id_user == params.id_user) {
            setMe(true);
        }
    }, []);

    return (
        <div className={styles.home}>
            <Header title="Um Novo Amigo" />
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    {me &&
                        <SidebarPerfilUser />
                    }
                    {!me &&
                        <SidebarPerfilContact />
                    }
                </div>
                <div className={styles.area_posts}>
                    <SectionPerfilUser id_user={params.id_user} isMe={me} />
                </div>
                <div className={styles.area_3}>
                    AREA 3
                </div>
            </div>



            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}