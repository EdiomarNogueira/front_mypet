import styles from './styles.module.css';
import { ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Publish } from '../../types/Publish';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import React, { Component } from 'react';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
// type Props = {
//     // title?: string; //interrogação deixa a prop não obrigatória 
// }

export const FormAvatar = () => {
    const [loading, setLoading] = useState(false);
    const [uploading, setuploading] = useState(false);
    const [image, setImage] = useState(null)

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
    var [user, setUser] = useState<User | null>(null);
    var api = useApi();


    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        if (file && file.size > 0) {
            let photo = file;
            setuploading(true);

            var config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': "Bearer " + localStorage.getItem('authToken')
                },
            };

            let json = await api.putNewAvatarFile(photo);
            setImage(null);


            setLoading(false);
        } else {
            alert("Post vazio!");
        }

    }

    return (
        <>
            <div className={styles.area_novo_post}>
                <div className={styles.flex_row}>
                    <img className={styles.avatar} src={user?.avatar} alt="avatar user" />
                </div>
                <form method='POST' onSubmit={handleFormSubmit}>

                    <div className={styles.Upload_Form}>
                        <div>
                            <input type="file"
                                name="image"
                            />
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

