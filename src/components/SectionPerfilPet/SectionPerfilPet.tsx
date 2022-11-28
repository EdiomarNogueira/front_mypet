import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../hooks/useApi';
import { Pets } from '../../types/Pets';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/User';
import { Link, useParams } from 'react-router-dom';
import { SectionToolsPet } from '../SectionToolsPet/SectionToolsPet';

export const SectionPerfilPet = (props: { idpet: any }) => {
    const [pet, setPet] = useState<Pets>(Object);
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    const [me, setMe] = useState(false);

    var [user, setUser] = useState<User | null>(null);
    const params = useParams();
    let id_pet = props.idpet;
    var api = useApi();


    const loadDadosPet = async () => {
        setLoading(true);
        let json = await api.getPet(params.id_user, id_pet);
        if (json) {
            setPet(json.currentPet[0]);
            console.log(json.currentPet);
        }
        setLoading(false);

    }


    const handleAlert = async () => {
        alert('Gerar alerta');
        //FAZER UPDATE EM SITUAÇÃO DO PET
        //FAZER VERIFICAÇÃO DE QUEM ESTÁ PROÓXIMO E ENVIAR MENSAGEM
    }


    useEffect(() => {
        if (auth.user?.id == params.id_user) {
            setMe(true);
        } else {
            setMe(false);
        }
        loadDadosPet();
    }, []);

    let porte = '';
    let biography = '';
    let idade = '';
    let infor_cadastro = '';
    let situation = '';
    let pelo = '';
    let genero = '';
    let castrado = '';
    let rastreio = '';
    let msg_rastreio = null;
    //verificar a situação do pet, a depender mudar como identificar o tutor

    if (typeof (pet.latitude) !== 'undefined' && typeof (pet.longitude) !== 'undefined') {
        rastreio = "Disponível";
        msg_rastreio = null;
    } else {
        rastreio = "Indisponível";
        msg_rastreio = "*Complete o seu cadastro de usuário informando sua localização para que seja possivel ajudarmos a localizar o seu pet se necessário."
    }
    switch (pet.situation) {
        case 1:
            infor_cadastro = "Tutor: " + pet.tutor_name;
            break;
        case 2:
            infor_cadastro = "Doador: " + pet.tutor_name;
            break;
        case 3:
            infor_cadastro = "Tutor: " + pet.tutor_name;
            break;
        case 4:
            infor_cadastro = "Encontrado por: " + pet.tutor_name
            break;
        case 5:
            infor_cadastro = "Ajudado por: " + pet.tutor_name
            break;
        default:
            infor_cadastro = "Tutor: " + pet.tutor_name
            break;
    }

    if (pet.genre == '1') {
        genero = "Macho";
    } else {
        genero = "Fêmea";
    }

    switch (pet.situation) {
        case 1:
            situation = "Em casa";
            break;
        case 2:
            situation = "Para Adoção";
            break;
        case 3:
            situation = "Desaparecido";
            break;
        case 4:
            situation = "Encontrado";
            break;
        case 5:
            situation = "Em Tratamento";
            break;
    }

    if (pet.biography) {
        biography = pet.biography;
    } else {
        biography = ' -';
    }

    if (pet.castrated == '1') {
        castrado = 'Não Castrado';
    } else if (pet.castrated == '2') {
        castrado = 'Castrado';
    } else {
        castrado = ' -';
    }

    if (pet.age) {
        idade = pet.age;
    }

    switch (pet.size) {
        case 1:
            porte = 'Pequeno'
            break;
        case 2:
            porte = 'Médio'
            break;
        case 3:
            porte = 'Grande'
            break;
        default:
            porte = ' -'
            break;
    }

    switch (pet.fur) {
        case 1:
            pelo = 'Curto'
            break;
        case 2:
            pelo = 'Médio'
            break;
        case 3:
            pelo = 'Longo'
            break;
        default:
            pelo = ' -'
            break;
    }







    return (
        <>
            <div className={styles.area_Section_Perfil_Pet}>
                <div className={styles.container}>
                    <div>
                        <img className={styles.cover_pet} src={pet.cover} alt="cover" loading="lazy" />
                    </div>
                    <h2>{pet.name}</h2>
                    <div className={styles.infors_pet}>
                        <div className={styles.area_avatar}>
                            <img className={styles.avatar} src={pet.avatar} alt="imagem perfil pet" loading="lazy" />
                        </div>
                        <div className={styles.infors}>
                            <div className={styles.infors_dados}>
                                <div>
                                    <p>Nome: {pet.name}</p>
                                    <p>Idade: {idade}</p>
                                    <p>Gênero: {genero}</p>
                                    <p>Porte: {porte}</p>
                                    <p>Biografia: {biography}</p>
                                </div>
                                <div>
                                    <p>Pelagem: {pelo}</p>
                                    <p>Castração: {castrado}</p>
                                    <p>Situação: {situation}</p>
                                    <p>Rastreio: {rastreio}</p>
                                </div>
                            </div>
                            <div>
                                <p>{infor_cadastro}</p>
                            </div>
                            {msg_rastreio &&
                                <p className={styles.msg_rastreio}>{msg_rastreio}</p>
                            }

                        </div>

                        {me &&
                            <div className={styles.acoes}>
                                {/* <Link to={+'/mypet/'+pet.id+'/config'}> */}
                                <Link to={'/user/' + pet.id + '/mypet/' + pet.id + '/config'}>
                                    <div className={styles.btn_config}>
                                        <img className={styles.config} src="\src\media\icons\config.png" alt="configurar" loading="lazy" />
                                        <p>Configurar</p>
                                    </div>
                                </Link>
                                {/* <Link to={'/user/' + pet.tutor_name + '/mypet/' + pet.id + '/update'}>
                                    <div className={styles.btn_config}>
                                        <img className={styles.config} src="\src\media\icons\config.png" alt="configurar" loading="lazy" />
                                        <p>Configurar</p>
                                    </div>
                                </Link> */}
                                <button className={styles.btn_alert} onClick={handleAlert}>DESAPARECIDO!!!</button>

                            </div>
                        }

                    </div>
                </div>
                <div className={styles.container}>
                    <SectionToolsPet id_user={pet.id_user} idpet={pet.id} me={me} pet={pet} />
                </div>
            </div>
        </>
    )
}
