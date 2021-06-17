import Trainer from '../models/Trainer';

class TrainerController {

    async getAll(req, res) {
        const trainers = await Trainer.findAll({
            attributes: ['id', 'name', 'age', 'city', 'email']
        });

        return res.json(trainers);
    }

    async getById(req, res) {
        const idTrainer = req.params.id
        const trainer = await Trainer.findByPk(idTrainer, {
            attributes: ['id', 'name', 'age', 'city', 'email']
        });
        if(!trainer){
            return res.status(404).json({
                error: `Trainer with id ${idTrainer} not found`
            });
        }
        return res.json(trainer);
    }

    async create(req, res) {
        const trainerExist = await Trainer.findOne({
            where: { email: req.body.email },
        });
        if(trainerExist){
            return res.status(400).json({
                error: "Trainer already exists. "
            });
        }
        const trainer = await Trainer.create(req.body);
        return res.status(201).json(trainer);
    }

    async update(req, res) {
        const idTrainer = req.params.id;
        const trainer = await Trainer.findByPk(idTrainer);
        if(!trainer){
            return res.status(404).json({
                error: `Trainer with id ${idTrainer} not found`
            });
        }
        await trainer.update(req.body);
        return res.json(trainer);
    }

    async delete(req, res) {
        const idTrainer = req.params.id;
        const trainer = await Trainer.findByPk(idTrainer);
        if(!trainer){
            return res.status(404).json({
                error: `Trainer with id ${idTrainer} not found`
            });
        }
        await trainer.destroy();
        return res.status(204).send();
    }
}

export default new TrainerController();