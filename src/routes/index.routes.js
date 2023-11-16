import { Router } from "express";
import rotasAnimais from "./animais.routes.js";

const rotas = Router();

rotas.use("/animais", rotasAnimais)

rotas.get('/', (req, res) => {
    return res.status(200).send({ message: "Servidor OK!" });
});

export default rotas;