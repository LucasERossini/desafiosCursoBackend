const randoms = (cant) => {
    if (!cant) {
        cant = 100000000;
    };
    const numeros = [];
    for (let index = 0; index < cant; index++) {
        numeros[index] = parseInt(Math.random()*1000);
    };
    const cantidades = {};
    for (let index = 0; index < 1000; index++) {
        const num = numeros.filter(i => i == index + 1).length;
        if (num !== 0) {
            cantidades[index+1] = num;
        };
    };
    return cantidades;
};