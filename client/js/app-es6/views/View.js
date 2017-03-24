export class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }

    template() {
        throw new Error('Executar método template das classes filhas');
    }

}