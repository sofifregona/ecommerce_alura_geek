import { productoServices } from "../services/productoServices.js";

const crearNuevaLinea = (id, nombre, precio, imagen) => {
  const linea = document.createElement("div");
  linea.classList.add("producto");
  const contenido = `
    <div class="producto_imagen" id="img${id}"></div>
    <p class="producto_titulo">${nombre}</p>
    <p class="precio">${precio}</p>
    <a class="ver_producto" href="#">Ver producto</a>`;
  linea.innerHTML = contenido;
  const img = linea.querySelector(`#img${id}`);
  img.background = `url(${imagen}) center / cover no-repeat`;
  return linea;
};

productoServices
  .listaProductos()
  .then((data) => {
    data.forEach(({ id, seccion, nombre, precio, imagen }) => {
      const section = document.querySelector(`[data-seccion${seccion.id}]`);
      console.log(seccion);
      const nuevaLinea = crearNuevaLinea(id, nombre, precio, imagen);
      section.appendChild(nuevaLinea);
    });
  })
  .catch((error) => console.log("Ocurrió un error"));
