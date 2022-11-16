import styles from './styles.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useApi } from "../../hooks/useApi";
import { Link } from 'react-router-dom';
import { Pets } from '../../types/Pets';
import { User } from '../../types/User';

// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const SectionMyPets = () => {

    const [pets, setPets] = useState<Pets[]>([] || 0);
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    var [user, setUser] = useState<User | null>(null);

    let name = auth.user?.name;
    var api = useApi();
    useEffect(() => {
        loadPets();
    }, []);

    const loadPets = async () => {
        setLoading(true);
        let json = await api.getMyPets();

        console.log('json', json.currentPet);
        setLoading(false);
        setPets(await json.currentPet);
    }
    return (
        <>
            <div className={styles.area_Section_MyPets}>

                <div className={styles.Section_MyPets}>
                    <div className={styles.link_novo_pet}>
                        <Link className={styles.novo_pet} to={'/user/' + name + '/add/mypet'}>Novo Pet</Link>
                    </div>
                    {loading &&
                        <div className={styles.area_loading}>Carregando...</div>
                    }
                    {pets &&
                        <div>
                            {!loading && pets.length > 0 && //criar container com grid

                                <div className={styles.container}>
                                    <div className={styles.container_pets}>
                                        <div>
                                            <h2>Meus Pets</h2>
                                        </div>
                                        <div className={styles.section_meus_pets}>

                                            {pets.map((item, index) => (
                                                <div>
                                                    {item.situation == 1 &&
                                                        <div className={styles.list_pet}>
                                                            <Link to={'/user/' + name + '/mypet/' + item.id}>< div className={styles.pets} >
                                                                <div className={styles.user_pet}>
                                                                    <p>{item.name}</p>
                                                                    <div className={styles.area_avatar}>
                                                                        <img className={styles.avatar} src={item.avatar} alt="avatar" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </Link>
                                                        </div>
                                                    }
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.container_pets}>
                                        <div>
                                            <h2>Para Adoção</h2>
                                        </div>
                                        <div className={styles.section_meus_pets}>

                                            {pets.map((item, index) => (
                                                <div>
                                                    {item.situation == 2 &&
                                                        <div className={styles.list_pet}>
                                                            <Link to={'/user/' + name + '/mypet/' + item.id}>< div className={styles.pets} >
                                                                <div className={styles.user_pet}>
                                                                    <p>{item.name}</p>
                                                                    <div className={styles.area_avatar}>
                                                                        <img className={styles.avatar} src={item.avatar} alt="avatar" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </Link>
                                                        </div>
                                                    }
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.container_pets}>
                                        <div>
                                            <h2>Meu Pet Fugiu</h2>
                                        </div>
                                        <div className={styles.section_meus_pets}>

                                            {pets.map((item, index) => (
                                                <div>
                                                    {item.situation == 3 &&
                                                        <div className={styles.list_pet}>
                                                            <Link to={'/user/' + name + '/mypet/' + item.id}>< div className={styles.pets} >
                                                                <div className={styles.user_pet}>
                                                                    <p>{item.name}</p>
                                                                    <div className={styles.area_avatar}>
                                                                        <img className={styles.avatar} src={item.avatar} alt="avatar" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </Link>
                                                        </div>
                                                    }
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.container_pets}>
                                        <div>
                                            <h2>Encontrei Este Pet</h2>
                                        </div>
                                        <div className={styles.section_meus_pets}>

                                            {pets.map((item, index) => (
                                                <div>
                                                    {item.situation == 4 &&
                                                        <div className={styles.list_pet}>
                                                            <Link to={'/user/' + name + '/mypet/' + item.id}>< div className={styles.pets} >
                                                                <div className={styles.user_pet}>
                                                                    <p>{item.name}</p>
                                                                    <div className={styles.area_avatar}>
                                                                        <img className={styles.avatar} src={item.avatar} alt="avatar" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </Link>
                                                        </div>
                                                    }
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                    {user?.category == 2 &&
                                        <div className={styles.container_pets}>
                                            <div>
                                                <h2>EM Tratamento</h2>
                                            </div>
                                            <div className={styles.section_meus_pets}>

                                                {pets.map((item, index) => (
                                                    <div>
                                                        {item.situation == 5 &&
                                                            <div className={styles.list_pet}>
                                                                <Link to={'/user/' + name + '/mypet/' + item.id}>< div className={styles.pets} >
                                                                    <div className={styles.user_pet}>
                                                                        <p>{item.name}</p>
                                                                        <div className={styles.area_avatar}>
                                                                            <img className={styles.avatar} src={item.avatar} alt="avatar" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </Link>
                                                            </div>
                                                        }
                                                    </div>

                                                ))}
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }

                    {!pets &&
                        <div>
                            <p>Ainda sem pets cadastrados</p>
                        </div>

                    }

                </div>
            </div>
        </>
    )
}


