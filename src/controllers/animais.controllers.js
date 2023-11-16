import { Animal } from '../models/animais/Animais.js';
import { AnimaisLista } from '../models/animais/AnimaisLista.js';

const animaisLista = new AnimaisLista();

function verificarImg(url) {
    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return true;
    } else {
        return false;
    }
}

export const getAllAnimals = (req, res) => {
    const animal = animaisLista.getAllAnimals();
    const { tipo } = req.query

    console.log(tipo);

    if(tipo) {
        const animalFiltrado = animal.filter((animal) => animal.tipo === tipo);
        if (animalFiltrado.length > 0) {
            return res.status(200).send({ message: `Animais encontrados com sucesso! O número de animais cadastrador é ${animaisLista.contador()}`, animalFiltrado });
        } else {
            return res.status(404).send({ message: "Animail não encontrados!", status: "Not Fould" });
        }
    }

    if (!animal) {
        return res.status(404).send({ message: "Animail não encontrados!", status: "Not Fould" });
    }
    return res.status(200).send({ message: `Animais encontrados com sucesso! O número de animais cadastrador é ${animaisLista.contador()}`, animal });
}

export const getAnimalById = (req, res) => {
    const { id } = req.params;

    const animal = animaisLista.getAnimalById(id);

    if (!animal) {
        return res.status(404).send({ message: `Animal com id ${id} não encontrado!`, status: "Not Fould" });
    }
    return res.status(200).send({ message: `Animal com id ${id} encontrado com sucesso!`, data: animal, status: "Ok" });
}

export const createAnimal = (req, res) => {
    const { nome, idade, tipo, cor, statusVacinais, imagem } = req.body;
    const animal = new Animal(nome, idade, tipo, cor, imagem, statusVacinais) ;
    let erro = "Dados invalidos:"
    let contador = 0;

    if (nome.length < 3 || nome.length > 50) {
        erro += " Nome deve conter no mínimo 3 e no máximo 50 caracteres!";
        contador++;
    }

    if (idade === "" || typeof(idade) !== 'number' || idade < 0 || Number.isInteger(idade) === false ) {
            erro += " A idade está errada!";
            contador++;
    }

    if (tipo.length > 30 || tipo == "") {
        erro += " O tipo deve conter no máximo 30 caracteres!";
        contador++;
    }


    if (cor.length > 20 || cor == "") {
        erro += " A cor deve conter no máximo 20 caracteres!";
        contador++;
    }

    if (!verificarImg(imagem)) {
        erro += " A imagem deve ser um link válido!";
        contador++;
    }

    if (typeof statusVacinais !== "boolean") {
        erro += " O status vacinal deve ser true ou false!";
        contador++;
    }

    if (contador == 0) {
        animaisLista.addAnimal(animal);
        res.status(201).send(animal)
    } else {
        res.status(400).send({ message: erro, status: "Bad Request", contador});
    }
}

export const updateAnimal = (req, res) => {
    const { id } = req.params
    const { nome, idade, tipo, cor, statusVacinais, imagem } = req.body;

    const animal = animaisLista.getAnimalById(id);

    if (!animal) {
        return res.status(404).send({ message: `Animal com id ${id} não encontrado!`, status: "Not Fould" });
    }
    animaisLista.updateAnimal(id, nome, idade, tipo, cor, statusVacinais, imagem);

    return res.send(animal)
}

export const deleteAnimal = (req, res) => {
    const { id } = req.params
    const animal = animaisLista.getAnimalById(id);

    if (!animal) res.status(404).send({ message: `Animal com id ${id} não encontrado!`, status: "Not Fould" });

    animaisLista.deleteAnimal(id);

    return res.send(animal)
}