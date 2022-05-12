import { usuarioServicios } from "../services/usuarioServices.js";
import { loginServices } from "../services/loginServices.js";
import { productoServices } from "../services/productoServices.js";

const userId = loginServices.getAutorizathion();
const lista = document.querySelector(".lista_de_carrito");

const crearNuevaLinea = (id, cantidad, nombre, precio) => {
  const linea = document.createElement("li");
  linea.classList.add("producto");
  linea.id = id;
  const contenido = `
    <div class="imagen_producto" id="img${id}"></div>
    <p class="nombre_producto">${nombre}</p>
    <p class="cantidad_producto">x${cantidad}</p>
    <p class="precio_producto">${precio * cantidad}</p>
    <img class="eliminar_producto" src="../assets/img/Icono_eliminar.svg" />
    `;
  linea.innerHTML = contenido;
  return linea;
};

const carrito = await usuarioServicios
  .detalleUsuario(userId)
  .then((data) => {
    return data.carrito;
  })
  .catch((error) => console.log("Ocurrió un error"));

carrito.forEach((producto) => {
  productoServices.detalleProducto(producto.productId).then((resp) => {
    const linea = crearNuevaLinea(
      resp.id,
      producto.cantidadCompra,
      resp.nombre,
      resp.precio
    );
    lista.appendChild(linea);
    console.log(lista);
    const img = document.querySelector(`#img${resp.id}`);
    img.style.cssText = `background-image:url(${resp.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
  });
});
