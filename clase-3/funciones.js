function suma (a, b) {
    return a + b;
}

const resta = function (a, b) {
    return a - b;
}

const multiplicacion = (a, b) => {
    return a * b;
}

console.log(suma(5, 3));
console.log(resta(5, 3));
console.log(multiplicacion(2, 3));
multiplicacion(10,10);

function calculadora (a, b, operacion) {
    return operacion(a, b);
}

console.log(calculadora(2, 3, suma));
console.log(calculadora(5, 3, resta));
console.log(calculadora(2, 3, multiplicacion));