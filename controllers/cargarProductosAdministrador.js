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
          <p class="id_producto">id: ${id.slice(0, 10)}...</p>`;
    linea.innerHTML = contenido;
    return linea;
  };

  const listaProductos = await productoServices
    .listaProductos()
    .then((data) => {
      for (let i = data.length - 1; i >= 0; i--) {
        const producto = data[i];
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
      }
    })
    .catch((error) => console.log("Ocurrió un error"));
} else {
  const tituloInicial = document.querySelector(".titulo");
  tituloInicial.innerHTML = "Ups... parece que no hay nada que ver aquí";
  tituloInicial.style.cssText =
    "text-align: center; padding: 5vw 3vw; font-size: 1.1rem; font-weight: 500; width: 90%; margin-left:0";
  document.querySelector(".agregar_producto").style.display = "none";
  document
    .querySelectorAll(".productos_titulo")
    .forEach((titulo) => (titulo.style.display = "none"));
}

window.addEventListener("click", (event) => {
  const nombreEvento = event.target.name;
  if (nombreEvento === "eliminar" || nombreEvento === "modificar") {
    const nombreElemento = event.path[2].id;
    if (nombreEvento === "eliminar") {
      const id = document.getElementById(nombreElemento);
      id.style.display = "none";
      productoServices.eliminarProducto(nombreElemento);
    } else if (nombreEvento === "modificar") {
      window.location.href = `../screens/administrarProducto.html?id=${nombreElemento}`;
    }
  } else if (nombreEvento === "nuevo_producto") {
    window.location.href = `../screens/administrarProducto.html`;
  }
});
