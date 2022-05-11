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

listaProductos.forEach((seccion) => {
  for (
    let i = seccion.productos.length - 6;
    i < seccion.productos.length;
    i++
  ) {
    const section = document.querySelector(`[data-seccion${seccion.id}]`);
    const nuevaLinea = crearNuevaLinea(
      seccion.productos[i].id,
      seccion.productos[i].nombre,
      seccion.productos[i].precio
    );
    section.appendChild(nuevaLinea);
    const img = document.querySelector(`#img${seccion.productos[i].id}`);
    img.style.cssText = `background-image:url(${seccion.productos[i].imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
  }
});
