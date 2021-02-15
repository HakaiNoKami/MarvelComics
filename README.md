# Marvel Comics
SPA para uma consulta de quadrinhos utilizando a [API](https://developer.marvel.com) da Marvel para todos os consumos de dados.

<br/>

### Tecnologias:
Para implementação do front end foram utilizadas o [ReactJs](https://reactjs.org/) como base, o [Sass](https://create-react-app.dev/docs/adding-a-sass-stylesheet/) para estilização, o [Material-Ui](material-ui.com) para aplicação de componentes do Material Design, o [Axios](https://github.com/axios/axios) para chamadas em APIs, o [React Testing Library](https://testing-library.com/) para criação de teste unitários e o [Redux](https://redux.js.org/) para gestão de estados dentro da aplicação.


Para implementação do back end foram utilizadas o [NodeJs](https://nodejs.org/en/) para criação do servidor e o [Send Grid](https://sendgrid.com/) para criação do serviço de envio de e-mail.

Observação: A aplicação de back end está no repositório [MarvelComicsApi](https://github.com/HakaiNoKami/MarvelComicsApi) e rodando no [Heroku](heroku.com).


Para visualizar a aplicação, acesse a [Demo](https://hakainokami.github.io/MarvelComics/) aqui.

<br/>

### Arquitetura:
A arquitetura escolhida foi o Flux que utiliza um fluxo unidirecional.

O usuário interage com a View, que por sua vez chama as Actions, que repassam os dados e ações para a Store por meio do Dispatch. Dentro da Store reside os Reduces, o único local, de acordo com a arquitetura, que é permitido alterar os dados e a State que é um conjunto de todas as states na aplicação do redux.

O Midlleware que é responsável por acesso a entidades externas como APIs está localizado entre os Dispatchs e a Store, e normalmente é chamado de Fetch Actions. Abaixo se encontra uma imagem explicativa da mesma.

![Arquitetura Flux](https://blog-geek-midia.s3.amazonaws.com/wp-content/uploads/2019/12/17160141/estados-flux.png)

<br/>

### Execução:
Para executar o projeto basta utilizar o comando **Yarn start** ou **Npm start**.

Para executar os testes basta utilizar o comando **Yarn test** ou **Npm test**.

<br/>

### Autor

<img src="https://avatars.githubusercontent.com/u/36862294?s=460&u=d68133ed1c9d1def1813d977b7e0831dd464d020&v=4" alt="Marcus Vinícus" width="100px" />
<b>Marcus Vinícius</b>

<br/>
<br/>

### License

[Licença MIT](https://raw.githubusercontent.com/HakaiNoKami/MarvelComics/main/LICENSE)
