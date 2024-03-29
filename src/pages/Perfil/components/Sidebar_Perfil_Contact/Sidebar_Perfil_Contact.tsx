import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { Link, useParams } from 'react-router-dom';
type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const SidebarPerfilContact = () => {
    const auth = useContext(AuthContext);
    const [me, setMe] = useState(false);
    let id_user = auth.user?.id;
    const params = useParams();


    useEffect(() => {
        if (id_user == params.id_user) {
            setMe(true);
        }
    }, []);

    return (


        <div className={styles.sidebar_area}>
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
            
        </div>
    )
}
