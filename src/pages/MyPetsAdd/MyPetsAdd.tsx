import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useContext } from 'react';
import { Sidebar } from '../../components/SideBar/Sidebar';
import styles from './styles.module.css';
import { SectionMyPets } from '../../components/SectionMyPets/SectionMyPets';
import { Form_Add_Pet } from '../../components/Form_Add_Pet/Form_Add_Pet';


export const MyPetsAdd = () => {
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
        <div className={styles.home}>
            <div>
                <Header title="Um Novo Amigo" />
            </div>
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.area_posts}>
                    < Form_Add_Pet/>
                </div>
                <div className={styles.area_3}>
                    AREA 3
                </div>
            </div>



            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}