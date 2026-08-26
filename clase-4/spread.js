/* Combinar 2 o más arrays */
const a = [1, 2];
const b = [3, 4];
const combinado = [...a, ...b];

console.log(combinado)

/* Clonar o copiar un array */
const original = [1, 2, 3];
const copia = [...original];
console.log(copia); // [1, 2, 3]

/* Combinar 2 o más objetos */
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinado2 = { ...obj1, ...obj2 };
console.log(combinado); // { a: 1, b: 2, c: 3, d: 4 }
/* Clonar o copiar un objeto */
const original2 = { a: 1, b: 2 };
const copia2 = { ...original2 };
console.log(copia2); // { a: 1, b: 2 }

