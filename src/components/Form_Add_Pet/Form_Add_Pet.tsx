import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from '../../hooks/useApi';
import styles from './styles.module.css';
import InputMask from 'react-input-mask';
import { User } from '../../types/User';

export const Form_Add_Pet = () => {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [id_user, setId_user] = useState(Number);
    const [species, setSpecies] = useState('1');
    const [birthdate, setBirthdate] = useState('');
    const [situation, setSituation] = useState('1'); //DEFAULT 1 - NORMAL/2 - Perdido / 3 - Encontrado / 4 - Em tratamento
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    var [user, setUser] = useState<User | null>(null);

    const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }



    const loadUser = async () => {
        let json = await api.getUserMe();
        setUser(json);
        setId_user(json.id);
        setLatitude(json.latitude);
        setLongitude(json.longitude);
    }

    var api = useApi();

    const handleRegister = async () => {
        if (name && species && situation) {

            let json = await api.postCreatepet(name, id_user, species, birthdate, situation, latitude, longitude);
        } else if (!name) {
            alert("Preencha o nome do pet!");
        } else if (!species) {
            alert("Preencha a espécie do pet!");
        } else if (!situation) {
            alert("Preencha a situação do pet!");
        }
    }


    const handleBirthdateInput = (event: ChangeEvent<HTMLInputElement>) => {
        setBirthdate(event.target.value);
    }

    
    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className={styles.container}>
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
                            value={name}
                            onChange={handleNameInput}
                            id="name"
                            required
                            placeholder="O nome do seu pet"
                        />
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="species">* Espécie</label>
                        <select name="species" id="species" value={species} required onChange={especie => setSpecies(especie.target.value)} >
                            <option value="1">Cachorro</option>
                            <option value="2">Gato</option>
                        </select>
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="birthdate">Nascimento</label>
                        <input
                            type="date"
                            value={birthdate}
                            onChange={handleBirthdateInput}
                            id="birthdate"
                            required
                            placeholder="Digite sua data de nascimento"
                        />
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="situation">* Situação</label>
                        <select name="situation" id="situation" value={situation} required onChange={situation => setSituation(situation.target.value)} >
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

                        <button className={styles.btn_register} onClick={handleRegister}>Cadastrar Pet</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

