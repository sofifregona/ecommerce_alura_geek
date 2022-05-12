import { productoServices } from "../services/productoServices.js";

const crearNuevaLinea = (id, nombre, precio) => {
  const linea = document.createElement("div");
  linea.classList.add("producto");
  linea.id = id;
  const contenido = `
    <div class="producto_imagen" id="img${id}"></div>
    <p class="producto_titulo">${nombre}</p>
    <p class="precio">$${precio}</p>
    <a class="ver_producto" href="../screens/producto.html?id=${id}">Ver producto</a>`;
  linea.innerHTML = contenido;
  return linea;
};

productoServices
  .listaProductos()
  .then((data) => {
    for (let i = data.length - 1; i >= 0; i--) {
      const producto = data[i];
      const section = document.querySelector(
        `[data-seccion${producto.seccion}]`
      );
      if (section.childElementCount < 6) {
        const nuevaLinea = crearNuevaLinea(
          producto.id,
          producto.nombre,
          producto.precio
        );
        section.appendChild(nuevaLinea);
        const img = document.querySelector(`#img${producto.id}`);
        img.style.cssText = `background-image:url(${producto.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
      }
    }
  })
  .catch((error) => console.log("Ocurrió un error"));

/*
listaProductos.forEach((producto) => {
  const section = document.querySelector(`[data-seccion${producto.seccion}]`);
  const firstChild = section.firstChild;
  console.log(firstChild);
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
*/
