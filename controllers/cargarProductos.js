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
    <a class="ver_producto" href="../screens/producto.html?id=${id}">Ver producto</a>`;
  linea.innerHTML = contenido;
  return linea;
};

const listaProductos = await productoServices
  .listaProductos()
  .then((data) => {
    return data;
  })
  .catch((error) => console.log("Ocurrió un error"));

listaProductos.forEach((producto) => {
  const section = document.querySelector(`[data-seccion${producto.seccion}]`);
  const firstChild = section.firstChild;
  if (section.childElementCount < 6) {
    const nuevaLinea = crearNuevaLinea(
      producto.id,
      producto.nombre,
      producto.precio
    );
    section.insertBefore(nuevaLinea, firstChild);
    const img = document.querySelector(`#img${producto.id}`);
    img.style.cssText = `background-image:url(${producto.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
  }
});
