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

    signin: async (email: string, password: string) => {
        var config_headers = refreshConfig();
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    putUser: async (name: string, email: string, password: string, birthdate: string, category: string, phone: string, rua: string, bairro: string, city: string, genre: string, work: string, instagram: string, facebook: string, biography: string, latitude: string, longitude: string) => {
        var config_headers = refreshConfig();
        const response = await api.put('/user', { name, email, password, birthdate, category, phone, rua, bairro, city, genre, work, instagram, facebook, biography, latitude, longitude }, config_headers);
        return response.data;
    },

    logout: async () => {
        var config_headers = refreshConfig();
        const response = await api.post('/logout', {}, config_headers);
        return response.data;
    },

    postCreateuser: async (name: string, email: string, password: string, birthdate: string, category: string, phone: string) => {//category: string,
        const response = await api.post('/user/user_register', { name, email, password, birthdate, category, phone });
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

    postNewPostFile: async (type: string, subtitle: string, photo: File) => {
        var config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            },
        };
        const response = await api.post('/feed', { type, subtitle, photo }, config).then((response) => {
            console.log(response);
        })
        return response;
    },

    postNewPostText: async (type: string, body: string) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken')
            }
        };

        const response = await api.post('/feed', { type, body }, config).then((response) => {
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
        const response = await api.post('/user/avatar', { avatar }, config).then((response) => {
            console.log(response);
        })
        return response;
    }
});