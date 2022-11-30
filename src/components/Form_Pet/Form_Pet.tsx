import styles from './styles.module.css';
import { ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import React, { Component } from 'react';
import axios from 'axios';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import { useApiLocation } from '../../hooks/useApiGeolocation';
import { FormAvatarUser } from '../Form_Avatar_User/Form_Avatar_User';
import InputMask from 'react-input-mask';
import { FormCoverUser } from '../Form_Cover_User/Form_Cover_User';
import { Pets } from '../../types/Pets';
import { FormCoverPet } from '../Form_Cover_Pet/Form_Cover_Pet';
import { FormAvatarPet } from '../Form_Avatar_Pet/Form_Avatar_Pet';

// type Props = {
//     // title?: string; //interrogação deixa a prop não obrigatória 
// }

export const FormPet = () => {
    var [user, setUser] = useState<User | null>(null);
    var [pet, setPet] = useState<Pets | null>(null);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [id_user, setId_User] = useState(Number);
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState(String);
    const [birthdate, setBirthdate] = useState('');
    const [biography, setBiography] = useState('');
    const [age, setAge] = useState('');
    const [tutor_name, setTutor_name] = useState('');
    const [castrated, setCastrated] = useState('');
    const [genre, setGenre] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [size, setSize] = useState('');
    const [fur, setFur] = useState('');
    const [situation, setSituation] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();

    var api = useApi();
    var apiLocation = useApiLocation();

    const setDados = async (pet: Pets) => {
        setName(pet?.name);
        setId_User(pet?.id_user);
        setSpecies(pet?.species);
        setBreed(pet?.breed);
        setBirthdate(pet?.birthdate);
        setBiography(pet?.biography);
        setAge(pet?.age);
        setTutor_name(pet?.tutor_name);
        setCastrated(pet?.castrated);
        setGenre(pet?.genre);
        setLatitude(pet?.latitude);
        setLongitude(pet?.longitude);
        setSize(pet?.size);
        setFur(pet?.fur);
        setSituation(pet?.situation);
        setStatus(pet?.status);
    }

    const loadDadosUser = async () => {
        setLoading(true);
        let json = await api.getDadosUser();
        if (json) {
            setUser(json.user);
        }
        setLoading(false);
    }

    const loadDadosPet = async () => {
        setLoading(true);

        let json = await api.getPet(user?.id, params.id_pet);
        if (json) {
            setPet(json.currentPet[0]);
            setDados(json.currentPet[0]);
        }
        setLoading(false);
    }

    const handleRegister = async () => {

        let json = await api.putPet(params.id_pet, name, species, breed, birthdate, biography, tutor_name, castrated, genre, latitude, longitude, size, fur, situation);

    }

    useEffect(() => {
        loadDadosPet();
    }, [user]);

    useEffect(() => {
        loadDadosUser();
        loadDadosPet();

    }, []);

    return (
        <>
            <div className={styles.container}>
                <FormCoverPet />
                <FormAvatarPet />
                <div className={styles.page_register}>
                    <div className={styles.register_desc}>
                        <h1>Complete o dados do seu pet</h1>
                        <p>... Cadastre todos os dados do seu pet para uma melhor experiência com a plataforma.</p>
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
                            <label htmlFor="breed">Raça</label>
                            <input
                                type="text"
                                value={breed}
                                onChange={(element) => { setBreed(element.target.value) }}
                                id="breed"
                                required
                                placeholder={pet?.breed}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="birthdate">Data Nascimento</label>
                            <input
                                type="date"
                                value={birthdate}
                                onChange={(element) => { setBirthdate(element.target.value) }}
                                id="birthdate"
                                required
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
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="castrated">Castração</label>
                            <select name="castrated" id="castrated" value={castrated} required onChange={cat => setCastrated(cat.target.value)} >
                                <option value="">Definir Castração</option>
                                <option value="1">Castrado</option>
                                <option value="2">Não Castrado</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="genre">Gênero</label>
                            <select name="genre" id="genre" value={genre} required onChange={gen => setGenre(gen.target.value)} >
                                <option value="">Definir Gênero</option>
                                <option value="1">Macho</option>
                                <option value="2">Fêmea</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="species">Espécie</label>
                            <select name="species" id="species" value={species} required onChange={gen => setSpecies(gen.target.value)} >
                                <option value="">Definir Espécie</option>
                                <option value="1">Cão</option>
                                <option value="2">Gato</option>
                            </select>
                        </div>

                        <div className={styles.single_input}>
                            <label htmlFor="size">Porte</label>
                            <select name="size" id="size" value={size} required onChange={gen => setSize(gen.target.value)} >
                                <option value="">Definir Porte</option>
                                <option value="1">Pequeno</option>
                                <option value="2">Médio</option>
                                <option value="3">Grande</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="fur">Pelagem</label>
                            <select name="fur" id="fur" value={fur} required onChange={gen => setFur(gen.target.value)} >
                                <option value="">Definir Pelagem</option>
                                <option value="1">Curto</option>
                                <option value="2">Médio</option>
                                <option value="3">Longo</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="situation">Situação</label>
                            <select name="situation" id="situation" value={situation} required onChange={gen => setSituation(gen.target.value)} >
                                <option value="">Definir Situação</option>
                                <option value="1">Meu Pet</option>
                                <option value="2">Pet Para Adoção</option>
                                <option value="3">Meu Pet Fugiu</option>
                                <option value="4">Encontrei Este Pet</option>
                                {user?.category == '2' &&
                                    <option value="5">Em tratamento</option>
                                }
                            </select>
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

