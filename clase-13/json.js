const jsonToConvert = {
    "name": "Juan",
    "age": 30,
    "isStudent": true,
    "courses": ["Matemáticas", "Programación"]
}

const ob_json = JSON.stringify(jsonToConvert);

console.log(ob_json);
const data = JSON.parse(ob_json);

console.log(data); // Juan