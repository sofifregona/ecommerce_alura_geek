import { estilarPagina } from "./estilarPagina.js";
import { productoServices } from "../services/productoServices.js";
estilarPagina();

const href = window.location.search;
const idProducto = href.slice(4, href.length);

const imagen = document.querySelector(".imagen_producto");
const titulo = document.querySelector(".titulo_producto");
const precio = document.querySelector(".precio_producto");
const descripcion = document.querySelector(".descripcion_producto");
const stock = document.querySelector(".stock_producto");

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
      section = seccion.nombre;
      product = producto;
    }
  });
});

imagen.style.cssText = `background-image:url(${product.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
titulo.innerHTML = product.nombre;
precio.innerHTML = product.precio;
descripcion.innerHTML = product.descripcion;
if (product.stock > 0) {
  stock.innerHTML = `${product.stock} unidad/es en stock`;
} else {
  stock.innerHTML = `Sin stock por el momento.`;
}

console.log(imagen);
console.log(product.imagen);

console.log(section);
console.log(product);
