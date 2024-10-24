import { closeModal } from "../views/modal.js";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage.js";
import { handleGetProductsToStore, handleRenderList } from "../views/store.js";
import { productoActivo, setProductoActivo } from "../../main.js";
import Swal from "../node_modules/sweetalert2/dist/sweetalert2.js";

// Guardar o modificar elementos
const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener("click", handleSaveOrModifyElements);

// Función de guardar o modificar elementos
const handleSaveOrModifyElements = () => {
    const nombre = document.getElementById("nombre").value;
    const imagen = document.getElementById("img").value;
    const precio = document.getElementById("precio").value;
    const categories = document.getElementById("categoria").value;
    
    const object = {
        id: productoActivo ? productoActivo.id : new Date().toISOString(),
        nombre,
        imagen,
        precio,
        categories,
    };

    Swal.fire({
        title: "Correcto!",
        text: "Producto guardado correctamente!",
        icon: "success"
    });

    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();  
};

// ELIMINAR ELEMENTO
const deleteProduct = () => {
    Swal.fire({
        title: "¿Desea eliminar el producto?",
        text: "Si lo eliminas será de forma permanente!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const filteredProducts = products.filter((el) => el.id !== productoActivo.id);
            // Setear el nuevo array
            localStorage.setItem("products", JSON.stringify(filteredProducts));
            handleRenderList(filteredProducts);
            closeModal();
        } else {
            closeModal();
        }
    });
};
