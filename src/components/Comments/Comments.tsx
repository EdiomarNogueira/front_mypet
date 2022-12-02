import { useContext, useState } from 'react';
import styles from './styles.module.css';
import { Comment } from '../../types/Comment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from '../../hooks/useApi';

export const Comments = (props: { comments: Comment, parentCommentCallBack: any }) => { //props: { like_count: number, liked: boolean }
    const url_user = "/user/" + props.comments.id_user;
    const auth = useContext(AuthContext);
    var api = useApi();

    const handleDeletePost = async (id_comment: Number) => {
        let json = await api.postDeleteComment(id_comment, auth.user?.id);
        if (json) {
            onTrigger();
        }
    }

    const onTrigger = () => {
        props.parentCommentCallBack(1);
    };

    return (
        <div className={styles.area_comments}>
            <div className={styles.area_100}>
                <div className={styles.header_comment}>
                    <div className={styles.autor_comment}>
                        <img className={styles.avatar} src={props.comments.user.avatar} alt="Avatar usuário" loading="lazy" />
                        <div className={styles.name_date}>
                            <Link className={styles.name} to={url_user}>{props.comments.user.name}</Link>
                            <p className={styles.date}>{props.comments.date_register}</p>
                        </div>
                    </div>
                    <div>
                        {auth.user?.id == props.comments.id_user &&
                            <div className={styles.area_btn_deletar}>
                                <p onClick={() => handleDeletePost(props.comments.id)} className={styles.btn_deletar}><img src="src\media\icons\trash.png" alt="deletar post" /></p>
                            </div>
                        }
                    </div>
                </div>
                <p className={styles.comment}>{props.comments.body}</p>
            </div>

        </div>
    )
}
