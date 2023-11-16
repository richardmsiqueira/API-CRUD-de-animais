export class AnimaisLista {
    constructor() {
        this.animais = [];
    }

    contador() {
        return this.animais.length;
    }

    addAnimal(animal) {
        this.animais.push(animal);
    }

    getAllAnimals() {
        return this.animais;
    }

    getAnimalById(id) {
        return this.animais.find((animal) => animal.id === id);
    }

    deleteAnimal(id) {
        this.animais = this.animais.filter((animal) => animal.id !== id);
    }

    updateAnimal(id, nome, idade, tipo, cor, statusVacinais, imagem) {
        const animal = this.getAnimalById(id);

        if(!animal) {
            return null;
        }

            animal.nome = nome;
            animal.idade = idade;
            animal.tipo = tipo;
            animal.cor = cor;
            animal.statusVacinais = statusVacinais;
            animal.imagem = imagem;

            return animal;
        
    }

    createAnimal(animal) {
        this.animais.push(animal);
    }
}