import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';

type Props = {
    title?: string; //interrogação deixa a prop não obrigatória 
}

export const Header = ({ title }: Props) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async() => {
        navigate('/auth/login');
        await auth.signout();
        
    }
    return (
        <header className={styles.square} >
            <nav className={styles.nav}>
                <h1 className={styles.title}>{title}</h1>
                {auth.user && <button className={styles.btn_sair} onClick={handleLogout}>Sair</button>}
            </nav>
        </header>
    )
}
