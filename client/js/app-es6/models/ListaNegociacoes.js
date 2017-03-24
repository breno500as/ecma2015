export class ListaNegociacoes {

  constructor() {
    this._negociacoes = [];
  }

 // constructor(armadilha) {
 //   this._negociacoes = [];
 //  this.armadilha = armadilha;
 // this.update = null; 
 // }

//Funcionara corretamente em uma arrow se chamado com arrow function
//  this_listaNegociacoes = new ListaNegociacoes((model) => {
//    meuContextoView.updateMinhaView(model);
//} );
// executara a função acima com o this da chamada original
//  this._armadilha(this);

  get negociacoes() {
    return [].concat(this._negociacoes);
  }

  /**
   * Inclui uma negociação na lista
   * @param  {} negociacao
   */
  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
  }

  
  /**
   */
  esvazia() {
    this._negociacoes = [];
  }

}