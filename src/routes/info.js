import {Router} from 'express';

const routerInfo = Router();

routerInfo.get('/', (req, res) => {
    const infoProyecto = {
        // "Argumentos de entrada": process.argv,
        argumentos: process.argv,
        // "Nombre de la plataforma": process.platform,
        plataforma: process.platform,
        // "Versión de Node.js": process.version,
        versionNode: process.version,
        // "Memoria total de reservada": process.memoryUsage().rss,
        memoriaTotalReservada: process.memoryUsage().rss,
        // "Path de ejecución": process.execPath,
        pathEjecucion: process.execPath,
        // "Id del proyecto / Procces Id": process.pid,
        processId: process.pid,
        // "Directorio actual del trabajo": process.cwd(),
        directorioActualTrabajo: process.cwd(),
    };
    // res.send(infoProyecto);
    res.render('info', { infoProyecto });
});


export default routerInfo;