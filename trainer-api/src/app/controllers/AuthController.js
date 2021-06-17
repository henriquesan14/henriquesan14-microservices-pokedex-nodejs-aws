import Trainer from '../models/Trainer';
import jwt from 'jsonwebtoken';
import authConfig from '../../../../core/config/auth';

class AuthController {

    async login(req, res) {
        const { email, password } = req.body;

        const trainer = await Trainer.findOne({
            where: {email},
        });
        if(!trainer){
            return res.status(401).json({error: 'Trainer not found'});
        }

        if(!await trainer.checkPassword(password)){
            return res.status(401).json({error: 'Password does not match'});
        }
        const { id, name, age, city } = trainer;

        return res.json({
            user: {
                id,
                name,
                email,
                age,
                city
            },
            token: jwt.sign({ id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });

        
    }
}

export default new AuthController();