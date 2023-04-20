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

export const SectionMyPets = () => {

    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    var [user, setUser] = useState<User | null>(null);
    const [pets, setPets] = useState<Pets[]>([]);
    const [me, setMe] = useState(false);
    const params = useParams();
    var api = useApi();

    const loadPets = async () => {
        setLoading(true);
        let json = await api.getMyPets(params.id_user);
        if (json) {
            setPets(await json.currentPet);
        }
        setLoading(false);

    }

    useEffect(() => {
        if (auth.user?.id == params.id_user) {
            setMe(true);
        }
        loadPets();
    }, []);

    return (
        <>
            <div className={styles.area_Section_MyPets}>

                <div className={styles.Section_MyPets}>
                    {me &&
                        <div className={styles.link_novo_pet}>

                            <Link className={styles.novo_pet} to={'/user/' + auth.user?.id + '/add/mypet'}>Novo Pet</Link>

                        </div>
                    }
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
                                                <div key={index}>
                                                    {item.situation == '1' &&
                                                        <div className={styles.list_pet}>
                                                            <Link to={'/user/' + item.id_user + '/mypet/' + item.id}>< div className={styles.pets} >
                                                                <div className={styles.user_pet}>
                                                                    <p>{item.name}</p>
                                                                    <div className={styles.area_avatar}>
                                                                        <img className={styles.avatar} src={item.avatar} alt="avatar" loading="lazy" />
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
                                    {pets.filter(situation => situation.situation == '2').map(filtro => (
                                        <div>
                                            {filtro &&
                                                <div className={styles.container_pets}>
                                                    <div>
                                                        <h2>Para Adoção</h2>
                                                    </div>
                                                    <div className={styles.section_meus_pets}>

                                                        {pets.map((item, index) => (
                                                            <div key={index}>
                                                                {item.situation == '2' &&
                                                                    <div className={styles.list_pet}>
                                                                        <Link to={'/user/' + item.id_user + '/mypet/' + item.id}>< div className={styles.pets} >
                                                                            <div className={styles.user_pet}>
                                                                                <p>{item.name}</p>
                                                                                <div className={styles.area_avatar}>
                                                                                    <img className={styles.avatar} src={item.avatar} alt="avatar" loading="lazy" />
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
                                    ))}
                                    {pets.filter(situation => situation.situation == '3').map(filtro => (
                                        <div>
                                            {filtro &&
                                                <div className={styles.container_pets}>
                                                    <div>
                                                        <h2>Pet Desaparecido</h2>
                                                    </div>
                                                    <div className={styles.section_meus_pets}>
                                                        {pets.map((item, index) => (
                                                            <div key={index}>
                                                                {item.situation == '3' &&
                                                                    <div className={styles.list_pet}>
                                                                        <Link to={'/user/' + item.id_user + '/mypet/' + item.id}>< div className={styles.pets} >
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
                                    ))}
                                    {pets.filter(situation => situation.situation == '4').map(filtro => (
                                        <div>
                                            {filtro &&
                                                <div className={styles.container_pets}>
                                                    <div>
                                                        <h2>Encontrei Este Pet</h2>
                                                    </div>
                                                    <div className={styles.section_meus_pets}>

                                                        {pets.map((item, index) => (
                                                            <div key={index}>
                                                                {item.situation == '4' &&
                                                                    <div className={styles.list_pet}>
                                                                        <Link to={'/user/' + item.id_user + '/mypet/' + item.id}>< div className={styles.pets} >
                                                                            <div className={styles.user_pet}>
                                                                                <p>{item.name}</p>
                                                                                <div className={styles.area_avatar}>
                                                                                    <img className={styles.avatar} src={item.avatar} alt="avatar" loading="lazy" />
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
                                    ))}
                                    {pets.filter(situation => situation.situation == '5').map(filtro => (
                                        <div>
                                            {filtro &&
                                                <div className={styles.container_pets}>
                                                    <div>
                                                        <h2>Em Tratamento</h2>
                                                    </div>
                                                    <div className={styles.section_meus_pets}>
                                                        {pets.map((item, index) => (
                                                            <div key={index}>
                                                                {item.situation == '5' &&
                                                                    <div className={styles.list_pet}>
                                                                        <Link to={'/user/' + item.id_user + '/mypet/' + item.id}>< div className={styles.pets} >
                                                                            <div className={styles.user_pet}>
                                                                                <p>{item.name}</p>
                                                                                <div className={styles.area_avatar}>
                                                                                    <img className={styles.avatar} src={item.avatar} alt="avatar" loading="lazy" />
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
                </div>
            </div>
        </>
    )
}


