import { getAllProductsService, getProductService } from "../services/products.services.js";


export async function getAllProducts(req, res) {
    const category = req.query.category;
    try{
        const products = await getAllProductsService(category);
        if(products.length > 0){
            res.send({
                message: "Productos encontrados",
                data: products
            })
        }else{
            res.status(404).send({
                message: "Producto/s no encontrado/s"
            })
        }
    }catch(error){
        res.status(500).send({
            message: "Error interno"
        })
    }
}

export async function getProduct(req, res) {
    const id = req.params.id;
    if(id){
        try{
            const product = await getProductService(id);
            if(product){
                res.send({
                    message: "Producto encontrado",
                    data: product
                })
            }else{
                res.status(404).send({
                    message: "Producto no encontrado"
                })
            }
        }catch(error){
            res.status(500).send({
                message: "Error interno"
            })
        }
    }else{
        res.status(400).send({
            message: "el id del producto es necesario"
        })
    }
}