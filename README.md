<h1>Casa-das-Bruxas</h1>

<h2>Tabelas do MySQL</h2>

CREATE DATABASE CasaDasBruxas;
USE CasaDasBruxas;

CREATE TABLE cadastro (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    DataNascimento DATE NOT NULL,
    email VARCHAR(500) NOT NULL UNIQUE,
    NomeCompleto VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL UNIQUE
);
### Armazena as informações dos usuários cadastrados na plataforma. Cada user possui um "id_usuario", "DataNascimento", "email", "NomeCompleto" e "senha". Os e-mails e as senhas são únicos, para não ter contas iguais.

CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nomeProduto VARCHAR(255) NOT NULL UNIQUE,
    preco FLOAT,
    descricao VARCHAR(1000) NOT NULL
);
### Tem os itens para comprar na plataforma. Cada produto tem um "id_produto", um "nomeProduto", um "preco", e uma "descricao" sobre o item. O nome do produto é único para não ter duplicados.

CREATE TABLE carrinho (
    preco_total FLOAT,
    id_produto INT,
    id_usuario INT,
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
    FOREIGN KEY (id_usuario) REFERENCES cadastro(id_usuario)
);
### Adiciona produtos aos usuários, mostrando os itens que cada usuário adicionou ao carrinho de compras. Inclui o "preco_total" dos produtos no carrinho, e também chaves estrangeiras (id_produto e id_usuario) para os produtos e usuários correspondentes.

CREATE TABLE loggin (
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (email) REFERENCES cadastro(email),
    FOREIGN KEY (senha) REFERENCES cadastro(senha)
);

### Armazena os dados de login dos usuários, somente os campos email e senha. As duas colunas são únicas e têm restrições de chave estrangeira para garantir que o e-mail e a senha sejam iguais às informações armazenadas na tabela cadastro, sendo mais seguro para o login.

## Inserir dados para teste:

INSERT INTO cadastro (DataNascimento, email, NomeCompleto, senha) VALUES ("2004-07-05", "bvfgecn@gmail.com", "Bernardo Varisco", "11445577");

INSERT INTO produtos (nomeProduto, preco, descricao) VALUES ("VenenoDeAranha", 68.00, "Veneno letal extraído de aranhas raras.");

INSERT INTO loggin(email, senha) VALUES();

# Configuração do Servidor Node.js
## Instalação:
Abra o Git Bash na área de trabalho e abra com "cd -nome da pasta-" a pasta do seu trabalho;
Após isso execute o comando "npm init -y". O comando npm init -y é usado no Node.js para inicializar um novo projeto Node.js com um arquivo package.json padrão.
Após isso execute as instalações : "npm i express nodemon cors mysql2". Express facilita o gerenciamento das rotas,  o nodemon monitora as mudanças nos arquivos do projeto e reinicia automaticamente o servidor sempre que uma alteração é detectada, o pacote cors permite configurar e gerenciar essa política, e o MySQL é um cliente para Node.js, compatível com o mysql banco de dados.

# Configurar a conexão com o banco de dados:
### Crie um arquivo com o nome "db_config.js" e nele aplique este codigo:

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


# Rodar no servidor:
No terminal aplique:
### npm start
O servidor deve iniciar na porta escolhida(3002) com o Mysql conectado.

# Criando um JS para as rotas:
## Crie um arquivo "server.js"

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

### Aplique as rotas

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

# Testar as API's:
## Cadastro do usuario:

//-para testarmos se as rotas estão realmente funcionando nós devemos abrir um novo local no ThunderClient onde lá vamos por http://localhost:3002/cadastro/cadastrar com a mesma porta que registramos no inicio e as mesmas informaçoes do POST.-\\
Para registrar informaçoes no ThunderClient fazemos da seguintes forma:

- POST|http://localhost:3002/cadastro/cadastrar

- Body: 

{
"dataNascimento": "2004-07-05",
"email": "teste@example.com",
"nomeCompleto": "Nome Teste",
"senha": "123456"
}

Após isto vamos no banco e dados e colocamos este código para visualizar o que acabamos de registrar:

SELECT * FROM cadastro;

### TUDO ISTO DEVE ESTAR DE ACORDO COM O NOSSO BANCO DE DADOS QUE JA HAVIAMOS CRIADO NO MYSQL WORKBENCH.
