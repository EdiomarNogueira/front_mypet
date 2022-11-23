import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { Link, useParams } from 'react-router-dom';
import { Publish } from '../../types/Publish';

export const SectionPerfilUser = (props: { id_user: any, isMe: any }) => {

    let id_user = props.id_user;
    let me = props.isMe;

    const [viewGaleria, setViewGaleria] = useState(true);
    const [currentPerPage, setCurrentPerPage] = useState(0);
    var [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const params = useParams();

    var api = useApi();



    if (user?.isFollowing == true) {
        let isFollowing = user?.isFollowing;
    }



    const loadDadosUser = async () => {
        let $cont = 0;
        setLoading(true);
        let json = await api.getDadosUserPerfil(id_user);
        if (json) {
            setUser(json.user);
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
    let idade = ' -';
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
        loadDadosUser();
        handleVerificFollow();
    }, []);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                console.log('está visivel', currentPerPage);
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
                        <img className={styles.cover_user} src={user?.cover} alt="cover" />
                    </div>
                    <div className={styles.flex_row}>
                        <h2>{user?.name}</h2>
                        {me &&
                            <div className={styles.area_config}>
                                <Link to={'/user/config'}>
                                    <div className={styles.btn_config}>
                                        <img className={styles.config} src="\src\media\icons\config.png" alt="configurar" />
                                        <p>Configurar</p>
                                    </div>
                                </Link>

                            </div>}
                    </div>

                    <div className={styles.infors_user}>
                        <div className={styles.area_avatar}>
                            <img className={styles.avatar} src={user?.avatar} alt="imagem perfil pet" />

                            {/* <p className={styles.biografia}>{biografia}</p> */}
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
                    <div className={styles.area_follow}>
                        {!me &&
                            <div onClick={handleFollowUnfollow} className={styles.follow_unfollow}>
                                {!isFollowing &&
                                    <p className={styles.follow}>Seguir</p>
                                }
                                {isFollowing &&
                                    <p className={styles.unfollow}>Não seguir</p>
                                }
                            </div>
                        }
                        <p>Seguindo: {seguindo}</p>
                        <p>Seguidores: {seguidores}</p>
                    </div>
                    <div className={styles.infors_section}>
                        <p>Email: {email}</p>
                        <p>Facebook: <a target="_blank" href={'https://www.facebook.com/' + facebook}>{facebook}</a></p>
                        <p>Instagram: <a target="_blank" href={'https://www.instagram.com/' + instagram}>@{instagram}</a></p>
                        <p>Telefone: {telefone}</p>
                    </div>

                    <div className={styles.infors_section}>
                        <p>Profissão: {trabalho}</p>
                    </div>
                    <div className={styles.infors_section}>
                        <p>Cidade: {cidade}</p>
                        <p>Bairro: {bairro}</p>
                        <p>Rua: {rua}</p>
                    </div>
                    {/* let idade = ' -';
                    let biografia = ' -';
                    let data_nascimento = ' -';
                    let genero = ' -'; */}

                </div>

            </div>
        </>
    )
}
