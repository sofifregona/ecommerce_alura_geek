import { loginServices } from "../services/loginServices.js";
import { productoServices } from "../services/productoServices.js";

const status = loginServices.getAutorizathion();
if (status === "administrador") {
  const crearNuevaLinea = (id, nombre, precio) => {
    const linea = document.createElement("div");
    linea.classList.add("producto");
    linea.id = id;
    const contenido = `
          <div class="iconos">
            <img src="../assets/img/Icono_modificar.svg" name="modificar"/>
            <img src="../assets/img/Icono_eliminar.svg" name="eliminar"/>
          </div>
          <div class="producto_imagen" id="img${id}"></div>
          <p class="producto_titulo">${nombre}</p>
          <p class="precio">$${precio}</p>
          <p class="id_producto">${id}</p>`;
    linea.innerHTML = contenido;
    return linea;
  };

  const listaProductos = await productoServices
    .listaProductos()
    .then((data) => {
      data.forEach((producto) => {
        console.log(producto.seccion);
        const section = document.querySelector(
          `[data-seccion${producto.seccion}]`
        );
        const nuevaLinea = crearNuevaLinea(
          producto.id,
          producto.nombre,
          producto.precio
        );
        section.appendChild(nuevaLinea);
        const img = document.querySelector(`#img${producto.id}`);
        img.style.cssText = `background-image:url(${producto.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
      });
    })
    .catch((error) => console.log("Ocurrió un error"));
} else {
  console.log("Ups... Parece que no hay nada que ver aquí");
}

window.addEventListener("click", (event) => {
  const nombreEvento = event.target.name;
  if (nombreEvento === "eliminar" || nombreEvento === "modificar") {
    const nombreElemento = event.path[2].id;
    if (nombreEvento === "eliminar") {
      const id = document.getElementById(nombreElemento);
      id.style.display = "none";
      productoServices.eliminarProducto(nombreElemento);
    }
  }
});
