-- SQLBook: Code
INSERT INTO usuarios (nome, email, telefone, createdAt, updatedAt) VALUES
('João Silva', 'joao.silva@example.com', '11987654321', NOW(), NOW()),
('Maria Oliveira', 'maria.oliveira@example.com', '21987654321', NOW(), NOW()),
('Pedro Santos', 'pedro.santos@example.com', '31987654321', NOW(), NOW()),
('Ana Costa', 'ana.costa@example.com', '41987654321', NOW(), NOW()),
('Lucas Pereira', 'lucas.pereira@example.com', '51987654321', NOW(), NOW());

INSERT INTO enderecos (uf, cidade, cep, rua, numero, pagamento, createdAt, updatedAt, usuarioId) VALUES
('SP', 'São Paulo', '01001000', 'Avenida Paulista', '1578', 'Cartão', NOW(), NOW(), 1),
('RJ', 'Rio de Janeiro', '22060002', 'Praia de Copacabana', '100', 'Dinheiro', NOW(), NOW(), 2),
('MG', 'Belo Horizonte', '30140001', 'Avenida Afonso Pena', '3000', 'Boleto', NOW(), NOW(), 3),
('RS', 'Porto Alegre', '90010001', 'Avenida Loureiro da Silva', '555', 'Transferência', NOW(), NOW(), 4),
('BA', 'Salvador', '40010000', 'Rua da Graça', '200', 'Cartão', NOW(), NOW(), 5);

INSERT INTO filmes (titulo, diretor, genero, anoLancamento, createdAt, updatedAt) VALUES
('A Grande Aventura', 'Maria Oliveira', 'Aventura', '2023', NOW(), NOW()),
('O Mistério do Lago', 'Carlos Souza', 'Suspense', '2022', NOW(), NOW()),
('Amor em Tempos de Guerra', 'Ana Costa', 'Romance', '2021', NOW(), NOW()),
('Despertar da Consciência', 'João Silva', 'Drama', '2020', NOW(), NOW()),
('O Último Guerreiro', 'Pedro Santos', 'Ação', '2019', NOW(), NOW()),
('Viagem ao Centro da Terra', 'Lucas Pereira', 'Ficção Científica', '2018', NOW(), NOW()),
('A Noite Estrelada', 'Mariana Lima', 'Fantasia', '2023', NOW(), NOW()),
('Risco Imediato', 'Felipe Almeida', 'Ação', '2022', NOW(), NOW()),
('Memórias de uma Vida', 'Gabriela Mendes', 'Drama', '2021', NOW(), NOW()),
('O Som do Silêncio', 'Ricardo Gomes', 'Terror', '2020', NOW(), NOW());