async function obtener_pjs() {
    try{
        const response = await fetch("https://rickandmortyapi.com/api/character", {method: "GET"});
        if(response.ok){
            const data = await response.json();
            const primeros_pjs = data.results.slice(0,5)
            //console.log("Dentro del fetch",primeros_pjs)
            return primeros_pjs
        }
    }catch (error){
        console.log(error)
    }
}

const pjs = await obtener_pjs()

console.log("Por fuera de la función",pjs)

console.log("luego de obtener pjs")