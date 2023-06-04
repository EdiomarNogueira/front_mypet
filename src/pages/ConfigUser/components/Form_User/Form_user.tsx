import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useApi } from "../../../../hooks/useApi";
import { useApiLocation } from '../../../../hooks/useApiGeolocation';
import { FormAvatarUser } from '../Form_Avatar_User/Form_Avatar_User';
import InputMask from 'react-input-mask';
import { FormCoverUser } from '../Form_Cover_User/Form_Cover_User';
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
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
    setUser_Work,
} from '../../../../redux/reducers/userReducer';

import { useDispatch } from 'react-redux';

export const FormUser = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const user = useAppSelector(state => state.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordStrength, setPasswordStrength] = useState<string>('');
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    //const auth = useContext(AuthContext);
    //const [loading, setLoading] = useState(false);
    var api = useApi();
    var apiLocation = useApiLocation();

    const setDados = async (user_dados:
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

    const loadDadosUser = async () => {
        //setLoading(true);
        var json = await api.getDadosUser();
        if (json) {
            //setUserCurrent(json.user);
            setDados(json.user);
        }
        //setLoading(false);
    }


    const loadCidade = async (road: string, city: string, district: string) => {
        if (road && city && district) {
            var json = await apiLocation.getLocation(road, city, district);
            if (json.lat && json.lon) {
                dispatch(setUser_Latitude(json.lat));
                dispatch(setUser_Longitude(json.lon));
            }
        }
    }
    const handleUpdatePassword = async () => {
        var json = await api.putPasswordUser(password, confirmPassword);
        if (json.success) {
            setSuccess(json.success);
        } else {
            setError(json.error);
        }
        setPassword('');
        setConfirmPassword('');
        setIsModalOpen(false);
    };
    const handleRegister = async () => {
        if (user.road && user.city && user.district) {
            alert("Iremos registrar o seu endereço, com isso poderemos auxiliar na localização do seu pet.")
        } else {
            alert("Informe o seu endereço (rua, bairro, cidade), com o cadastro completo poderemos auxiliar caso o seu pet fuja.")
        }

        var json = await api.putUser(
            user.name,
            user.email,
            user.password,
            user.birthdate,
            user.category,
            user.phone,
            user.road,
            user.district,
            user.city,
            user.genre,
            user.work,
            user.instagram,
            user.facebook,
            user.biography,
            user.latitude,
            user.longitude);
        if (json.success) {
            setSuccess(json.success);
        } else {
            setError(json.error);
        }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPassword('');
        setConfirmPassword('');
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: any) => {
        setConfirmPassword(e.target.value);
    };



    const checkPasswordStrength = (password: string): string => {
        let strength = '';
        const lowercaseRegex = /(?=.*[a-z])/;
        const uppercaseRegex = /(?=.*[A-Z])/;
        const numberRegex = /(?=.*\d)/;
        const specialCharRegex = /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/;

        if (password.length < 4) {
            strength = 'Muito Fraca';
        } else if (password.length < 6) {
            if (
                lowercaseRegex.test(password) ||
                uppercaseRegex.test(password) ||
                numberRegex.test(password) ||
                specialCharRegex.test(password)
            ) {
                strength = 'Fraca';
            } else {
                strength = 'Média';
            }
        } else if (password.length < 8) {
            if (
                lowercaseRegex.test(password) &&
                uppercaseRegex.test(password) &&
                numberRegex.test(password) &&
                specialCharRegex.test(password)
            ) {
                strength = 'Forte';
            } else {
                strength = 'Média';
            }
        } else {
            if (
                lowercaseRegex.test(password) &&
                uppercaseRegex.test(password) &&
                numberRegex.test(password) &&
                specialCharRegex.test(password)
            ) {
                strength = 'Muito Forte';
            } else {
                strength = 'Forte';
            }
        }

        return strength;
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
            setPasswordMatch(value === confirmPassword);
            const strength = checkPasswordStrength(value);
            setPasswordStrength(strength);
        } else {
            setConfirmPassword(value);
            setPasswordMatch(value === password);
        }
    };

    useEffect(() => {
        if (user.road && user.city && user.district) {
            loadCidade(user.road, user.city, user.district);
        }
    }, [user.road && user.city && user.district]);

    useEffect(() => {
        loadDadosUser();
    }, []);

    return (
        <>

            <div className={styles.container}>
                <FormCoverUser />
                <FormAvatarUser />
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
                        <h2>Seus Dados:</h2>
                        <p>Cadastrando todos os dados do seu perfil você terá acesso a todas as ferramentas da plataforma.</p>
                    </div>

                    <div className={styles.register_inputs} onSubmit={handleRegister}>

                        <div className={styles.single_input}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(element) => { dispatch(setUser_Name(element.target.value)) }}
                                id="name"
                                required

                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                value={user.email || ''}
                                onChange={(element) => { dispatch(setUser_Email(element.target.value)) }}
                                id="email"
                                required
                                placeholder={user?.email}
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="phone">Telefone</label>
                            <InputMask
                                type="text"
                                value={user.phone}
                                onChange={(element) => { dispatch(setUser_Phone(element.target.value)) }}
                                id="phone"
                                mask="(99)99999-9999"
                                required
                                placeholder={user?.phone}
                            />
                        </div>
                        {/* <div className={styles.single_input}>
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                value={user.password || ''}
                                id="password"
                                required
                                onChange={(element) => { dispatch(setUser_Password(element.target.value)) }}
                                placeholder="********"
                            />
                        </div> */}
                        <div className={styles.single_input}>
                            <label htmlFor="category">Categoria</label>
                            <select name="category" id="category" value={user.category} required onChange={cat => dispatch(setUser_Category(cat.target.value))} >
                                <option value="">Selecionar Categoria</option>
                                <option value="1">Usuário</option>
                                <option value="2">Ong</option>
                            </select>
                        </div>

                        <div className={styles.single_input}>
                            <label htmlFor="birthdate">Nascimento</label>
                            <input
                                type="date"
                                value={user.birthdate}
                                onChange={(element) => { dispatch(setUser_Birthdate(element.target.value)) }}
                                id="birthdate"
                                required
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="genre">Gênero</label>
                            <select name="genre" id="genre" value={user.genre} required onChange={gen => dispatch(setUser_Genre(gen.target.value))} >
                                <option value="">Selecionar Gênero</option>
                                <option value="1">Masculino</option>
                                <option value="2">Feminino</option>
                            </select>
                        </div>

                        <div className={styles.single_input}>
                            <label htmlFor="work">Profissão</label>
                            <input
                                type="work"
                                value={user.work}
                                onChange={(element) => { dispatch(setUser_Work(element.target.value)) }}
                                id="work"
                                required
                                placeholder={user?.work}
                            />
                        </div>

                        <div className={styles.single_input}>
                            <label htmlFor="biography">Biografia</label>
                            <input
                                type="biography"
                                value={user.biography}
                                onChange={(element) => { dispatch(setUser_Biography(element.target.value)) }}
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
                                value={user.instagram}
                                onChange={(element) => { dispatch(setUser_Instagram(element.target.value)) }}
                                id="instagram"
                                required
                                placeholder="@instagram"
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="facebook">Facebook</label>
                            <input
                                type="facebook"
                                value={user.facebook}
                                onChange={(element) => { dispatch(setUser_Facebook(element.target.value)) }}
                                id="facebook"
                                required
                                placeholder="Facebook"
                            />
                        </div>


                        <div className={styles.inputs_location}>
                            <div className={styles.input_note}>
                                <p>Informe a sua localização para encontrar os usuários próximos à você e para que possamos se necessário, ajudar a localizar o seu pet.</p>
                            </div>
                            <div className={styles.single_input}>
                                <label htmlFor="city">Cidade</label>
                                <input
                                    type="city"
                                    value={user.city}
                                    onChange={(element) => { dispatch(setUser_City(element.target.value)) }}
                                    id="city"
                                    required
                                    placeholder={user?.city}
                                />
                            </div>
                            <div className={styles.single_input}>
                                <label htmlFor="district">Bairro</label>
                                <input
                                    type="district"
                                    value={user.district}
                                    onChange={(element) => { dispatch(setUser_District(element.target.value)) }}
                                    id="district"
                                    required
                                    placeholder="Bairro"
                                />
                            </div>
                            <div className={styles.single_input}>
                                <label htmlFor="road">Rua/Avenida</label>
                                <input
                                    type="road"
                                    value={user.road}
                                    onChange={(element) => { dispatch(setUser_Road(element.target.value)) }}
                                    id="road"
                                    required
                                    placeholder="Informe a rua de seu endereço"
                                />
                            </div>
                        </div>

                        <div className={styles.area_btn}>
                            <button className={styles.btn_register} onClick={handleRegister}>Atualizar Dados</button>
                        </div>
                        <div>
                            <button className={styles.btn_register} onClick={handleOpenModal}>Alterar Senha</button>

                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.container}>
                    <div className={styles.page_register}>
                        <div className={styles.register_desc}>
                            <h2>Alterar Senha</h2>
                        </div>
                        <div className={styles.register_inputs}>

                            <div className={styles.single_input}>
                                <label htmlFor="password">Senha:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    required
                                    onChange={handlePasswordInput}
                                />

                            </div>
                            <div className={styles.single_input}>
                                <label htmlFor="confirmPassword">Confirmar Senha:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handlePasswordInput}
                                />


                            </div>
                            <div className={styles.info_password}>
                                {!passwordMatch && (
                                    <p style={{ color: 'red' }}>As senhas não correspondem.</p>
                                )}
                                {passwordMatch && (
                                    <div>
                                        {passwordStrength == "Muito Fraca" && (
                                            <p>Força da senha: <strong style={{ color: 'red' }}>{passwordStrength}</strong></p>
                                        )}
                                        {passwordStrength == "Fraca" && (
                                            <p>Força da senha: <strong style={{ color: 'orange' }}>{passwordStrength}</strong></p>
                                        )}
                                        {passwordStrength == "Média" && (
                                            <p>Força da senha: <strong style={{ color: 'black' }}>{passwordStrength}</strong></p>
                                        )}
                                        {passwordStrength == "Forte" && (
                                            <p>Força da senha: <strong style={{ color: 'green' }}>{passwordStrength}</strong></p>
                                        )}
                                        {passwordStrength == "Muito Forte" && (
                                            <p>Força da senha: <strong style={{ color: 'green' }}>{passwordStrength}</strong></p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className={styles.modal_buttons}>
                            <button className={styles.btn_register} onClick={handleUpdatePassword}>Atualizar Senha</button>
                            <button className={styles.btn_cancelar} onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}