import styles from './styles.module.css';
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from 'react';
import { Publish } from '../../types/Publish';
import { FormPost } from '../Form_Post/FormPost';
import { Likes } from '../Like/Like';
import { NewComment } from '../NewComment/Comment';
import { Link } from 'react-router-dom';
import { Comments } from '../Comments/Comments';
import React from 'react';
type Props = {
    // title?: string; //interrogação deixa a prop não obrigatória 
}


export const Posts = () => { //{ title }: Props
    const [posts, setPosts] = useState<Publish[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPerPage, setCurrentPerPage] = useState(2);

    const [item, setItem] = useState('');
    const [comment_post, setCommentPost] = useState('');
    var api = useApi();

    useEffect(() => {
        loadPosts();
    }, [currentPerPage]);


   
    const loadPosts = async () => {
        setLoading(true);
        let json = fetch('http://127.0.0.1:8000/api/feed/?perPage=' + currentPerPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        })

            .then((response) => response.json())
        setLoading(false);
        setPosts(await json);
    }

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                console.log('está visivel', currentPerPage);
                setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 1);
            }
        })

        if (document.querySelector('#sentinela')) { // AO CARREGAR A PÁGINA PELA PRIMEIRA VEZ NÃO VAI EXISTIR A DIV, ENTÃO É PRECISO ISOLAR ESTA PARTE PARA QUANDO EXISTIR A DIV
            intersectionObserver.observe(document.querySelector('#sentinela')!);
        }


        return () => intersectionObserver.disconnect();
    }, []);

    return (
        <>
            <div className={styles.area_post}>
                <FormPost />
                {loading &&
                    <div className={styles.area_loading}>Carregando...</div>
                }
                {!loading && posts.length > 0 &&
                    <>
                        <div className={styles.area_nav_feeds}>
                            <button className={styles.btn_amigos} onClick={loadPosts}>Amigos</button>
                            <button className={styles.btn_alertas} onClick={loadPosts}>Alertas</button>
                        </div>

                        <div className={styles.container}>

                            <p>Pagina atual: {currentPerPage}</p>
                            {posts.map((item, index) => (

                                <div className={styles.post}>
                                    <div className={styles.user_post}>
                                        <img className={styles.avatar} src={item.user.avatar} alt="avatar" />
                                        <div className={styles.name_data}>
                                            <p className={styles.user_name}></p><Link className={styles.link_name} to="/user/:id">{item.user.name}</Link>
                                            <p className={styles.data_post}>{item.date_register}</p>
                                        </div>
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

                                    <div className={styles.interacoes}>
                                        <div className={styles.interacao_like}>
                                            <Likes id={item.id} /> 
                                            {/* like_count={item.likeCount} liked={item.liked}  */}
                                        </div>
                                        <div className={styles.interacao_comment}>
                                            <NewComment id={item.id} />
                                        </div>
                                    </div>
                                    <details>
                                        <summary>
                                            Comentários
                                        </summary>
                                        <div className={styles.area_comments}>

                                            {item.comments.map((comment_post, index) => (
                                                <div>
                                                    <Comments comments={comment_post} />
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                </div>

                            ))}

                            <div className={styles.sentinela} id='sentinela' />

                        </div>
                    </>
                } {!loading && posts.length == 0 &&
                    <div>
                        <div className={styles.sem_post}>Faça o seu primeiro post, mostre para a gente o seu Pet</div>
                    </div>
                }
            </div>


        </>
    )
}
