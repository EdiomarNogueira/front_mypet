import styles from './styles.module.css';
import { useEffect, useRef } from 'react';

// import { Pets } from '../../types/Pets';
// import { User } from '../../types/User';
import * as htmlToImage from 'html-to-image';
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
} from '../../redux/reducers/petReducer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';

// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const VaccineCard = (props: { dados_pet: { name: String; species: Number; genre: Number } }) => {
    const domEl = useRef(null);
    const dispatch = useDispatch();
    const pet = useAppSelector(state => state.pet);

    //let pet = props.pet;

    const setDadosPet = async (pet_dados:
        {
            name: String;
            species: Number;
            genre: Number;
        }) => {
        dispatch(setPet_Name(pet_dados?.name));
        dispatch(setPet_Species(pet_dados?.species));
        dispatch(setPet_Genre(pet_dados?.genre));

    }

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
        <div className={styles.vaccine_pet} >
            <button className={styles.btn_download} onClick={downloadImage}>Download Modelo Cartão de Vacinas</button>
            <div id="domEl" ref={domEl}>
                <div className={styles.area_card_vaccine}>
                    <h1>Controle de Vacinação</h1>
                    <h3>{pet.name}</h3>
                    <div className={styles.vaccine}>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                        <div className={styles.area_registro}>
                            <h5>Data ___/___/___</h5>
                            <h5>Produto_______________________</h5>
                            <h5>Dose_______</h5>
                            <h5>Peso_______</h5>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}


