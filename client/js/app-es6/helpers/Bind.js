
//reduz a responsabilidade do desenvolvedor encapsulando a api de proxy internamente

import {ProxyFactory} from '../services/ProxyFactory';

export class Bind {

  
   //Data binding unidirecional - alterou o modelo updatou a view

    constructor(model,view, ...props) {
      
        //Função arrow torna o contexto this imutável independente de quem a chamar pega o primeiro escopo de onde ela foi declarada, 
        //o this de uma arrow function é léxico, enquanto o this de uma função padrão é dinâmico.
        let proxy = ProxyFactory.create(model, props, model => { view.update(model);} );

     
       //em javascript um construtor pode dar retorno
        return proxy;

    }

}