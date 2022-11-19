import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { Sidebar } from '../../components/SideBar/Sidebar';
import { FormUser } from '../../components/Form_User/Form_user';
import { SectionPerfilUser } from '../../components/SectionPerfilUser/SectionPerfilUser';
import { SidebarPerfilUser } from '../../components/Sidebar_Perfil_User/Sidebar';

export const Perfil = () => {
    const [me, setMe] = useState(false);
    const auth = useContext(AuthContext);
    let name = auth.user?.name;
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
                    <SidebarPerfilUser />
                </div>
                <div className={styles.area_posts}>
                    <SectionPerfilUser id_user={params.id_user} isMe={me} />
                    {/* {me &&
                        <p>Meu Perfil</p>
                    }
                    {!me &&
                        <p>Outro Perfil</p>
                    } */}
                </div>
                <div className={styles.area_3}>
                    AREA 3
                </div>
            </div>



            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}