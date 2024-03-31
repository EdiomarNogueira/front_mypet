import axios from "axios";
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});


function refreshConfig() {
    var config_geral = {
        headers: { Authorization: "Bearer " + localStorage.getItem('authToken') }
    };
    return config_geral;
}

export const useApi = () => ({

    refreshToken: async () => {
        var config_headers = refreshConfig();
        const response = await api.post('/auth/refresh', {}, config_headers); //ALTERAR A VALIDAÇÃO
        return response.data;
    },

    validateToken: async (token: string) => {
        var config_headers = refreshConfig();
        const response = await api.post('/validate', {}, config_headers); //ALTERAR A VALIDAÇÃO
        return response.data;
    },

    signin: async (
        email: string,
        password: string) => {
        var config_headers = refreshConfig();
        const response = await api.post('/auth/login', { email, password });
        console.log(response);
        return response.data;
    },


    putPet: async (
        id: any,
        name: string,
        species: Number,
        breed: string,
        birthdate: string,
        biography: string,
        tutor_name: string,
        castrated: Number,
        genre: Number,
        latitude: string,
        longitude: string,
        size: Number,
        fur: Number,
        situation: Number,
    ) => {
        var config_headers = refreshConfig();
        const response = await api.put('/user/pet/' + id, {
            name,
            species,
            breed,
            birthdate,
            biography,
            tutor_name,
            castrated,
            genre,
            latitude,
            longitude,
            size,
            fur,
            situation,
        }, config_headers);
        return response.data;
    },

    putPasswordUser: async (password: string, confirmPassword: string) => {
        var config_headers = refreshConfig();
        const response = await api.put('/user/password', {
            password, confirmPassword
        }, config_headers);
        return response.data;
    },
    putUser: async (
        name: string,
        email: string,
        password: string,
        birthdate: string,
        category: Number,
        phone: string,
        road: string,
        district: string,
        city: string,
        genre: Number,
        work: string,
        instagram: string,
        facebook: string,
        biography: string,
        latitude: string,
        longitude: string) => {

        var config_headers = refreshConfig();
        const response = await api.put('/user', {
            name,
            email,
            password,
            birthdate,
            category,
            phone,
            road,
            district,
            city,
            genre,
            work,
            instagram,
            facebook,
            biography,
            latitude,
            longitude
        }, config_headers);
        return response.data;
    },

    getDadosUser: async () => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };

        const response = await api.get('user', config);
        return response.data;

    },

    getDadosUserPerfil: async (id_user: any) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };

        const response = await api.get('user/' + id_user, config);
        return response.data;
    },


    logout: async () => {
        var config_headers = refreshConfig();
        const response = await api.post('/logout', {}, config_headers);
        return response.data;
    },

    postCreateuser: async (
        name: string,
        email: string,
        password: string,
        birthdate: string,
        category: string,
        phone: string
    ) => {//category: string,
        const response = await api.post('/user/user_register', { name, email, password, birthdate, category, phone });
        return response.data;
    },



    postCreatepet: async (
        name: string,
        id_user: Number,
        species: Number,
        birthdate: string,
        situation: Number,
        latitude: string,
        longitude: string
    ) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };
        const response = await api.post('user/pet', { name, id_user, species, birthdate, situation, latitude, longitude }, config);
        return response.data;
    },

    getAllPosts: async (valorpage: number) => {
        let perPage = valorpage;
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };

        const response = await api.get('/feed/?page=' + perPage, config);
        return response.data;
    },

    getUserRelations: async (latitude: String, longitude: String, currentPerPage: any, id_user: any) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };
        const response = await api.get('/user/' + id_user + '/connections/' + latitude + '/' + longitude + '?perPage=' + currentPerPage, config);
        return response.data;
    },

    getUpdateFeed: async () => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };

        const response = await api.get('/feed/updates', config);
        return response.data;
    },

    getPosts: async (currentPerPage: any) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };

        const response = await api.get('/feed/?perPage=' + currentPerPage, config);
        return response.data;
    },


    getAlerts: async (
        currentPerPageAlerts: Number,
        isCheckedEncontrado: Boolean,
        isCheckedPerdido: Boolean,
        isCheckedAdocao: Boolean,
        isCheckedTratamento: Boolean) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };
        const response = await api.get('/user/alert/' + isCheckedEncontrado + '/' + isCheckedPerdido + '/' + isCheckedAdocao + '/' + isCheckedTratamento + '?perPage=' + currentPerPageAlerts, config);
        return response.data;
    },

    getUserNear: async (latitude: String, longitude: String) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            },
        };
        const response = await api.get('/user/recommended/' + latitude + '/' + longitude, config);
        return response.data;
    },

    getPositionsAlert: async (id_alert: Number, id_pet: Number) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            },
        };
        const response = await api.get('/alert/' + id_alert + '/pet/' + id_pet + '/positions', config);
        return response.data;
    },

    getUserMe: async () => {
        var config_headers = refreshConfig();
        const response = await api.get('/auth/me', config_headers);
        return response.data;
    },

    addNewPost: async (id_user: number, type: string, body: string) => {
        var config_headers = refreshConfig();
        let response = await api.post('/feed', {
            id_user, type, body
        }, config_headers); //ALTERAR A VALIDAÇÃO
        return response.data;
    },

    postFollowUnfollow: async (id_user: any) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };

        const response = await api.post('/user/' + id_user + '/follow', {}, config);
        return response.data;
    },

    getVerificFollow: async (id_user: any) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };

        const response = await api.get('/user/' + id_user + '/follow', config);
        return response.data;
    },

    postNewPostFile: async (
        type: string,
        subtitle: string,
        photo: File,
        pets: any
    ) => {
        var config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
        };
        const response = await api.post('/feed', { type, subtitle, photo, pets }, config).then((response) => {
        })
        return response;
    },

    postDeletePost: async (id_delete: Number, id_user: any) => {

        var config_headers = refreshConfig();
        const response = await api.post('/feed/delete/', { id_delete, id_user }, config_headers);
        return response.data;
    },

    postDeleteAlert: async (id_alert: Number, id_pet: Number, situation: Number, id_user: any) => {

        var config_headers = refreshConfig();
        const response = await api.post('/alert/delete/', { id_alert, id_pet, situation, id_user }, config_headers);
        return response.data;
    },

    postDeleteComment: async (id_delete: Number, id_user: any) => {
        var config_headers = refreshConfig();
        const response = await api.post('/feed/comment/delete/', { id_delete, id_user }, config_headers);
        return response.data;
    },

    newCommentAlert: async (
        id_alert: Number,
        id_user: any,
        addText: String,
        date_found: String,
        latitude: String,
        longitude: String,
        road: String,
        city: String,
        district: String,
        photo: File
    ) => {
        var config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
        };
        const response = await api.post('/alert/' + id_alert + '/comment/', {
            id_alert, id_user, addText, date_found, latitude, longitude, road, city, district, photo
        }, config);
        return response.data;
    },

    postNewAlertPet: async (
        photo: File,
        id_pet: Number,
        id_user: Number,
        name: String,
        addText: String,
        situation: Number,
        date_occurrence: String,
        road: String,
        district: String,
        city: String,
        email: String,
        phone: String,
        latitude: String,
        longitude: String,
    ) => {
        var config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
        };
        const response = await api.post('/user/' + id_user + '/pet/' + id_pet + '/alert', {
            photo, id_pet, id_user, name, addText, situation, date_occurrence, road, district, city, email, phone, latitude, longitude
        }, config);
        return response.data;
    },

    readVaccineCard: async (id_pet: Number) => {

        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };
        const response = await api.get('/user/pet/' + id_pet + '/listmedicaments', config);
        return response.data;
    },
    postCreateVaccineCard: async (id_pet: Number, name: string, application_date: string, tipo: string, recommendation: string) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
        };
        const response = await api.post('/user/pet/' + id_pet + '/medicament', {
            id_pet, name, application_date, tipo, recommendation

        }, config);
        return response.data;
    },
    postNewPostText: async (type: string, body: string, pets: any) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };

        const response = await api.post('/feed', { type, body, pets }, config).then((response) => {
        })
        return response;
    },



    newCommentPost: async (id: number, txt: string, parentId?: number) => {
        let id_post = id;
        var config_headers = refreshConfig();
        const url = parentId ? `/post/${id_post}/comment/${parentId}` : `/post/${id_post}/comment`;
        const response = await api.post(url, {
            txt
        }, config_headers);
        return response;
    },

    postLiked: async (id_post: number) => {
        let id = id_post;
        var config_headers = refreshConfig();
        const response = await api.post('/post/' + id + '/like', {}, config_headers).then((response) => {
        });
        return response;
    },

    getLike: async (id_post: number) => {
        let id = id_post;
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };
        const response = await api.get('/feed/post/' + id + '/likes', config);
        return response.data;
    },

    putNewAvatarFile: async (photo: File) => {
        let avatar = photo;
        var config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
        };
        const response = await api.post('/user/avatar', { avatar }, config);
        return response.data;
    },

    putNewAvatarFilePet: async (photo: File, id_pet: any) => {
        let avatar = photo;
        var config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
        };
        const response = await api.post('/user/pet/' + id_pet + '/avatar', { avatar }, config);
        return response.data;
    },

    putNewCoverFilePet: async (photo: File, id_pet: any) => {
        let cover = photo;
        var config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
        };
        const response = await api.post('/user/pet/' + id_pet + '/cover', { cover }, config);
        return response.data;
    },


    putNewCoverFile: async (photo: File) => {
        let cover = photo;
        var config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
        };
        const response = await api.post('/user/cover', { cover }, config);
        return response.data;
    },

    getMyPets: async (id_user: any) => {
        var config_headers = refreshConfig();

        const response = await api.get('/user/' + id_user + '/pet', config_headers);
        return response.data;
    },

    gePetsOngs: async (situation: Number) => {
        var config_headers = refreshConfig();

        const response = await api.get('ong/pets/' + situation, config_headers);
        return response.data;
    },

    getPet: async (id_user: any, id_pet: any) => {
        var config_headers = refreshConfig();
        const response = await api.get('/user/' + id_user + '/pet/' + id_pet, config_headers);
        return response.data;
    },


    getPetPhotos: async (
        id: Number,
        id_pet: Number,
        currentPerPage: Number) => {

        let perPage = currentPerPage;
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };

        const response = await api.get('/user/' + id + '/photos/pet/' + id_pet + '/?perPage=' + perPage, config);
        return response.data;
    },

    getUserPhotos: async (
        id: any,
        currentPerPage: any) => {
        let perPage = currentPerPage;
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };
        const response = await api.get('/user/' + id + '/photos/?perPage=' + perPage, config);
        return response.data;
    },

});
