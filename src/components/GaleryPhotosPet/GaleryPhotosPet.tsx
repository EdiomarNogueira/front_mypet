import { useState } from 'react';
import styles from './styles.module.css';
import { Publish } from '../../types/Publish';
import Modal from '@mui/material/Modal';
import { Box, DialogTitle } from '@mui/material';
export const GaleryPhotosPet = (props: { posts: Publish[] }) => {
    let posts = props.posts;
    //const [posts, setPosts] = useState<Publish[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const [date_register_pet, setDate_register_pet] = useState("");
    const [subtitle_pet, setSubtitle_pet] = useState("");

    const handleModal = async (date_register_pet: any, img_pet: any, subtitle_pet: any) => {
        setOpen(true);
        setImage(img_pet);
        setDate_register_pet(date_register_pet);
        setSubtitle_pet(subtitle_pet);
    }
    return (
        <>

            {loading &&
                <div className={styles.area_loading}>Carregando...</div>
            }

            {!loading && props.posts.length > 0 &&
                <div className={styles.area_galeria}>
                    <div className={styles.container}>

                        {props.posts.map((item, index) => (
                            <div>
                                <div className={styles.area_image} onClick={() => handleModal(item.date_register, item.body, item.subtitle)}>
                                    <p className={styles.date}>{item.date_register}</p>
                                    <img className={styles.image} src={item.body} alt="avatar" loading="lazy" />
                                    <p className={styles.text}>{item.subtitle}</p>
                                </div>

                            </div>
                        ))}
                        <Modal onClick={() => setOpen(false)} className={styles.modal} open={open} onClose={() => setOpen(false)}>
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
