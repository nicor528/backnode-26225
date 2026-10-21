import express from "express";

const app = express();

const users = [
    {name: "nicolas", email: "nicolas@gmail.com", id: 1, category: "profesor"},
    {name: "agustin", email: "agustin@gmail.com", id: 2, category: "estudiante"},
    {name: "nicolas", email: "agustin@gmail.com", id: 3, category: "estudiante"}
]

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    //console.log(id);
    //console.log(users)
    const user = users.find(user => user.id == id);
    //console.log(user)
    if(user){
        res.json({
            message: "usuario encontrado con exito",
            data: user
        })
    }else{
        res.status(404).json({
            message: "usuario no encontrado"
        })
    }
})

app.use("/users", (req, res) => {
    const name = req.query.name;
    const category = req.query.category;
    if(name && category){
        const users_query = users.filter(user => user.name == name && user.category == category);
            if(users_query.length > 0){
                res.json({
                    message: "usuario encontrado con exito",
                    data: users_query
                })
            }else{
                res.status(404).json({
                    message: "usuarios no encontrados"
                })
            }
    }else if(name){
            const users_query = users.filter(user => user.name == name);
            if(users_query.length > 0){
                res.json({
                    message: "usuario encontrado con exito",
                    data: users_query
                })
            }else{
                res.status(404).json({
                    message: "usuarios no encontrados"
                })
            }
    }else if(category){
            const users_query = users.filter(user => user.category == category);
            if(users_query.length > 0){
                res.json({
                    message: "usuario encontrado con exito",
                    data: users_query
                })
            }else{
                res.status(404).json({
                    message: "usuarios no encontrados"
                })
            }
    }else{
        res.json({
            message: "usuarios enviados",
            data: users
        })
    }
})

app.use((req, res) => {
    res.status(404).json({
        error: "404 ruta no encontrada",
        mensaje: `el recurso ${req.url} no existe`
    })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
})