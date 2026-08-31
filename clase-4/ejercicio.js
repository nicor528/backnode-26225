/*
1) Creá un array con 10 objetos, donde cada objeto represente un automóvil con 
la siguiente información:
*/

const autos = [
    {
        marca: "VW",
        modelo: "Gol",
        year: 2008,
        color: "Blanco"
    },
    {
        marca: "VW",
        modelo: "Gol",
        year: 2024,
        color: "negro"
    },
    {
        marca: "VW",
        modelo: "Gol",
        year: 2010,
        color: "Rojo"
    },
    {
        marca: "Toyota",
        modelo: "Corolla",
        year: 2015,
        color: "Gris"
    },
    {
        marca: "Fiat",
        modelo: "Cronos",
        year: 2026,
        color: "Azul"
    },
    {
        marca: "VW",
        modelo: "Gol",
        year: 2023,
        color: "negro"
    },
    {
        marca: "VW",
        modelo: "Gol",
        year: 2003,
        color: "Rojo"
    },
    {
        marca: "Fiat",
        modelo: "Cronos",
        year: 2025,
        color: "Azul"
    },
    {
        marca: "VW",
        modelo: "Gol",
        year: 2019,
        color: "Rojo"
    },
    {
        marca: "Toyota",
        modelo: "Corolla",
        year: 2021,
        color: "Gris"
    },
]


/*
2) Usá un método de array para recorrer la lista e imprime 
por consola todos los datos de los automóviles cuyo año sea mayor a 2018.
*/

autos.forEach((auto) => {
    if(auto.year > 2018){
        console.log(auto)
    }
})

/*
Creá una función que recorra el array de automóviles.

Usá destructuring dentro de la función para obtener el color de cada automóvil.

La función debe aceptar un color como parámetro y devolver por consola cuántos 
automóviles tienen ese color.

*/

function recorrerAutos (autos = [],  color_if = false) {
    if(color_if){
        let cantidad = 0;
        autos.forEach((auto) => {
            const {color} = auto
            if (color_if.toLowerCase() == color.toLowerCase()){
                cantidad ++
            }
        })
        console.log(`La cantidad de autos de color ${color_if} es: ${cantidad}`)
    }else{
        console.log("Se necesita un color para poder contar")
    }
}

recorrerAutos(autos,"azul");

class Auto {
    constructor(marca, modelo, year, color){
        this.marca = marca;
        this.modelo = modelo;
        this.year = year;
        this.color = color
    }
}

const autos_clase = autos.map(auto => new Auto(auto.marca, auto.modelo, auto.year, auto.color))
console.log(autos_clase)

function autosReduce(autos = [], color=false){
    if(color){
        const resultado = autos.reduce((contador, auto) => contador + (color.toLowerCase() == auto.color.toLowerCase() ? 1 : 0), 0)
        console.log(`La cantidad de autos de color ${color} es: ${resultado}`)
    }else{
        console.log("Se necesita un color para poder comparar")
    }
}

autosReduce(autos_clase, "rojo")