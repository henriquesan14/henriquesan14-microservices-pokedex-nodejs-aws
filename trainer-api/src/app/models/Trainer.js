import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Trainer extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                age: Sequelize.INTEGER,
                city: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING
            },
            {
                sequelize
            }
        );
        
        this.addHook('beforeSave', async (trainer) => {
            if(trainer.password){
                trainer.password = await bcrypt.hash(trainer.password, 8);
            }
        });

        return this;
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password);
    }
}

export default Trainer;