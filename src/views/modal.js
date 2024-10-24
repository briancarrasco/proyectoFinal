import { closeModal } from "../views/modal.js";
import { setProductoActivo } from "../../main.js";
import { openModal } from "./modal.js";

const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", closeModal);

// FUNCIONES ABRIR CERRAR MODAL
export const openModal = () => {
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "flex";
    const buttonDelete = document.getElementById("deleteButton");

    if (productoActivo) {
        buttonDelete.style.display = "block";
        document.getElementById("nombre").value = productoActivo.nombre;
        document.getElementById("img").value = productoActivo.imagen;
        document.getElementById("precio").value = productoActivo.precio;
        document.getElementById("categoria").value = productoActivo.categories;
    } else {
        buttonDelete.style.display = "none";
    }
};

export const closeModal = () => {
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "none";
    setProductoActivo(null);
    resetModal();
};

const resetModal = () => {
    document.getElementById("nombre").value = "";
    document.getElementById("img").value = "";
    document.getElementById("precio").value = 0;
    document.getElementById("categoria").value = "Seleccione una categoria";
};

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", deleteProduct);
