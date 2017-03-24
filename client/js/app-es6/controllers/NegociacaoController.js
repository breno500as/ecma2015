import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacaoView} from '../views/NegociacaoView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacao';

 class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacaoView($('#negociacoesView')), 'adiciona', 'esvazia');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        this._service =  new NegociacaoService();
        this._init();
    }

    

    _init() {

        setInterval(() => { this.importaNegociacoes(); }, 3000);

        this._service.lista()
            .then(negociacoes => negociacoes
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)));

    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;   
            }).catch(erro => this._mensagem.texto = erro);
    }

    apagar() {

        this._service
            .apagar()
            .then(sucesso => {
                this._mensagem.texto = sucesso;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mesagem.texto = 'Erro');


    }

    importaNegociacoes() {

        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao() {
        return new Negociacao(DateHelper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
    }

    _limparCampos() {
        this._inputData.value = '';
        this._inputQuantidade.value = '';
        this._inputValor.value = '';
        this._inputData.focus();
    }

}

let negociacaoController = new NegociacaoController();

export function currentInstance() {

    return negociacaoController;

}