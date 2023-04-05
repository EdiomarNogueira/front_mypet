import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';

export const Login = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        if (email && password) {
            const isLogged = await auth.signin(email, password);
            if (isLogged) {
                navigate('/Home');
            } else {
                alert("Acesso Negado");
            }
        }
    }


    return (
        <div className={styles.page_login}>

            <div className={styles.container}>
                <div className={styles.login_desc}>
                <div className={styles.login_desc_background}></div>

                    <h1>Criar Conta</h1>
                    <p>Bem-vindo ao MeuPetAqui, a rede social dedicada aos amantes de pets e ONGs que se preocupam com o cuidado dos nossos amigos de quatro patas.</p>
                    <h2><Link to="/auth/user_register">Efetuar Cadastro</Link></h2>
                </div>


                <div className={styles.login_inputs} onSubmit={handleLogin}>

                    <div className={styles.text_login}>
                        <h1>Olá! <br />Seja bem vindo novamente.</h1>
                        <h3>Faça o seu login...</h3>
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            value={password}
                            id="password"
                            required
                            onChange={handlePasswordInput}
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <div className={styles.area_btn}>
                        <button className={styles.btn_login} onClick={handleLogin}>Entrar</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

