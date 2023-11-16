import { Animal } from '../models/animais/Animais.js';
import { AnimaisLista } from '../models/animais/AnimaisLista.js';

const animaisLista = new AnimaisLista(); 

export const getAllAnimals = (req, res) => {
    const animal = animaisLista.getAllAnimals();

    if(!animal) {
        return res.status(404).send({ message: "Animail não encontrados!", status: "Not Fould" });
    }
    return res.status(200).send({ message: `Animais encontrados com sucesso! O número de animais cadastrador é ${animaisLista.contador()}` });
}

export const getAnimalById = (req, res) => {
    const { id } = req.params;

    const animal = animaisLista.getAnimalById(id);

    if(!animal) {
        return res.status(404).send({ message: `Animal com id ${id} não encontrado!`, status: "Not Fould" });
    }
    return res.status(200).send({ message: `Animal com id ${id} encontrado com sucesso!`, data: animal, status: "Ok" });
}

export const createAnimal = (req, res) => {
    const { nome, idade, tipo, cor, statusVacinais, imagem } = req.body;
    const animal = new Animal(nome, idade, tipo, cor, statusVacinais, imagem);

    if(nome.length < 3) {
        return res.status(400).send({ message: "O nome deve conter no mínimo 3 caracteres!", status: "Bad Request" });
    }

    if(nome.length > 50) {
        return res.status(400).send({ message: "O nome deve conter no máximo 50 caracteres!", status: "Bad Request" });
    }

    if(idade < 0) {
        return res.status(400).send({ message: "A idade deve ser maior que 0!", status: "Bad Request" });
    }

    if(idade % 1 !== 0) {
        return res.status(400).send({ message: "A idade deve ser um número inteiro!", status: "Bad Request" });
    }

    if(tipo.length > 30) {
        return res.status(400).send({ message: "O tipo deve conter no máximo 30 caracteres!", status: "Bad Request" });
    }


    if(cor.length > 20) {
        return res.status(400).send({ message: "A cor deve conter no máximo 20 caracteres!", status: "Bad Request" });
    }

        animaisLista.addAnimal(animal);

        return res.status(201).send(animal)
    
}

export const updateAnimal = (req, res) => {
    const { id } = req.params
    const { nome, idade, tipo, cor, statusVacinais, imagem } = req.body;

    const animal = animaisLista.getAnimalById(id);

    if(!animal) {
        return res.status(404).send({ message: `Animal com id ${id} não encontrado!`, status: "Not Fould" });
    }
    animaisLista.updateAnimal(id, nome, idade, tipo, cor, statusVacinais, imagem);

    return res.send(animal)
}

export const deleteAnimal = (req, res) => {
    const { id } = req.params
    const animal = animaisLista.getAnimalById(id);

    if(!animal) res.status(404).send({ message: `Animal com id ${id} não encontrado!`, status: "Not Fould" });

    animaisLista.deleteAnimal(id);

    return res.send(animal)
}

