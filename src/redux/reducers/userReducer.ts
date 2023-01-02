import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: {
        id: 0,
        category: 1,
        name: '',
        email: '',
        password: '',
        phone: '',
        instagram: '',
        facebook: '',
        biography: '',
        genre: 1,
        birthdate: '',
        age: 0,
        city: '',
        district: '',
        road: '',
        latitude: '',
        longitude: '',
        work: '',
        cep: '',
        avatar: '',
        cover: '',
        status: 1,
        date_register: '',
        date_change: '',
        followers: 0,
        following: 0,
        friends: 0,
        isFollowing: false,
    },
    reducers: {
        setUser_Name: (state, action) => {
            state.name = action.payload;
        },
        setUser_Id: (state, action) => {
            state.id = action.payload;
        },
        setUser_Category: (state, action) => {
            state.category = action.payload;
        },
        setUser_Email: (state, action) => {
            state.email = action.payload;
        },
        setUser_Password: (state, action) => {
            state.password = action.payload;
        },
        setUser_Phone: (state, action) => {
            state.phone = action.payload;
        },
        setUser_Instagram: (state, action) => {
            state.instagram = action.payload;
        },
        setUser_Facebook: (state, action) => {
            state.facebook = action.payload;
        },
        setUser_Biography: (state, action) => {
            state.biography = action.payload;
        },
        setUser_Genre: (state, action) => {
            state.genre = action.payload;
        },
        setUser_Birthdate: (state, action) => {
            state.birthdate = action.payload;
        },
        setUser_Age: (state, action) => {
            state.age = action.payload;
        },
        setUser_City: (state, action) => {
            state.city = action.payload;
        },
        setUser_District: (state, action) => {
            state.district = action.payload;
        },
        setUser_Road: (state, action) => {
            state.road = action.payload;
        },
        setUser_Latitude: (state, action) => {
            state.latitude = action.payload;
        },
        setUser_Longitude: (state, action) => {
            state.longitude = action.payload;
        },
        setUser_Work: (state, action) => {
            state.work = action.payload;
        },
        setUser_Cep: (state, action) => {
            state.cep = action.payload;
        },
        setUser_Avatar: (state, action) => {
            state.avatar = action.payload;
        },
        setUser_Cover: (state, action) => {
            state.cover = action.payload;
        },
        setUser_Status: (state, action) => {
            state.status = action.payload;
        },
        setUser_Date_Register: (state, action) => {
            state.date_register = action.payload;
        },
        setUser_Date_Change: (state, action) => {
            state.date_change = action.payload;
        },
        setUser_Followers: (state, action) => {
            state.followers = action.payload;
        },
        setUser_Following: (state, action) => {
            state.following = action.payload;
        },
        setUser_Friends: (state, action) => {
            state.friends = action.payload;
        },
        setUser_IsFollowing: (state, action) => {
            state.isFollowing = action.payload;
        },
    }
});

export const {
    setUser_Name,
    setUser_Id,
    setUser_Category,
    setUser_Email,
    setUser_Password,
    setUser_Phone,
    setUser_Instagram,
    setUser_Facebook,
    setUser_Biography,
    setUser_Genre,
    setUser_Birthdate,
    setUser_Age,
    setUser_City,
    setUser_Cep,
    setUser_District,
    setUser_Road,
    setUser_Latitude,
    setUser_Longitude,
    setUser_Work,
    setUser_Cover,
    setUser_Status,
    setUser_Avatar,
    setUser_Date_Change,
    setUser_Date_Register,
    setUser_Followers,
    setUser_Following,
    setUser_Friends,
    setUser_IsFollowing
} = slice.actions;
export default slice.reducer;
