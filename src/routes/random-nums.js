import { Router } from "express";

const routerRandomNums = Router();

routerRandomNums.get("/", (req, res) => {
    const cant = req.query.cant || 100000000;
    const numeros = [];

    for (let i = 0; i < cant; i++) {
        numeros.push(Math.floor(Math.random() * 1000) + 1);
    }
    const numeroRepetidos = numeros.reduce((acc, val) => {
        if (acc[val]) acc[val]++;
        else acc[val] = 1;
        return acc;
    }, {});
    res.send(numeroRepetidos);
});

export default routerRandomNums;