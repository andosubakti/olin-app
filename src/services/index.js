import axios from "axios";

const baseURL = "https://api.binderbyte.com/wilayah";
const client = axios.create();
// //axios.defaults.withCredentials = true

// // //Request interceptor
// client.interceptors.request.use(
//     function (config) {
//         let token = JSON.parse(localStorage.getItem('token'));
//         console.log("token: ", token)
//         if (token !== null) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     function (err) {
//         throw new Error(err);
//     }
// );

const api_key = "b5c547e33d490d3af5061c184b5e44575792c6b9a94ef2cc842b7590e4388db3";

const APIServices = {
    getProvinsi(data) {
        return client.request(
            {
                method: "get",
                url: `${baseURL}/provinsi`,
                params: {
                    api_key: api_key
                }
            },
            { crossdomain: true }
        )
    },

    getKabupaten(id_provinsi) {
        return client.request(
            {
                method: "get",
                url: `${baseURL}/kabupaten`,
                params: {
                    api_key: api_key,
                    id_provinsi: id_provinsi
                }
            },
            { crossdomain: true }
        )
    },
    getKecamatan(id_kabupaten) {
        return client.request(
            {
                method: "get",
                url: `${baseURL}/kecamatan`,
                params: {
                    api_key: api_key,
                    id_kabupaten: id_kabupaten
                }
            },
            { crossdomain: true }
        )
    },
}

export { APIServices };