import { estilarPagina } from "./estilarPagina.js";
import { productoServices } from "../services/productoServices.js";
import { loginServices } from "../services/loginServices.js";
import { usuarioServicios } from "../services/usuarioServices.js";
estilarPagina();

const href = window.location.search;
const idProducto = href.slice(4, href.length);

const imagen = document.querySelector(".imagen_producto");
const titulo = document.querySelector(".titulo_producto");
const precio = document.querySelector(".precio_producto");
const descripcion = document.querySelector(".descripcion_producto");
const stock = document.querySelector(".stock_producto");
const cantidad = document.querySelector(".cantidad_producto");
const menos = document.querySelector(".minus");
const mas = document.querySelector(".plus");
const boton = document.querySelector(".button_carrito");

const listaSeccion = await productoServices
  .listaProductos()
  .then((response) => {
    return response;
  });

let section;
let product;

listaSeccion.forEach((seccion) => {
  seccion.productos.forEach((producto) => {
    if (producto.id === idProducto) {
      section = seccion.id;
      product = producto;
    }
  });
});

imagen.style.cssText = `background-image:url(${product.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
titulo.innerHTML = product.nombre;
precio.innerHTML = product.precio;
descripcion.innerHTML = product.descripcion;

let nuevaCantidad = cantidad.value;
let max;

if (product.stock > 1) {
  max = product.stock;
  stock.innerHTML = `${product.stock} unidades en stock.`;
} else if (product.stock === 1) {
  max = 1;
  stock.innerHTML = `¡Apúrate! Sólo queda ${product.stock} unidad en stock.`;
} else {
  cantidad.innerHTML = 0;
  stock.innerHTML = `Sin stock por el momento.`;
}

menos.addEventListener("click", () => {
  if (nuevaCantidad > 1) {
    nuevaCantidad--;
    cantidad.value = nuevaCantidad;
  }
});

mas.addEventListener("click", () => {
  if (max > 1 && nuevaCantidad < max) {
    nuevaCantidad++;
    cantidad.value = nuevaCantidad;
  }
});

boton.addEventListener("click", () => {
  const cantidadCompra = cantidad.value;
  const productId = product.id;
  const userId = loginServices.getAutorizathion();
  const nuevoStock = product.stock - cantidadCompra;
  usuarioServicios
    .detalleUsuario(userId)
    .then((response) => {
      response.carrito.push({
        productId,
        cantidadCompra,
      });
      usuarioServicios.actualizarCarritoUsuario(userId, response.carrito);
    })
    .catch((error) => console.log("Ocurrió un error"));
  productoServices.actualizarStock(section, productId, nuevoStock);
});
