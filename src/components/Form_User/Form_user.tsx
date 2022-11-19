import styles from './styles.module.css';
import { ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import React, { Component } from 'react';
import axios from 'axios';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useApiLocation } from '../../hooks/useApiGeolocation';
import { FormAvatar } from '../Form_Avatar/Form_Avatar';
import InputMask from 'react-input-mask';

// type Props = {
//     // title?: string; //interrogação deixa a prop não obrigatória 
// }

export const FormUser = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [category, setCategory] = useState("1");
    const [phone, setPhone] = useState('');
    const [road, setRoad] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [genre, setGenre] = useState("1");
    const [work, setWork] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [biography, setBiography] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);
    var [user, setUser] = useState<User | null>(null);

    const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const handleBirthdateInput = (event: ChangeEvent<HTMLInputElement>) => {
        setBirthdate(event.target.value);
    }
    const handleCategoryInput = (event: ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    }
    const handlePhoneInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }
    const handleRoadtInput = (event: ChangeEvent<HTMLInputElement>) => {
        setRoad(event.target.value);
    }
    const handleGenreInput = (event: ChangeEvent<HTMLInputElement>) => {
        setGenre(event.target.value);
    }
    const handleWorkInput = (event: ChangeEvent<HTMLInputElement>) => {
        setWork(event.target.value);
    }
    const handleCityInput = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    }
    const handleDistrictInput = (event: ChangeEvent<HTMLInputElement>) => {
        setDistrict(event.target.value);
    }
    const handleInstagramInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInstagram(event.target.value);
    }
    const handleFacebookInput = (event: ChangeEvent<HTMLInputElement>) => {
        setFacebook(event.target.value);
    }
    const handleBiographyInput = (event: ChangeEvent<HTMLInputElement>) => {
        setBiography(event.target.value);
    }



    var api = useApi();
    var apiLocation = useApiLocation();
    useEffect(() => {
        loadCidade(road, city, district);
    }, [road && city && district]);

    useEffect(() => {
        loadDadosUser();
    }, []);

    const loadDadosUser = async () => {
        setLoading(true);
        let json = await api.getDadosUser();
        setLoading(false);
        setUser(json.user);
    }


    const loadCidade = async (road: string, city: string, district: string) => {
        let json = await apiLocation.getLocation(road, city, district);
        setLatitude(json[0].lat);
        setLongitude(json[0].lon);
    }


    const handleRegister = async () => {
        if (road && city && district) {
            alert("Iremos registrar o seu endereço, com ele poderemos auxiliar caso o seu pet fuja.")
        } else {
            alert("Informe o seu endereço (rua, bairro, cidade), com o cadastro completo poderemos auxiliar caso o seu pet fuja.")
        }

        // if (name && email && password) {

        let json = await api.putUser(name, email, password, birthdate, category, phone, road, district, city, genre, work, instagram, facebook, biography, latitude, longitude);
        console.log(json);

        // } else {
        // alert("Os dados marcados com * não podem ficar em branco!");
        // }
    }

    return (
        <>
            <div className={styles.container}>
                <FormAvatar />
                <div className={styles.page_register}>
                    <div className={styles.register_desc}>
                        <h1>Complete o dados do seu perfil</h1>
                        <p>... Cadastrando todos os dados do seu perfil você terá acesso a todas as ferramentas da plataforma.</p>
                    </div>

                    <div className={styles.register_inputs} onSubmit={handleRegister}>

                        <div className={styles.single_input}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameInput}
                                id="name"
                                required
                                placeholder={user?.name}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                value={user?.email}
                                onChange={handleEmailInput}
                                id="email"
                                required
                                placeholder={user?.email}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                value={password}
                                id="password"
                                required
                                onChange={handlePasswordInput}
                                placeholder="********"
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="category">Categoria</label>
                            <select name="category" id="category" value={category} required onChange={cat => setCategory(cat.target.value)} >
                                <option value="1">Usuário</option>
                                <option value="2">Ong</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="phone">Telefone</label>
                            <InputMask
                                type="text"
                                value={phone}
                                onChange={handlePhoneInput}
                                id="phone"
                                mask="(99)99999-9999"
                                required
                                placeholder={user?.phone}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="birthdate">Data Nascimento</label>
                            <input
                                type="date"
                                value={user?.birthdate}
                                onChange={handleBirthdateInput}
                                id="birthdate"
                                required
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="genre">Gênero</label>
                            <select name="genre" id="genre" value={user?.genre} required onChange={gen => setGenre(gen.target.value)} >
                                <option value="1">Masculino</option>
                                <option value="2">Feminino</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="road">Rua</label>
                            <input
                                type="road"
                                value={road}
                                onChange={handleRoadtInput}
                                id="road"
                                required
                                placeholder="Informe a rua de seu endereço"
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="work">Profissão</label>
                            <input
                                type="work"
                                value={work}
                                onChange={handleWorkInput}
                                id="work"
                                required
                                placeholder={user?.work}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="city">Cidade</label>
                            <input
                                type="city"
                                value={city}
                                onChange={handleCityInput}
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
                                onChange={handleDistrictInput}
                                id="district"
                                required
                                placeholder="Bairro"
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="biography">Biografia</label>
                            <input
                                type="biography"
                                value={biography}
                                onChange={handleBiographyInput}
                                id="biography"
                                required
                                maxLength={48}
                                placeholder={user?.biography}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="instagram">Instagram</label>
                            <input
                                type="instagram"
                                value={instagram}
                                onChange={handleInstagramInput}
                                id="instagram"
                                required
                                placeholder="@instagram"
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="facebook">Facebook</label>
                            <input
                                type="facebook"
                                value={facebook}
                                onChange={handleFacebookInput}
                                id="facebook"
                                required
                                placeholder="Facebook"
                            />
                        </div>
                        <div className={styles.area_btn}>
                            <button className={styles.btn_register} onClick={handleRegister}>Atualizar Dados</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

