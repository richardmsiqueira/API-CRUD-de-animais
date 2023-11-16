import { v4 as uuidv4 } from 'uuid';

export class Animal {
    constructor(nome, idade, tipo, cor, url, statusVacinais,) {
        this.id = uuidv4();
        this.nome = nome;
        this.idade = idade;
        this.tipo = tipo;
        this.cor = cor;
        this.statusVacinais = this.statusVacinas(statusVacinais);
        this.url = url;
    }

    generationId() {
        this.id = uuidv4();
    }

    statusVacinas(statusVacinais) {
        if (statusVacinais === true) {
            return "Vacinado";
        } else {
            return "Não vacinado";
        }
    }


}
