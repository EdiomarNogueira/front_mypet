import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from "../../hooks/useApi";
import { Link } from 'react-router-dom';
import { Pets } from '../../types/Pets';
import { isSet } from 'util/types';

// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const SectionMyPets = () => {

    const [pets, setPets] = useState<Pets[]>([] || 0);
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    let name = auth.user?.name;
    var api = useApi();
    useEffect(() => {
        loadPets();
    }, []);

    const loadPets = async () => {
        setLoading(true);
        let json = await api.getMyPets();

        console.log(json.currentPet);
        setLoading(false);
        setPets(await json.currentPet);
    }
    return (
        <>
            <div className={styles.area_Section_MyPets}>

                <h1>MEUS PETS</h1>
                <div className={styles.Section_MyPets}>
                    {loading &&
                        <div className={styles.area_loading}>Carregando...</div>
                    }
                    {pets &&
                        <div>
                            {!loading && pets.length > 0 && //criar container com grid

                                <div className={styles.container}>
                                    {pets.map((item, index) => (
                                        <>
                                            <li>
                                                <Link to={'/user/' + name + '/mypet/' + item[0].name}>< div className={styles.pets} >
                                                    <div className={styles.user_pet}>
                                                        <p>{item[0].name}</p>
                                                        <div className={styles.area_avatar}>
                                                            <img className={styles.avatar} src={item[0].avatar} alt="avatar" />
                                                        </div>
                                                    </div>
                                                </div>
                                                </Link>
                                            </li>

                                        </>

                                    ))}
                                </div>
                            }
                        </div>
                    }

                    {!pets &&
                        <div>
                            <p>Ainda sem pets cadastrados</p>
                        </div>

                    }
                    <div className={styles.link_novo_pet}>
                        <Link className={styles.novo_pet} to={'/user/' + name + '/add/mypet'}>Novo Pet</Link>
                    </div>
                </div>
            </div>
        </>
    )
}


