import styles from './styles.module.css';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { User } from '../../../../types/User';
import { useApi } from "../../../../hooks/useApi";


// type Props = {
//     // title?: string; //interrogação deixa a prop não obrigatória 
// }

export const FormAvatarUser = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState<File>();
    //const [endImg] = useState('./f5a18e6eacec994adfb8e3e25efca632.jpg');
    const auth = useContext(AuthContext);
    var [user, setUser] = useState<User | null>(null);
    var api = useApi();


    const loadUser = async () => {
        let json = await api.getUserMe();
        setUser(json);
    }

    const handleFormAvatarSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        if (file && file.size > 0) {
            let photo = file;

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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        loadUser();
    }, []);

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
                    {image ? <img className={styles.avatar} src={URL.createObjectURL(image)} alt="Imagem" width="150" height="150" loading="lazy" /> : <img className={styles.avatar} src={user?.avatar} alt="Imagem" width="150" height="150" loading="lazy" />}<br /><br />

                    {/* <img className={styles.avatar} src={user?.avatar} alt="avatar user" /> */}
                </div>



                <form method='POST' onSubmit={handleFormAvatarSubmit}>

                    <div className={styles.Upload_Form}>
                        <div>
                            {/* <input type="file"
                                name="image"
                            /> */}
                        <input type="file" name="image" onChange={handleFileChange} /><br /><br />

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

