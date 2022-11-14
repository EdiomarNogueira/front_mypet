import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
export const MyPet = () => {
    const auth = useContext(AuthContext);

    const params = useParams();
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }

    const handleHomeButton = () => {
        navigate('/Home');
    }
    return (
        <div>
            <Header title="Seu Novo Amigo" />
            Perfil do Pet {params.slug?.toUpperCase()}
            <ul>
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/user/:id/mypets">Meus Pets</Link></li>
                <button onClick={handleBackButton}>Voltar</button>
                <button onClick={handleHomeButton}>Home</button>

            </ul>
            <Footer text="Todos os direitos reservados"></Footer>

        </div>
    );
}