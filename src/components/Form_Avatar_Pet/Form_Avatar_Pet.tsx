import styles from './styles.module.css';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
//import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import { useParams } from 'react-router-dom';
import { setPet_Avatar } from '../../redux/reducers/petReducer';

import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';

export const FormAvatarPet = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState<File>();
    const auth = useContext(AuthContext);
    const dispatch = useDispatch();

    const pet = useAppSelector(state => state.pet);
    const params = useParams();

    var api = useApi();





    const setDadosPet = async (pet_dados:
        {

            avatar: String;
        }) => {

        dispatch(setPet_Avatar(pet_dados?.avatar));
    }


    const loadDadosPet = async () => {
        let json = await api.getPet(params.id_user, params.id_pet);
        if (json.currentPet[0]) {
            console.log(json.currentPet[0]);
            setDadosPet(json.currentPet[0]);
        }
    }

    const handleFormAvatarSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        if (file && file.size > 0) {
            let photo = file;
            let json = await api.putNewAvatarFilePet(photo, params.id_pet);

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
                    {image ? <img className={styles.avatar} src={URL.createObjectURL(image)} alt="Imagem" width="150" height="150" loading="lazy" /> : <img className={styles.avatar} src={pet?.avatar} alt="Imagem" width="150" height="150" loading="lazy" />}<br /><br />

                    {/* <img className={styles.avatar} src={user?.avatar} alt="avatar user" /> */}
                </div>



                <form method='POST' onSubmit={handleFormAvatarSubmit}>

                    <div className={styles.Upload_Form}>
                        <div>

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

