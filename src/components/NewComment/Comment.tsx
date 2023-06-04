import styles from './styles.module.css';
import { ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from "../../hooks/useApi";

type Props = {
    text?: string;
    parentId?: number | null; // Alterado para ser opcional
    id: number;
    parentCommentCallBack: any;
  };


export const NewComment = (props: Props) => {
    const [addText, setAddText] = useState('');
    const auth = useContext(AuthContext);
    const api = useApi();

    var id_post = props.id;

    const handleAddTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddText(e.target.value);
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('aqui vei');
        const formData = new FormData(e.currentTarget);
        if (addText) {
            const comment = addText;
            const json = await api.newCommentPost(props.id, comment, props.parentId || undefined); // Usando o operador || para lidar com o valor null
            console.log('teste novo post', json);
            onTrigger();
          } else {
            alert('Post vazio!');
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
        <form className={styles.comment_area} method="POST" onSubmit={handleFormSubmit}>
          <div className={styles.Upload_Form}>
            <input
              value={addText}
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
      );
}


