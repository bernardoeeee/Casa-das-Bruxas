// Importa o framework Express para criar e configurar o servidor.
const express = require('express');
// Importa o middleware cors para habilitar o CORS no servidor.
const cors = require('cors');
//definir a porta
const porta = 3002;
const app = express();
//habilitar o cors e utilizar json
app.use(cors());
app.use(express.json());
//testar
app.listen(porta, () => console.log(`rodando na porta` + porta));

// Importa a configuração do banco de dados, provavelmente para se conectar a um banco de dados MySQL.
const connection = require('./db_config.js');

// O POST é utilizada para enviar dados ao servidor.
app.post('/cadastro/cadastrar', (request, response) => {
    // criar um array com dados recebidos
    let params = Array(
        request.body.dataNascimento,
        request.body.email,
        request.body.nomeCompleto,
        request.body.senha
    );
    // criar o comando de execução no banco de dados
    let query = "INSERT INTO cadastro(DataNascimento, email, NomeCompleto, senha) VALUES(?,?,?,?);";
    // passar o comando e os dados para a função query
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    menssage: "sem sucesso",
                    data: err
                })
        }
    })
});
// A rota GET é usada geralmente para coletar e listar os dados do usuario.
app.get('/cadastro/listar', (request, response) => {
    const query = "SELECT * FROM cadastro";

    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
        }
    })
});

// A rota PUT é usada para editar o cadastro do usuario
app.put('/cadastro/editar/:id', (request, response) => {

    let params = [
        request.body.NomeCompleto,
        request.body.senha,
        request.params.id
    ];


    let query = "UPDATE cadastro SET NomeCompleto = ?, senha = ? WHERE id_usuario = ?;";


    connection.query(query, params, (err, results) => {
        if (err) {

            return response.status(400).json({
                success: false,
                message: "Erro na atualização dos daods",
                data: err
            });
        }


        response.status(200).json({
            success: true,
            message: "Dados atualizadoscom sucesso",
            data: results
        });
    });
});
// A rota DELETE é usada para deletar o cadastro do usuario.
app.delete('/cadastro/deletar/:id', (request, response) => {
    let id = request.params.id;

    let query = "DELETE FROM cadastro WHERE id_usuario = ?;"

    connection.query(query, [id], (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
        }
    })
});


// ROTAS PARA A PAGINA DE CADASTRO DE PRODUTOS


app.post('/produtos/cadastrar', (request, response) => {
    // criar um array com dados recebidos
    let params = Array(
        request.body.nomeProduto,
        request.body.preco,
        request.body.descricao
    );
    // criar o comando de execução no banco de dados
    let query = "INSERT INTO produtos(nomeProduto, preco, descricao) VALUES(?,?,?);";
    // passar o comando e os dados para a função query
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    menssage: "sem sucesso",
                    data: err
                })
        }
    })
});

app.get('/produtos/listar', (request, response) => {
    const query = "SELECT * FROM produtos";

    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
        }
    })
});

app.put('/produtos/editar/:id', (request, response) => {
    
    let params = [
        request.body.nomeProduto,
        request.body.preco,
        request.body.descricao,
        request.params.id
    ];

 
    let query = "UPDATE produtos SET nomeProduto = ?, preco = ?, descricao = ? WHERE id_produto = ?";

    
    connection.query(query, params, (err, results) => {
        if (err) {
            
            return response.status(400).json({
                success: false,
                message: "Erro na atualização dos dados",
                data: err
            });
        }

        
        response.status(200).json({
            success: true,
            message: "Dados atualizados com sucesso",
            data: results
        });
    });
});

app.delete('/produtos/deletar/:id', (request, response) => {
    let id = request.params.id;

    let query = "DELETE FROM produtos WHERE id_produto = ?;"

    connection.query(query, [id], (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
        }
    })
});


// ROTA PARA A  PAGINA DE LOGGIN

app.post('/loggin/logar', (request, response) => {
    // criar um array com dados recebidos
    let params = Array(
        request.body.email,
        request.body.senha
    );
    // criar o comando de execução no banco de dados
    let query = "INSERT INTO loggin(email, senha) VALUES(?,?);";
    // passar o comando e os dados para a função query
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    menssage: "sem sucesso",
                    data: err
                })
        }
    })
});