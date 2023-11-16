import { Router } from "express";
import { 
    createAnimal,
    deleteAnimal,
    getAllAnimals,
    getAnimalById,
    updateAnimal } from "../controllers/animais.controllers.js";


const rotasAnimais = Router();

rotasAnimais.get('/', getAllAnimals);

rotasAnimais.get('/:id', getAnimalById);

rotasAnimais.post('/', createAnimal);

rotasAnimais.put('/:id', updateAnimal);

rotasAnimais.delete('/:id', deleteAnimal);

export default rotasAnimais;

