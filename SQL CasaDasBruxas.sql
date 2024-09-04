create database CasaDasBruxas;
use CasaDasBruxas;

create table cadastro(
	id_usuario int auto_increment primary key,
	DataNascimento date not null,
    email varchar(500) not null unique,
	NomeCompleto Varchar(255) not null,
    senha varchar(255) not null unique
);
SELECT * FROM cadastro;


create table produtos(
	id_produto int auto_increment primary key,
    nomeProduto varchar(255) not null unique,
    preco float,
    descricao varchar(1000) not null
);

SELECT * FROM produtos;

create table carrinho(
	preco_total float,
    id_produto int,
    id_usuario int,
    id_carrinho int primary key auto_increment,
    foreign key (id_produto) references produtos(id_produto),
    foreign key (id_usuario) references cadastro(id_usuario)
);

create table loggin(
	email varchar(255) not null unique,
    senha varchar(255) not null unique,
    
	foreign key (email) references cadastro(email),
    foreign key (senha) references cadastro(senha)
);
SELECT * FROM  loggin;

INSERT INTO cadastro(DataNascimento, email, NomeCompleto, senha)
VALUES ("05/07/2004", "bvfgecn@gmail.com", "Bernardo Varisco", "11445577");
SELECT * FROM  cadastro;

UPDATE cadastro SET email = "?", NomeCompleto = "?", senha = "?" WHERE id_usuario = ?;
SELECT * FROM cadastro WHERE id_usuario = ?;

DELETE FROM cadastro WHERE id_usuario = 1;
SELECT * FROM cadastro;


INSERT INTO produtos(nomeProduto, preco, descricao)
VALUES ("VenenoDeAranha", "R$68", "iuajsdbjasbdabdsjadbajsdbja");
SELECT * FROM  produtos;

UPDATE produtos SET nomeProduto = "VenenoDeCobra", preco = "R$90" WHERE id_produto = 1;
SELECT * FROM produtos WHERE id_produto = 1;

DELETE FROM produtos WHERE id_produto = 1;
SELECT * FROM produtos;

INSERT INTO loggin(email, senha) 
VALUES();
SELECT * FROM  loggin;