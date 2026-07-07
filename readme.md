# Contrato da API

**Trio:** Fred, Brayan  
**Tema:** Biblioteca Online para a ETEFMC

| Método | Endpoint | Entrada | Resposta | Status |
| ------ | -------- | ------- | -------- | ------ |
| GET | `/` | — | Página HTML da aplicação | 200 |
| GET | `/livros` | `genero` (query URL, opcional), `nome` (query URL, opcional) | Lista de livros em JSON filtrada | 200 |
| POST | `/login` | `usuario`, `senha` (body JSON) | Confirmação de login ou mensagem de erro | 200 / 401 |
| POST | `/livros` | `nome`, `genero` (body JSON) | Confirmação do cadastro e dados do livro criado | 201 / 400 / 401 |
| DELETE | `/livros/:id` | `id` (parâmetro da URL) | Confirmação da exclusão ou mensagem de erro | 200 / 400 / 401 / 404 |
| POST | `/emprestimo` | `id`, `aluno` (body JSON) | Confirmação do empréstimo ou mensagem de erro | 201 / 400 / 401 / 404 |
| POST | `/devolucao` | `id`, `aluno` (body JSON) | Confirmação da devolução ou mensagem de erro | 201 / 400 / 401 / 404 |

---

## Estrutura do objeto Livro

```json
{
    "id": 1,
    "nome": "Chainsaw Man - Vol. 2",
    "genero": "manga",
    "disponibilidade": true,
    "aluno": "-"
}
```

---

## Exemplos de requisição

### Listar todos os livros

```http
GET /livros
```

### Filtrar por gênero

```http
GET /livros?genero=fantasia
```

### Pesquisar por nome

```http
GET /livros?nome=vento
```

### Combinar filtros

```http
GET /livros?genero=fantasia&nome=vento
```

### Login

```http
POST /login
```

Body:

```json
{
    "usuario": "admin",
    "senha": "etefmc123"
}
```

### Cadastrar um livro

```http
POST /livros
```

Body:

```json
{
    "nome": "As Crônicas de Nárnia",
    "genero": "fantasia"
}
```

### Excluir um livro

```http
DELETE /livros/25
```

### Registrar um empréstimo

```http
POST /emprestimo
```

Body:

```json
{
    "id": 5,
    "aluno": "João"
}
```

### Registrar uma devolução

```http
POST /devolucao
```

Body:

```json
{
    "id": 5,
    "aluno": "João"
}
```

---

## Decisões de projeto

- **`genero` e `nome` são enviados pela query URL**, pois representam filtros públicos de pesquisa.
- **`usuario` e `senha` são enviados no body JSON**, por serem informações de autenticação.
- **`nome` e `genero` são enviados no body JSON** para cadastrar novos livros.
- **`id` é enviado como parâmetro da URL** na exclusão de livros, pois identifica diretamente o recurso que será removido.
- **`id` e `aluno` são enviados no body JSON** nas operações de empréstimo e devolução.
- Os livros são armazenados em memória utilizando um vetor de objetos JavaScript.
- O catálogo pode ser filtrado simultaneamente por gênero e por nome.
- Os livros são exibidos no frontend ordenados por disponibilidade e, em seguida, por ordem alfabética.
- Os identificadores (`id`) dos livros são incrementais e **não são reutilizados** quando um livro é removido.

---

## Códigos de resposta

### `GET /livros`

- **200** – Lista retornada com sucesso.

### `POST /login`

- **200** – Login realizado com sucesso.
- **401** – Usuário ou senha incorretos.

### `POST /livros`

- **201** – Livro cadastrado com sucesso.
- **400** – Nome ou gênero não informados.
- **401** – Usuário não autenticado.

### `DELETE /livros/:id`

- **200** – Livro removido com sucesso.
- **400** – Livro está emprestado e não pode ser removido.
- **401** – Usuário não autenticado.
- **404** – Livro não encontrado.

### `POST /emprestimo`

- **201** – Empréstimo registrado com sucesso.
- **400** – Dados inválidos ou livro já emprestado.
- **401** – Usuário não autenticado.
- **404** – Livro não encontrado.

### `POST /devolucao`

- **201** – Devolução registrada com sucesso.
- **400** – Dados inválidos, livro ainda não emprestado ou emprestado para outro aluno.
- **401** – Usuário não autenticado.
- **404** – Livro não encontrado.