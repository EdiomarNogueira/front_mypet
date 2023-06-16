import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../hooks/useApi';
import like from '../../media/like.png';
import no_like from '../../media/no_like.png';

export const Likes = (props: { id: number }) => {
    const [like_count, setLikeCount] = useState(0);
    const [liked_post, setLikedPost] = useState(false);
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
                    <img className={styles.like} src={no_like} alt="" />
                }
                {liked_post == true &&
                    <img className={styles.like} src={like} alt="" />
                }
            </div>
            <p className={styles.like_count} >{like_count}</p>

        </button>
    )
}
