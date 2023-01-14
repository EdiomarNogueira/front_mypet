import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
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

export const FormUser = () => {
    //var [userCurrent, setUserCurrent] = useState<User | null>(null);

    const auth = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const user = useAppSelector(state => state.user);

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
        setLoading(true);
        let json = await api.getDadosUser();
        if (json) {
            //setUserCurrent(json.user);
            setDados(json.user);
        }
        setLoading(false);
    }


    const loadCidade = async (road: string, city: string, district: string) => {
        let json = await apiLocation.getLocation(road, city, district);

        if (json[0].lat && json[0].lon) {
            dispatch(setUser_Latitude(json[0].lat));
            dispatch(setUser_Longitude(json[0].lon));
        }
    }

    const handleRegister = async () => {
        if (user.road && user.city && user.district) {
            alert("Iremos registrar o seu endereço, com ele poderemos auxiliar caso o seu pet fuja.")
        } else {
            alert("Informe o seu endereço (rua, bairro, cidade), com o cadastro completo poderemos auxiliar caso o seu pet fuja.")
        }

        let json = await api.putUser(
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


    useEffect(() => {

        loadCidade(user.road, user.city, user.district);
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
                        <h1>Complete o dados do seu perfil</h1>
                        <p>... Cadastrando todos os dados do seu perfil você terá acesso a todas as ferramentas da plataforma.</p>
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
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                value={user.password || ''}
                                id="password"
                                required
                                onChange={(element) => { dispatch(setUser_Password(element.target.value)) }}
                                placeholder="********"
                            />
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="category">Categoria</label>
                            <select name="category" id="category" value={user.category} required onChange={cat => dispatch(setUser_Category(cat.target.value))} >
                                <option value="">Selecionar Categoria</option>
                                <option value="1">Usuário</option>
                                <option value="2">Ong</option>
                            </select>
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
                        <div className={styles.single_input}>
                            <label htmlFor="birthdate">Data Nascimento</label>
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
                        <div className={styles.area_btn}>
                            <button className={styles.btn_register} onClick={handleRegister}>Atualizar Dados</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
