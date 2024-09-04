<h1>Casa-das-Bruxas</h1>

<h2>Tabelas do MySQL</h2>


````
CREATE DATABASE CasaDasBruxas;
USE CasaDasBruxas;
````
<h2>Aqui é feito a tabela de cadastro</h2>

````
CREATE TABLE cadastro (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    DataNascimento DATE NOT NULL,
    email VARCHAR(500) NOT NULL UNIQUE,
    NomeCompleto VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL UNIQUE
);
````
<h3>Armazena as informações dos usuários cadastrados na plataforma. Cada user possui um "id_usuario", "DataNascimento", "email", "NomeCompleto" e "senha". Os e-mails e as senhas são únicos, para não ter contas iguais.</h3>

<h2>Aqui é feito a tabela de produtos</h2>

````
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nomeProduto VARCHAR(255) NOT NULL UNIQUE,
    preco FLOAT,
    descricao VARCHAR(1000) NOT NULL
);
````
<h3>Tem os itens para comprar na plataforma. Cada produto tem um "id_produto", um "nomeProduto", um "preco", e uma "descricao" sobre o item. O nome do produto é único para não ter duplicados.</h3>

<h2>Aqui é feito a tabela de carrinho</h2>

````
CREATE TABLE carrinho (
    preco_total FLOAT,
    id_produto INT,
    id_usuario INT,
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
    FOREIGN KEY (id_usuario) REFERENCES cadastro(id_usuario)
);
````
<h3>Adiciona produtos aos usuários, mostrando os itens que cada usuário adicionou ao carrinho de compras. Inclui o "preco_total" dos produtos no carrinho, e também chaves estrangeiras (id_produto e id_usuario) para os produtos e usuários correspondentes.</h3>

<h2>Aqui é feito a tabela de login</h2>

````
CREATE TABLE loggin (
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (email) REFERENCES cadastro(email),
    FOREIGN KEY (senha) REFERENCES cadastro(senha)
);
````
<h3>Armazena os dados de login dos usuários, somente os campos email e senha. As duas colunas são únicas e têm restrições de chave estrangeira para garantir que o e-mail e a senha sejam iguais às informações armazenadas na tabela cadastro, sendo mais seguro para o login.</h3>

<h2>Inserir dados para teste:</h2>

````
INSERT INTO cadastro (DataNascimento, email, NomeCompleto, senha) VALUES ("2004-07-05", "bvfgecn@gmail.com", "Bernardo Varisco", "11445577");

INSERT INTO produtos (nomeProduto, preco, descricao) VALUES ("VenenoDeAranha", 68.00, "Veneno letal extraído de aranhas raras.");

INSERT INTO loggin(email, senha) VALUES();
````
<h2>Configuração do Servidor Node.js</h2>

<h2>Instalação</h2>
Abra o Git Bash na área de trabalho e abra com "cd -nome da pasta-" a pasta do seu trabalho;
Após isso execute o comando "npm init -y". O comando npm init -y é usado no Node.js para inicializar um novo projeto Node.js com um arquivo package.json padrão.
Após isso execute as instalações : "npm i express nodemon cors mysql2". Express facilita o gerenciamento das rotas,  o nodemon monitora as mudanças nos arquivos do projeto e reinicia automaticamente o servidor sempre que uma alteração é detectada, o pacote cors permite configurar e gerenciar essa política, e o MySQL é um cliente para Node.js, compatível com o mysql banco de dados.

<h2>Configurar a conexão com o banco de dados:</h2>
<h3>Crie um arquivo com o nome "db_config.js" e nele aplique este codigo:</h3>

````
const mysql = require('mysql');

const connection = mysql.createConnection({
      host: 'localhost',
      user: 'seu_usuario_mysql',
      password: 'sua_senha_mysql',
      database: 'CasaDasBruxas'
});

connection.connect((err) => {
      if (err) throw err;
      console.log('Conectado ao banco de dados!');
});

module.exports = connection;
````

<h2>Rodar no servidor:</h2>
No terminal aplique:
"npm start"
O servidor deve iniciar na porta escolhida(3002) com o Mysql conectado.

<h3>Criando um JS para as rotas:</h3>
<h2>Crie um arquivo "server.js"</h2>

````
const express = require('express');
const cors = require('cors');
//definir a porta
const porta = 3002;
const app = express();
//habilitar o cors e utilizar json
app.use(cors());
app.use(express.json());
//testar
app.listen(porta, () => console.log(`rodando na porta` + porta));

const connection = require('./db_config.js');

````
<h3>Aplique as rotas</h3>

````
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
````
<h3>Testar as API's:</h3>
<h2>adastro do usuario:</h2>

Para testarmos se as rotas estão realmente funcionando nós devemos abrir um novo local no ThunderClient onde lá vamos por http://localhost:3002/cadastro/cadastrar com a mesma porta que registramos no inicio e as mesmas informaçoes do POST.

<h2>Para registrar informaçoes no ThunderClient fazemos da seguintes forma:</h2>

````
- POST|http://localhost:3002/cadastro/cadastrar

- Body: 

{
"dataNascimento": "2004-07-05",
"email": "teste@example.com",
"nomeCompleto": "Nome Teste",
"senha": "123456"
}
````

Após isto vamos no banco e dados e colocamos este código para visualizar o que acabamos de registrar:

"SELECT * FROM cadastro"

<h2>TUDO ISTO DEVE ESTAR DE ACORDO COM O NOSSO BANCO DE DADOS QUE JA HAVIAMOS CRIADO NO MYSQL WORKBENCH.</h2>
