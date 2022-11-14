import styles from './styles.module.css';
import React, { ChangeEvent, useContext, useEffect, useState, FormEvent, Component } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';

// type Props = {
//     // title?: string; //interrogação deixa a prop não obrigatória 
// }

export const FormAvatar = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState(null)
    //const [endImg] = useState('./f5a18e6eacec994adfb8e3e25efca632.jpg');

    const auth = useContext(AuthContext);
    var [user, setUser] = useState<User | null>(null);
    var api = useApi();

    useEffect(() => {
        loadUser();
    }, []);


    const loadUser = async () => {
        let json = await api.getUserMe();
        setUser(json);
    }

    const handleFormSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        if (file && file.size > 0) {
            let photo = file;

            var config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': "Bearer " + localStorage.getItem('authToken')
                },
            };

            let json = await api.putNewAvatarFile(photo);

            if (json.success) {
                setSuccess(json.success);
            } else {
                setError(json.error);
            }

        } else {
            alert("Post vazio!");
        }

    }

    return (
        <>
            <div className={styles.area_return} >
                {success &&
                    <div className={styles.return_sucess}>
                        {success}
                    </div>
                }
                {error &&
                    <div className={styles.return_error}>
                        {error}
                    </div>
                }
            </div>
            <div className={styles.area_novo_post}>

                <div className={styles.flex_row}>
                    {image ? <img className={styles.avatar} src={URL.createObjectURL(image)} alt="Imagem" width="150" height="150" /> : <img className={styles.avatar} src={user?.avatar} alt="Imagem" width="150" height="150" />}<br /><br />

                    {/* <img className={styles.avatar} src={user?.avatar} alt="avatar user" /> */}
                </div>



                <form method='POST' onSubmit={handleFormSubmit}>

                    <div className={styles.Upload_Form}>
                        <div>
                            {/* <input type="file"
                                name="image"
                            /> */}
                            <input type="file" name="image" onChange={e => setImage(e.target.files[0])} /><br /><br />

                        </div>
                    </div>

                    <div className={styles.area_acoes}>
                        <input className={styles.btn_enviar} type="submit" value="Atualizar Avatar" />
                    </div>
                </form>
            </div>
        </>
    )
}

