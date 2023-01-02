import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'pet',
    initialState: {
        id: 0,
        name: '',
        id_user: 0,
        tutor_name: '',
        species: 1,
        biography: '',
        birthdate: '',
        age: 0,
        avatar: '',
        cover: '',
        breed: '',
        castrated: 1,
        latitude: '',
        longitude: '',
        genre: 1,
        size: 1,
        fur: 1,
        situation: 1,
        status: 1,
        date_register: '',
        date_change: '',
    },
    reducers: {
        setPet_Name: (state, action) => {
            state.name = action.payload;
        },
        setPet_Id: (state, action) => {
            state.id = action.payload;
        },
        setPet_Id_User: (state, action) => {
            state.id_user = action.payload;
        },
        setPet_Tutor_Name: (state, action) => {
            state.tutor_name = action.payload;
        },
        setPet_Species: (state, action) => {
            state.species = action.payload;
        },
        setPet_Biography: (state, action) => {
            state.biography = action.payload;
        },
        setPet_Genre: (state, action) => {
            state.genre = action.payload;
        },
        setPet_Birthdate: (state, action) => {
            state.birthdate = action.payload;
        },
        setPet_Age: (state, action) => {
            state.age = action.payload;
        },
        setPet_Breed: (state, action) => {
            state.breed = action.payload;
        },
        setPet_Castrated: (state, action) => {
            state.castrated = action.payload;
        },
        setPet_Fur: (state, action) => {
            state.fur = action.payload;
        },
        setPet_Latitude: (state, action) => {
            state.latitude = action.payload;
        },
        setPet_Longitude: (state, action) => {
            state.longitude = action.payload;
        },
        setPet_Size: (state, action) => {
            state.size = action.payload;
        },
        setPet_Situation: (state, action) => {
            state.situation = action.payload;
        },
        setPet_Avatar: (state, action) => {
            state.avatar = action.payload;
        },
        setPet_Cover: (state, action) => {
            state.cover = action.payload;
        },
        setPet_Status: (state, action) => {
            state.status = action.payload;
        },
        setPet_Date_Register: (state, action) => {
            state.date_register = action.payload;
        },
        setPet_Date_Change: (state, action) => {
            state.date_change = action.payload;
        },

    }
});


export const {
    setPet_Avatar,
    setPet_Biography,
    setPet_Birthdate,
    setPet_Breed,
    setPet_Castrated,
    setPet_Cover,
    setPet_Date_Change,
    setPet_Date_Register,
    setPet_Fur,
    setPet_Genre,
    setPet_Id,
    setPet_Id_User,
    setPet_Latitude,
    setPet_Longitude,
    setPet_Name,
    setPet_Situation,
    setPet_Size,
    setPet_Species,
    setPet_Status,
    setPet_Tutor_Name,
    setPet_Age
} = slice.actions;
export default slice.reducer;
