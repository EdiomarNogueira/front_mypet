import { useState } from 'react';
import styles from './styles.module.css';
import { Publish } from '../../../../types/Publish';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';


export const UserGallery = (props: { id: any, isMe: any, posts: Publish[] }) => {
    //let id_user = props.id;
    let me = props.isMe;
    //const [posts, setPosts] = useState<Publish[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const [date_register_pet, setDate_register_pet] = useState("");
    const [subtitle_pet, setSubtitle_pet] = useState("");
    const [currentPerPage, setCurrentPerPage] = useState(3);
    const [idUser, setIdUser] = useState(props.id);

    // var api = useApi();

    // const loadPhotos = async () => {
    //     setLoading(true);
    //     let json = await api.getUserPhotos(idUser, currentPerPage);
    //     if (json) {
    //         if (json.posts.length != posts.length) {
    //             setPosts(json.posts);
    //         }
    //     }
    //     setLoading(false);
    // }

    const handleModal = async (date_register_pet: any, img_pet: any, subtitle_pet: any) => {
        setOpen(true);
        setImage(img_pet);
        setDate_register_pet(date_register_pet);
        setSubtitle_pet(subtitle_pet);
    }



    // window.onscroll = function () {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    //     ) {
    //         setCurrentPerPage((currentPerPageInsideState) => currentPerPageInsideState + 4);
    //     }
    // }


    // useEffect(() => {
    //     loadPhotos();
    // }, [currentPerPage]);

    return (
        <>

            {loading &&
                <div className={styles.area_loading}>Carregando...</div>
            }

            {!loading && props.posts.length > 0 &&
                <div className={styles.area_galeria}>
                    <h1>Galeria de fotos</h1>

                    <div className={styles.container}>

                        {props.posts.map((item, index) => (
                            <div  key={index}>
                                <div className={styles.area_image} onClick={() => handleModal(item.date_register, item.body, item.subtitle)}>
                                    <p className={styles.date}>{item.date_register}</p>
                                    <img className={styles.image} src={item.body} alt="avatar" loading="lazy" />
                                    <p className={styles.text}>{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                        <Modal onClick={() => setOpen(false)} className={styles.modal} open={open} onClose={() => setOpen(false)} >
                            <Box className={styles.area_modal}>
                                <p className={styles.date_modal}>{date_register_pet}</p>
                                <img className={styles.image_modal} src={image} alt="avatar" loading="lazy" />
                                <p className={styles.text_modal}>{subtitle_pet}</p>
                            </Box>
                        </Modal>
                    </div>
                </div>

            }

        </>
    )
}
