import { useContext, useState } from 'react';
import styles from './styles.module.css';
import { Publish } from '../../../../types/Publish';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../hooks/useApi';
export const GaleryPhotosPet = (props: { posts: Publish[], setPosts: (posts: Publish[]) => void }) => {
    let posts = props.posts;
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // Adicione o estado 'open' e a função 'setOpen'
    const [image, setImage] = useState("");
    const [date_register_pet, setDate_register_pet] = useState("");
    const [subtitle_pet, setSubtitle_pet] = useState("");
    const auth = useContext(AuthContext);
    const [idPost, setIdPost] = useState(0);
    const [idUserPost, setIdUserPost] = useState(0);
    let id_user = auth.user?.id;
    var api = useApi();
  
    const handleModal = async (date_register_pet: any, img_pet: any, subtitle_pet: any, id: any, id_user: any) => {
      setImage(img_pet);
      setDate_register_pet(date_register_pet);
      setSubtitle_pet(subtitle_pet);
      setIdPost(id);
      setIdUserPost(id_user);
      setOpen(true); // Abrir o modal definindo o estado 'open' como true
    }
  
    const handleDeletePost = async (id_post: Number) => {
      let json = await api.postDeletePost(id_post, auth.user?.id);
      if (json.success) {
        const updatedPosts = props.posts.filter((post) => post.id !== id_post);
        props.setPosts(updatedPosts);
      }
    }
  
    return (
      <>
        {loading && (
          <div className={styles.area_loading}>Carregando...</div>
        )}
  
        {!loading && props.posts.length > 0 && (
          <div className={styles.area_galeria}>
            <div className={styles.container}>
              {props.posts.map((item, index) => (
                <div key={index}>
                  <div
                    className={styles.area_image}
                    onClick={() =>
                      handleModal(
                        item.date_register,
                        item.body,
                        item.subtitle,
                        item.id,
                        item.id_user
                      )
                    }
                  >
                    <img
                      className={styles.image}
                      src={item.body}
                      alt="avatar"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
              <Modal
                className={styles.modal}
                open={open}
                onClose={() => setOpen(false)} // Fechar o modal definindo o estado 'open' como false
              >
                <Box className={styles.area_modal}>
                  {auth.user?.id === idUserPost && (
                    <div className={styles.delete_modal}>
                      <p
                        onClick={() => handleDeletePost(idPost)}
                        className={styles.btn_deletar}
                      >
                        Apagar Post
                      </p>
                    </div>
                  )}
                  <p className={styles.date_modal}>{date_register_pet}</p>
                  <img
                    className={styles.image_modal}
                    src={image}
                    alt="avatar"
                    loading="lazy"
                  />
                  <p className={styles.text_modal}>{subtitle_pet}</p>
                </Box>
              </Modal>
            </div>
          </div>
        )}
      </>
    );
  }
  