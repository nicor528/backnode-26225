console.log("Inicio de programa")

console.log(process.argv)
const args = process.argv.slice(2);

async function obtenerProductos(url) {
    try{
        const response = await fetch(`https://fakestoreapi.com/${url}`)
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    }
}

async function eliminarProducto(producto){
    try{
        const response = await fetch(`https://fakestoreapi.com/${producto}`,{
            method: "DELETE"
        })
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    }
}

async function crearProducto(producto){
    try{
        const response = await fetch("https://fakestoreapi.com/products",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        })
        if(response.ok){
            const data = await response.json();
            console.log(data)
            console.log("Id del producto creado: ", data.id)
        }
    }catch(error){
        console.log(error)
    }
}

switch(args[0]){
    case "GET":
        console.log(args[0]);
        if(args[1] && args[1].startsWith("products")){
            const productos = await obtenerProductos(args[1])
            console.log(productos)
        }else{
            console.log("Comando incorrecto");
        }
        break;
    case "POST":
        console.log(args[0]);
        if(args[1] && args[2] && args[3] && args[4] && args[1] == "products"){
            await crearProducto({title: args[2], price: args[3], category: args[4]})
            console.log("Prodcuto creado")
        }else{
            console.log("Comando incompleto o incorrecto")
        }
        break;
    case "DELETE":
        console.log(args[0]);
        if(args[1].startsWith("products/") && args[1].length > 9){
            const response = await eliminarProducto(args[1]);
            console.log("Producto eliminado ", response)
        }else{
            console.log("Comando incompleto o incorrecto")
        }
        break;
    default:
        console.log("Comando incorrecto")
}