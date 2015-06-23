CREATE TABLE IF NOT EXISTS PALAVRAS(
	id 				serial PRIMARY KEY,
	conteudo		varchar(50) UNIQUE
);




/*ESQUECE AS EXPLICAÇÃO 

INSERT INTO PALAVRAS (conteudo) VALUES ('palavra');

Onde 'palavra é a palavra.'
Se tu quiser inserir refrigerante, zuzu e poupa-ganha na lista de palavras:

INSERT INTO PALAVRAS (conteudo) VALUES ('refrigerante');
INSERT INTO PALAVRAS (conteudo) VALUES ('zuzu');
INSERT INTO PALAVRAS (conteudo) VALUES ('poupa-ganha');

*/

