# Biblioteca Online - ETEFMC

Sistema web para gerenciamento de catálogo e empréstimos de livros da biblioteca da ETEFMC.

A aplicação permite visualizar livros disponíveis, pesquisar por título e gênero, registrar empréstimos e devoluções, adicionar novos livros e remover livros existentes. O sistema possui autenticação básica para restringir operações administrativas.

## Funcionalidades

### Catálogo

- Visualização dos livros cadastrados.
- Pesquisa por nome do livro.
- Filtro por gênero.
- Ordenação automática:
  - Livros disponíveis aparecem primeiro.
  - Livros são organizados em ordem alfabética.

### Gerenciamento de empréstimos

- Registro de empréstimos de livros.
- Registro de devoluções.
- Associação do livro com o aluno responsável.
- Bloqueio de empréstimo de livros já emprestados.
- Bloqueio de devolução feita por aluno diferente do responsável pelo empréstimo.

### Administração

- Login de usuário.
- Cadastro de novos livros.
- Exclusão de livros.
- Validação de permissões para operações administrativas.

### Interface

- Design responsivo.
- Tema claro e escuro.
- Persistência da escolha de tema utilizando `localStorage`.
- Sistema de notificações utilizando mensagens temporárias.
- Tabela de livros com rolagem independente.

---

# Tecnologias utilizadas

## Front-end

- HTML5
- CSS3
- JavaScript
- Fetch API

## Back-end

- Node.js
- Express.js

## Armazenamento

Atualmente os dados são mantidos em memória utilizando estruturas JavaScript.

Os livros são armazenados em um vetor de objetos:

```javascript
{
    id: 1,
    nome: "Chainsaw Man - Vol. 2",
    genero: "manga",
    disponibilidade: true,
    aluno: "-"
}
````

---

# Estrutura do projeto

```
Biblioteca-Online/
│
├── public/
│   └── index.html
│
├── server.js
│
├── API.md
│
└── README.md
```

---

# Instalação

## Pré-requisitos

É necessário possuir:

* Node.js instalado.
* NPM instalado.

Verifique as versões:

```bash
node -v
npm -v
```

---

## Instalar dependências

Dentro da pasta do projeto:

```bash
npm install express
```

---

# Executando o projeto

Inicie o servidor:

```bash
node server.js
```

O sistema estará disponível em:

```
http://localhost:3001
```

---

# Usuários cadastrados

O sistema possui autenticação simples utilizando usuários armazenados no código.

Usuários disponíveis:

| Usuário      | Senha     |
| ------------ | --------- |
| admin        | etefmc123 |
| daniel.mosca | 34ds      |

---

# API

A documentação completa da API está disponível em:

```
API.md
```

## Endpoints principais

| Método | Endpoint      | Descrição                |
| ------ | ------------- | ------------------------ |
| GET    | `/`           | Retorna a aplicação web  |
| GET    | `/livros`     | Lista livros cadastrados |
| POST   | `/login`      | Realiza autenticação     |
| POST   | `/livros`     | Adiciona um livro        |
| DELETE | `/livros/:id` | Remove um livro          |
| POST   | `/emprestimo` | Registra empréstimo      |
| POST   | `/devolucao`  | Registra devolução       |

---

# Exemplos de uso

## Buscar livros de fantasia

```
GET /livros?genero=fantasia
```

## Pesquisar livro pelo nome

```
GET /livros?nome=vento
```

## Adicionar livro

```
POST /livros
```

Body:

```json
{
    "nome": "As Crônicas de Nárnia",
    "genero": "fantasia"
}
```

## Registrar empréstimo

```
POST /emprestimo
```

Body:

```json
{
    "id": 5,
    "aluno": "João"
}
```

---

# Regras de negócio

* Apenas usuários autenticados podem modificar o catálogo ou registrar empréstimos.
* Livros emprestados não podem ser excluídos.
* Um livro disponível não pode ser devolvido.
* Um livro só pode ser devolvido pelo aluno registrado no empréstimo.
* IDs de livros nunca são reutilizados após exclusão.
* Livros adicionados recebem o maior ID existente + 1.

---

# Decisões de projeto

## Uso de vetor em memória

Os dados foram mantidos em arrays JavaScript para simplificar a implementação inicial da aplicação.

Em uma versão futura, o armazenamento pode ser migrado para um banco de dados como:

* PostgreSQL
* MySQL
* MongoDB

## Uso de JSON

As requisições que alteram dados utilizam JSON no corpo da requisição, enquanto filtros públicos utilizam parâmetros de URL.

Exemplo:

Filtros:

```
GET /livros?genero=fantasia
```

Dados de criação:

```json
{
    "nome": "Duna",
    "genero": "ficcao"
}
```

---

# Melhorias futuras

Possíveis melhorias para versões futuras:

* Utilização de banco de dados persistente.
* Sistema de sessão utilizando JWT.
* Criptografia de senhas.
* Cadastro de múltiplos usuários.
* Histórico de empréstimos.
* Controle de permissões por nível de usuário.
* Interface de administração separada.
* Upload de capas dos livros.

---

# Autores

Projeto desenvolvido para a ETEFMC.

**Trio:** Fred, Livia