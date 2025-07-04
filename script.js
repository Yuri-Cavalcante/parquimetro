const pegaEL = (id) => document.getElementById(id);

class processaDados{
    #valor;
    #tempo;
    #troco;
    #permiteTroco;
    #validaOpcao;
    constructor(){
        this.#valor = null;
        this.#tempo = 0;
        this.#troco = 0;
        this.#permiteTroco = false;
    }

    insere(val){
        this.#valor = val;
    }

    crono(){
        switch(true){
            case this.#valor >= 1 && this.#valor <= 1.74:
                if(this.#tempo <= 90){
                    this.#tempo += 30;
                    this.#permiteTroco = true;
                }
                break;
            case this.#valor >= 1.75 && this.#valor <= 2.99:
                if(this.#tempo <= 60){  
                    this.#tempo += 60;
                    this.#permiteTroco = true;
                } else {
                    pegaEL('info').textContent = 'Esse valor vai exceder o tempo máximo, escolha um valor menor.';
                    this.#permiteTroco = false;
                }
                break;
            case this.#valor >= 3:
                if(this.#tempo == 0){
                    this.#tempo += 120;
                    this.#permiteTroco = true;
                } else {
                    pegaEL('info').textContent = 'Esse valor vai exceder o tempo máximo, escolha um valor menor.';
                    this.#permiteTroco = false;
                }
                break;
            case this.#valor <= 0 || isNaN(this.#valor) :
                pegaEL('info').textContent = 'Valor insuficiente';
                break;
        }
    }

    fazTroco(){
        switch(true){
            case this.#valor >= 1 && this.#valor <= 1.74 && this.#permiteTroco == true:
                this.#troco += this.#valor - 1;
                break;
            case this.#valor >= 1.75 && this.#valor <= 2.99 && this.#permiteTroco == true:
                this.#troco += this.#valor - 1.75;
                break;
            case this.#valor >= 3 && this.#permiteTroco == true:
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

    get permiteTroco(){
        return this.#permiteTroco;
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

    resgate() {
        let troco = this.usu.troco;
        let intervalo = 1000;

        function atualizarTroco() {
            if (troco >= 1) {
                troco -= 1;
            } else if (troco < 1 && troco > 0) {
                troco -= 0.01;
            }
            pegaEL('troco').textContent = `Troco: R$ ${troco.toFixed(2)}`;

            if (troco > 0) {
                intervalo = Math.max(100, intervalo - 100); // diminui até 100ms mínimo
                setTimeout(atualizarTroco, intervalo);
                console.log(intervalo);
            }
            return troco;
        }
        
        atualizarTroco();

        const liberador = setInterval(() => {
            this.animacaoRes()

            if(troco <= 0){
                clearInterval(liberador);
                console.log("Intervalo encerrado!");
            }
        }, 250);
 
        const btn = pegaEL('resgatar');
        btn.onclick = null;
    }

    // ANIMACAO RESGATE

    animacaoRes() {
        
   
        // const containerMoeda = document.createElement('container')
        // containerMoeda.className = 'containerMoeda';
        // containerMoeda.appendChild(novaMoeda);

        if(this.usu.troco > 0){
            const novaMoeda = document.createElement('img');
            novaMoeda.src = 'imgs/1real.png';
            novaMoeda.className = 'animaMoeda';
            novaMoeda.style.left = `${Math.random() * (1001 - 1) + 1}px`;
            
            document.body.appendChild(novaMoeda);
            console.log('moeda criada');

            setTimeout(() => {
                novaMoeda.remove();
            }, 3000);
        }

        // document.body.appendChild(novaMoeda);
        // console.log('moeda criada');

        // setTimeout(() => {
        //     novaMoeda.remove();
        // }, 3000);
    }

}

const user1 = new processaDados();
const interfaceUser = new usuario(user1);
