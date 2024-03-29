import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from "../../../../hooks/useApi";
import { Link, useParams } from 'react-router-dom';
import { Pets } from '../../../../types/Pets';
import { User } from '../../../../types/User';

// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const SectionPets = () => {
    const params = useParams();
    const [section, setSection] = useState(params.slug);
    const [pets, setPets] = useState<Pets[]>([]);
    var api = useApi();

    const loadPetsOngs = async () => {
        var situation = 0;
        if (section == "adocao") {
            situation = 2;
        } else if (section == "perdidos") {
            situation = 3;

        } else if (section == "encontrados") {
            situation = 4;

        } else if (section == "tratamento") {
            situation = 5;
        }
        let json = await api.gePetsOngs(situation);
        if (json) {
            console.log(json);
            setPets(await json.currentPet);
        }

    }



    useEffect(() => {
        setSection(params.slug);
    });
    useEffect(() => {
        loadPetsOngs();
    }, [section]);

    return (
        <>
            <div className={styles.container}>
                <div>
                    <h3>Categoria: {section}</h3>
                </div>
                <div className={styles.container_pets}>


                    {pets &&
                        <div>
                            {pets.map((item, index) => (
                                <div key={index}>
                                    <div className={styles.list_pet}>
                                        <Link to={'/user/' + item.id_user + '/mypet/' + item.id}>< div className={styles.pets} >
                                            <div className={styles.user_pet}>
                                                <h5>ONG:{item.tutor_name}</h5>
                                                <p>{item.name}</p>
                                                <div className={styles.area_avatar}>
                                                    <img className={styles.avatar} src={item.avatar} alt="avatar" loading="lazy" />
                                                </div>
                                            </div>
                                            {/* <ul className={styles.dados_pet}>
                                                <li>Espécie: {item.species}</li>
                                                <li>Idade: {item.age}</li>
                                                <li>Raça: {item.breed}</li>
                                                <li>Porte: {item.size}</li>
                                                <li>Castração: {item.castrated}</li>
                                                <li>Genêro: {item.genre}</li>
                                                <li>Pelagem: {item.fur}</li>
                                            </ul> */}
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {!pets &&
                        <div>
                            <p>Não há pets {section} no momento.</p>
                        </div>
                    }

                </div>
            </div>
        </>
    );
}