import styles from './styles.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import { useParams } from 'react-router-dom';


// type Props = {
//     // title?: string; //interrogação deixa a prop não obrigatória 
// }

export const FormCoverPet = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState(null)
    const auth = useContext(AuthContext);
    var [pet, setPet] = useState<User | null>(null);
    const params = useParams();

    var [user, setUser] = useState<User | null>(null);
    var api = useApi();


    const loadUser = async () => {
        let json = await api.getUserMe();
        if (json) {
            setUser(json);
        }
        console.log(json);
    }

    const loadDadosPet = async () => {
        let json = await api.getPet(user?.id, params.id_pet);
        console.log(json);
        if (json) {
            setPet(json.currentPet[0]);
        }
    }

    const handleFormCoverSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        if (file && file.size > 0) {
            let photo = file;

            let json = await api.putNewCoverFilePet(photo, params.id_user);

            if (json.success) {
                setSuccess(json.success);
            } else {
                setError(json.error);
            }

        } else {
            alert("Post vazio!");
        }
    }

    useEffect(() => {
        loadDadosPet();
    }, [user]);

    useEffect(() => {
        loadUser();
        loadDadosPet();
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
                    {image ? <img className={styles.cover} src={URL.createObjectURL(image)} alt="Imagem" width="150" height="150" loading="lazy" /> : <img className={styles.cover} src={pet?.cover} alt="Imagem" width="150" height="150" loading="lazy" />}<br /><br />

                    {/* <img className={styles.avatar} src={user?.avatar} alt="avatar user" /> */}
                </div>



                <form method='POST' onSubmit={handleFormCoverSubmit}>

                    <div className={styles.Upload_Form}>

                        {/* <input type="file"
                                name="image"
                            /> */}
                        <input type="file" name="image" onChange={e => setImage(e.target.files[0])} /><br /><br />


                    </div>

                    <div className={styles.area_acoes}>
                        <input className={styles.btn_enviar} type="submit" value="Atualizar Cover" />
                    </div>
                </form>
            </div>
        </>
    )
}

