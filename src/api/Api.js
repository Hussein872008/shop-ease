import axios from "axios"

export const ProductsData = async () => {
    const products = await axios.get("https://fakestoreapi.com/products")
    return products;


};


