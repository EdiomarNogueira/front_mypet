import { Error } from '../types/Error';

export type User = {
    id: number;
    category: string;
    name: string;
    email: string;
    password: string;
    phone: string,
    instagram: string,
    facebook: string,
    biography: string,
    genre: string,
    birthdate: string,
    age: string,
    city: string,
    district: string,
    road: string,
    latitude: string,
    longitude: string,
    work: string,
    cep: string,
    avatar: string,
    cover: string,
    status: number,
    date_register: Date,
    date_change: Date,
    followers: number;
    following: number;
    friends: number;
    isFollowing: boolean;
}
