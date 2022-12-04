const {sequelize} = require('../database/models')

const dbConnectionTest = async () => {
    try {
        await sequelize.authenticate()
        console.log('La conección fue exitosa');
    } catch (error) {
        console.log('No se logró la conección con la base de datos.',error);
    }
}

module.exports = dbConnectionTest