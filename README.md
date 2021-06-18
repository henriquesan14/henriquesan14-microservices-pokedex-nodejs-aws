# Pokédex NodeJS Microservices and AWS
## Pokédex APIs para mostrar pokémons capturados por um treinador.

### Features

- [x] Autenticação via JWT
- [x] CRUD de treinador
- [x] CRUD de pokémons
- [x] Busca informações Pokémon na PokeAPI
- [x] Upload de imagens, relatório no AWS S3
- [x] Lambda Function para gerar relatório PDF


### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [SQLite](https://sqlite.org/index.html)
- [Express](https://expressjs.com/pt-br/)
- [Sequelize](http://sequelize.org/)
- [AWS](https://aws.amazon.com/pt/)
- [PDFKit](https://pdfkit.org/)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).
Também é preciso configurar as váriaveis de ambiente no arquivo conforme o exemplo no arquivo .env.example .

### 🎲 Rodando o Back End (servidor)

#### Rodando TrainerAPI

```bash
# Clone este repositório
$ git clone <https://github.com/henriquesan14/henriquesan14-microservices-pokedex-nodejs-aws>

# Acesse a pasta do projeto no terminal/cmd
$ cd microservices-pokedex-nodejs-aws

# Vá para a pasta trainer-api
$ cd trainer-api

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A API iniciará na porta:3333 - acesse <http://localhost:3333>
```

#### Rodando PokedexAPI

```bash
# Volte para raiz do projeto
$ cd ..

# Vá para a pasta pokedex-api
$ cd pokedex-api

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A API iniciará na porta:3334 - acesse <http://localhost:3334>
```


### Autor
---

<a href="https://www.linkedin.com/in/henrique-san/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/33522361?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Henrique Santos</b></sub></a> <a href="https://www.linkedin.com/in/henrique-san/">🚀</a>


Feito com ❤️ por Henrique Santos 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Henrique-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/henrique-san/)](https://www.linkedin.com/in/henrique-san/) 
