import styles from './styles.module.css';
import { ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import React, { Component } from 'react';
import axios from 'axios';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useApiLocation } from '../../hooks/useApiGeolocation';
import { FormAvatarUser } from '../Form_Avatar_User/Form_Avatar_User';
import InputMask from 'react-input-mask';
import { FormCoverUser } from '../Form_Cover_User/Form_Cover_User';

// type Props = {
//     // title?: string; //interrogação deixa a prop não obrigatória 
// }

export const FormUser = () => {
    var [user, setUser] = useState<User | null>(null);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(String);
    const [birthdate, setBirthdate] = useState('');
    const [category, setCategory] = useState(String);
    const [phone, setPhone] = useState('');
    const [road, setRoad] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [genre, setGenre] = useState('');
    const [work, setWork] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [biography, setBiography] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);



    var api = useApi();
    var apiLocation = useApiLocation();

    const setDados = async (user: User) => {
        setName(user?.name);
        setEmail(user?.email);
        setPassword(user?.password);
        setBirthdate(user?.birthdate);
        setCategory(user?.category);
        setPhone(user?.phone);
        setRoad(user?.road);
        setDistrict(user?.district);
        setCity(user?.city);
        setGenre(user?.genre);
        setWork(user?.work);
        setInstagram(user?.instagram);
        setFacebook(user?.facebook);
        setBiography(user?.biography);
        setLatitude(user?.latitude);
        setLongitude(user?.longitude);
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

    const handleRegister = async () => {
        if (road && city && district) {
            alert("Iremos registrar o seu endereço, com ele poderemos auxiliar caso o seu pet fuja.")
        } else {
            alert("Informe o seu endereço (rua, bairro, cidade), com o cadastro completo poderemos auxiliar caso o seu pet fuja.")
        }

        let json = await api.putUser(name, email, password, birthdate, category, phone, road, district, city, genre, work, instagram, facebook, biography, latitude, longitude);

    }


    useEffect(() => {
        loadCidade(road, city, district);
    }, [road && city && district]);

    useEffect(() => {
        loadDadosUser();

    }, []);

    return (
        <>
            <div className={styles.container}>
                <FormCoverUser />
                <FormAvatarUser />
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
                                onChange={(element) => { setName(element.target.value) }}
                                id="name"
                                required

                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(element) => { setEmail(element.target.value) }}
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
                                onChange={(element) => { setPassword(element.target.value) }}
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
                                onChange={(element) => { setPhone(element.target.value) }}
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
                                onChange={(element) => { setBirthdate(element.target.value) }}
                                id="birthdate"
                                required
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="genre">Gênero</label>
                            <select name="genre" id="genre" value={genre} required onChange={gen => setGenre(gen.target.value)} >
                                <option value="1">Masculino</option>
                                <option value="2">Feminino</option>
                            </select>
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
                        <div className={styles.single_input}>
                            <label htmlFor="work">Profissão</label>
                            <input
                                type="work"
                                value={work}
                                onChange={(element) => { setWork(element.target.value) }}
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
                            <label htmlFor="biography">Biografia</label>
                            <input
                                type="biography"
                                value={biography}
                                onChange={(element) => { setBiography(element.target.value) }}
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
                                onChange={(element) => { setInstagram(element.target.value) }}
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
                                onChange={(element) => { setFacebook(element.target.value) }}
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

