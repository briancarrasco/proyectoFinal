import { handleGetProductLocalStorage } from "../persistence/localstore/localStorage.js"; 
import { handleRenderList } from "../views/store.js"; 

export const handleSearchProductByName = () => {
    const input = document.getElementById("imputHeader");
    const query = input.value.toLowerCase();

    const products = handleGetProductLocalStorage();
    const filteredProducts = products.filter(product => product.nombre.toLowerCase().includes(query));
    
    handleRenderList(filteredProducts);
};
