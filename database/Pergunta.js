const Sequelize = require('sequelize') // importa a biblioteca

const connection = require("./database") // carrega o objeto capaz de conectar no banco de dados, aqui só tem as configuracoes

const Pergunta = connection.define('pergunta',{ // define a tabela
    titulo: {
        type: Sequelize.STRING, // define o tipo de dado do campo
        allowNull: false // impede o campo de receber valores nulos
    },  
    descricao: {
        type: Sequelize.TEXT, // string para textos curtos, e text para longos
        allowNull: false
    }
})

Pergunta.sync({force: false})  // ira sincronizar essa tabela com o banco de dados caso nao exista, e nao irá recria-la caso exista
                        .then(() => {  // esse then é executado quando a tabela é criada/tudo é executado com sucesso
                            console.log("tabela criada")
                        })

                    
module.exports = Pergunta // exportando para que quem receber essa exportacao saiba a estrutura do modelo
