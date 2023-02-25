import { Error } from './Error';
import { PageCount } from './PageCount';
import { CurrentPage } from './CurrentPage';
import { User } from './User';
import { Comment } from './Comment';

export type Alerts = {
    body: string;
    name_tutor: string;
    error: Error,
    id: number,
    id_pet: number,
    id_user: number,
    photo: string,
    marked_users: [],
    tutor_name: string,
    description: string,
    date_occurrence: string,
    date_found: string,
    name_pet: string,
    situation: number,
    avatar_tutor: string,
    species: number, 
    size: number, 
    fur:number, 
    breed: string, 
    genre: number, 
    age: string,
    road: string,
    city: string,
    district: string,
    email: string,
    phone: string,
    latitude: string,
    longitude: string,
    distance: string,
    status: string,
    date_register: string,
    date_change: string,
}
