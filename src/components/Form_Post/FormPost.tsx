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

export const FormPost = () => {
    const [loading, setLoading] = useState(false);
    const [uploading, setuploading] = useState(false);
    const [addText, setAddText] = useState('');
    const [image, setImage] = useState()

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

    const handleAddTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddText(e.target.value);
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        if (addText || (file && file.size > 0)) {
            let type = '';
            let body = '';
            let subtitle = '';
            let photo = file;
            setuploading(true);
            if (file && file.size > 0) {
                type = "photo";
                subtitle = addText;
                photo = file;
            } else if (addText) {
                type = "text"
                body = addText;
            }

            setuploading(true);
            if (type == "photo") {
                console.log("PHOTO");
                const formData = new FormData();
                formData.append('type', type);
                formData.append('subtitle', subtitle);
                formData.append('photo', file);

                var config = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': "Bearer " + localStorage.getItem('authToken')
                    },
                };

                let json = await api.postNewPostFile(type, subtitle, photo);

              
            } else if (type == "text") {
                console.log("TEXT");

                let json = await api.postNewPostText(type, body);
                // let response = await fetch('http://127.0.0.1:8000/api/feed', {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         type: type,
                //         body: body,
                //     }),
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': "Bearer " + localStorage.getItem('authToken')
                //     }
                // });
            }
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
                    <p className={styles.name}>{user?.name}</p>
                </div>
                <form method='POST' onSubmit={handleFormSubmit}>

                    <div className={styles.Upload_Form}>
                        <input value={addText}
                            onChange={handleAddTextChange}
                            className={styles.input_text}
                            type="text"
                            placeholder="Como foi o dia do seu pet ?"
                            maxLength={480}
                        />
                        <div>
                            <input type="file"
                                name="image"
                            />
                        </div>
                    </div>

                    <div className={styles.area_acoes}>
                        <input className={styles.btn_enviar} type="submit" value="Enviar" />
                    </div>
                </form>
            </div>
        </>
    )
}

