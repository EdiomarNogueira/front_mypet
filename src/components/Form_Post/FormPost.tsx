import styles from './styles.module.css';
import { ChangeEvent, useEffect, useState, FormEvent, useRef } from 'react';
import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import { Pets } from '../../types/Pets';
import Select from 'react-select';

export const FormPost = (props: { parentNewPostCallBack: any }) => {
  const [addText, setAddText] = useState('');
  const [pets, setPets] = useState<Pets[]>();
  const [selectPets, setSelectPets] = useState([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null); // Ref para o input de imagem

  var [user, setUser] = useState<User | null>(null);
  var api = useApi();

  let arraypets: { value: number; label: string; }[] = [];

  if (pets) {
    pets.map((item, index) => (
      arraypets[index] = { value: item.id, label: item.name }
    ))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const loadPets = async () => {
    let json = await api.getMyPets(user?.id);
    setPets(json.currentPet);
  }

  const onTrigger = () => {
    props.parentNewPostCallBack(1);
  };

  const loadUser = async () => {
    let json = await api.getUserMe();
    setUser(json);
  }


  const handleAddTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setAddText(e.target.value);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

      if (type === "photo") {
        let json = await api.postNewPostFile(type, subtitle, photo, pet);
        if (imageInputRef.current) {
          imageInputRef.current.value = ''; // Limpa o valor do input de imagem
        }
      } else if (type === "text") {
        let json = await api.postNewPostText(type, body, pet);
      }

      setSelectPets([]); // Limpa os pets selecionados
      setAddText("");
      setPreviewImage(null);
      arraypets = []; // Define arraypets como um array vazio

      onTrigger();
    } else {
      alert("Post vazio!");
    }
  }

  useEffect(() => {
    loadPets();
  }, [user]);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <div className={styles.area_novo_post}>
        <div className={styles.flex_row}>
          <img className={styles.avatar} src={user?.avatar} alt="avatar user" loading="lazy" />
          <p className={styles.name}>{user?.name}</p>
        </div>
        <form method='POST' onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.Upload_Form}>
            <input
              value={addText}
              onChange={handleAddTextChange}
              className={styles.input_text}
              type="text"
              placeholder="Como foi o dia do seu pet ?"
              maxLength={480}
            />
            <div>
              <input
                ref={imageInputRef} // Ref para o input de imagem
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            {previewImage && (
              <div className={styles.imagePreview}>
                <img src={previewImage} alt="Preview" />
              </div>
            )}
          </div>
          <div className={styles.single_input}>
            <label htmlFor="marcar_pet">Marcar Pet</label>
            <Select
              className={styles.select_pet}
              isMulti options={arraypets}
              // defaultValue={selectPets}
              onChange={(item: any) => setSelectPets(item)}
              key={selectPets.length}
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
