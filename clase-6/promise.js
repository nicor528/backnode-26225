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

const result = taskAsync();
console.log(result); // Promise { <pending> }

console.log('Inicio de la tarea.');
taskAsync()
.then((result) => console.log(result))
.catch((error) => console.log(error))
.finally(() => console.log('Fin de la tarea.'));