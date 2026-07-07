const express = require('express');
const app = express();

app.use(express.json());

var usuarioAutenticado = false;

const livros = [
    { id: 1, nome: 'Chainsaw Man - Vol. 2', genero: 'manga', disponibilidade: true, aluno: '-' },
    { id: 2, nome: 'Berserk - Vol. 1', genero: 'manga', disponibilidade: true, aluno: '-' },
    { id: 3, nome: 'Death Note - Black Edition Vol. 1', genero: 'manga', disponibilidade: true, aluno: '-' },
    { id: 4, nome: 'Vinland Saga - Vol. 1', genero: 'manga', disponibilidade: true, aluno: '-' },
    { id: 5, nome: 'Duna', genero: 'ficcao', disponibilidade: true, aluno: '-' },
    { id: 6, nome: 'Neuromancer', genero: 'ficcao', disponibilidade: true, aluno: '-' },
    { id: 7, nome: 'Fundação', genero: 'ficcao', disponibilidade: true, aluno: '-' },
    { id: 8, nome: 'Admirável Mundo Novo', genero: 'ficcao', disponibilidade: true, aluno: '-' },
    { id: 9, nome: '1984', genero: 'ficcao', disponibilidade: true, aluno: '-' },
    { id: 10, nome: 'O Festim dos Corvos', genero: 'fantasia', disponibilidade: true, aluno: '-' },
    { id: 11, nome: 'O Senhor dos Anéis: A Sociedade do Anel', genero: 'fantasia', disponibilidade: true, aluno: '-' },
    { id: 12, nome: 'O Nome do Vento', genero: 'fantasia', disponibilidade: true, aluno: '-' },
    { id: 13, nome: 'Mistborn: O Império Final', genero: 'fantasia', disponibilidade: true, aluno: '-' },
    { id: 14, nome: 'O Hobbit', genero: 'fantasia', disponibilidade: true, aluno: '-' },
    { id: 15, nome: 'UNIX: Uma Revolução Informática', genero: 'cientifico', disponibilidade: true, aluno: '-' },
    { id: 16, nome: 'Código Limpo', genero: 'cientifico', disponibilidade: true, aluno: '-' },
    { id: 17, nome: 'Entendendo Algoritmos', genero: 'cientifico', disponibilidade: true, aluno: '-' },
    { id: 18, nome: 'O Programador Pragmático', genero: 'cientifico', disponibilidade: true, aluno: '-' },
    { id: 19, nome: 'The C++ Programming Language', genero: 'cientifico', disponibilidade: true, aluno: '-' },
    { id: 20, nome: 'House of Leaves', genero: 'terror', disponibilidade: true, aluno: '-' },
    { id: 21, nome: 'O Iluminado', genero: 'terror', disponibilidade: true, aluno: '-' },
    { id: 22, nome: 'Drácula', genero: 'terror', disponibilidade: true, aluno: '-' },
    { id: 23, nome: 'Frankenstein', genero: 'terror', disponibilidade: true, aluno: '-' },
    { id: 24, nome: 'A Assombração da Casa da Colina', genero: 'terror', disponibilidade: true, aluno: '-' }
];

const usuarios = [
    { usuario: 'admin', senha: 'etefmc123' },
    { usuario: 'daniel.mosca', senha: '34ds' },
]

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/livros', (req, res) => {
    const genero = req.query.genero;
    const nome = req.query.nome;

    const filtrados = [];

    for (let i = 0; i < livros.length; i++) {

        const livro = livros[i];

        const correspondeGenero =
            !genero || livro.genero === genero;

        const correspondeNome =
            !nome || livro.nome.toLowerCase().includes(nome.toLowerCase());

        if (correspondeGenero && correspondeNome) {
            filtrados.push(livro);
        }
    }

    res.status(200).json(filtrados);
});

app.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    for (let i = 0; i < usuario.length; i++) {
        if (usuario === usuarios[i].usuario && senha === usuarios[i].senha) {
            res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
            usuarioAutenticado = true;
        }
    }
    if(!usuarioAutenticado) res.status(401).json({ erro: 'Usuário ou senha incorretos.' });
});

function buscarLivro(id) {
    for (let i = 0; i < livros.length; i++) {
        if (livros[i].id === id) {
            return livros[i];
        }
    }

    return null;
}

app.post('/emprestimo', (req, res) => {
    const id = req.body.id;
    const aluno = req.body.aluno;

    if (!usuarioAutenticado) return res.status(401).json({ erro: 'Usuário conectado não tem autorização para essa ação.' });

    if (!id || !aluno) {
        return res.status(400).json({ erro: 'Envie id e aluno.' });
    }

    const livro = buscarLivro(id);

    if (livro === null) {
        return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    if (!livro.disponibilidade) {
        return res.status(400).json({
            erro: 'Livro já emprestado'
        });
    }

    livro.disponibilidade = false;
    livro.aluno = aluno;
    res.status(201).json({
        mensagem: 'Emprestimo do livro ' + livro.nome + ' registrado para ' + aluno,
        livro: livro.nome,
    });
});

app.post('/devolucao', (req, res) => {
    const id = req.body.id;
    const aluno = req.body.aluno;

    if (!usuarioAutenticado) return res.status(401).json({ erro: 'Usuário conectado não tem autorização para essa ação.' });


    if (!id || !aluno) {
        return res.status(400).json({ erro: 'Envie id e aluno.' });
    }

    const livro = buscarLivro(id);

    if (livro === null) {
        return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    if (livro.disponibilidade) {
        return res.status(400).json({
            erro: 'Livro ainda não emprestado'
        });
    }

    if (livro.aluno != '-' && livro.aluno != aluno) {
        return res.status(400).json({
            erro: 'Livro emprestado por outro aluno'
        });
    }

    livro.disponibilidade = true;
    res.status(201).json({
        mensagem: 'Devolução do livro ' + livro.nome + ' feita por ' + aluno,
        livro: livro.nome,
    });
    livro.aluno = '-';
});

app.listen(3001, () => {
    console.log('Biblioteca rodando em http://localhost:3001');
});