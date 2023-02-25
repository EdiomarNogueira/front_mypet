import styles from './styles.module.css';
import { ChangeEvent, useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
// import { User } from '../../types/User';
import { useApi } from "../../hooks/useApi";
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Alerts } from '../../types/Alerts';



export const MapPetAlert = (props: { id_alert: number, id_pet: number }) => {

    const [loading, setLoading] = useState(true);
    const [positionsAlert, setPositionsAlert] = useState<Alerts[]>([]);
    var circle_color_blue = { color: 'blue' };
    var circle_color_red = { color: 'red' };

    var api = useApi();

    const loadPositionsAlerts = async () => {
        setLoading(true);
        let json = await api.getPositionsAlert(props.id_alert, props.id_pet);
        console.log(props.id_alert);
        console.log(props.id_pet);

        if (json) {
            console.log(json);
            setPositionsAlert(json.positionsAlert);

        }
        setLoading(false);
    }



    useEffect(() => {
        loadPositionsAlerts();
    }, []);
    return (
        <>
            <MapContainer className={styles.area_map} center={[-14.8789164, -40.8624406]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {positionsAlert.map((item, index) => (
                    <div className={styles.post} key={index}>
                        {item.latitude && item.longitude && item.longitude != '' && item.longitude != '' &&
                            <>
                                {index == 0 ?
                                    <Circle pathOptions={circle_color_red} center={[parseFloat(item.latitude), parseFloat(item.longitude)]} radius={150} >
                                        <Popup>
                                            <div>
                                                <p>{index}</p>
                                                <p>Obs:{item.body}</p>
                                                <p>Em:{item.date_found}</p>
                                                {item.photo &&
                                                    <img className={styles.photo_pet_location} src={item.photo} alt="imagem do pet visto" loading="lazy" />
                                                }
                                            </div>
                                        </Popup>
                                    </Circle > :
                                    <Circle pathOptions={circle_color_blue} center={[parseFloat(item.latitude), parseFloat(item.longitude)]} radius={150} >
                                        <Popup>
                                            <div>
                                                <p>Obs:{item.body}</p>
                                                <p>Em:{item.date_found}</p>
                                                {item.photo &&
                                                    <img className={styles.photo_pet_location} src={item.photo} alt="imagem do pet visto" loading="lazy" />
                                                }
                                            </div>
                                        </Popup>
                                    </Circle >}

                            </>

                        }
                    </div>
                ))}

            </MapContainer>

        </>



    )
}