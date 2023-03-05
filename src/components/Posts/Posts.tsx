import styles from './styles.module.css';
import { useApi } from "../../hooks/useApi";
import { useContext, useEffect, useState } from 'react';
import { Publish } from '../../types/Publish';
import { FormPost } from '../Form_Post/FormPost';
import { Likes } from '../Like/Like';
import { NewComment } from '../NewComment/Comment';
import { NewCommentAlert } from '../NewCommentAlert/CommentAlert';
import { Link, useNavigate } from 'react-router-dom';
import { Comments } from '../Comments/Comments';
import { Alerts } from '../../types/Alerts';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { isEmpty } from 'lodash';
import { MapPetAlert } from '../MapPetAlert/MapPetAlert';
import Checkbox from '../Checkbox/checkbox';
type Props = {
    // title?: string; //interrogação deixa a prop não obrigatória 
}


export const Posts = () => { //{ title }: Props
    const [loading, setLoading] = useState(true);
    const [comment_post, setCommentPost] = useState(1);
    const [comment_alert, setCommentAlert] = useState(1);
    const [currentPerPage, setCurrentPerPage] = useState(2);
    const [currentPerPageAlerts, setCurrentPerPageAlerts] = useState(2);
    const [createPost, setCreatePost] = useState(1);
    const [viewPostsFriends, setPostsFriends] = useState(true);
    const [viewAlerts, setViewAlerts] = useState(false);
    const [deletedAlert, setDeletedAlert] = useState('');
    const [posts, setPosts] = useState<Publish[]>([]);
    const [alerts, setAlerts] = useState<Alerts[]>([]);
    const [existUpdates, setExistUpdates] = useState(false);
    const [countPosts, setCountPosts] = useState(0);
    const [countLoop, setCountLoop] = useState(0);
    const [isCheckedEncontrado, setIsCheckedEncontrado] = useState(false);

    const [isCheckedPerdido, setIsCheckedPerdido] = useState(false);
    const handleChangeEncontrado = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedEncontrado(e.target.checked);
    };

    const handleChangePerdido = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedPerdido(e.target.checked);
    };
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    var api = useApi();
    let myNewPost = 0;

    const loadPosts = async () => {
        let json = await api.getPosts(currentPerPage);
        setLoading(true);
        if (json) {
            if (posts != json.posts) {
                setPosts(json.posts);
                setCountPosts(json.count_posts.count);
                //console.log('setCountPosts', countPosts);
                //console.log('setCountPosts', json.count_posts.count);
            }
        }
        myNewPost = 0;
        setCountLoop(countLoop + 1);
        setExistUpdates(false);
        setLoading(false);
    }


    const loadAlerts = async () => {
        setLoading(true);
        let json = await api.getAlerts(currentPerPageAlerts);
        if (json) {
            if (alerts != json.alerts) {
                setAlerts(json.alerts);
            }
        }
        setLoading(false);
    }

    const handleMorePosts = async () => {
        setCurrentPerPageAlerts((currentPerPageAlertsInsideState) => currentPerPageAlertsInsideState + 5);
        setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 5);
    }

    // window.onscroll = function () {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    //     ) {
    //         setCurrentPerPageAlerts((currentPerPageAlertsInsideState) => currentPerPageAlertsInsideState + 5);
    //         setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 5);
    //     }
    // }

    const handleNewPostCallback = (newPost: any) => {
        //setExistUpdates(false);
        setCreatePost(createPost + newPost);

        myNewPost = createPost + newPost;
    }

    const handleCommentCallback = (newComment: any) => {

        setCommentPost(comment_post + newComment);
    }

    const handleCommentAlertCallback = (newCommentAlert: any) => {

        setCommentAlert(comment_alert + newCommentAlert);
    }
    const handlePostsFriends = async () => {
        loadPosts();
        setPostsFriends(true);
        setViewAlerts(false);
    }

    const handleAlerts = async () => {
        setExistUpdates(false);
        loadAlerts();
        setPostsFriends(false);
        setViewAlerts(true);
    }

    const handleDeletePost = async (id_post: Number) => {
        let json = await api.postDeletePost(id_post, auth.user?.id);
        loadPosts();
    }

    const handleDeleteAlert = async (id_alert: Number, id_pet: any, situation: Number) => {
        let json = await api.postDeleteAlert(id_alert, id_pet, situation, auth.user?.id);
        if (json) {
            alert('Atualize a situação do pet caso tenha sido encontrado.');
            setDeletedAlert(id_pet);
            navigate('/user/' + auth.user?.id + '/mypet/' + id_pet + '/config/');
        }

    }

    // const handleStartCount = async () => {
    //     let json = await api.getUpdateFeed();
    //     if (json) {
    //         setCountPosts(json.count_posts);
    //     }
    // }

    // const handlePostsUpdate = async () => {
    //     console.log("ponto 1");
    //     if (existUpdates == false) {
    //         console.log("ponto 2");
    //         //countPosts = 0;
    //         const loop = setTimeout(async function () {
    //             //update_cont();
    //         }, 15000);

    //         //clearTimeout(loop);
    //     }
    // }

    const update_cont = async () => {

        let json = await api.getUpdateFeed();
        console.log('cont atual', json.count);
        console.log('countPosts', countPosts);
        console.log('myNewPost', myNewPost);
        if (json.count != countPosts && countPosts > 0) {
            var updates = json.count - countPosts;
            if (updates > 0 && myNewPost == 0) {
                setExistUpdates(true);
                console.log('updates pendentes', updates);
                setCountLoop(countLoop + 1);

            } else {
                setExistUpdates(false);
                setCountLoop(countLoop + 1);
            }
        }
        setCountLoop(countLoop + 1);

        // else {
        //     setCountLoop(countLoop + 1);
        // }
        //setCountPosts(json.count);

    }
    //handlePostsUpdate();




    useEffect(() => {
        if (deletedAlert) {
            navigate('/user/' + auth.user?.id + '/mypet/' + deletedAlert + '/config');
        }
    }, [])


    useEffect(() => {
        //CRIAR O LOOP AQUI 
        if (existUpdates == false) {
            console.log("chamada inicial");
            //countPosts = 0;
            const loop = setTimeout(function () {
                console.log("inicio do loop");
                update_cont();
            }, 60000);

            //clearTimeout(loop);
        }
        //handlePostsUpdate();
    }, [countLoop]);


    useEffect(() => {
        loadAlerts();
    }, [currentPerPageAlerts]);

    useEffect(() => {
        loadPosts();
        // handleStartCount();
    }, [comment_post, currentPerPage, createPost]);

    return (
        <>
            <div className={styles.area_post}>

                <FormPost parentNewPostCallBack={handleNewPostCallback} />

                <div className={styles.area_nav_feeds}>

                    {viewPostsFriends &&
                        <button className={styles.btn_amigos_active} onClick={handlePostsFriends}>Feed</button>
                    }
                    {!viewPostsFriends &&
                        <button className={styles.btn_amigos} onClick={handlePostsFriends}>Ver Feed</button>
                    }
                    {viewAlerts &&
                        <button className={styles.btn_alertas_active} onClick={handleAlerts}>Alertas</button>
                    }
                    {!viewAlerts &&
                        <button className={styles.btn_alertas} onClick={handleAlerts}>Ver Alertas</button>
                    }
                </div>
                {existUpdates == true &&
                    <div className={styles.atualizer_posts}>
                        <p onClick={loadPosts}>Atualizar Feed</p>
                    </div>
                }
                {loading &&
                    <div className={styles.area_loading}>Carregando...</div>
                }
                {!loading && posts.length > 0 &&
                    <>
                        <div className={styles.container}>
                            {viewPostsFriends == true &&
                                <div className={styles.container_justify_content}>
                                    {posts.map((item, index) => (
                                        <div className={styles.post} key={index}>
                                            <div className={styles.user_post}>
                                                <div>
                                                    <img className={styles.avatar} src={item.user.avatar} alt="avatar" loading="lazy" />
                                                    <div className={styles.name_data}>
                                                        <p className={styles.user_name}></p><Link className={styles.link_name} to={'/user/' + item.user.id}>{item.user.name}</Link>
                                                        <p className={styles.data_post}>{item.date_register}</p>
                                                    </div>
                                                </div>
                                                {auth.user?.id == item.id_user &&
                                                    <div className={styles.area_btn_deletar}>
                                                        <p onClick={() => handleDeletePost(item.id)} className={styles.btn_deletar}><img src="src\media\icons\trash.png" alt="deletar post" /></p>
                                                    </div>
                                                }
                                            </div>
                                            <div className={styles.post_body}>
                                                {item.type == 'text' && (
                                                    <div className={styles.post_text}>
                                                        <p>{item.body}</p>
                                                    </div>
                                                )}
                                                {item.type == 'photo' && (
                                                    <div className={styles.post_photo}>
                                                        <p className={styles.subtitle}>{item.subtitle}</p>
                                                        <img src={item.body} alt={item.subtitle} />
                                                    </div>
                                                )}
                                            </div>
                                            {
                                                item.marked_pets &&
                                                <div className={styles.area_marked_pets}>
                                                    <h4>Pets Marcados:</h4>
                                                    {item.marked_pets.map((pets_marked, index) => (
                                                        <div className={styles.marked_pets} key={index}>
                                                            <Link className={styles.mark} to={'/user/' + item.id_user + '/mypet/' + item.id}>{pets_marked}</Link>

                                                            {/* <p>{pets_marked}</p> */}
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                            < div className={styles.interacoes} >
                                                <div className={styles.interacao_like}>
                                                    <Likes id={item.id} />
                                                    {/* like_count={item.likeCount} liked={item.liked}  */}
                                                </div>
                                                <div className={styles.interacao_comment}>
                                                    <NewComment id={item.id} parentCommentCallBack={handleCommentCallback} />
                                                </div>
                                            </div>

                                            <details>
                                                <summary>
                                                    Comentários
                                                </summary>
                                                <div className={styles.area_comments}>

                                                    {item.comments.map((comment_post, index) => (
                                                        <div key={index}>
                                                            <Comments comments={comment_post} parentCommentCallBack={handleCommentCallback} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </details>
                                        </div>
                                    ))}

                                </div>

                            }

                        </div>

                    </>

                }

                {!loading && alerts.length > 0 &&
                    <div className={styles.container}>
                        {viewAlerts == true &&
                            <div className={styles.container_alert}>
                                <div>
                                    <div>
                                        <Checkbox
                                            handleChange={handleChangeEncontrado}
                                            isChecked={isCheckedEncontrado}
                                            label="Encontrados"
                                        />
                                    </div>
                                    <div>
                                        <Checkbox
                                            handleChange={handleChangePerdido}
                                            isChecked={isCheckedPerdido}
                                            label="Perdidos"
                                        />
                                    </div>
                                    <div>
                                        <Checkbox
                                            handleChange={handleChangePerdido}
                                            isChecked={isCheckedPerdido}
                                            label="Para Adoção"
                                        />
                                    </div>
                                    <div>
                                        <Checkbox
                                            handleChange={handleChangePerdido}
                                            isChecked={isCheckedPerdido}
                                            label="Em Tratamento"
                                        />
                                    </div>
                                </div>
                                {alerts.map((item, index) => (
                                    <div className={styles.area_alert} key={index}>

                                        <div className={styles.user_alert}>
                                            <div className={styles.flex_row}>
                                                <img className={styles.avatar} src={item.avatar_tutor} alt="avatar" loading="lazy" />
                                                <div className={styles.name_data}>
                                                    <p className={styles.user_name}></p><Link className={styles.link_name} to={'/user/' + item.id_user}>{item.name_tutor}</Link>
                                                    <p className={styles.data_post}>{item.date_register}</p>
                                                </div>
                                            </div>
                                            {auth.user?.id == item.id_user &&
                                                <div className={styles.area_btn_deletar}>
                                                    <p onClick={() => handleDeleteAlert(item.id, item.id_pet, item.situation)} className={styles.btn_deletar}><img src="src\media\icons\trash.png" alt="deletar alert" /></p>

                                                </div>
                                            }
                                        </div>
                                        <div className={styles.area_cartaz_alert}>
                                            {item.situation == 2 &&
                                                <>
                                                    <div className={styles.header_alert_donating}>
                                                        {item.species == 1 &&
                                                            <>
                                                                <h2 className={styles.title_header}>Cão Para Adoção!</h2>
                                                                <h4 className={styles.subTitle_header}>Tenha este doguinho como seu novo amigo...</h4>
                                                            </>
                                                        }
                                                        {item.species == 2 &&
                                                            <>
                                                                <h2 className={styles.title_header}>Gato Para Adoção!</h2>
                                                                <h4 className={styles.subTitle_header}>Tenha este miau como seu novo amigo...</h4>
                                                            </>
                                                        }
                                                    </div>
                                                    <div className={styles.body_alert_lost}>
                                                        <div className={styles.area_photo_alert}>
                                                            <Link to={'/user/' + item.id_user + '/mypet/' + item.id_pet}>

                                                                <img className={styles.photo_alert} src={item.photo} alt="imagem pet para adoção" />

                                                            </Link>
                                                        </div>
                                                        <div className={styles.area_infor}>
                                                            <ul>
                                                                <li>
                                                                    <Link to={'/user/' + item.id_user + '/mypet/' + item.id_pet}>
                                                                        <h1>{item.name_pet}</h1>
                                                                    </Link>
                                                                </li>
                                                                <li><h5>Raça: {item.breed}</h5></li>
                                                                {item.size == 1 &&
                                                                    <li><h5>Porte: Pequeno</h5></li>
                                                                }
                                                                {item.size == 2 &&
                                                                    <li><h5>Porte: Medio</h5></li>
                                                                }
                                                                {item.size == 3 &&
                                                                    <li><h5>Porte: Grande</h5></li>
                                                                }
                                                                {item.fur == 1 &&
                                                                    <li><h5>Pelagem: Curta</h5></li>
                                                                }
                                                                {item.fur == 2 &&
                                                                    <li><h5>Pelagem: Média</h5></li>
                                                                }
                                                                {item.fur == 3 &&
                                                                    <li><h5>Pelagem: Longa</h5></li>
                                                                }
                                                                <li><h5>Idade: {item.age}</h5></li>
                                                                <li><h5>Distância: {item.distance} km</h5></li>
                                                                <li><h5>Data Ocorrência: {item.date_occurrence} </h5></li>
                                                            </ul> <br />
                                                            <ul>
                                                                <li><h5>... {item.description} </h5></li>
                                                            </ul><br />
                                                            <ul>
                                                                <h3>Meios de Contato:</h3>
                                                                <li><h4>Email: {item.email} </h4></li>
                                                                <li><h2>Telefone: {item.phone} </h2></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </>

                                            }
                                            {item.situation == 3 &&
                                                <>
                                                    <div className={styles.header_alert_lost}>
                                                        {item.species == 1 &&
                                                            <>
                                                                <h2 className={styles.title_header}>Cão Perdido!</h2>
                                                                <h4 className={styles.subTitle_header}>Você viu este doguinho por ai?</h4>

                                                            </>
                                                        }
                                                        {item.species == 2 &&
                                                            <>
                                                                <h2 className={styles.title_header}>Gato Perdido!</h2>
                                                                <h4 className={styles.subTitle_header}>Você viu este miau por ai?</h4>
                                                            </>
                                                        }
                                                    </div>
                                                    <div className={styles.body_alert_lost}>
                                                        <div className={styles.area_photo_alert}>
                                                            <Link to={'/user/' + item.id_user + '/mypet/' + item.id_pet}>
                                                                <img className={styles.photo_alert} src={item.photo} alt="imagem pet perdido" />
                                                            </Link>
                                                        </div>
                                                        <div className={styles.area_infor}>
                                                            <ul>
                                                                <li>
                                                                    <Link to={'/user/' + item.id_user + '/mypet/' + item.id_pet}>
                                                                        <h1>{item.name_pet}</h1>
                                                                    </Link>
                                                                </li>
                                                                <li><h5>Raça: {item.breed}</h5></li>
                                                                {item.size == 1 &&
                                                                    <li><h5>Porte: Pequeno</h5></li>
                                                                }
                                                                {item.size == 2 &&
                                                                    <li><h5>Porte: Medio</h5></li>
                                                                }
                                                                {item.size == 3 &&
                                                                    <li><h5>Porte: Grande</h5></li>
                                                                }
                                                                {item.fur == 1 &&
                                                                    <li><h5>Pelagem: Curta</h5></li>
                                                                }
                                                                {item.fur == 2 &&
                                                                    <li><h5>Pelagem: Média</h5></li>
                                                                }
                                                                {item.fur == 3 &&
                                                                    <li><h5>Pelagem: Longa</h5></li>
                                                                }
                                                                <li><h5>Idade: {item.age}</h5></li>
                                                                <li><h5>Distância: {item.distance} km</h5></li>
                                                                <li><h5>Data Ocorrência: {item.date_occurrence} </h5></li>
                                                            </ul> <br />
                                                            <ul>
                                                                <li><h5>... {item.description} </h5></li>
                                                            </ul><br />
                                                            <ul>
                                                                <h3>Meios de Contato:</h3>
                                                                <li><h4>Email: {item.email} </h4></li>
                                                                <li><h2>Telefone: {item.phone} </h2></li>
                                                            </ul>
                                                        </div>
                                                        < div className={styles.interacoes_alert} >
                                                            <p>Você viu este pet?</p>
                                                            <details>
                                                                <summary>Onde ele foi visto?</summary>
                                                                <br></br>
                                                                <div className={styles.interacao_comment}>
                                                                    <NewCommentAlert id={item.id} parentCommentAlertCallBack={handleCommentAlertCallback} />
                                                                </div>

                                                            </details>
                                                            <details>
                                                                <summary>Registros:</summary>
                                                                <div>
                                                                    <MapPetAlert id_alert={item.id} id_pet={item.id_pet} />
                                                                </div>
                                                            </details>


                                                        </div>
                                                        {/* <details>
                                                            <summary>
                                                                Comentários
                                                            </summary>
                                                            <div className={styles.area_comments}>

                                                                {item.comments.map((comment_post, index) => (
                                                                    <div key={index}>
                                                                        <Comments comments={comment_post} parentCommentCallBack={handleCommentCallback} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </details> */}
                                                    </div>
                                                </>
                                            }
                                            {item.situation == 4 &&
                                                <>
                                                    <div className={styles.header_alert_found}>
                                                        {item.species == 1 &&
                                                            <>
                                                                <h2 className={styles.title_header}>Cão Encontrado!</h2>
                                                                <h4 className={styles.subTitle_header}>Ei, você conhece o dono deste cão?</h4>
                                                            </>
                                                        }
                                                        {item.species == 2 &&
                                                            <>
                                                                <h2 className={styles.title_header}>Gato Encontrado!</h2>
                                                                <h4 className={styles.subTitle_header}>Ei, você conhece o dono deste gato?</h4>
                                                            </>
                                                        }
                                                    </div>
                                                    <div className={styles.body_alert_lost}>
                                                        <div className={styles.area_photo_alert}>
                                                            <Link to={'/user/' + item.id_user + '/mypet/' + item.id_pet}>

                                                                <img className={styles.photo_alert} src={item.photo} alt="imagem pet encontrado" />

                                                            </Link>
                                                        </div>
                                                        <div className={styles.area_infor}>
                                                            <ul>
                                                                <li>
                                                                    <Link to={'/user/' + item.id_user + '/mypet/' + item.id_pet}>
                                                                        <h1>{item.name_pet}</h1>
                                                                    </Link>
                                                                </li>
                                                                <li><h5>Raça: {item.breed}</h5></li>
                                                                {item.size == 1 &&
                                                                    <li><h5>Porte: Pequeno</h5></li>
                                                                }
                                                                {item.size == 2 &&
                                                                    <li><h5>Porte: Medio</h5></li>
                                                                }
                                                                {item.size == 3 &&
                                                                    <li><h5>Porte: Grande</h5></li>
                                                                }
                                                                {item.fur == 1 &&
                                                                    <li><h5>Pelagem: Curta</h5></li>
                                                                }
                                                                {item.fur == 2 &&
                                                                    <li><h5>Pelagem: Média</h5></li>
                                                                }
                                                                {item.fur == 3 &&
                                                                    <li><h5>Pelagem: Longa</h5></li>
                                                                }
                                                                <li><h5>Idade estimada: {item.age}</h5></li>
                                                                <li><h5>Distância: {item.distance} km</h5></li>
                                                                <li><h5>Data Ocorrência: {item.date_occurrence} </h5></li>
                                                            </ul> <br />
                                                            <ul>
                                                                <li><h5>... {item.description} </h5></li>
                                                            </ul><br />
                                                            <ul>
                                                                <h3>Meios de Contato:</h3>
                                                                <li><h4>Email: {item.email} </h4></li>
                                                                <li><h2>Telefone: {item.phone} </h2></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </>

                                            }
                                            {item.situation == 6 &&
                                                <>
                                                    <div className={styles.header_alert_treatment}>
                                                        {item.species == 1 &&
                                                            <>
                                                                <h2 className={styles.title_header}>Cão precisando de ajuda!</h2>
                                                                <h4 className={styles.subTitle_header}>Este doguinho precisa da sua ajuda!</h4>
                                                            </>
                                                        }
                                                        {item.species == 2 &&
                                                            <>
                                                                <h2 className={styles.title_header}>Gato precisando de ajuda!</h2>
                                                                <h4 className={styles.subTitle_header}>Este miau precisa da sua ajuda!</h4>
                                                            </>
                                                        }
                                                    </div>
                                                    <div className={styles.body_alert_lost}>
                                                        <div className={styles.area_photo_alert}>
                                                            <Link to={'/user/' + item.id_user + '/mypet/' + item.id_pet}>

                                                                <img className={styles.photo_alert} src={item.photo} alt="imagem pet em tratamento" />

                                                            </Link>
                                                        </div>
                                                        <div className={styles.area_infor}>
                                                            <ul>
                                                                <li>
                                                                    <Link to={'/user/' + item.id_user + '/mypet/' + item.id_pet}>
                                                                        <h1>{item.name_pet}</h1>
                                                                    </Link>
                                                                </li>
                                                                <li><h5>Raça: {item.breed}</h5></li>
                                                                {item.size == 1 &&
                                                                    <li><h5>Porte: Pequeno</h5></li>
                                                                }
                                                                {item.size == 2 &&
                                                                    <li><h5>Porte: Medio</h5></li>
                                                                }
                                                                {item.size == 3 &&
                                                                    <li><h5>Porte: Grande</h5></li>
                                                                }
                                                                {item.fur == 1 &&
                                                                    <li><h5>Pelagem: Curta</h5></li>
                                                                }
                                                                {item.fur == 2 &&
                                                                    <li><h5>Pelagem: Média</h5></li>
                                                                }
                                                                {item.fur == 3 &&
                                                                    <li><h5>Pelagem: Longa</h5></li>
                                                                }
                                                                <li><h5>Idade: {item.age}</h5></li>
                                                                <li><h5>Distância: {item.distance} km</h5></li>
                                                                <li><h5>Data Ocorrência: {item.date_occurrence} </h5></li>
                                                            </ul> <br />
                                                            <ul>
                                                                <li><h5>... {item.description} </h5></li>
                                                            </ul><br />
                                                            <ul>
                                                                <h3>Meios de Contato:</h3>
                                                                <li><h4>Email: {item.email} </h4></li>
                                                                <li><h2>Telefone: {item.phone} </h2></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </>
                                            }
                                        </div>
                                    </div>

                                ))}

                            </div>

                        }


                    </div>
                }

                {!loading && posts.length > 0 && viewPostsFriends == true &&
                    <div onClick={() => handleMorePosts()}>
                        <h4>veja mais</h4>
                    </div>
                }
                {!loading && alerts.length > 0 && viewAlerts == true &&
                    <div onClick={() => handleMorePosts()}>
                        <h4>veja mais</h4>
                    </div>
                }
                {!loading && posts.length == 0 && viewPostsFriends == true &&
                    <div>
                        <div className={styles.sem_post}>Faça o seu primeiro post, mostre para a gente o seu Pet</div>
                    </div>
                }
            </div >
        </>
    )
}
