import { productoServices } from "../services/productoServices.js";
import { crearNuevaLinea } from "./cargarProductos.js";

const seccion = window.location.search.slice(4);
let nombreSeccion;
let indiceSeccion;

switch (seccion) {
  case "starwars":
    nombreSeccion = "Star Wars";
    indiceSeccion = 1;
    break;
  case "consolas":
    nombreSeccion = "Consolas";
    indiceSeccion = 2;
    break;
  case "diversos":
    nombreSeccion = "Diversos";
    indiceSeccion = 3;
    break;
}

const titulo = document.querySelector(".productos_titulo");
const contenido = document.querySelector(".productos_contenido");

titulo.innerHTML = nombreSeccion;

productoServices.listaProductos().then((response) => {
  for (let i = response.length - 1; i >= 0; i--) {
    const item = response[i];
    if (item.seccion === indiceSeccion) {
      const linea = crearNuevaLinea(item.id, item.nombre, item.precio);
      contenido.appendChild(linea);
      const img = document.querySelector(`#img${item.id}`);
      img.style.cssText = `background-image:url(${item.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
      console.log(item);
    }
  }
});
