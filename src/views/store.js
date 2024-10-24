import { handleGetProductLocalStorage } from "../persistence/localStorage.js"; 
import { openModal } from "../views/modal.js"; 
import { setProductoActivo } from "../../main.js"; 


// FUNCIÓN QUE SE ENCARGA DE EXTRAER LOS ELEMENTOS Y LLAMAR AL RENDER
export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
};

// FUNCIÓN QUE SE ENCARGA DE FILTRAR Y RENDERIZAR LA SECCIÓN CON TODOS SUS RESPECTIVOS ELEMENTOS
export const handleRenderList = (productosIn) => {
    const burgers = productosIn.filter((el) => el.categories === "Hamburguesas");
    const papas = productosIn.filter((el) => el.categories === "Papas");
    const gaseosas = productosIn.filter((el) => el.categories === "Gaseosas");

    const renderProductGroup = (productos, title) => {
        if (productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `
                <div class='containerTargetItem' id='product-${producto.categories}-${index}'>
                    <div>
                        <img src='${producto.imagen}'/>
                        <div>
                            <h2>${producto.nombre}</h2>
                        </div> 
                        <div class='targetProps'>
                            <p><b>Precio:</b> ${producto.precio}</p>
                        </div> 
                    </div> 
                </div>`;
            });

            return `
            <h1>${title}</h1>
            <div class='container'>${productosHTML.join("")}</div>`;
        }
        return '';
    };

    const sectionContainer = document.getElementById("mainTarget");
    sectionContainer.innerHTML = `
        ${renderProductGroup(burgers, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}
    `;

    // Añadir eventos para abrir el modal
    const itemElements = sectionContainer.querySelectorAll(".containerTargetItem");
    itemElements.forEach(item => {
        item.addEventListener("click", () => {
            const id = item.id.split('-')[1];
            const productoSeleccionado = productosIn.find(producto => producto.categories === id);
            setProductoActivo(productoSeleccionado);
            openModal();
        });
    });
};

