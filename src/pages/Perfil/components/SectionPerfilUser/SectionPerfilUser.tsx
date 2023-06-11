import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../../../hooks/useApi';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
import {
    setUser_Age,
    setUser_Avatar,
    setUser_Biography,
    setUser_Birthdate,
    setUser_Category,
    setUser_City,
    setUser_Cover,
    setUser_Date_Register,
    setUser_District,
    setUser_Email,
    setUser_Facebook,
    setUser_Followers,
    setUser_Following,
    setUser_Friends,
    setUser_Genre,
    setUser_Instagram,
    setUser_IsFollowing,
    setUser_Latitude,
    setUser_Longitude,
    setUser_Name,
    setUser_Password,
    setUser_Phone,
    setUser_Road,
    setUser_Work,
} from '../../../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
type Props = {
    id_user?: string;
    sidebarUpdated: boolean; // Nova prop para receber a informação de atualização
}
export const SectionPerfilUser = ({ id_user ='', sidebarUpdated }: Props) => {

    // let id_user =id_user;

    const [viewGaleria, setViewGaleria] = useState(true);
    const [currentPerPage, setCurrentPerPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const user = useAppSelector(state => state.user);
    const params = useParams();
    const auth = useContext(AuthContext);
    const dispatch = useDispatch();

    var api = useApi();


    const setDadosUser = async (user_dados:
        {
            id: Number;
            name: String;
            email: String;
            password: String;
            birthdate: String;
            category: Number;
            phone: String;
            road: String;
            age: Number;
            district: String;
            date_register: String;
            city: String;
            isFollowing: Number;
            followers: Number;
            following: Number;
            friends: Number;
            genre: Number;
            work: String;
            instagram: String;
            facebook: String;
            biography: String;
            latitude: String;
            longitude: String;
            avatar: String;
            cover: String;
        }) => {
        dispatch(setUser_Name(user_dados?.id));
        dispatch(setUser_Name(user_dados?.name));
        dispatch(setUser_Email(user_dados?.email));
        dispatch(setUser_Password(user_dados?.password));
        dispatch(setUser_Birthdate(user_dados?.birthdate));
        dispatch(setUser_Category(user_dados?.category));
        dispatch(setUser_Phone(user_dados?.phone));
        dispatch(setUser_Road(user_dados?.road));
        dispatch(setUser_District(user_dados?.district));
        dispatch(setUser_City(user_dados?.city));
        dispatch(setUser_Age(user_dados?.age));
        dispatch(setUser_Genre(user_dados?.genre));
        dispatch(setUser_Work(user_dados?.work));
        dispatch(setUser_Date_Register(user_dados?.date_register));
        dispatch(setUser_IsFollowing(user_dados?.isFollowing));
        dispatch(setUser_Followers(user_dados?.followers));
        dispatch(setUser_Following(user_dados?.following));
        dispatch(setUser_Friends(user_dados?.friends));
        dispatch(setUser_Genre(user_dados?.genre));
        dispatch(setUser_Instagram(user_dados?.instagram));
        dispatch(setUser_Facebook(user_dados?.facebook));
        dispatch(setUser_Biography(user_dados?.biography));
        dispatch(setUser_Latitude(user_dados?.latitude));
        dispatch(setUser_Longitude(user_dados?.longitude));
        dispatch(setUser_Avatar(user_dados?.avatar));
        dispatch(setUser_Cover(user_dados?.cover));
    }

    const loadDadosUser = async () => {
        let $cont = 0;
        setLoading(true);
        let json = await api.getDadosUserPerfil(id_user);
        if (json) {
            // setUser(json.user);
            setDadosUser(json.user);
        }
        setLoading(false);
    }

    const handleVerificFollow = async () => {
        let json = await api.getVerificFollow(id_user);
        if (json) {
            loadDadosUser();
            setIsFollowing(json.isFollower);
        }
    }

    const handleFollowUnfollow = async () => {
        let json = await api.postFollowUnfollow(id_user);
        if (json) {
            loadDadosUser();
            setIsFollowing(json.relation);
        }
    }

    let name = ' -';
    let email = ' -';
    let facebook = ' -';
    let instagram = ' -';
    let telefone = ' -';
    let trabalho = ' -';
    let seguidores = user?.followers;
    let seguindo = user?.following;
    let amigos = user?.friends;
    let idade = null;
    let biografia = ' -';
    let data_nascimento = ' -';
    let genero = ' -';
    let cidade = ' -';
    let bairro = ' -';
    let rua = ' -';
    let categoria = ' -';
    let data_registro = ' -';
    let rastreio = '';
    let msg_rastreio = null;
    let latitude = ' -';
    let longitude = ' -';
    let photoCount = ' -';
    let status = ' -';


    if (user?.birthdate) {
        data_nascimento = user?.birthdate;
    }

    if (user?.age) {
        idade = user?.age;
    }

    if (user?.email) {
        email = user?.email;
    }
    if (user?.facebook) {
        facebook = user?.facebook;
    }
    if (user?.instagram) {
        instagram = user?.instagram;
    }
    if (user?.phone) {
        telefone = user?.phone;
    }

    if (user?.work) {
        trabalho = user?.work;
    }

    if (user?.genre == 1) {
        genero = 'Homem';
    } else if (user?.genre == 2) {
        genero = 'Mulher';
    } else {
        genero = 'Não Informado';
    }

    if (user?.category == 1) {
        categoria = "Usuário";
    } else if (user?.category == 2) {
        categoria = "ONG";
    }
    if (user?.latitude && user?.longitude) {
        rastreio = "Disponível";
        msg_rastreio = null;
    } else {
        rastreio = "Indisponível";
        msg_rastreio = "*Complete o seu cadastro informando sua localização para ativação das funções de rastreio de pet."
    }

    if (user?.date_register) {
        let D = user?.date_register.toString();
        let data = D.split(' ', 1);
        data_registro = data[0];
    }

    if (user?.biography) {
        biografia = user?.biography;
    }

    if (user?.city) {
        cidade = user?.city;
    }
    if (user?.district) {
        bairro = user?.district;
    }
    if (user?.road) {
        rua = user?.road;
    }
    if (user?.biography) {
        biografia = user?.biography;
    }

    useEffect(() => {
        handleVerificFollow();
        if (user?.isFollowing == true) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, []);

    useEffect(() => {
        loadDadosUser();
        handleVerificFollow();
    }, [params,sidebarUpdated]);

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

    return (
        <>
            <div className={styles.area_Section_Perfil_User}>
                <div className={styles.container}>
                    <div>
                        <img className={styles.cover_user} src={user?.cover} alt="cover" loading="lazy" />
                    </div>
                    <div className={styles.flex_row}>
                        <h2>{user?.name}</h2>

                        {auth.user?.id == parseInt(id_user) &&
                            < div className={styles.area_config}>
                                <Link to={'/user/config'}>
                                    <div className={styles.btn_config}>
                                        <img className={styles.config} src="\src\media\icons\config.png" alt="configurar" loading="lazy" />
                                        <p>Configurar</p>
                                    </div>
                                </Link>

                            </div>}
                    </div>
                    <div className={styles.area_follow}>
                        {auth.user?.id != parseInt(id_user) &&
                            <div onClick={handleFollowUnfollow} className={styles.follow_unfollow}>
                                {!isFollowing &&
                                    <p className={styles.follow}>Seguir</p>
                                }
                                {isFollowing &&
                                    <p className={styles.unfollow}>Não seguir</p>
                                }
                            </div>
                        }
                        <Link className={styles.btn_follows} to={'/user/' + id_user + '/connections'}>Amigos: {amigos}</Link>
                        <Link className={styles.btn_follows} to={'/user/' + id_user + '/connections'}>Seguindo: {seguindo}</Link>
                        <Link className={styles.btn_follows} to={'/user/' + id_user + '/connections'}>Seguidores: {seguidores}</Link>
                    </div>


                    {auth.user?.id == parseInt(id_user) ?
                        <div className={styles.container_infors_me}>
                            <div className={styles.infors_user}>
                                <div className={styles.infors}>
                                    <div className={styles.infors_dados}>
                                        <div>
                                            <p>Categoria: {categoria}</p>
                                            <p>Rastreio: {rastreio}</p>
                                            <p>Cadastrado em: {data_registro}</p>
                                            <p>Idade: {idade} anos</p>
                                            <p>Data_nascimento: {data_nascimento}</p>
                                            <p>Genero: {genero}</p>
                                            <p>Biografia: {biografia}</p>
                                        </div>
                                    </div>
                                    {msg_rastreio &&
                                        <p className={styles.msg_rastreio}>{msg_rastreio}</p>
                                    }
                                </div>
                            </div>
                        </div> :
                        <div className={styles.container_infors}>
                            <div className={styles.infors_user}>
                                <div className={styles.area_avatar}>
                                    <img className={styles.avatar} src={user?.avatar} alt="imagem perfil pet" loading="lazy" />

                                    <p className={styles.biografia}>{biografia}</p>
                                </div>
                                <div className={styles.infors}>
                                    <div className={styles.infors_dados}>
                                        <div>
                                            <p>Categoria: {categoria}</p>
                                            <p>Rastreio: {rastreio}</p>
                                            <p>Cadastrado em: {data_registro}</p>
                                            <p>Idade: {idade} anos</p>
                                            <p>Data_nascimento: {data_nascimento}</p>
                                            <p>Genero: {genero}</p>
                                            <p>Biografia: {biografia}</p>
                                        </div>
                                    </div>
                                    <div>
                                    </div>

                                    {msg_rastreio &&
                                        <p className={styles.msg_rastreio}>{msg_rastreio}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <div className={styles.infors_section}>
                        {auth.user?.id != parseInt(id_user) &&
                            <div className={styles.area_action_user}>
                                <Link className={styles.btn_action} to={'/user/' + id_user + '/mypets'}>Ver Pets</Link>
                                <Link className={styles.btn_action} to={'/user/' + id_user + '/gallery'}>Galeria de Fotos</Link>
                            </div>
                        }
                        <p>Email: {email}</p>
                        <p>Facebook: <a target="_blank" href={'https://www.facebook.com/' + facebook}>{facebook}</a></p>
                        <p>Instagram: <a target="_blank" href={'https://www.instagram.com/' + instagram}>@{instagram}</a></p>
                        <p>Telefone: {telefone}</p>
                        <hr />
                        <p>Profissão: {trabalho}</p>
                        <hr />
                        <p>Cidade: {cidade}</p>
                        <p>Bairro: {bairro}</p>
                        <p>Rua: {rua}</p>
                    </div>
                </div>

                {/* let idade = ' -';
                    let biografia = ' -';
                    let data_nascimento = ' -';
                    let genero = ' -'; */}
            </div>
        </>
    )
}
