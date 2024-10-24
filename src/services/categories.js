import { categoriaActiva } from "./main.js"; 
import { handleGetProductLocalStorage } from "../persistence/localstore/localStorage.js"; 
import { handleRenderList } from "../views/store.js"; 

const handleFilterProductsCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage();
    let result;

    switch (categoryIn) {
        case categoriaActiva:
        case "Todo":
            result = products;
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            result = products.filter((el) => el.categories === categoryIn);
            break;
        case "mayorPrecio":
            result = products.sort((a, b) => b.precio - a.precio);
            break;
        case "menorPrecio":
            result = products.sort((a, b) => a.precio - b.precio);
            break;
        default:
            return; // No hacer nada si no se reconoce la categoría
    }

    handleRenderList(result);
};

// Render de la vista categorías
export const renderCategories = () => {
    const ulList = document.getElementById("listFilter");
    ulList.innerHTML = `
        <li id="Todo">Todos los productos</li>
        <li id="Hamburguesas">Hamburguesas</li>
        <li id="Papas">Papas</li>
        <li id="Gaseosas">Gaseosas</li>
        <li id="mayorPrecio">Mayor Precio</li>
        <li id="menorPrecio">Menor Precio</li>
    `;
    
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement) => {
        liElement.addEventListener("click", () => {
            handleClick(liElement);
        });
    });

    const handleClick = (elemento) => {
        handleFilterProductsCategory(elemento.id);
        liElements.forEach((el) => {
            el.classList.remove('liActive'); // Asegúrate de definir esto correctamente
            if (elemento === el) {
                el.classList.add('liActive'); // Asegúrate de definir esto correctamente
            }
        });
    };
};







