import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Link } from 'react-router-dom';
import { SectionListRecommended } from '../SectionListRecommended/SectionListRecommended';
import { useApi } from '../../hooks/useApi';
import { User } from '../../types/User';
type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
    pendingUpdate?: boolean;
    onFollowUnfollow?: () => void; // Adicione a prop onFollowUnfollow com o tipo correto
}

export const Sidebar = (props: Props) => {
    const auth = useContext(AuthContext);
    let name = auth.user?.name;
    let id_user = auth.user?.id;
    const [pendingUpdate, setPendingUpdate] = useState(false);
    var [user, setUser] = useState<User | null>(null);
    var api = useApi();
    const loadUser = async () => {
        let json = await api.getUserMe();
        setUser(json);
    }
    const handleFollowUnfollow = () => {
        console.log('teste');

        setPendingUpdate(true);
        if (props.onFollowUnfollow) { // Verificar se a função está definida antes de chamá-la
            props.onFollowUnfollow();
        }
    }
    useEffect(() => {
        if (props.pendingUpdate) {
            setPendingUpdate(true);
        }
    }, [props.pendingUpdate]);

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className={styles.sidebar_area}>
            <div className={styles.divisao_menu}>
                <div className={styles.area_image_name_perfil}>
                    <img className={styles.avatar_perfil} src={user?.avatar} alt="avatar user" loading="lazy" />
                    <p>{user?.name}</p>
                </div>

            </div>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to={'/User/' + id_user}>Meu Perfil</Link></li>
                    {/* <li><Link to="/User/config">Meus Dados</Link></li> */}
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <ul>
                    <li><Link to={'/user/' + id_user + '/mypets'}>Pets</Link></li>
                    <li><Link to={'/user/' + id_user + '/gallery'}>Galeria de Fotos</Link></li>
                </ul>
            </div>
            <div className={styles.divisao_menu}>
                <SectionListRecommended onFollowUnfollow={handleFollowUnfollow} pendingUpdate={props.pendingUpdate} />
            </div>
        </div>
    )
}


