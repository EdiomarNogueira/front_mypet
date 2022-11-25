import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    //baseURL:process.env.REACT_APP_API
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
        return response.data;
    },

    putUser: async (
        name: string,
        email: string,
        password: string,
        birthdate: string,
        category: string,
        phone: string,
        road: string,
        district: string,
        city: string,
        genre: string,
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
        id_user: number,
        species: string,
        birthdate: string,
        situation: string,
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

    getUserRelations: async (latitude: String, longitude: String, currentPerPage: any) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };
        const response = await api.get('/user/relations/' + latitude + '/' + longitude + '?perPage=' + currentPerPage, config);

        console.log('response', response);
        return response.data;
    },

    newPost: async (currentPerPage: any) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            }
        };

        const response = await api.get('/feed/?perPage=' + currentPerPage, config);
        console.log('response', response);
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
        console.log(response);
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

    postFollowUnfollow: async (id_user: number) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };

        const response = await api.post('/user/' + id_user + '/follow', {}, config);
        console.log(response);
        return response.data;
    },


    getVerificFollow: async (id_user: number) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };

        const response = await api.get('/user/' + id_user + '/follow', config);
        console.log('é seguidor?', response);
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
            console.log(response);
        })
        return response;
    },

    postNewPostText: async (type: string, body: string, pets: any) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };

        const response = await api.post('/feed', { type, body, pets }, config).then((response) => {
            console.log(response);
        })
        return response;
    },

    newCommentPost: async (id: number, txt: string) => {
        let id_post = id;
        var config_headers = refreshConfig();
        const response = await api.post('/post/' + id_post + '/comment', {
            txt
        }, config_headers).then((response) => {
            console.log(response);
        }); //ALTERAR A VALIDAÇÃO
        return response;
    },

    postLiked: async (id_post: number) => {
        let id = id_post;
        var config_headers = refreshConfig();
        const response = await api.post('/post/' + id + '/like', {}, config_headers).then((response) => {
            console.log(response);
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
        // .then((response) => {
        //     console.log(response.data);
        // });
        return response.data;
    },

    getMyPets: async (id_user:any) => {
        var config_headers = refreshConfig();

        const response = await api.get('/user/'+id_user+'/pet', config_headers);
        console.log('retorno',response);
        return response.data;
    },

    getPet: async (id_user:any, id_pet: String) => {
        var config_headers = refreshConfig();

        const response = await api.get('/user/'+id_user+'/pet/' + id_pet, config_headers);
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
        console.log('response',response);
        return response.data;
    },

});