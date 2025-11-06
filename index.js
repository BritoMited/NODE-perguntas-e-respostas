const express = require("express") // importação do express  
const app = express()

// configuração de rodar html 
// dizendo para o express usar o EJS como view engine
// para o express ler os arquivos html precisa estar na pasta views
// e em extensão ejs
app.set('view engine', 'ejs')

app.get("/:nome/:language", (req, res) => {

    var nome = req.params.nome
    var language = req.params.language

    var exibirMsg = false 

    var produtos = [ // criação de array
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-cola", preco: 5},
        {nome: "Leite", preco: 1.14}
    ]

    // passagem de valores e variaveis para a pagina html
    res.render("index", {
        nome: nome,
        language: language,
        empresa: "HNSG",
        ramal: 6681,
        msg : exibirMsg,
        produtos: produtos // passagem bem simples da array
    })

})

app.get("/", (req, res) => {

    var nome = "britasso"
    var language = "Java"

    // passagem de valores e variaveis para a pagina html
    res.render("index", {
        nome: nome,
        language: language,
        empresa: "HNSG",
        ramal: 6681
    })

    //res.render("principal/perfil")
    //res.render("home")
    //res.send("salve mano.")

})

app.listen(6681, () => {
    console.log("App Rodando!")
})