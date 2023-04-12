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
    // const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [category, setCategory] = useState("1");
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordStrength, setPasswordStrength] = useState<string>('');
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

    const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    // const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    //     setPassword(event.target.value);
    // }
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

    const checkPasswordStrength = (password: string): string => {
        let strength = '';
        const lowercaseRegex = /(?=.*[a-z])/;
        const uppercaseRegex = /(?=.*[A-Z])/;
        const numberRegex = /(?=.*\d)/;
        const specialCharRegex = /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/;

        if (password.length < 4) {
            strength = 'Muito fraca';
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
                strength = 'Muito forte';
            } else {
                strength = 'Forte';
            }
        }

        return strength;
    };

    const handleRegister = async () => {
        if (name && email && password && category && phone && birthdate && passwordMatch && (passwordStrength === 'Forte' || passwordStrength === 'Muito forte')) {

            let json = await api.postCreateuser(name, email, password, birthdate, category, phone,);

            if (json.status) {
                const isLogged = await auth.signin(email, password);
                if (isLogged) {
                    navigate('/Home');
                } else {
                    alert("Acesso Negado");
                }
            }

        } else {
            if (!passwordMatch) {
                alert("A senha deve coincidir com a senha de confirmação!");
            } else if (passwordStrength === 'Muito fraca' || passwordStrength == 'Fraca' || passwordStrength == 'Media') {
                alert("A senha informada tem segurança insuficiente! Senha " + passwordStrength);
            } else {
                alert("Preencha todos os dados!");
            }
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
                        <label htmlFor="name">Nome:
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameInput}
                                id="name"
                                required
                                placeholder="Digite seu nome"
                            />
                        </label>
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="email">Email:
                            <input
                                type="text"
                                value={email}
                                onChange={handleEmailInput}
                                id="email"
                                required
                                placeholder="Digite seu e-mail"
                            />
                        </label>
                    </div>
                    {/* <div className={styles.single_input}>
                        <label htmlFor="password">Senha: </label>
                        <input
                            type="password"
                            value={password}
                            id="password"
                            required
                            onChange={handlePasswordInput}
                            placeholder="Digite sua senha"
                        />
                    </div> */}
                    <div className={styles.single_input}>
                        <label htmlFor="password">
                            Senha:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                required
                                onChange={handlePasswordInput}
                            />
                        </label>
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="confirmPassword">
                            Confirmar Senha:
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handlePasswordInput}
                            />
                        </label>

                    </div>
                    <div className={styles.info_password}>
                        {!passwordMatch && (
                            <p style={{ color: 'red' }}>As senhas não correspondem.</p>
                        )}
                        {passwordMatch && (
                            <p>Força da senha: {passwordStrength}</p>
                        )}
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="category">Categoria:
                            <select name="category" id="category" value={category} required onChange={cat => setCategory(cat.target.value)} >
                                <option value="1">Usuário</option>
                                <option value="2">Ong</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="phone">Telefone:
                            <InputMask
                                type="text"
                                value={phone}
                                onChange={handlePhoneInput}
                                id="phone"
                                mask="(99)99999-9999"
                                required
                                placeholder="Digite seu nº de telefone"
                            />
                        </label>
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="birthdate">Data Nascimento:
                            <input
                                type="date"
                                value={birthdate}
                                onChange={handleBirthdateInput}
                                id="birthdate"
                                required
                                placeholder="Digite sua data de nascimento"
                            />
                        </label>
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

