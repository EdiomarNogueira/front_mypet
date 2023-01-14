import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { useApi } from '../../../../hooks/useApi';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { SectionToolsPet } from '../SectionToolsPet/SectionToolsPet';
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';

import {
    setPet_Age,
    setPet_Avatar,
    setPet_Biography,
    setPet_Birthdate,
    setPet_Breed,
    setPet_Castrated,
    setPet_Cover,
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

export const SectionPerfilPet = (props: { idpet: any }) => {
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    const [me, setMe] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const pet = useAppSelector(state => state.pet);
    let id_pet = props.idpet;
    var api = useApi();


    const loadDadosPet = async () => {
        let json = await api.getPet(params.id_user, id_pet);
        if (json) {
            console.log(params.id_user);
            console.log(id_pet);

            setDadosPet(json.currentPet[0]);
            // setPet(json.currentPet[0]);
        }
    }

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
            avatar: String;
            cover: String;
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
        dispatch(setPet_Avatar(pet_dados?.avatar));
        dispatch(setPet_Cover(pet_dados?.cover));

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
    let idade = null;
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

    if (pet.genre == 1) {
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

    if (pet.castrated == 1) {
        castrado = 'Castrado';
    } else if (pet.castrated == 2) {
        castrado = 'Não Castrado';
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
                                <Link to={'/user/' + pet.id_user + '/mypet/' + id_pet + '/config'}>
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
                                <Link className={styles.btn_alert} to={'/user/' + pet.id_user + '/mypet/' + id_pet + '/addAlert'}>Gerar Alerta!</Link>


                            </div>
                        }

                    </div>
                </div>
                <div className={styles.container}>
                    <SectionToolsPet id_user={pet.id_user} idpet={id_pet} me={me} dados_pet={pet} />
                </div>
            </div>
        </>
    )
}
