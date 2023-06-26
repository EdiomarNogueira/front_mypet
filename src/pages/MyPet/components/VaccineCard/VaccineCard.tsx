import styles from './styles.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

// import { Pets } from '../../types/Pets';
// import { User } from '../../types/User';
import * as htmlToImage from 'html-to-image';
import {
    setPet_Id,
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
import { useAppSelector } from '../../../../redux/hooks/useAppSelector';
import { useApi } from '../../../../hooks/useApi';
import { Vaccine } from '../../../../types/Vaccine';

// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const VaccineCard = (props: { dados_pet: { id: Number; name: String; species: Number; genre: Number } }) => {
    var api = useApi();
    const domEl = useRef(null);
    const dispatch = useDispatch();
    const pet = useAppSelector(state => state.pet);
    const [name, setName] = useState<string>('');
    const [application_date, setApplication_Date] = useState<string>('');
    const [category, setCategory] = useState<string>("1");
    const [recommendation, setRecommendation] = useState<string>("");
    const [listMedicament, setListMedicament] = useState<Vaccine[]>([]);
    //let pet = props.pet;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

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
    const handlerListMedicament = async () => {
        if (props.dados_pet.id) {
            let json = await api.readVaccineCard(props.dados_pet.id);
            console.log('teste', json.listMedicaments);
            if (json) {
                setListMedicament(json.listMedicaments);
            }
        }
    }
    const handleRegister = async () => {
        if (props.dados_pet.id && name && application_date && category && recommendation) {
            let json = await api.postCreateVaccineCard(props.dados_pet.id, name, application_date, category, recommendation);
            if (json.success) {
                setSuccess(json.success);
                handlerListMedicament();
            } else {
                setError(json.error);
            }
        } else if (!props.dados_pet.name) {
            alert("Nome de pet não encontrado!");
        } else if (!name) {
            alert("Informe o nome do medicamento ou vacina");
        } else if (!application_date) {
            alert("Informe a data em que o pet foi medicado");
        } else if (!category) {
            alert("Informe se a medicação foi uma vacina ou outro");
        } else if (!recommendation) {
            alert("Informe o que este medicamento trata ou previne");
        }
    }

    const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleApplication_Date = (event: ChangeEvent<HTMLInputElement>) => {
        setApplication_Date(event.target.value);
    }

    const handleRecommendation = (event: ChangeEvent<HTMLInputElement>) => {
        setRecommendation(event.target.value);
    }

    useEffect(() => {
        setDadosPet(props.dados_pet);
        handlerListMedicament();
    }, []);
    return (
        <div className={styles.vaccine_pet} >
            <button className={styles.btn_download} onClick={downloadImage}>Download Lista de Medicamentos</button>
            {/* // */}
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
            <div className={styles.register_inputs} onSubmit={handleRegister}>
                <div className={styles.container_input}>
                    <div>
                        <div className={styles.single_input}>
                            <label htmlFor="category">Tipo:
                                <select name="category" id="category" value={category} required onChange={cat => setCategory(cat.target.value)} >
                                    <option value="1">Vacina</option>
                                    <option value="2">Medicamento </option>
                                </select>
                            </label>
                        </div>
                        <div className={styles.single_input}>
                            <label htmlFor="name">Recomendação</label>
                            <input
                                type="text"
                                value={recommendation}
                                onChange={handleRecommendation}
                                id="name"
                                required
                                placeholder="Para o que ele tomou?"
                            />
                        </div>
                    </div>
                    <div>
                        <div className={styles.single_input}>
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameInput}
                                id="name"
                                required
                                placeholder="O que seu pet tomou?"
                            />
                        </div>

                        <div className={styles.single_input}>
                            <label htmlFor="birthdate">Data de aplicação</label>
                            <input
                                type="date"
                                value={application_date}
                                onChange={handleApplication_Date}
                                id="birthdate"
                                required
                                placeholder="Digite sua data de nascimento"
                            />
                        </div>
                    </div>

                </div>
                <div className={styles.container_btn}>
                    <div className={styles.area_btn}>
                        <button className={styles.btn_register} onClick={handleRegister}>Cadastrar</button>
                    </div>
                </div>
            </div>
            {/* // */}
            <div className={styles.container_controle_medicamentos} id="domEl" ref={domEl}>
                <div className={styles.area_card_vaccine}>
                    <h1>Controle de Medicação</h1>
                    {
                        listMedicament ?
                            <>
                                <div className={styles.container_itens}>
                                    <div className={styles.area_registro}>
                                        <div className={styles.item_registro}>
                                            <p>Tipo</p>
                                        </div>
                                        <div className={styles.item_registro}>
                                            <p>Data</p>
                                        </div>
                                        <div className={styles.item_registro}>
                                            <p>Nome</p>
                                        </div>
                                        <div className={styles.item_registro}>
                                            <p>Recomendação</p>
                                        </div>
                                    </div>
                                </div>
                                {listMedicament.map((item, index) => (
                                    <div key={index} className={styles.container_itens}>
                                        <div className={styles.area_registro}>
                                            <div className={styles.item_registro}>
                                                <p>{item.type == 1 ? "Vacina" : "Comprimido"}</p>
                                            </div>
                                            <div className={styles.item_registro}>
                                                <p>{new Date(item.date_register).toLocaleDateString()}</p>
                                            </div>
                                            <div className={styles.item_registro}>
                                                <p title={item.name.length > 13 ? item.name : ''}>
                                                    {item.name.length > 13
                                                        ? item.name.slice(0, 13) + '...'
                                                        : item.name}
                                                </p>
                                            </div>
                                            <div className={styles.item_registro}>
                                                <p title={item.recommendation.length > 13 ? item.recommendation : ''}>
                                                    {item.recommendation.length > 13
                                                        ? item.recommendation.slice(0, 13) + '...'
                                                        : item.recommendation}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </>
                            : <h4>Sem Registros Cadastrados</h4>
                    }

                </div>
            </div>
        </div>
    )
}


