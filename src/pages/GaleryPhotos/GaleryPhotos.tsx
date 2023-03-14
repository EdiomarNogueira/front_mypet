
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Sidebar } from '../../components/SideBar/Sidebar';
import styles from './styles.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserGallery } from './components/UserGallery/UserGallery';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Publish } from '../../types/Publish';
import { useApi } from '../../hooks/useApi';
import { FormPost } from '../../components/Form_Post/FormPost';
import { User } from '../../types/User';
import { SidebarOngs } from '../../components/SidebarOngs/SidebarOngs';


export const Gallery = () => {

    const [me, setMe] = useState(false);
    const [posts, setPosts] = useState<Publish[]>([]);
    const [viewGaleria, setViewGaleria] = useState(true);
    const [currentPerPage, setCurrentPerPage] = useState(3);
    const [loading, setLoading] = useState(false);
    var [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    let id_user = auth.user?.id;
    var api = useApi();

    const params = useParams();

    const handleGaleria = async () => {
        setViewGaleria(true);
        setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 3);
    }

    const handleNewPostCallback = (newPost: any) => {

        setCurrentPerPage(currentPerPage + newPost);
    }

    const handleBackButton = () => {
        navigate(-1);
    }

    const loadPhotos = async () => {
        setLoading(true);
        let json = await api.getUserPhotos(params.id_user, currentPerPage);

        //let json = await api.getPetPhotos(id_user, id_pet, currentPerPage);
        setLoading(false);
        setPosts(json.posts);
    }

    const loadDadosUser = async () => {
        let $cont = 0;
        setLoading(true);
        let json = await api.getDadosUserPerfil(params.id_user);
        if (json) {
            setUser(json.user);
        }
        setLoading(false);

    }

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 3);
            }
        });

        if (document.querySelector('#sentinela')) { // AO CARREGAR A PÁGINA PELA PRIMEIRA VEZ NÃO VAI EXISTIR A DIV, ENTÃO É PRECISO ISOLAR ESTA PARTE PARA QUANDO EXISTIR A DIV
            intersectionObserver.observe(document.querySelector('#sentinela')!);
        }
        return () => intersectionObserver.disconnect();
    }, []);

    useEffect(() => {
        loadPhotos();
    }, [currentPerPage]);

    useEffect(() => {
        handleGaleria();

        if (id_user == params.id_user) {
            setMe(true);
        } else {
            loadDadosUser();
        }
    }, []);
    return (
        <div className={styles.home}>
            <div>
                <Header title="MeuPetAqui" />
            </div>
            <div className={styles.area_body}>
                <div className={styles.area_sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.area_posts}>
                    {me &&
                        <div className={styles.area_novo_post}>
                            <FormPost parentNewPostCallBack={handleNewPostCallback} />
                        </div>
                    }
                    {!me &&
                        <div className={styles.area_user_galeria}>
                            <div className={styles.area_flex}>
                                <div className={styles.user_ident}>
                                    <img className={styles.avatar} src={user?.avatar} alt="Avatar usuário" loading="lazy" />
                                    <h3>{user?.name}</h3>
                                </div>
                                <div className={styles.area_btn_voltar}>
                                    <p onClick={handleBackButton}>Voltar</p>
                                </div>
                            </div>

                        </div>

                    }

                    <UserGallery id={params.id_user} isMe={me} posts={posts} />
                    <div className={styles.sentinela} id='sentinela' />

                </div>
                <div className={styles.area_sidebar_ong}>
                    <SidebarOngs />
                </div>
            </div>
            <Footer text="Todos os direitos reservados"></Footer>
        </div>
    );
}