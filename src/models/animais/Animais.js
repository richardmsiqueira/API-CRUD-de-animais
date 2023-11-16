import { v4 as uuidv4 } from 'uuid';

export class Animal {
    constructor(nome, idade, tipo, cor, statusVacinais, url) {
        this.id = uuidv4();
        this.nome = nome;
        this.idade = idade;
        this.tipo = tipo;
        this.cor = cor;
        this.statusVacinais = this.statusVacinas(statusVacinais);
        this.imagem = this.verificarImg(url);
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

    verificarImg(url) {
        if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            return "imagem validada";
        } else {
            return "imagem inválida";
        }
    }
}
