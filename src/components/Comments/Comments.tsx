import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import styles from './styles.module.css';
import { Comment } from '../../types/Comment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from '../../hooks/useApi';

type Props = {
    comments: Comment;
    parentCommentCallBack: any;
};

export const Comments = (props: Props) => {
    const url_user = "/user/" + props.comments.id_user;
    const auth = useContext(AuthContext);
    const api = useApi();
    const [addText, setAddText] = useState('');

    const handleDeletePost = async (id_comment: number) => {
        let json = await api.postDeleteComment(id_comment, auth.user?.id);
        if (json) {
            onTrigger();
        }
    };

    const handleAddTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddText(e.target.value);
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>, parentId: number) => {
        e.preventDefault();

        const comment = addText;
        if (comment) {
            const json = await api.newCommentPost(props.comments.id_post, comment, parentId || undefined);
            console.log('teste novo post', json);
            onTrigger();
        } else {
            alert('Post vazio!');
        }
    };

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
                        {auth.user?.id === props.comments.id_user &&
                            <div className={styles.area_btn_deletar}>
                                <p onClick={() => handleDeletePost(props.comments.id)} className={styles.btn_deletar}>
                                    <img src="src\media\icons\trash.png" alt="deletar post" />
                                </p>
                            </div>
                        }
                    </div>
                </div>
                <p className={styles.comment}>{props.comments.body}</p>
            </div>
            <div>
            </div>
            {props.comments.childComments && (
                <details>
                    <summary>
                        Respostas
                    </summary>
                    <form className={styles.comment_area} method="POST" onSubmit={(e) => handleFormSubmit(e, props.comments.id)}>
                        <input
                            value={addText}
                            onChange={handleAddTextChange}
                            className={styles.input_text}
                            type="text"
                            placeholder="Responder..."
                            maxLength={480}
                        />
                        <button className={styles.btn_enviar} type="submit">Responder</button>
                    </form>
                    <div className={styles.child_comments}>
                        {props.comments.childComments.map((childComment) => (
                            <Comments key={childComment.id} comments={childComment} parentCommentCallBack={props.parentCommentCallBack} />
                        ))}
                    </div>
                </details>

            )}
        </div>
    );
};
