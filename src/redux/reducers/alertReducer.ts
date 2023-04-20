import { createSlice } from "@reduxjs/toolkit";
export const slice = createSlice({
    name: 'alert',
    initialState: {
        id: null,
        id_pet: null,
        id_user: null,
        photo: '',
        // marked_users: [],
        tutor_name: '',
        description: '',
        date_occurrence: '',
        name_pet: '',
        situation: 1,
        avatar_tutor: '',
        species: 1,
        size: 1,
        fur: 1,
        breed: 1,
        genre: 1,
        age: 0,
        road: '',
        city: '',
        district: '',
        email: '',
        phone: '',
        latitude: '',
        longitude: '',
        // distance: 0,
        status: 1,
        date_register: '',
        date_change: '',
    },
    reducers: {
        setAlert_id_pet: (state, action) => {
            state.id_pet = action.payload;
        },
        setAlert_id_user: (state, action) => {
            state.id_user = action.payload;
        },
        setAlert_photo: (state, action) => {
            state.photo = action.payload;
        },
        // setAlert_marked_users: (state, action) => {
        //     state.marked_users = action.payload;
        // },
        setAlert_tutor_name: (state, action) => {
            state.tutor_name = action.payload;
        },
        setAlert_description: (state, action) => {
            state.description = action.payload;
        },
        setAlert_date_occurrence: (state, action) => {
            state.date_occurrence = action.payload;
        },
        setAlert_name_pet: (state, action) => {
            state.name_pet = action.payload;
        },
        setAlert_situation: (state, action) => {
            state.situation = action.payload;
        },
        setAlert_avatar_tutor: (state, action) => {
            state.avatar_tutor = action.payload;
        },
        setAlert_species: (state, action) => {
            state.species = action.payload;
        },
        setAlert_size: (state, action) => {
            state.size = action.payload;
        },
        setAlert_fur: (state, action) => {
            state.fur = action.payload;
        },
        setAlert_breed: (state, action) => {
            state.breed = action.payload;
        },
        setAlert_genre: (state, action) => {
            state.genre = action.payload;
        },
        setAlert_age: (state, action) => {
            state.age = action.payload;
        },
        setAlert_road: (state, action) => {
            state.road = action.payload;
        },
        setAlert_city: (state, action) => {
            state.city = action.payload;
        },
        setAlert_district: (state, action) => {
            state.district = action.payload;
        },
        setAlert_email: (state, action) => {
            state.email = action.payload;
        },
        setAlert_phone: (state, action) => {
            state.phone = action.payload;
        },
        setAlert_latitude: (state, action) => {
            state.latitude = action.payload;
        },
        setAlert_longitude: (state, action) => {
            state.longitude = action.payload;
        },
        // setAlert_distance: (state, action) => {
        //     state.distance = action.payload;
        // },
        setAlert_status: (state, action) => {
            state.status = action.payload;
        },
        setAlert_date_register: (state, action) => {
            state.date_register = action.payload;
        },
        setAlert_date_change: (state, action) => {
            state.date_change = action.payload;
        },
    }
});


export const {
    setAlert_id_pet,
    setAlert_id_user,
    setAlert_photo,
    // setAlert_marked_users,
    setAlert_tutor_name,
    setAlert_description,
    setAlert_date_occurrence,
    setAlert_name_pet,
    setAlert_situation,
    setAlert_avatar_tutor,
    setAlert_species,
    setAlert_size,
    setAlert_fur,
    setAlert_breed,
    setAlert_genre,
    setAlert_age,
    setAlert_road,
    setAlert_city,
    setAlert_district,
    setAlert_email,
    setAlert_phone,
    setAlert_latitude,
    setAlert_longitude,
    // setAlert_distance,
    setAlert_status,
    setAlert_date_register,
    setAlert_date_change,
} = slice.actions;
export default slice.reducer;
