
export type User = {
    id: number;
    category: number;
    name: string;
    email: string;
    password?: string;
    phone: string,
    instagram: string,
    facebook: string,
    biography: string,
    genre: number,
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
    isFollowing: boolean;
}
