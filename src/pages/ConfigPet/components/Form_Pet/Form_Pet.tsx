import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useApi } from "../../../../hooks/useApi";
import { useParams } from 'react-router-dom';
import { useApiLocation } from '../../../../hooks/useApiGeolocation';
import { FormCoverPet } from '../Form_Cover_Pet/Form_Cover_Pet';
import { FormAvatarPet } from '../Form_Avatar_Pet/Form_Avatar_Pet';
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
import {
    setPet_Age,
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

import { useDispatch } from 'react-redux';
import { setUser_Category } from '../../../../redux/reducers/userReducer';


export const FormPet = () => {

    const params = useParams();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useAppSelector(state => state.user);
    const pet = useAppSelector(state => state.pet);
    var api = useApi();
    var apiLocation = useApiLocation();

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
    }

    const loadDadosUser = async () => {
        setLoading(true);
        let json = await api.getDadosUser();
        if (json) {
            setDadosUser(json.user);
        }
        setLoading(false);
    }

    const setDadosUser = async (user_dados:
        {
            category: Number;
        }) => {
        dispatch(setUser_Category(user_dados?.category));
    }


    const loadDadosPet = async () => {
        setLoading(true);
        let json = await api.getPet(params.id_user, params.id_pet);
        if (json) {
            setDadosPet(json.currentPet[0]);
        }
        setLoading(false);
    }

    const handleRegister = async () => {

        let json = await api.putPet(
            params.id_pet,
            pet.name,
            pet.species,
            pet.breed,
            pet.birthdate,
            pet.biography,
            pet.tutor_name,
            pet.castrated,
            pet.genre,
            pet.latitude,
            pet.longitude,
            pet.size,
            pet.fur,
            pet.situation);
        if (json.success) {
            setSuccess(json.success);
        } else {
            setError(json.error);
        }
    }

    useEffect(() => {
        loadDadosPet();
    }, [user]);

    useEffect(() => {
        loadDadosPet();
        loadDadosUser();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <FormCoverPet />
                <FormAvatarPet />
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
                                value={pet.name || ''}
                                onChange={(element) => { dispatch(setPet_Name(element.target.value)) }}
                                id="name"
                                required

                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="breed">Raça</label>
                            <input
                                type="text"
                                value={pet.breed || ''}
                                onChange={(element) => { dispatch(setPet_Breed(element.target.value)) }}
                                id="breed"
                                required
                                placeholder={pet?.breed}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="birthdate">Data Nascimento</label>
                            <input
                                type="date"
                                value={pet.birthdate || ''}
                                onChange={(element) => { dispatch(setPet_Birthdate(element.target.value)) }}
                                id="birthdate"
                                required
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="biography">Biografia</label>
                            <input
                                type="biography"
                                value={pet.biography || ''}
                                onChange={(element) => { dispatch(setPet_Biography(element.target.value)) }}
                                id="biography"
                                required
                                maxLength={48}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="castrated">Castração</label>
                            <select name="castrated" id="castrated" value={pet.castrated || ''} required onChange={cat => dispatch(setPet_Castrated(cat.target.value))} >
                                <option value="">Definir Castração</option>
                                <option value="1">Castrado</option>
                                <option value="2">Não Castrado</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="genre">Gênero</label>
                            <select name="genre" id="genre" value={pet.genre || ''} required onChange={gen => dispatch(setPet_Genre(gen.target.value))} >
                                <option value="">Definir Gênero</option>
                                <option value="1">Macho</option>
                                <option value="2">Fêmea</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="species">Espécie</label>
                            <select name="species" id="species" value={pet.species || ''} required onChange={gen => dispatch(setPet_Species(gen.target.value))} >
                                <option value="">Definir Espécie</option>
                                <option value="1">Cão</option>
                                <option value="2">Gato</option>
                            </select>
                        </div>

                        <div className={styles.single_input}>
                            <label htmlFor="size">Porte</label>
                            <select name="size" id="size" value={pet.size || ''} required onChange={gen => dispatch(setPet_Size(gen.target.value))} >
                                <option value="">Definir Porte</option>
                                <option value="1">Pequeno</option>
                                <option value="2">Médio</option>
                                <option value="3">Grande</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="fur">Pelagem</label>
                            <select name="fur" id="fur" value={pet.fur || ''} required onChange={gen => dispatch(setPet_Fur(gen.target.value))} >
                                <option value="">Definir Pelagem</option>
                                <option value="1">Curto</option>
                                <option value="2">Médio</option>
                                <option value="3">Longo</option>
                            </select>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="situation">Situação</label>
                            <select name="situation" id="situation" value={pet.situation || ''} required onChange={gen => dispatch(setPet_Situation(gen.target.value))} >
                                <option value="">Definir Situação</option>
                                <option value="1">Meu Pet</option>
                                <option value="2">Pet Para Adoção</option>
                                <option value="3">Meu Pet Fugiu</option>
                                <option value="4">Encontrei Este Pet</option>
                                <option value="5">Pet Foi Adotado</option>
                                {user?.category == 2 &&
                                    <option value="6">Em tratamento</option>
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

