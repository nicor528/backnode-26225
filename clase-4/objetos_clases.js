class User {
    constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    }

    login(inputEmail, password) {
        return this.email === inputEmail && this.password === password
        ? "Login successful!"
        : "Invalid email or password.";
    }
}

const user1 = new User("nicolas", "ejemplo@test.com", "123456")
console.log(user1.login("ejemplo@test.com", "123456"))

class Seller extends User {
    constructor(name, email, password, store, sells, incomes) {
        super(name, email, password);
        this.store = store;
        this.sells = sells;
        this.incomes = incomes;
    }
    addNewSale(amount) {
        this.sells += 1; // Incrementa el contador de ventas
        this.incomes += amount; // Agrega el monto al total de ingresos
        return `Sale added! Total sales: ${this.sells},
        Total incomes: ${this.incomes}`;
    }
}

class Buyer extends User {
    constructor(name, email, password, address, purchases, balance) {
        super(name, email, password);
        this.address = address;
        this.purchases = purchases;
        this.balance = balance;
    }
    makePurchase(amount) {
        if (this.balance >= amount) {
            this.balance -= amount; // Resta el monto del balance
            this.purchases += 1; // Incrementa el contador de compras
            return `Purchase successful! Remaining balance:
            ${this.balance}`;
        } else {
            return "Insufficient balance.";
        }
    }
}

const user2 = new User('John', 'j@correo.com', 'jhon123');
const seller1 = new Seller('Juan', 'j@correo.com', 'juan123', 'centro', 0, 0);
const buyer1 = new Buyer('Caro', 'c@correo.com', 'caro123', 'Calle 123', 0, 1000);

seller1.login('j@correo.com', 'juan123');
console.log(buyer1)
console.log(buyer1.makePurchase(100))
console.log(buyer1)

