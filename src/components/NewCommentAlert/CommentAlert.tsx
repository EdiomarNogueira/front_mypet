import styles from './styles.module.css';
import { ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
// import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import { useApiLocation } from '../../hooks/useApiGeolocation';

type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const NewCommentAlert = (props: { id: number, parentCommentAlertCallBack: any }) => {

    const [addText, setAddText] = useState('');
    const [addCity, setAddCity] = useState('');
    const [addDistrict, setAddDistrict] = useState('');
    const [addRoad, setAddRoad] = useState('');
    const [addDateFound, setAddDateFound] = useState('');
    const auth = useContext(AuthContext);
    const [image, setImage] = useState<File>();
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    // var [user, setUser] = useState<User | null>(null);
    var api = useApi();
    var apiLocation = useApiLocation();
    var id_alert = props.id;

    const handleAddTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddText(e.target.value);
    }

    const handleDateFoundChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddDateFound(e.target.value);
    }

    const handleAddCity = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddCity(e.target.value);
    }

    const handleAddDistrict = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddDistrict(e.target.value);
    }

    const handleAddRoad = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddRoad(e.target.value);
    }

    const loadCidade = async () => {
        let json = await apiLocation.getLocation(addRoad, addCity, addDistrict);
        console.log('json', json);
        if (json) {
            if (json.lat && json.lon) {
                setLatitude(json.lat);
                setLongitude(json.lon);
            }
        }
    }

    const handleFormSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const file = formData.get('image') as File;


        let photo = file;

        if (addText) {
            let body = addText;
            let json = await api.newCommentAlert(id_alert, auth.user?.id, body, addDateFound, latitude, longitude, addRoad, addCity, addDistrict, photo);
            console.log(json);
            onTrigger();
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

    const onTrigger = () => {
        props.parentCommentAlertCallBack(1);
    };
    useEffect(() => {
        loadCidade();
    }, [addRoad, addCity, addDistrict]);

    return (
        <form className={styles.comment_area} method='POST' onSubmit={handleFormSubmit}>
            <div className={styles.single_input}>
                <label htmlFor="city">Comentário: </label>
                <input value={addText}
                    onChange={handleAddTextChange}
                    className={styles.input_text}
                    type="text"
                    placeholder="Comentar..."
                    maxLength={480}
                />
            </div>
            <div className={styles.single_input_data}>
                <label htmlFor="date_found">Data ocorrência: </label>
                <input
                    name='date_found'
                    type="datetime-local"
                    onChange={handleDateFoundChange}
                    id="date_found"
                    required
                    placeholder="Quando aconteceu?"
                />
            </div>
            <p>Informe o local mais próximo de onde o pet foi visto, assim poderemos ajudar a encontra-lo </p>
            <div className={styles.single_input}>
                <label htmlFor="city">Cidade: </label>
                <input
                    type="city"
                    onChange={handleAddCity}
                    id="city"
                    required
                    placeholder={'Cidade...'}
                />
            </div>
            <div className={styles.single_input}>
                <label htmlFor="district">Bairro: </label>
                <input
                    type="district"
                    onChange={handleAddDistrict}
                    id="district"
                    required
                    placeholder="Bairro..."
                />
            </div>
            <div className={styles.single_input}>
                <label htmlFor="road">Rua/Avenida: </label>
                <input
                    type="road"
                    onChange={handleAddRoad}
                    id="road"
                    required
                    placeholder="Rua..."
                />
            </div>

            <div className={styles.image_comment_alert}>
                <p>Ajude a identificar o pet através de uma foto:</p>
                <label htmlFor="image">Imagem Pet: </label>
                <div>
                    <input type="file" name="image" onChange={handleFileChange} /><br /><br />
                </div>
            </div>
            <div className={styles.area_acoes}>
                <input className={styles.btn_enviar} type="submit" value="Enviar" />
            </div>
        </form>
    )
}


