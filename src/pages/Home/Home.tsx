import { Link, useNavigate } from 'react-router-dom';
import { Posts } from '../../components/Posts/Posts';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';

export const Home = () => {
    const auth = useContext(AuthContext);

    return (
        <div className={styles.home}>
            <Header title="Seu Novo Amigo" />
            Página Home
            <Posts />

            <ul>
                <li><Link to="/user/:id/mypets">Meus Pets</Link></li>
                <li><Link to="/user/:id/mypet/:slug">Meu Pet</Link></li>
            </ul>
            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}