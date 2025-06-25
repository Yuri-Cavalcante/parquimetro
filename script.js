const pegaEL = (id) => document.getElementById(id);

class processaDados{
    #valor;
    #tempo;
    #troco;
    constructor(){
        this.#valor = null;
        this.#tempo = 0;
        this.#troco = 0;
    }

    insere(val){
        this.#valor = val;
    }

    crono(){
        switch(true){
            case this.#valor >= 1 && this.#valor <= 1.74 && this.#tempo <= 90:
                this.#tempo += 30;
                break;
            case this.#valor >= 1.75 && this.#valor <= 2.99 && this.#tempo <= 60:
                this.#tempo += 60;
                break;
            case this.#valor >= 3 && this.#tempo == 0:
                this.#tempo += 120;
                break;
            case this.#valor <= 0 || isNaN(this.#valor) < this.#tempo < 120:
                pegaEL('info').textContent = 'Valor insuficiente ou invalido';
                break;
        }
    }

    fazTroco(){
        switch(true){
            case this.#valor >= 1 && this.#valor <= 1.74 && this.#tempo <= 120:
                this.#troco += this.#valor - 1;
                break;
            case this.#valor >= 1.75 && this.#valor <= 2.99 && this.#tempo <= 120:
                this.#troco += this.#valor - 1.75;
                break;
            case this.#valor >= 3 && this.#tempo <= 120:
                this.#troco += this.#valor - 3;
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
        const valorEnt = parseFloat(pegaEL('valorEntrada').value);
        this.usu.insere(valorEnt);
        this.usu.crono();
        this.usu.fazTroco();
        this.attInterface(this.usu.tempo, this.usu.troco.toFixed(2));
    }

    attInterface(tempo, troco){
        if(this.usu.tempo == 120){
            pegaEL('info').textContent = 'Você atingiu o limite de tempo, por favor aguarde.';
        }

        if(this.usu.tempo == 120){
            let btn = pegaEL('calcular')
            btn.onclick = null;
        }

        
        pegaEL('tempo').textContent = `Tempo: ${tempo} min.`;
        pegaEL('troco').textContent = `Troco: R$ ${troco}`; 
        pegaEL('valorEntrada').value = '';
        console.log(this.usu.tempo, this.usu.troco);
    }

    res(){
        pegaEL('troco').textContent = 'Troco: R$ 0,00';
    }
}

const user1 = new processaDados();
const interfaceUser = new usuario(user1);
