function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayHi = function () {
        console.log(`Hola, me llamo ${this.name} y
        tengo ${this.age} años.
        `);
    };
};
// Creación de instancias
const person1 = new Person("María", 30);
const person2 = new Person("Juan", 25);
const person3 = new Person()
person1.sayHi(); // Hola, me llamo María y tengo 30 años.
person2.sayHi(); // Hola, me llamo Juan y tengo 25 años.
person3.sayHi();

console.log(person1, person2, person3)