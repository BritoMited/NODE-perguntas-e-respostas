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

    // passagem de valores e variaveis para a pagina html
    res.render("index", {
        nome: nome,
        language: language,
        empresa: "HNSG",
        ramal: 6681,
        msg : exibirMsg
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