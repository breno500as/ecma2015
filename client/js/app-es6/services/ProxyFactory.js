export class ProxyFactory {

    constructor() {
        throw new Error('You can not instanciate this class');
    }

    static create(objeto, props, acao) {

        return new Proxy(objeto, {

            get(target, prop, receiver) {

                if (props.includes(prop) && typeof (target[prop]) == typeof (Function)) {
                    return function () {

                        console.log(`a propriedade "${prop}" foi interceptada`);

                        //API de reflexão para executar  uma função / propriedade, bastante util quando se quer trabalhar com composição, Passaro / Aviao método voar()
                        Reflect.apply(target[prop], target, arguments); // Chama o método adicionar do modelo ListaNegociacoes
                        return acao(target); //Chama o metodo update no contexto do controller view do modelo ListaNegociacoes
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {

                if (props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }

                return Reflect.set(target, prop, value, receiver);

            }
        })
    }


}