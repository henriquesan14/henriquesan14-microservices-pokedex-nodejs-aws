import Pokemon from '../models/Pokemon';
import Pokemon from '../models/Pokemon';
import LambdaUtil from '../services/lambda_util';

class ReportController {

    async reportPokedex(req, res){
        const trainerId = req.trainerId;
        const pokedex = await Pokemon.findAll({
            where: {trainerId: trainerId}
        });
        const payload = {
            trainer: {
                id: trainerId,
                name: trainerId
            },
            pokedex: pokedex
        };
        const result = await LambdaUtil.invokeLambdaReport(payload);
        return res.json({
            url: result.Payload
        })
    }

 
}

export default new ReportController();