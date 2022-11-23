import { useState } from 'react';
import styles from './styles.module.css';
import { Comment } from '../../types/Comment';
import { Link } from 'react-router-dom';

export const Comments = (props: { comments: Comment }) => { //props: { like_count: number, liked: boolean }
    const url_user = "/user/" + props.comments.id_user;
    const [comments, setComment] = useState('');
    console.log(comments);
    return (
        <div className={styles.area_comments}>
            <div className={styles.autor_comment}>
                <img className={styles.avatar} src={props.comments.user.avatar} alt="Avatar usuário" />
                <div className={styles.name_date}>
                    <Link className={styles.name}to={url_user}>{props.comments.user.name}</Link>
                    <p className={styles.date}>{props.comments.date_register}</p>
                </div>
            </div>
            <p className={styles.comment}>{props.comments.body}</p>
        </div>
    )
}
