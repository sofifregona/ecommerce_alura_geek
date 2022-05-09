import { productoServices } from "../services/productoServices.js";
import { estilarPagina } from "./estilarPagina.js";
estilarPagina();

const crearNuevaLinea = (id, nombre, precio) => {
  const linea = document.createElement("div");
  linea.classList.add("producto");
  linea.id = id;
  const contenido = `
    <div class="producto_imagen" id="img${id}"></div>
    <p class="producto_titulo">${nombre}</p>
    <p class="precio">${precio}</p>
    <a class="ver_producto" href="#">Ver producto</a>`;
  linea.innerHTML = contenido;
  return linea;
};

productoServices
  .listaProductos()
  .then((data) => {
    console.log(data);
    data.forEach(({ id, seccion, nombre, precio, imagen }) => {
      const section = document.querySelector(`[data-seccion${seccion.id}]`);
      const nuevaLinea = crearNuevaLinea(id, nombre, precio, imagen);
      section.appendChild(nuevaLinea);
      const img = document.querySelector(`#img${id}`);
      img.style.cssText = `background-image:url(${imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
    });
  })
  .catch((error) => console.log("Ocurrió un error"));

estilarPagina();
