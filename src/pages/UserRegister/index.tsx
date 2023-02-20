import { ChangeEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from '../../hooks/useApi';
import styles from './styles.module.css';
import InputMask from 'react-input-mask';

export const UserRegister = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [category, setCategory] = useState("1");
    const [phone, setPhone] = useState('');

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

    var api = useApi();

    const handleRegister = async () => {
        if (name && email && password && category && phone && birthdate ) {

            let json = await api.postCreateuser(name, email, password, birthdate, category, phone,  );

            if (json.status) {
                const isLogged = await auth.signin(email, password);
                if (isLogged) {
                    navigate('/Home');
                } else {
                    alert("Acesso Negado");
                }
            }

        } else {
            alert("Preencha todos os dados!");
        }
    }

    return (
        <div className={styles.page_register}>

            <div className={styles.container}>
                <div className={styles.register_desc}>
                    <h1>Cadastre-se no MeuPetAqui</h1>
                    <p>Fazendo parte do MyPet você poderá encontrar os amigos do seu pet e contar com diversas funcionalidades da plataforma.</p>
                </div>

                <div className={styles.register_inputs} onSubmit={handleRegister}>

                    <div className={styles.single_input}>
                        <label htmlFor="name">Nome: </label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameInput}
                            id="name"
                            required
                            placeholder="Digite seu nome"
                        />
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailInput}
                            id="email"
                            required
                            placeholder="Digite seu e-mail"
                        />
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="password">Senha: </label>
                        <input
                            type="password"
                            value={password}
                            id="password"
                            required
                            onChange={handlePasswordInput}
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="category">Categoria: </label>
                        <select name="category" id="category" value={category} required onChange={cat => setCategory(cat.target.value)} >
                            <option value="1">Usuário</option>
                            <option value="2">Ong</option>
                        </select>
                    </div>
                    <div className={styles.single_input}>
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
                    <div className={styles.single_input}>
                        <label htmlFor="birthdate">Data Nascimento: </label>
                        <input
                            type="date"
                            value={birthdate}
                            onChange={handleBirthdateInput}
                            id="birthdate"
                            required
                            placeholder="Digite sua data de nascimento"
                        />
                    </div>
                    <div className={styles.area_btn}>
                        <button className={styles.btn_register} onClick={handleRegister}>Registrar-se</button>
                    </div>
                </div>
                <h2><Link to="/auth/login">Já possuo uma conta!</Link></h2>
            </div>
        </div >
    );
}

