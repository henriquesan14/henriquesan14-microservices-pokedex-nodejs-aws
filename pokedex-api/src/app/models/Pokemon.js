import Sequelize, { Model } from 'sequelize';

class Pokemon extends Model {
    static init(sequelize) {
        super.init(
            {
                pokemon: Sequelize.STRING,
                date: Sequelize.DATE,
                local: Sequelize.STRING,
                image: Sequelize.STRING,
                trainerId: Sequelize.INTEGER
            },
            {
                sequelize
            }
        );
        
    }

}

export default Pokemon;