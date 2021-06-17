import Pokemon from '../models/Pokemon';
import BaseApi from '../services/api';
import ImageUtil from '../services/image';
import UploadS3 from '../services/upload_s3'

import { Op } from 'sequelize';

class PokedexController {

    async register(req, res) {
        try{
            const { pokemon, date, local } = req.body;
            const resp = await BaseApi.getPokemon(pokemon.toLowerCase());
            const image = resp.data.sprites.other['official-artwork'].front_default;
            const fileImage = await ImageUtil.getImage(image);
            const base64 = ImageUtil.imageEncode(fileImage.data);
            const urlImage = await UploadS3.imageUpload(base64, pokemon, req.trainerId);
            
            const pokemonCreated = await Pokemon.create({
                pokemon,
                date,
                local,
                image: urlImage,
                trainerId: req.trainerId
            });
            return res.status(201).json(pokemonCreated);
        }catch(err){
            if(err.response.status == 404){
                return res.status(404).json({
                    error: 'Pokemon not found'
                });
            }
        }
    }

    async getAll(req, res){
        const pokedex = await Pokemon.findAll({
            where: {trainerId: req.trainerId}
        })

        return res.json(pokedex);
    }

    async getById(req, res){
        const pokedex = await Pokemon.findOne({
            where: {
                [Op.and]: [{id: req.params.id, trainerId: req.trainerId}]
            }
        });

        if(!pokedex){
            return res.status(404).json({
                error: `Pokemon with id ${req.params.id} not found for this trainer`
            });
        }

        return res.json(pokedex);
    }

    async update(req, res) {
        const pokedex = await Pokemon.findOne({
            where: {
                [Op.and]: [{id: req.params.id, trainerId: req.trainerId}]
            }
        });

        if(!pokedex){
            return res.status(404).json({
                error: `Pokemon with id ${req.params.id} not found for this trainer`
            });
        }

        await pokedex.update(req.body);
        return res.json(trainer);
    }

    async delete(req, res){
        const pokedex = await Pokemon.findOne({
            where: {
                [Op.and]: [{id: req.params.id, trainerId: req.trainerId}]
            }
        });

        if(!pokedex){
            return res.status(404).json({
                error: `Pokemon with id ${req.params.id} not found for this trainer`
            });
        }

        await pokedex.destroy();

        return res.status(204).send();
    }

    
    
}

export default new PokedexController();