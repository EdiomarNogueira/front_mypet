import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useContext } from 'react';


export const MyPets = () => {
    const auth = useContext(AuthContext);

    const params = useParams();
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }

    const handleHomeButton = () => {
        navigate('/');
    }
    return (
        <div>
            <Header title="Seu Novo Amigo" />
            Pets de {params.id}
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/user/:id/mypet/:slug">Meu Pet</Link></li>
                <button onClick={handleBackButton}>Voltar</button>
                <button onClick={handleHomeButton}>Home</button>
            </ul>
            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}