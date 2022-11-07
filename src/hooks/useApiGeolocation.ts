import axios from "axios";

const api = axios.create({
    baseURL: "https://nominatim.openstreetmap.org/search.php?q="
    //baseURL:process.env.REACT_APP_API
});

var config = {
    headers: {
        'Content-Type': 'application/json',
    }
};
export const useApiLocation = () => ({



    getLocation: async (r: string, city: string, bairro: string) => {
        let rua = r.replace(" ", "+");
        let cidade = city.replace(" ", "+");
        let bairro_br = bairro.replace(" ", "+");
        const response = await api.get(rua + '+' + bairro_br + '+' + cidade+'&format=jsonv2');
        return response.data;
    },

});