# Contrato da API que eu roubei do Mosca e editei pq achei bonito no github ent vou fazer aqui msm

**Trio:** Fred, Brayan
**Tema:** Biblioteca

| Método | Endpoint      | Entrada                              | Resposta                            | Status      |
|--------|---------------|--------------------------------------|-------------------------------------|-------------|
| GET    | `/`           | —                                    | página HTML                         |  200        |
| GET    | `/livros`     | `genero` (query URL)                 | lista de livros em json por genero  |  200        |
| POST   | `/login`      | `usuario`, `senha` (body JSON)       | ok / erro                           |  200 / 401  |
| POST   | `/emprestimo` | `id_livro`, `nome` (body JSON)       | confirmação / erro                  |  201 / 400-4|
| POST   | `/devolucao`  | `id_livro`, `nome` (body JSON)       | confirmação                         |  201 / 400  |

## Decisões de projeto

- **`genero` vai na query URL** porque é um filtro público de busca — pode aparecer na barra do navegador (o "envelope").
- **`usuario` e `senha` vão no body JSON** porque são dados privados (a "carta").
- **`/emprestimo` responde 400** quando o livro já foi emprestado, **404** quando o livro não existe, **201** quando o livro é emprestado com sucesso.





