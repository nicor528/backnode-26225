const precios = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const precios_iva = precios.map(precio => precio * 1.21)

console.log(precios_iva)

for (const precio of precios_iva){
    console.log(`El precio con iva es ${precio}`)
}

precios_iva.forEach((precio) => {

  console.log(`El precio es: $${precio}.- IVA incluido.`);

});

precios_iva.forEach(precio => console.log(`El precio es: ${precio}.- Iva incluido`));

console.log(`La suma de todos los precios más su iva es:  ${precios.reduce((total, precio)=> total+precio)*1.21}`);