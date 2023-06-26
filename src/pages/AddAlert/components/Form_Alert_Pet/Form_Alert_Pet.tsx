import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import React, { ChangeEvent, useContext, useEffect, useState, FormEvent, Component } from 'react';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from "../../../../hooks/useApi";
import { useApiLocation } from '../../../../hooks/useApiGeolocation';
import InputMask from 'react-input-mask';
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import adicionar_imagem from '../../../../media/adicionar_imagem.jpg';
import {
    setPet_Age,
    setPet_Avatar,
    setPet_Biography,
    setPet_Birthdate,
    setPet_Breed,
    setPet_Castrated,
    setPet_Fur,
    setPet_Genre,
    setPet_Id_User,
    setPet_Latitude,
    setPet_Longitude,
    setPet_Name,
    setPet_Situation,
    setPet_Size,
    setPet_Species,
    setPet_Status,
    setPet_Tutor_Name
} from '../../../../redux/reducers/petReducer';
import {
    setUser_Biography,
    setUser_Birthdate,
    setUser_Category,
    setUser_City,
    setUser_District,
    setUser_Email,
    setUser_Facebook,
    setUser_Genre,
    setUser_Instagram,
    setUser_Latitude,
    setUser_Longitude,
    setUser_Name,
    setUser_Password,
    setUser_Phone,
    setUser_Road,
    setUser_Work
} from '../../../../redux/reducers/userReducer';
import { isEmpty } from 'lodash';

export const FormAlertPet = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState<File>();
    const [addText, setAddText] = useState('');
    const [date_occurrence, setDate_Occurrence] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    const dispatch = useDispatch();
    const user = useAppSelector(state => state.user);
    const pet = useAppSelector(state => state.pet);
    const params = useParams();

    // var [user, setUser] = useState<User | null>(null);
    // var [pet, setPet] = useState<User | null>(null);
    var api = useApi();
    var apiLocation = useApiLocation();

    // const loadUser = async () => {
    //     let json = await api.getUserMe();
    //     // setUser(json);
    //     setDadosUser(json.user);
    // }

    const loadDadosPet = async () => {
        let json = await api.getPet(params.id_user, params.id_pet);
        console.log('json pet', json);
        if (json) {
            setDadosPet(json.currentPet[0]);
            // setPet(json.currentPet[0]);
        }
    }

    const setDadosPet = async (pet_dados:
        {
            name: String;
            id_user: Number;
            species: Number;
            breed: String;
            birthdate: String;
            biography: String;
            age: Number;
            tutor_name: String;
            castrated: Number;
            genre: Number;
            latitude: String;
            longitude: String;
            size: Number;
            fur: Number;
            situation: Number;
            status: Number;
            avatar: String;
        }) => {
        dispatch(setPet_Name(pet_dados?.name));
        dispatch(setPet_Id_User(pet_dados?.id_user));
        dispatch(setPet_Species(pet_dados?.species));
        dispatch(setPet_Breed(pet_dados?.breed));
        dispatch(setPet_Birthdate(pet_dados?.birthdate));
        dispatch(setPet_Biography(pet_dados?.biography));
        dispatch(setPet_Age(pet_dados?.age));
        dispatch(setPet_Tutor_Name(pet_dados?.tutor_name));
        dispatch(setPet_Castrated(pet_dados?.castrated));
        dispatch(setPet_Genre(pet_dados?.genre));
        dispatch(setPet_Latitude(pet_dados?.latitude));
        dispatch(setPet_Longitude(pet_dados?.longitude));
        dispatch(setPet_Size(pet_dados?.size));
        dispatch(setPet_Fur(pet_dados?.fur));
        dispatch(setPet_Situation(pet_dados?.situation));
        dispatch(setPet_Status(pet_dados?.status));
        dispatch(setPet_Avatar(pet_dados?.avatar));
    }

    const setDadosUser = async (user_dados:
        {
            name: String;
            email: String;
            password: String;
            birthdate: String;
            category: Number;
            phone: String;
            road: String;
            district: String;
            city: String;
            genre: Number;
            work: String;
            instagram: String;
            facebook: String;
            biography: String;
            latitude: String;
            longitude: String;
        }) => {

        dispatch(setUser_Name(user_dados?.name));
        dispatch(setUser_Email(user_dados?.email));
        dispatch(setUser_Password(user_dados?.password));
        dispatch(setUser_Birthdate(user_dados?.birthdate));
        dispatch(setUser_Category(user_dados?.category));
        dispatch(setUser_Phone(user_dados?.phone));
        dispatch(setUser_Road(user_dados?.road));
        dispatch(setUser_District(user_dados?.district));
        dispatch(setUser_City(user_dados?.city));
        dispatch(setUser_Genre(user_dados?.genre));
        dispatch(setUser_Work(user_dados?.work));
        dispatch(setUser_Instagram(user_dados?.instagram));
        dispatch(setUser_Facebook(user_dados?.facebook));
        dispatch(setUser_Biography(user_dados?.biography));
        dispatch(setUser_Latitude(user_dados?.latitude));
        dispatch(setUser_Longitude(user_dados?.longitude));
    }

    const handleAddTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddText(e.target.value);
    }

    const handleDate_OccurrenceInput = (event: ChangeEvent<HTMLInputElement>) => {
        setDate_Occurrence(event.target.value);
    }
    // const handlePhoneInput = (event: ChangeEvent<HTMLInputElement>) => {
    //     dispatch(setUser_Phone(event.target.value));
    // }

    const handleFormAlertSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement; }) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;

        if (isEmpty(user.latitude) || isEmpty(user.longitude)) {
            alert('O seu cadastro de perfil está incompleto, complete seu endereço para gerar alertas!');
        }
        console.log(user.latitude);
        console.log(user.longitude);
        if (params.id_pet && params.id_user && file && file.size > 0 && pet.name && addText && pet.situation && date_occurrence && user.road && user.district && user.city && user.email && user.phone && user.latitude && user.longitude) {
            let photo = file;
            let id_user = parseInt(params.id_user);
            let id_pet = parseInt(params.id_pet);
            let json = await api.postNewAlertPet(photo, id_pet, id_user, pet.name, addText, pet.situation, date_occurrence, user.road, user.district, user.city, user.email, user.phone, user.latitude, user.longitude); //CRIAR INSERÇÃO DE ALERTA
            console.log(json);
            if (json.success) {
                setSuccess(json.success);
                console.log("enviou alerta");
            } else {
                setError(json.error);
                console.log(" não enviou alerta");
            }
        } else {
            console.log('id_pet', params.id_user);
            console.log('id_pet', params.id_pet);
            console.log('size', file.size);
            console.log('name', pet.name);
            console.log('addText', addText);
            console.log('situation', pet.situation);
            console.log('date_occurrence', date_occurrence);
            console.log('road', user.road);
            console.log('district', user.district);
            console.log('city', user.city);
            console.log('email', user.email);
            console.log('phone', user.phone);
            console.log('latitude', user.latitude);
            console.log('longitude', user.longitude);
            alert("Preencha todos os campos!");
        }
    }

    const loadDadosUser = async () => {
        setLoading(true);
        let json = await api.getDadosUser();
        if (json) {
            //setUser(json.user);
            //setDados(json.user);
            setDadosUser(json.user);
        }
        setLoading(false);
    }

    const loadCidade = async (road: string, city: string, district: string) => {
        let json = await apiLocation.getLocation(road, city, district);
        console.log('json', json);
        if (json) {
            if (json.lat && json.lon) {
                setLatitude(json.lat);
                setLongitude(json.lon);
            }
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        loadCidade(user?.road, user?.city, user?.district);
    }, [user?.road && user?.city && user?.district]);

    useEffect(() => {
        loadDadosPet();
    }, [user]);

    useEffect(() => {
        //loadUser();
        loadDadosUser();
        loadDadosPet();
    }, []);

    //https://react-leaflet.js.org/
    //LINK PARA MAPA
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
                    {image ? <img className={styles.avatar} src={URL.createObjectURL(image)} alt="Imagem" loading="lazy" /> : <img className={styles.avatar} src={adicionar_imagem} alt="Imagem" width="150" height="150" loading="lazy" />}<br /><br />
                </div>

                <form method='POST' onSubmit={handleFormAlertSubmit}>
                    <div className={styles.Upload_Form}>
                        <div>
                            <input type="file" name="image" onChange={handleFileChange} /><br /><br />
                        </div>
                    </div>

                    <div className={styles.single_input}>
                        <label htmlFor="descricao">Descrição do alerta: *</label>

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
                        <label htmlFor="situation">Situação: *</label>
                        <select name="situation" id="situation" value={pet.situation} required onChange={situation => dispatch(setPet_Situation(situation.target.value))} >
                            {/* <option value="1">Meu Pet</option> */}
                            <option value="">Selecione uma situação</option>
                            <option value="2">Pet Para Adoção</option>
                            <option value="3">Pet Desaparecido</option>
                            <option value="4">Encontrei Este Pet</option>
                            {user?.category == 2 &&
                                <option value="5">Em Tratamento</option>
                            }
                        </select>
                    </div>
                    <div className={styles.single_input_data}>
                        <label htmlFor="data_alerta">Data ocorrência: *</label>
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
                    {user?.category == 1 &&
                        <h4>Tutor: {user?.name}</h4>
                    }
                    {user?.category == 2 &&
                        <h4>ONG: {user?.name}</h4>
                    }

                    <div className={styles.single_input_phone}>
                        <label htmlFor="phone">Telefone: </label>
                        <InputMask
                            type="text"
                            value={user?.phone}
                            onChange={(element) => { dispatch(setUser_Phone(element.target.value)) }}
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
                            <label htmlFor="city">Cidade: *</label>
                            <input
                                type="city"
                                value={user?.city}
                                onChange={(element) => { dispatch(setUser_City(element.target.value)) }}
                                id="city"
                                required
                                placeholder={user?.city}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="district">Bairro: *</label>
                            <input
                                type="district"
                                value={user?.district}
                                onChange={(element) => { dispatch(setUser_District(element.target.value)) }}
                                id="district"
                                required
                                placeholder="Bairro"
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="road">Rua/Avenida: *</label>
                            <input
                                type="road"
                                value={user?.road}
                                onChange={(element) => { dispatch(setUser_Road(element.target.value)) }}
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

