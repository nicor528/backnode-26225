function obtener_pjs () {
    return (
        new Promise((res, rej) => {
            fetch("https://rickandmortyapi.com/api/character", {
                method: "GET"
            }).then((response) => {
                if(response.ok){
                    return response.json()
                }
            })
            .then((data) => {
                //console.log(data)
                const primeros_pjs = data.results.slice(0,5)
                console.log(primeros_pjs)
                res(primeros_pjs)
            })
            .catch((error) => rej(error))
            .finally(() => console.log("Proceso terminado"))
        })
    )
}

obtener_pjs().then((pjs) => {
    console.log(pjs)
}).catch((error) => {
    console.log(error)
})