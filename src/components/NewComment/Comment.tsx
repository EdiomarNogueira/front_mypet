import styles from './styles.module.css';
import { ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
// import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';

type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const NewComment = (props: { id: number, parentCommentCallBack: any }) => {

    const [addText, setAddText] = useState('');
    const auth = useContext(AuthContext);
    // var [user, setUser] = useState<User | null>(null);
    var api = useApi();

    var id_post = props.id;

    const handleAddTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddText(e.target.value);
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        if (addText) {
            let comment = addText;
            let json = await api.newCommentPost(id_post, comment);
            onTrigger();
        } else {
            alert("Post vazio!");
        }

    }


    // const loadUser = async () => {
    //     let json = await api.getUserMe();
    //     if (json) {
    //         setUser(json);
    //     }
    // }

    const onTrigger = () => {
        props.parentCommentCallBack(1);
    };

    
    // useEffect(() => {
    //     loadUser();
    // }, []);

    return (
        <form className={styles.comment_area} method='POST' onSubmit={handleFormSubmit}>

            <div className={styles.Upload_Form}>
                <input value={addText}
                    onChange={handleAddTextChange}
                    className={styles.input_text}
                    type="text"
                    placeholder="Comentar..."
                    maxLength={480}
                />
            </div>

            <div className={styles.area_acoes}>
                <input className={styles.btn_enviar} type="submit" value="Enviar" />
            </div>
        </form>
    )
}


