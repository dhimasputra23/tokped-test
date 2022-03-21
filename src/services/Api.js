import axios from "axios";
import { Constant } from "../constant";

const Api = axios.create({
    baseURL: Constant.BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

///Intecepr Request 
Api.interceptors.request.use(
    async(request) => {
        if(request.data){
            console.log(`Request URL -> ${request.url} || payload : ${JSON.stringify(request.data)}`);
            request.data = request.data;
        } else {
            console.log(`Request URL -> ${request.url} || Request Without Payload`);
        }

        return request;
    },
    (error) => Promise.reject(error),
);

///Intercept Response
Api.interceptors.response.use(
    async(response) => {
        console.log(`Response API -> ${response.data}`);

        return response;
    },
    (error) => {
        let result = {status: 'E', message: `Error : ${error}`};

        if(error.response != undefined){
            switch (error.response.status){
                case 400:
                    result = {status: 'E', message: 'Bad Request'};
                    break;
                case 401:
                    result = {status: 'E', message: 'Unauthorized'};
                    break;
                case 403: 
                    result = {status: 'E', message: 'Anda tidak punya akses'};
                    break;
                case 404: 
                    result = {status: 'E', message: 'Alamat salah'};
                    break;
                    case 500:
                        result = {
                          satus: 'E',
                          message: 'Oh Tidak, Ada Kesalah pada Server.',
                        };
                      case 502:
                        result = { status: 'E', message: 'Error : Bad Gateway.' };
                        break;
                      case 503:
                        result = {
                          status: 'E',
                          message: 'Server sedang Update, Coba Sebentar Lagi.',
                        };
                        break;
                      default:
                        result = { status: 'E', message: 'Whoops, Something Bad happen. :)' };
                        break;
              
            }
        }
        return Promise.reject(result);
    },
);

export default Api;