import styles from './styles.module.css';
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from 'react';
import { Publish } from '../../types/Publish';
import { FormPost } from '../Form_Post/FormPost';
import { Likes } from '../Like/Like';
import { NewComment } from '../NewComment/Comment';
import { Link } from 'react-router-dom';
import { Comments } from '../Comments/Comments';

type Props = {
    // title?: string; //interrogação deixa a prop não obrigatória 
}

export const Posts = () => { //{ title }: Props
    const [posts, setPosts] = useState<Publish[]>([]);
    const [loading, setLoading] = useState(true);
    const [comment_post, setCommentPost] = useState(1);
    const [currentPerPage, setCurrentPerPage] = useState(5);
    const [countPosts, setCountPosts] = useState(1);

    var api = useApi();



    const loadPosts = async () => {
        let json = await api.newPost(currentPerPage);
        if (json) {
            console.log(json);
            setPosts(json);
        }
        setLoading(false);
    }


    window.onscroll = function () {
        if (
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
        ) {
            setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 5);
        }
    }


    const handleNewPostCallback = (newPost: any) => {

        setCountPosts(countPosts + newPost);
    }

    const handleCommentCallback = (newComment: any) => {

        setCommentPost(comment_post + newComment);
    }

    
    useEffect(() => {
        loadPosts();
    }, [currentPerPage]);

    useEffect(() => {
        loadPosts();
    }, [countPosts]);

    useEffect(() => {
        loadPosts();
    }, [comment_post]);
    
    return (
        <>
            <div className={styles.area_post}>
                <FormPost parentNewPostCallBack={handleNewPostCallback} />
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
                            {posts.map((item, index) => (
                                <div className={styles.post}>
                                    <div className={styles.user_post}>
                                        <img className={styles.avatar} src={item.user.avatar} alt="avatar" loading="lazy"/>
                                        <div className={styles.name_data}>
                                            <p className={styles.user_name}></p><Link className={styles.link_name} to={'/user/' + item.user.id}>{item.user.name}</Link>
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
                                    {
                                        item.marked_pets &&
                                        <div className={styles.area_marked_pets}>
                                            <h4>Pets Marcados:</h4>
                                            {item.marked_pets.map((pets_marked, index) => (
                                                <div className={styles.marked_pets}>
                                                    <p>{pets_marked}</p>
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
                                    <div>
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
                        </div>
                    </>
                } {!loading && posts.length == 0 &&
                    <div>
                        <div className={styles.sem_post}>Faça o seu primeiro post, mostre para a gente o seu Pet</div>
                    </div>
                }
            </div >
        </>
    )
}
