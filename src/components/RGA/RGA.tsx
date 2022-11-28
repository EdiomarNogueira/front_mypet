import styles from './styles.module.css';
import { useRef, useState } from 'react';
import { Pets } from '../../types/Pets';
import * as htmlToImage from 'html-to-image';
import QRCode from 'react-qr-code';
// type Props = {
//     text?: string; //interrogação deixa a prop não obrigatória 
// }

export const RGA = (props: { pet: Pets }) => {
    const domEl = useRef(null);
    const [linkQRCode, setLinkQRCode] = useState('');
    let pet = props.pet;
    const downloadImage = async () => {
        const dataUrl = await htmlToImage.toPng(domEl.current);

        // download image
        const link = document.createElement('a');
        link.download = "html-to-img.png";
        link.href = dataUrl;
        link.click();
    }

    let species = '';
    if (pet.species = 1) {
        species = 'Cachorro';
    } else if (pet.species = 2) {
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

    return (
        <div className={styles.rga_pet} >
            <button className={styles.btn_download} onClick={downloadImage}>Download RGA Fake</button>
            <div id="domEl" ref={domEl}>
                <div className={styles.area_rga}>
                    <div className={styles.area_rga_frente}>
                        <div className={styles.flex_row}>
                            <div className={styles.rga_borda}>
                                <div className={styles.rga_frente}>
                                    <h5>Tutor: {pet.tutor_name}</h5>
                                    <div>
                                        <p>Sexo: {sexo}</p>
                                        <p>Raça:{pet.breed}</p>
                                        <p>Tipo: {species}</p>

                                        <h5>Nome: {pet.name}</h5>
                                        <div className={styles.flex_row}>
                                            <h2>RGPET</h2>
                                            <p>Nasc:{pet.birthdate} </p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <p className={styles.horientacao_horizontal}>Documento sem valor legal</p>
                        </div>
                    </div>
                    <div className={styles.area_rga_verso}>
                        <div className={styles.rga_verso}>
                            <p className={styles.horientacao_horizontal}>O RGAPET do Um Novo Amigo é um documento fake, a sua função é facilitar o reconhecimento do tutor do pet, mas não possui valor legal.</p>

                            <QRCode size={180} value={"http://187.44.236.16:3000/user/" + pet.id_user + "/mypet/" + pet.id} />
                            <p className={styles.horientacao_horizontal}>QRCode Dados Pet</p>
                        </div>
                        

                    </div>

                </div>

            </div>
        </div>
    )
}


