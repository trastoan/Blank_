CREATE TABLE IF NOT EXISTS CATEGORIAS(
	id				integer PRIMARY KEY,
	categoria 		varchar(30) NOT NULL,
	CONSTRAINT nomecategoria UNIQUE(categoria)
);

CREATE TABLE IF NOT EXISTS PALAVRAS(
	id				integer PRIMARY KEY,
	conteudo		varchar(50), 
	categoria 		varchar(30) REFERENCES CATEGORIAS(categoria)
);



/* Essas duas de cima são as tabelas. A de cima são categorias de palavras, a de baixo são palavras, como o nome diz.
Para inserir alguma coisa nessas tabelas, tu vai fazer da seguinte forma: 

INSERT INTO [NOMEDATABELA] VALUES (valor1, valor2, ... valorn);


Exemplo de inserção na CATEGORIAS:
	INSERT INTO CATEGORIAS VALUES (1,zuzu);

Exemplo de inserção na PALAVRAS:
	INSERT INTO PALAVRAS VALUES (1, refrigerante, zuzu);


Como você talvez prceba na linha 10, a categoria da tabela PALAVRAS referencia categoria de CATEGORIAS.
O que isso significa é que você não pode inserir uma palavra na tabela PALAVRAS e colocar uma categoria que não exista na tabela CATEGORIAS.

Faz essa parada uma embaixo da outra (uma linha de texto para cada entrada) e salva em um arquivo .sql .
Não é case sensitive, então tanto faz minuscúlo ou maiúsculo.
O ponto e vírgula é importante. Todo final de inserção coloca ; senão vai dar merda. É para visar para o SGBD que o comando encerrou. */