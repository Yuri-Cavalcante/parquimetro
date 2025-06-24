class processaDados{
    #valor;
    #tempo;
    #troco;
    constructor(){
        this.#valor = 0;
        this.#tempo = 0;
        this.#troco = 0;
    }

    insere(val){
        this.#valor = val;
    }

    crono(){
        switch(true){
            case this.#valor >= 1 && this.#valor <= 1.74:
                this.#tempo = 30;
                break;
            case this.#valor >= 1.75 && this.#valor <= 2.99:
                this.#tempo = 60;
                break;
            case this.#valor >= 3:
                this.#tempo = 120;
                break;
            case this.#valor < 1 || isNaN(this.#valor):
                alert('Valor insuficiente');
        }
    }

    fazTroco(){
        switch(true){
            case this.#valor >= 1 && this.#valor <= 1.74:
                this.#troco = this.#valor - 1;
                break;
            case this.#valor >= 1.75 && this.#valor <= 2.99:
                this.#troco = this.#valor - 1.75;
                break;
            case this.#valor >= 3:
                this.#troco = this.#valor - 3;
                break;
        }   
    }

    get tempo(){
        return this.#tempo;
    }

    get troco(){
        return this.#troco;
    }
}

class usuario{
    constructor(usu){
        this.usu = usu;
    }

    calcTempoTroco(){
        const valorEnt = parseFloat(document.getElementById('valorEntrada').value);
        this.usu.insere(valorEnt);
        this.usu.crono();
        this.usu.fazTroco();
        this.attInterface(this.usu.tempo, this.usu.troco.toFixed(2));
    }

    attInterface(tempo, troco){
        document.getElementById('tempoRestante').textContent = `Tempo: ${tempo} min.`;
        document.getElementById('troco').textContent = `Troco: R$ ${troco}`; 
        document.getElementById('valorEntrada').value = '';
        console.log(this.usu.tempo, this.usu.troco);
    }
}

const user1 = new processaDados();
const interfaceUser = new usuario(user1);
