import styles from './styles.module.css';
import React, { ChangeEvent, useContext, useEffect, useState, FormEvent, Component } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import axios from 'axios';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { useApiLocation } from '../../hooks/useApiGeolocation';
import InputMask from 'react-input-mask';

// type Props = {
//     // title?: string; //interrogação deixa a prop não obrigatória 
// }

export const FormAlertPet = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState(null)
    const [addText, setAddText] = useState('');
    const [date_occurrence, setDate_Occurrence] = useState('');
    const [road, setRoad] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState(String);
    const [phone, setPhone] = useState('');
    const [situation, setSituation] = useState(''); //DEFAULT 1 - NORMAL/2 - Perdido / 3 - Encontrado / 4 - Em tratamento
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    
    const params = useParams();
    var [user, setUser] = useState<User | null>(null);
    var [pet, setPet] = useState<User | null>(null);
    var api = useApi();
    var apiLocation = useApiLocation();

    const loadUser = async () => {
        let json = await api.getUserMe();
        setUser(json);
    }

    const loadDadosPet = async () => {
        let json = await api.getPet(user?.id, params.id_pet);
        console.log(json);
        if (json) {
            setPet(json.currentPet[0]);
        }
    }


    const handleAddTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddText(e.target.value);
    }

    const handleDate_OccurrenceInput = (event: ChangeEvent<HTMLInputElement>) => {
        setDate_Occurrence(event.target.value);
    }
    const handlePhoneInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }

    const handleFormAlertSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
       

        if (params.id_pet && user?.id && file && file.size > 0 && name && addText && situation && date_occurrence && road && district && city && email && phone && latitude && longitude) {
            let photo = file;
            let id_user = user?.id;
            let id_pet = params.id_pet;
            let json = await api.postNewAlertPet(photo, id_pet, id_user, name, addText, situation, date_occurrence, road, district, city, email, phone, latitude, longitude); //CRIAR INSERÇÃO DE ALERTA
            if (json.success) {
                setSuccess(json.success);
            } else {
                setError(json.error);
            }

        } else {
            alert("Preencha todos os campos!");
        }
    }

    const loadDadosUser = async () => {
        setLoading(true);
        let json = await api.getDadosUser();
        if (json) {
            setUser(json.user);
            setDados(json.user);
        }
        setLoading(false);
    }

    const loadCidade = async (road: string, city: string, district: string) => {
        let json = await apiLocation.getLocation(road, city, district);
        if (json[0].lat && json[0].lon) {
            setLatitude(json[0].lat);
            setLongitude(json[0].lon);
        }
    }

    const setDados = async (user: User) => {
        setName(user?.name);
        setEmail(user?.email);
        setCategory(user?.category);
        setPhone(user?.phone);
        setRoad(user?.road);
        setDistrict(user?.district);
        setCity(user?.city);
        setInstagram(user?.instagram);
        setFacebook(user?.facebook);
        setLatitude(user?.latitude);
        setLongitude(user?.longitude);
    }

    useEffect(() => {
        loadCidade(road, city, district);
    }, [road && city && district]);

    useEffect(() => {
        loadDadosUser();

    }, []);

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

                <div className={styles.flex_column}>
                    <h3>Foto de Divulgação:</h3>
                    <p>Escolha uma foto recente para facilitar a identificação do seu Pet</p>
                    {image ? <img className={styles.avatar} src={URL.createObjectURL(image)} alt="Imagem" loading="lazy" /> : <img className={styles.avatar} src={pet?.avatar} alt="Imagem" width="150" height="150" loading="lazy" />}<br /><br />
                </div>

                <form method='POST' onSubmit={handleFormAlertSubmit}>
                    <div className={styles.Upload_Form}>
                        <div>
                            <input type="file" name="image" onChange={e => setImage(e.target.files[0])} /><br /><br />
                        </div>
                    </div>

                    <div className={styles.single_input}>
                        <label htmlFor="descricao">Descrição do alerta:</label>

                        <input value={addText}
                            name="descricao"
                            onChange={handleAddTextChange}
                            className={styles.input_text}
                            type="text"
                            placeholder="Conte o que aconteceu..."
                            maxLength={680}
                        />
                    </div>
                    <div className={styles.single_input_situation}>
                        <label htmlFor="situation">Situação</label>
                        <select name="situation" id="situation" value={situation} required onChange={situation => setSituation(situation.target.value)} >
                            {/* <option value="1">Meu Pet</option> */}
                            <option value="">Selecione uma situação</option>
                            <option value="2">Pet Para Adoção</option>
                            <option value="3">Meu Pet Fugiu</option>
                            <option value="4">Encontrei Este Pet</option>
                            {user?.category == '2' &&
                                <option value="5">Em tratamento</option>
                            }
                        </select>
                    </div>
                    <div className={styles.single_input_data}>
                        <label htmlFor="data_alerta">Data ocorrência: </label>
                        <input
                            name='data_alerta'
                            type="datetime-local"
                            value={date_occurrence}
                            onChange={handleDate_OccurrenceInput}
                            id="data_alerta"
                            required
                            placeholder="Quando aconteceu?"
                        />
                    </div>
                    <br />
                    {user?.category == '1' &&
                        <h4>Tutor: {user?.name}</h4>
                    }
                    {user?.category == '2' &&
                        <h4>ONG: {user?.name}</h4>
                    }

                    <div className={styles.single_input_phone}>
                        <label htmlFor="phone">Telefone: </label>
                        <InputMask
                            type="text"
                            value={phone}
                            onChange={handlePhoneInput}
                            id="phone"
                            mask="(99)99999-9999"
                            required
                            placeholder="Digite seu nº de telefone"
                        />
                    </div>
                    <div className={styles.local_tutor}>
                        <h4>Localização de Referência:</h4>
                        <p>Será enviado um post de alerta para usuários em um raio de 5km de distância do ponto de referência.</p>
                        <div className={styles.single_input}>
                            <label htmlFor="city">Cidade</label>
                            <input
                                type="city"
                                value={city}
                                onChange={(element) => { setCity(element.target.value) }}
                                id="city"
                                required
                                placeholder={user?.city}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="district">Bairro</label>
                            <input
                                type="district"
                                value={district}
                                onChange={(element) => { setDistrict(element.target.value) }}
                                id="district"
                                required
                                placeholder="Bairro"
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="road">Rua/Avenida</label>
                            <input
                                type="road"
                                value={road}
                                onChange={(element) => { setRoad(element.target.value) }}
                                id="road"
                                required
                                placeholder="Informe a rua de seu endereço"
                            />
                        </div>
                    </div>
                    <div className={styles.area_acoes}>
                        <input className={styles.btn_enviar} type="submit" value="Enviar Alerta" />
                    </div>
                </form>
            </div>
        </>
    )
}

