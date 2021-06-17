import axios from 'axios';

class BaseApi {
    constructor(){
        this.http = axios.create({
            baseURL: process.env.BASE_URL_POKEAPI
        });
    }

    getPokemon(pokemon){
        return this.http.get(`pokemon/${pokemon}`);
    }
}

export default new BaseApi();