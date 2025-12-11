const express = require("express") 
const app = express()
const bodyParser = require("body-parser") 
const connection = require("./database/database")
const modelPergunta = require("./database/Pergunta")
const modelResposta = require("./database/Resposta")

// database
connection
    .authenticate()
    .then(()=>{
        console.log("db conectado")
    })
    .catch((err) => {
        console.log(err)
    })


// estou dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

// body parser
app.use(bodyParser.urlencoded({extended: false})) // é a funcao da biblioteca que vai transformar o que foi recebido do formulario como uma estrutura js
                                                  // vai decodificar os dados enviados pelo formulario
app.use(bodyParser.json())  


// rotas
app.get("/", (req, res) => {

    modelPergunta.findAll({raw: true, order:[ // isso diz para que traga apenas os dados crus
        ['id','desc'] // sera ordenado por ID decrescentemente
    ]}) 
                    .then(perguntas => {
                        res.render("index",{
                            perguntas: perguntas // envio dessa lista de perguntas para o index/frontend
                        })
                    })
    

})

app.get("/perguntar", (req, res) => {

    res.render("perguntar")

})

app.post("/salvarpergunta", (req, res) => { // sera utilizado para receber as perguntas da rota perguntar, para salva-las

    var titulo = req.body.titulo
    var descricao = req.body.descricao

    modelPergunta.create({  // equivalente ao 'INSERT INTO...'
        titulo: titulo,
        descricao: descricao

    }).then(() =>{
        res.redirect("/") // após a pergunta ser adicionada com sucesso, vai ser redirecionado para uma outra pagina

    })

})

app.get("/pergunta/:id", (req, res) => {

    var id = req.params.id
    modelPergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // pergunta encontrada no banco de dados
            
            modelResposta.findAll({
                where: {
                    perguntaId: pergunta.id
                },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        }else{ 
            res.redirect("/")
        }
    })

})

app.post("/salvarresposta", (req, res) => { // sera utilizado para receber as perguntas da rota perguntar, para salva-las

    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta

    modelResposta.create({  // equivalente ao 'INSERT INTO...'
        corpo: corpo,
        perguntaId: perguntaId

    }).then(() =>{
        res.redirect("/pergunta/" + perguntaId) // após a pergunta ser adicionada com sucesso, vai ser redirecionado para uma outra pagina

    })

})

app.listen(6681, () => {
    console.log("App Rodando!")
})