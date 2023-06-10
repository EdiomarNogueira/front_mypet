import { Link, useNavigate } from 'react-router-dom';
import { Posts } from '../../components/Posts/Posts';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { Sidebar } from '../../components/SideBar/Sidebar';
import { SectionConnectionsUser } from './components/SectionConnectionsUser/SectionConnectionsUser';
import { SidebarOngs } from '../../components/SidebarOngs/SidebarOngs';

export const ConnectionsUser = () => {
    const auth = useContext(AuthContext);
    const [pendingUpdate, setPendingUpdate] = useState(false);
    const [followedUsers, setFollowedUsers] = useState([]);

    const handleFollowUnfollow = () => {
        console.log("veio aqui");
        setPendingUpdate(true);
    }

    useEffect(() => {
        if (pendingUpdate) {
            setPendingUpdate(false);
        }
    }, [pendingUpdate]);

    useEffect(() => {
        console.log('pendingUpdate',pendingUpdate);
    }, [pendingUpdate]);

    return (
        <div className={styles.home}>
            <Header title="MeuPetAqui" onFollowUnfollow={handleFollowUnfollow} pendingUpdate={false} />
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    <Sidebar pendingUpdate={pendingUpdate} onFollowUnfollow={handleFollowUnfollow} />
                </div>
                <div className={styles.area_posts}>
                    <SectionConnectionsUser onFollowUnfollow={handleFollowUnfollow} pendingUpdate={pendingUpdate} />
                </div>
                <div className={styles.area_sidebar_ong}>
                    <SidebarOngs />
                </div>
            </div>



            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}