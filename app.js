// ============================================================
// ALMOXARIFADO ELETRÔNICO - Servidor de exemplo
// Projeto Prático Cliente & Servidor - Prof. Msc. Daniel Mosca
// Backend feito apenas com o material de referência das aulas.
// ============================================================

const express = require('express');
const app = express();

// Middleware que permite ao Express interpretar JSON no corpo
// das requisições (visto na aula de Express)
app.use(express.json());

// ------------------------------------------------------------
// "Banco de dados" em memória: um vetor de livros
// (sem banco de dados de verdade, conforme os requisitos)
// ------------------------------------------------------------
const livros = [
    { id: 1, nome: 'Vol. 2 Chainsaw Man', genero: 'manga', disponibilidade: true },
    { id: 2, nome: 'DUNA', genero: 'ficcao', disponibilidade: true },
    { id: 3, nome: 'Festim Dos Corvos', genero: 'fantasia', disponibilidade: true },
    { id: 4, nome: 'UNIX', genero: 'cientifico', disponibilidade: true },
    { id: 5, nome: 'House of Leaves', genero: 'terror', disponibilidade: true },
    { id: 6, nome: 'Senhor Dos Anéis', genero: 'fantasia', disponibilidade: true },
    { id: 7, nome: 'C++', genero: 'cientifico', disponibilidade: true }
];

// Usuário padrão do almoxarifado (fixo, como no exercício de login)
const USUARIO_PADRAO = 'admin';
const SENHA_PADRAO = 'etefmc123';

// ------------------------------------------------------------
// ROTA 1 - GET /
// Responde a página inicial (frontend gerado com IA)
// ------------------------------------------------------------
app.get('/', (req, res) => {
    // res.sendFile envia um arquivo como resposta
    res.sendFile(__dirname + '/public/index.html');
});

// ------------------------------------------------------------
// ROTA 2 - GET /livros
// Lista os livros. Aceita filtro via query URL:
// exemplo: /livros?genero=resistor
// ------------------------------------------------------------
app.get('/livros', (req, res) => {
    // req.query guarda os parâmetros da query URL
    const genero = req.query.genero;

    // Se não veio filtro, responde a lista completa
    if (!genero) {
        return res.status(200).json(livros);
    }

    // Se veio filtro, monta um novo vetor só com o genero pedido
    const filtrados = [];
    for (let i = 0; i < livros.length; i++) {
        if (livros[i].genero === genero) {
            filtrados.push(livros[i]);
        }
    }

    res.status(200).json(filtrados);
});

// ------------------------------------------------------------
// ROTA 3 - POST /login
// Recebe usuario e senha no corpo JSON (nunca na URL!)
// Responde 200 se estiver correto, 401 se não estiver.
// ------------------------------------------------------------
app.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === USUARIO_PADRAO && senha === SENHA_PADRAO) {
        res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
    } else {
        res.status(401).json({ erro: 'Usuário ou senha incorretos.' });
    }
});

// ------------------------------------------------------------
// ROTA 4 - POST /emprestimo
// Registra a emprestimo de um livro do almoxarifado.
// Corpo JSON esperado: { "id": 3, "disponibilidade": true, "aluno": "Ana" }
// Valida os dados e responde com o status HTTP adequado.
// ------------------------------------------------------------
app.post('/emprestimo', (req, res) => {
    const id = req.body.id;
    const disponibilidade = req.body.disponibilidade;
    const aluno = req.body.aluno;

    // Validação 1: todos os campos precisam existir -> 400
    if (!id || !disponibilidade || !aluno) {
        return res.status(400).json({ erro: 'Envie id, disponibilidade e aluno.' });
    }

    // Validação 2: o livro precisa existir -> 404
    let livro = null;
    for (let i = 0; i < livros.length; i++) {
        if (livros[i].id === id) {
            livro = livros[i];
        }
    }
    if (livro === null) {
        return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    // Validação 3: precisa estar disponivel
    if (disponibilidade != true) {
        return res.status(400).json({
            erro: 'Livro já emprestado'
        });
    }

    // Tudo certo: atualiza a existencia no vetor e responde 201
    livro.disponibilidade = false;
    res.status(201).json({
        mensagem: 'Emprestimo do livro ' + livro.nome + ' registrado para ' + aluno,
        livro: livro.nome,
    });
});

app.post('/devolucao', (req, res) => {
    const id = req.body.id;
    const disponibilidade = req.body.disponibilidade;
    const aluno = req.body.aluno;

    // Validação 1: todos os campos precisam existir -> 400
    if (!id || !disponibilidade || !aluno) {
        return res.status(400).json({ erro: 'Envie id, disponibilidade e aluno.' });
    }

    // Validação 2: o livro precisa existir -> 404
    let livro = null;
    for (let i = 0; i < livros.length; i++) {
        if (livros[i].id === id) {
            livro = livros[i];
        }
    }
    if (livro === null) {
        return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    // Validação 3: precisa estar emprestado
    if (disponibilidade != false) {
        return res.status(400).json({
            erro: 'Livro ainda não emprestado'
        });
    }

    // Tudo certo: atualiza a existencia no vetor e responde 201
    livro.disponibilidade = true;
    res.status(201).json({
        mensagem: 'Devolução do livro ' + livro.nome + ' feita por ' + aluno,
        livro: livro.nome,
    });
});

// ------------------------------------------------------------
// Inicia o servidor na porta 3001
// ------------------------------------------------------------
app.listen(3001, () => {
    console.log('Biblioteca rodando em http://localhost:3000');
});