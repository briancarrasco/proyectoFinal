//====LOCALSTORAGE=====
// TRAER PRODUCTOS DEL LOCALSTORAGE
export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    return products || []; // Retorna un arreglo vacío si no hay productos
};

// GUARDAR EN LOCALSTORAGE
// RECIBIR UN PRODUCTO
export const setInLocalStorage = (productIn) => {
    if (productIn) {
        // TRAER LOS ELEMENTOS
        const productsInLocal = handleGetProductLocalStorage();
        const existingIndex = productsInLocal.findIndex(
            (productsLocal) => productsLocal.id === productIn.id
        );

        // VERIFICAR SI EL ELEMENTO EXISTE
        if (existingIndex !== -1) {
            // SI EXISTE, DEBE REEMPLAZARSE
            productsInLocal[existingIndex] = productIn;
        } else {
            // SI NO EXISTE, DEBE AGREGARSE
            productsInLocal.push(productIn);
        }
        // SETEAR EL NUEVO ARRAY
        localStorage.setItem("products", JSON.stringify(productsInLocal));
    }
};
