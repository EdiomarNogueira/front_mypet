import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';
// import { Pets } from '../../types/Pets';
import * as htmlToImage from 'html-to-image';
import QRCode from 'react-qr-code';
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
// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const RGA = (props: {
    dados_pet: {
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
    }
}) => {

    const domEl = useRef(null);
    const [linkQRCode, setLinkQRCode] = useState('');
    const pet = useAppSelector(state => state.pet);

    const dispatch = useDispatch();

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


    //let pet = props.pet;
    const downloadImage = async () => {
        const dataUrl = await htmlToImage.toPng(domEl.current!);

        // download image
        const link = document.createElement('a');
        link.download = "html-to-img.png";
        link.href = dataUrl;
        link.click();
    }

    let species = '';
    if (pet.species == 1) {
        species = 'Cachorro';
    } else if (pet.species == 2) {
        species = 'Gato';
    } else {
        species = '- '
    }

    let sexo = '';
    if (pet.genre == 1) {
        sexo = 'Macho'
    } else if (pet.genre == 2) {
        sexo = 'Femea'
    }


    useEffect(() => {
        setDadosPet(props.dados_pet);
    }, []);

    return (
        <div className={styles.rga_pet} >
            <button className={styles.btn_download} onClick={downloadImage}>Download RGA Fake</button>
            <div id="domEl" ref={domEl}>
                <div className={styles.area_rga}>
                    <div className={styles.area_rga_frente}>
                        <div className={styles.flex_row}>
                            <div className={styles.rga_borda}>
                                <div className={styles.rga_frente}>
                                    <h5>Tutor: {pet.tutor_name}</h5>
                                    <div>
                                        <p>Sexo: {sexo}</p>
                                        <p>Raça:{pet.breed}</p>
                                        <p>Tipo: {species}</p>

                                        <h5>Nome: {pet.name}</h5>
                                        <div className={styles.flex_row}>
                                            <h2>RGPET</h2>
                                            <p>Nasc:{pet.birthdate} </p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <p className={styles.horientacao_horizontal}>Documento sem valor legal</p>
                        </div>
                    </div>
                    <div className={styles.area_rga_verso}>
                        <div className={styles.rga_verso}>
                            <p className={styles.horientacao_horizontal}>O RGAPET do MeuPetAqui é um documento fake, a sua função é facilitar o reconhecimento do tutor do pet, mas não possui valor legal.</p>

                            <QRCode size={180} value={"http://187.44.236.16:3000/user/" + pet.id_user + "/mypet/" + pet.id} />
                            <p className={styles.horientacao_horizontal}>QRCode Dados Pet</p>
                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}


