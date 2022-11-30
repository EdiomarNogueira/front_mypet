import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { SectionFriends } from '../SectionFriends/SectionFriends';
import { SectionListRecommended } from '../SectionListRecommended/SectionListRecommended';
import styles from './styles.module.css';

type Props = {
    title?: string; //interrogação deixa a prop não obrigatória 
}

export const HeaderPerfilUser = ({ title }: Props) => {
    const auth = useContext(AuthContext);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    let name = auth.user?.name;
    let id_user = auth.user?.id;
    const handleLogout = async () => {
        navigate('/auth/login');
        await auth.signout();

    }

    const menu_hamburguer = () => setIsActive(!isActive);
    return (
        <div>

            <header className={styles.square} >
                <nav className={styles.nav_desktop}>
                    <Link to="/Home"><h1 className={styles.title_nav_desktop}>{title}</h1></Link>
                    <input className={styles.checkbox_menu} id="menu-hamburguer" type="checkbox" />
                    <label htmlFor="menu-hamburguer" onClick={menu_hamburguer}>
                        <div className={styles.menu_hamburguer}>
                            <span className={styles.hamburguer}></span>
                        </div>
                    </label>

                    <div className={styles.logout}>
                        {auth.user &&
                            <button className={styles.btn_sair} onClick={handleLogout}>Sair </button>
                        }
                        <img src="\src\media\icons\account_circle.svg" onClick={handleLogout} alt="Logout" />
                    </div>
                </nav>

            </header>

            <nav className={`${styles['nav_tablet']} ${!isActive && styles.inactive}`}>

                <ul className={`${styles['menu_tablet']} ${!isActive && styles.inactive}`}>
                <Link to="/Home"><h1 className={styles.title_nav_tablet}>{title}</h1></Link>

                    <div className={styles.sidebar_area}>
                        <div className={styles.divisao_menu}>
                            <ul>
                                <li><Link to="/Home">Home</Link></li>
                                <li><Link to={'/User/' + id_user}>Meu Perfil</Link></li>
                                <li><Link to="/User/config">Meus Dados</Link></li>
                            </ul>
                        </div>
                        <div className={styles.divisao_menu}>
                            <ul>
                                <li><Link to={'/user/' + id_user + '/mypets'}>Pets</Link></li>
                                <li><Link to={'/user/' + id_user + '/gallery'}>Galeria de Fotos</Link></li>
                            </ul>
                        </div>
                        <div className={styles.divisao_menu}>
                            {/* <SectionFriends /> */}
                        </div>
                    </div>

                </ul>
            </nav>
        </div>
    )
}
