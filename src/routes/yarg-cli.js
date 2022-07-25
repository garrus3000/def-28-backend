import yargs from 'yargs';

const yargArgs = yargs(process.argv.slice(2)).default({
    puerto: 8080,
    debug: false,
    modo: 'desarrollo'
}).alias({
    p: "puerto",
    d: "debug",
    m: "modo"
}).argv;

const parseado = {
    port: yargArgs.puerto,
    debug: yargArgs.debug,
    modo: yargArgs.modo,
    otros: yargArgs._,
};

// console.log(yargArgs, "\n");
console.log(parseado);

export default yargArgs;