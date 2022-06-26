import { productoServices } from "../services/productoServices.js";
import { crearNuevaLinea } from "./cargarProductos.js";

const busqueda = window.location.search.slice(4);
const titulo = document.querySelector(".productos_titulo");
const contenido = document.querySelector(".productos_contenido");
let nombreSeccion;
let indiceSeccion;

if (busqueda.includes("seccion_")) {
  nombreSeccion = busqueda.slice(8);
  switch (nombreSeccion) {
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
  titulo.innerHTML = nombreSeccion;
  productoServices
    .listaProductos()
    .then((response) => {
      for (let i = response.length - 1; i >= 0; i--) {
        const item = response[i];
        if (item.seccion === indiceSeccion) {
          const linea = crearNuevaLinea(item.id, item.nombre, item.precio);
          contenido.appendChild(linea);
          const img = document.querySelector(`#img${item.id}`);
          img.style.cssText = `background-image:url(${item.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  titulo.innerHTML = `Búsqueda: ${busqueda}`;
  titulo.style.fontSize = "1rem";
  productoServices
    .listaProductos()
    .then((response) => {
      for (let i = response.length - 1; i >= 0; i--) {
        const item = response[i];
        if (item.nombre.toLowerCase().includes(busqueda)) {
          const linea = crearNuevaLinea(item.id, item.nombre, item.precio);
          contenido.appendChild(linea);
          const img = document.querySelector(`#img${item.id}`);
          img.style.cssText = `background-image:url(${item.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
