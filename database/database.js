const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', 't!h0s4*inf0', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection