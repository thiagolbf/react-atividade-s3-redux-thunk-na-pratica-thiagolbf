# 📋 Sobre a atividade

O objetivo dessa atividade é criar o nosso primeiro redux com o middleware, redux thunk.

A ideia é termos um user, e adicionar comentários para ele através do redux thunk, o importante é entendermos a estrutura e funcionamento do thunk em um exemplo básico.

# ℹ️ Informações úteis

## Resultado final

![](https://media3.giphy.com/media/Ge4XO6A2BJJ8QPPGsE/giphy.gif?cid=790b761196ac6d08933063f0c2ed5bb5f8ff9b694f958f6c&rid=giphy.gif&ct=g)

## Mão na massa!

1.  Com um projeto novo criado, vamos instalar as nossas dependências:

        yarn add redux react-redux redux-thunk

2.  Hora de estruturar as pastas do projeto:

    ![](https://i.ibb.co/1X3qPKK/Captura-de-tela-de-2021-07-25-18-42-36.png)

    Observe que agora temos um arquivo `thunks.js` dentro `modules/user`.

3.  Agora vamos configurar cada um dos arquivos criados para o redux thunk funcionar. Começando pelo `reducer.js`.

        import { ADD_COMMENT } from "./actionTypes";

        const initialState = { name: "Kenzie", comments: [] };

        const userReducer = (state = initialState, action) => {
          switch (action.type) {
            case ADD_COMMENT:
        	// Lembre de fluxo da aula anterior, essa action chega aqui depois de passar pelo thunks
              return action.updatedUser;
            default:
              return state;
          }
        };

        export default userReducer;

4.  Vamos arrumar o `actionTypes.js` que já foi importado no reducer. É muito simples.

        export const ADD_COMMENT = "ADD_COMMENT";

5.  Passando para a configuração do `action.js`.

        import { ADD_COMMENT } from "./actionTypes";

        export const addComment = (updatedUser) => ({
          type: ADD_COMMENT,
          updatedUser,
        });

6.  Com os arquivos que conhecemos configurados, veja como fica o `thunks.js`.

        import { addComment } from "./actions";

        // o comment é o que recebemos de fora, no caso será o comentário
        export const addCommentThunk = (comment) => {

        	// No thunk retornamos uma função anonima
          return (dispatch, getState) => {

        	// aqui estamos pegando o state user 
            const { user } = getState();

        	// aqui adicionamos o comentário que entrou como parâmetro lá em cima
            const updatedUser = { ...user, comments: [...user.comments, comment] };

        	// nessa linha damos o dispatch na nossa action, com a alteração feita
            dispatch(addComment(updatedUser));
          };
        };

    *   Lembre-se que o thunk é uma camada a mais no processo. Então o dado está sendo processado e entrará no reducer após essa mudança.
    *   Perceba que o thunk possui o seu próprio dispatch.
    *   o getState é uma função que possibilita acessar os states declarados na store.
7.  O index.js da store também precisa sofrer algumas alterações:

        // adicionamos o applyMiddleweare do próprio redux
        import { createStore, combineReducers, applyMiddleware } from "redux";

        // também adicionamos o thunk 
        import thunk from "redux-thunk";

        import userReducer from "./modules/user/reducer";

        const reducers = combineReducers({ user: userReducer });

        // além do reducers, colocamos o applyMiddleware passando o thunk
        const store = createStore(reducers, applyMiddleware(thunk));

        export default store;

8.  Por fim precisamos entender como vamos disparar essa ação na aplicação para adicionar um comentário. Vamos simular um botão que adiciona um comentário.

        // 1 - importe o useDispatch 
        import { useDispatch } from "react-redux";

        // 2 - importe o seu thunk
        import { addCommentThunk } from "./store/modules/user/thunks";

        // 3 - dentro do seu componente faça o dispatch do thunk, passando o comentário
        <button onClick={() => dispatch(addCommentThunk("Primeiro comentário!"))}>
        new comment
        </button>

    *   Repare, que disparamos a informação para o thunk, lá vamos processar ela, e depois enviaremos para o reducer, fechando o ciclo.
9.  Não esqueça de no `index.js` de `src`, a configuração do `Provider` e `store`.

Aqui terminamos a primeira configuração de redux com thunk. Para complementar:

*   Crie um **input** para pegar o valor digitado.
*   Com o **botão** envie os comentários capturados no input.
*   Renderize na tela o **user** com os **comentários**

# 💡Conhecimentos aplicados:

*   Redux Thunk
