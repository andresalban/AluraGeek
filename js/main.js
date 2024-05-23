import {conexionAPI} from "./conexionAPI.js";

const lista = document.querySelector("[data-producto]")
const formulario = document.querySelector("[data-formulario]")
const botonLimpiar = document.querySelector(".boton-limpiar")

function limpiarFormulario(){
    document.querySelector("[data-nombre]").value = "";
    document.querySelector("[data-precio]").value = "";
    document.querySelector("[data-imagen]").value = "";
}

function mostrarProducto(nombre, precio, imagen,id) {
    const producto = document.createElement("li");
    producto.className = "card";
    producto.innerHTML = `
        <div class="card_img">
          <img class="card__image" src="${imagen}" alt="imagen">
        </div>
        <div class="card__info">
          <p class="card__nombre">${nombre}</p>
          <p class="card__precio">${precio}</p>
          <p data-eliminar class="card__borrar"  id="${id}">Eliminar <img class="img_delete" src="../img/delete-icon.png"></p>
        </div>
        `

    return producto

}

async function crearProducto(evento) {
    evento.preventDefault()
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;
    await conexionAPI.enviarProducto(nombre, precio, imagen);
    swal("Bien hecho!", "Producto agregado", "success");
    limpiarFormulario()

}

async function listarProductos() {
    const listaAPI = await conexionAPI.listarProductos()
    listaAPI.forEach(producto => lista.appendChild(mostrarProducto(producto.nombre, producto.precio, producto.imagen)))
}



formulario.addEventListener("submit", evento => crearProducto(evento));
botonLimpiar.addEventListener("reset",limpiarFormulario)
listarProductos()