const numeros = [1, 2, 3];
const [primero, segundo, tercero, cuarto] = numeros;
console.log(primero); // 1
console.log(segundo); // 2
console.log(tercero); // 3
console.log(cuarto)

const persona = {
    nombre: "Ana",
    edad: 25,
};
const { nombre, apellido } = persona;
console.log(nombre); // Ana
console.log(apellido); // 25

const { nombre: nombrePersona } = persona;
console.log(nombrePersona); // Ana

/* Destructuring anidado, para cuando tenemos
objetos de más de 1 nivel de profundidad */
const usuario = {
    info: {
    nombre2: "Luis",
    edad: 30
    }
};
const { info: { nombre2, edad } } = usuario;
console.log(nombre); // Luis

