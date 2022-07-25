import { Router } from "express";

const routerRandomNums = Router();

routerRandomNums.get("/", (req, res) => {
    const cantidad = req.query.cantidad || 10;
    const numeros = [];
    for (let i = 0; i < cantidad; i++) {
        numeros.push(Math.floor(Math.random() * 100));
    }
    res.json(numeros);
});

export default routerRandomNums;