# Rocketshoes (MOBILE)

Desafio 08 - REFATORAR o sistema MOBILE React Native de components de classes para components de função
utilizando os HOOKS.

## Conhecimentos consolidados

[useState] - permite gerenciar estados das variáveis em components do tipo função.
[useEffect] - permite gerenciar o ciclo de vida do component ex: componentDidMount()

- (Outros hooks mais usados)
  [useMemo] - usado em conjunto com uma dependência para memoriar um valor calculado por exemplo: "total de produtos"
  ou seja o mesmo só vai atualizar se as depências sofrerem alteração no seu valor.

  [useCallBack] - usado mais para funções que usa variáveis do state para não ficar recriando a função todas as vezes.

* (SIMPLIFICA A INTEGRAÇÃO COM REDUX)
  - [useSelector] - Simplificamos o acesso ao state do redux utilizando o hook.
  - [useDispatch] - simplificamos o acesso aos methodos usando as Actions.

[redux, react-redux]

- biblioteca que implementa a arquitetura Flux, permitindo cria uma font única de verdade.

[redux-saga]

- Middleware que podemos tratar, as requisições assíncronas como busca de dados em api externa.

[reactotron-react-native, reactotron-redux, reactotron-redux-saga]

- Habilita a integração com logs em modo de desenvolvimento permitindo um controle total do fluxo
  da arquitetura redux, saga.

[immer]

- Facilita a manipulação/modificações no state do reducer, deixando essa lógica mais simples de entender.

## Tela

![01](https://raw.githubusercontent.com/davidfaria/bootcamp-gostack-rocketshoes-MOBILE/master/img-demo/01.png)

![02](https://raw.githubusercontent.com/davidfaria/bootcamp-gostack-rocketshoes-MOBILE/master/img-demo/02.png)

![03](https://raw.githubusercontent.com/davidfaria/bootcamp-gostack-rocketshoes-MOBILE/master/img-demo/03.png)
