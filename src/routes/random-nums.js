import { Router } from "express";

const routerRandomNums = Router();

routerRandomNums.get("/", (req, res) => {
    const cant = req.query.cant || 100000000;
    const resultados = {};

    for (let i = 0; i < cant; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
        if (resultados[numeroAleatorio]) resultados[numeroAleatorio]++;
        else resultados[numeroAleatorio] = 1;
    }
    res.send(resultados);
});

export default routerRandomNums;