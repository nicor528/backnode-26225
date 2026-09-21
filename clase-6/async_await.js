function taskAsync() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            if (Math.random() < 0.5) {
            resolve('Tarea asincrónica completada.')
            } else {
            reject(new Error('Tarea asincrónica fallida.'))
            }
        }, 3000);
    });
}

async function executeAsyncTask () {
    console.log('Inicio de la tarea.');
    try {
        console.log("Dentro del try")
        const result = await taskAsync();
        console.log(result);
    } catch (error) {
        console.log(error);
    } finally {
        console.log('Fin de la tarea.')
    }
}
executeAsyncTask();
console.log("Continua la ejecución");