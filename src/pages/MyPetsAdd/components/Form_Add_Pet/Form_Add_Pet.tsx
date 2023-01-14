import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../../hooks/useApi';
import styles from './styles.module.css';
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import {
    setPet_Birthdate,
    setPet_Name,
    setPet_Situation,
    setPet_Species,
} from '../../../../redux/reducers/petReducer';
import {
    setUser_Category,
    setUser_Id,
    setUser_Latitude,
    setUser_Longitude,
} from '../../../../redux/reducers/userReducer';

export const Form_Add_Pet = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const user = useAppSelector(state => state.user);
    const pet = useAppSelector(state => state.pet);
    const dispatch = useDispatch();
    const setDadosUser = async (user_dados:
        {
            category: Number;
            id: Number;
            latitude: String;
            longitude: String;
        }) => {

        dispatch(setUser_Category(user_dados?.category));
        dispatch(setUser_Id(user_dados?.id));
        dispatch(setUser_Latitude(user_dados?.latitude));
        dispatch(setUser_Longitude(user_dados?.longitude));
    }

    const loadUser = async () => {
        let json = await api.getUserMe();
        if (json) {
            setDadosUser(json);
        }
    }

    var api = useApi();

    const handleRegister = async () => {
        if (pet.name && pet.species && pet.situation) {
            let json = await api.postCreatepet(pet.name, pet.id_user, pet.species, pet.birthdate, pet.situation, pet.latitude, pet.longitude);
            if (json.success) {
                setSuccess(json.success);
            } else {
                setError(json.error);
            }
        } else if (!pet.name) {
            alert("Preencha o nome do pet!");
        } else if (!pet.species) {
            alert("Preencha a espécie do pet!");
        } else if (!pet.situation) {
            alert("Preencha a situação do pet!");
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className={styles.container}>
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
                    <h1>Cadastre o seu pet</h1>
                    <p>Cadastre todos os seus pets e aproveite das nossas funcionalidades.</p>
                </div>
                <div className={styles.register_inputs} onSubmit={handleRegister}>
                    <div className={styles.single_input}>
                        <label htmlFor="name">* Nome</label>
                        <input
                            type="text"
                            value={pet.name}
                            onChange={name => dispatch(setPet_Name(name.target.value))}
                            id="name"
                            required
                            placeholder="O nome do seu pet"
                        />
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="species">* Espécie</label>
                        <select name="species" id="species" value={pet.species} required onChange={especie => dispatch(setPet_Species(especie.target.value))} >
                            <option value="1">Cachorro</option>
                            <option value="2">Gato</option>
                        </select>
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="birthdate">Nascimento</label>
                        <input
                            type="date"
                            value={pet.birthdate}
                            onChange={birthdate => dispatch(setPet_Birthdate(birthdate.target.value))}
                            id="birthdate"
                            required
                            placeholder="Digite sua data de nascimento"
                        />
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="situation">* Situação</label>
                        <select name="situation" id="situation" value={pet.situation} required onChange={situation => dispatch(setPet_Situation(situation.target.value))} >
                            <option value="1">Meu Pet</option>
                            <option value="2">Pet Para Adoção</option>
                            <option value="3">Meu Pet Fugiu</option>
                            <option value="4">Encontrei Este Pet</option>
                            {user?.category == 2 &&
                                <option value="6">Em tratamento</option>
                            }
                        </select>
                    </div>
                    <div className={styles.area_btn}>
                        <button className={styles.btn_register} onClick={handleRegister}>Cadastrar Pet</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

