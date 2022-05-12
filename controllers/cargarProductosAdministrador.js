import { loginServices } from "../services/loginServices.js";
import { productoServices } from "../services/productoServices.js";

const status = loginServices.getAutorizathion();
if (status === "67b0735a-08d6-4ae0-afef-efde5664e46c") {
  const crearNuevaLinea = (id, nombre, precio) => {
    const linea = document.createElement("div");
    linea.classList.add("producto");
    linea.id = id;
    const contenido = `
          <div class="iconos">
            <img src="../assets/img/Icono_modificar.svg" />
            <img src="../assets/img/Icono_eliminar.svg" />
          </div>
          <div class="producto_imagen" id="img${id}"></div>
          <p class="producto_titulo">${nombre}</p>
          <p class="precio">${precio}</p>
          <p class="id_producto">${id}</p>`;
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
    seccion.productos.forEach((producto) => {
      const section = document.querySelector(`[data-seccion${seccion.id}]`);
      const nuevaLinea = crearNuevaLinea(
        producto.id,
        producto.nombre,
        producto.precio
      );
      section.appendChild(nuevaLinea);
      const img = document.querySelector(`#img${producto.id}`);
      img.style.cssText = `background-image:url(${producto.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
    });
  });

  console.log(listaProductos);
} else {
  console.log("Ups... Parece que no hay nada que ver aquí");
}
