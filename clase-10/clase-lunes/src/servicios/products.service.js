const products = [
  { id: 1, name: 'Producto 1', price: 1000 },
  { id: 2, name: 'Producto 2', price: 2000 },
];

export const getAllProductsService = () => {
  return products;
};

export const getProductByIdService = async (id) => {
  return products.find(product => product.id == id);
};