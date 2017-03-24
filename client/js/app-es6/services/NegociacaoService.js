//Caso seja necessário realizar a chamada em mais de um controller

import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDAO} from '../dao/NegociacaoDAO';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService {


    ////Error-First-Callback pattern - erro vem como primeiro argumento do método , o resultado da função vem em segundo parametro.

    /* 
    chamada - nesse js não precisa mais de ter um returno , a callback function já retorna nesse caso erro e um array de negociações
       service.obterNegociacoesDaSemana((erro, negociacoes) => { }
      obterNegociacoesDaSemana(cb) {
            
         //requisições assincronas
         let xhr = new XMLHttpRequest();
         xhr.open('GET', 'negociacoes/semana');
         xhr.onreadystatechange = () => {
             if (xhr.readyState == 4) {
                 if (xhr.status == 200) {
                     console.log('ok');
                     cb(null, JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                 } else {
                     console.log('Não foi possível obter as negociações do servidor.')
                     console.log(xhr.responseText);
                     cb('Não foi possível obter as negociações da semana', null);
                 }
             }
         }
 
         xhr.send();
 
      } */

    constructor() {
        this.http = new HttpService();
    }



    _obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {
            this.http.getFetch('negociacoes/semana').then(negociacoes => {
                resolve(negociacoes);
            }).catch(erro => {
                console.log(erro);
                reject(`Não foi possível carreagar as negociações da semana anterior ${erro}`);

            });
        });
    }



    _obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {
            this.http.getFetch('negociacoes/anterior').then(negociacoes => {
                resolve(negociacoes);
            }).catch(erro => {
                console.log(erro);
                reject(`Não foi possível carreagar as negociações da semana anterior ${erro}`);
            });

        });
    }

    _obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            this.http.getFetch('negociacoes/retrasada').then(negociacoes => {
                resolve(negociacoes);
            }).catch(erro => {
                console.log(erro);
                reject(`Não foi possível carreagar as negociações da semana anterior ${erro}`);
            });
        });
    }

    obterNegociacoes() {

        return Promise.all([
            this._obterNegociacoesDaSemana(),
            this._obterNegociacoesDaSemanaAnterior(),
            this._obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            // reduz o array de 3 promises = [Array(3), Array(3), Array(3)] - é um único
            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }

    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoes =>
                //retorna um array apenas com os elementos atendidos pelo critétrio da função (quando a função retorna true)
                negociacoes.filter(negociacao =>
                    //retorna true quando o elemento atende o critétrio da função de verificação
                    !listaAtual.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            ).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível buscar negociações para importar');
            })
    }

    cadastra(negociacao) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection).adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a kkkk')
            });
    }


    lista() {

      return ConnectionFactory
          .getConnection()
          .then(connection => new NegociacaoDAO(connection))
          .then(dao => dao.listaTodos())   //forma mais elegante de se criar a promise
          .catch(erro => {
              console.log(erro);
              throw new Error('Não foi possível obter as negociações')
            })

    }

    apagar() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos() )   //forma mais elegante de se criar a promise
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações')
            });

    }



}