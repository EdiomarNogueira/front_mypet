import styles from './styles.module.css';
import { ChangeEvent, useEffect, useState, FormEvent } from 'react';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import { Pets } from '../../types/Pets';
import Select from 'react-select';
// type Props = {
//     // title?: string; //interrogação deixa a prop não obrigatória 
// }

export const FormPost = () => {

    const [addText, setAddText] = useState('');
    const [pets, setPets] = useState<Pets[]>();
    const [selectPets, setSelectPets] = useState([]);
    var [user, setUser] = useState<User | null>(null);
    var api = useApi();

    let arraypets: { value: number; label: string; }[] = [];
    {
        if (pets) {
            pets.map((item, index) => (
                arraypets[index] = { value: item.id, label: item.name }
            ))
        }

    }

    useEffect(() => {
        loadPets();
    }, []);

    const loadPets = async () => {
        let json = await api.getMyPets();

        setPets(await json.currentPet);
    }

    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        let json = await api.getUserMe();
        setUser(json);
    }
    var [user, setUser] = useState<User | null>(null);
    var api = useApi();

    const handleAddTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setAddText(e.target.value);
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log('pets', selectPets);
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        if (addText || (file && file.size > 0)) {
            let type = '';
            let body = '';
            let subtitle = '';
            let photo = file;

            let idsPets: any[] = [];
            selectPets.forEach(function (item: any, index: number) {
                idsPets[index] = parseInt(item.value);
            });

            let pet = idsPets;

            if (file && file.size > 0) {
                type = "photo";
                subtitle = addText;
                photo = file;
            } else if (addText) {
                type = "text"
                body = addText;
            }

            if (type == "photo") {
                console.log(pet);
                let json = await api.postNewPostFile(type, subtitle, photo, pet);
                setAddText("");

            } else if (type == "text") {

                let json = await api.postNewPostText(type, body, pet);
                setAddText("");
            }
        } else {
            alert("Post vazio!");
        }

    }

    return (
        <>
            <div className={styles.area_novo_post}>
                <div className={styles.flex_row}>
                    <img className={styles.avatar} src={user?.avatar} alt="avatar user" />
                    <p className={styles.name}>{user?.name}</p>
                </div>
                <form method='POST' onSubmit={handleFormSubmit}>

                    <div className={styles.Upload_Form}>
                        <input value={addText}
                            onChange={handleAddTextChange}
                            className={styles.input_text}
                            type="text"
                            placeholder="Como foi o dia do seu pet ?"
                            maxLength={480}
                        />
                        <div>
                            <input type="file"
                                name="image"
                            />
                        </div>
                    </div>
                    <div className={styles.single_input}>
                        <label htmlFor="genre">Marcar Pet</label>
                        <Select
                            className={styles.select_pet}
                            isMulti options={arraypets}
                            onChange={(item) => setSelectPets(item)}
                        />
                    </div>

                    <div className={styles.area_acoes}>
                        <input className={styles.btn_enviar} type="submit" value="Enviar" />
                    </div>
                </form>
            </div>
        </>
    )
}

