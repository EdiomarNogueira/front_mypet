import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../hooks/useApi';

export const Likes = (props: { id: number }) => {
    const [like_count, setLikeCount] = useState(0);
    const [liked_post, setLikedPost] = useState(Boolean);
    // like_count: number, liked: boolean, 
    var api = useApi();
    var id_post = props.id;

    const getLikes = async () => {

        let json = await api.getLike(id_post);

        setLikeCount(json.likeCount);
        setLikedPost(json.liked);
    }


    const liked = async () => {
        let json = await api.postLiked(id_post);
        getLikes();
    }

    useEffect(() => {
        getLikes();
        
    }, [like_count]);
    
    useEffect(() => {
        getLikes();
    }, [liked_post]);

    return (

        <button className={styles.btn_amigos} onClick={liked}>

            <div className={styles.area_like} >
                {liked_post == false &&
                    <img className={styles.like} src="src\media\icons\no_like.png" alt="" />
                }
                {liked_post == true &&
                    <img className={styles.like} src="src\media\icons\like.png" alt="" />
                }
            </div>
            <p className={styles.like_count} >{like_count}</p>

        </button>
    )
}
