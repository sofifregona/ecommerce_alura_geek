import { usuarioServicios } from "../services/usuarioServices.js";
import { loginServices } from "../services/loginServices.js";
import { productoServices } from "../services/productoServices.js";

const userId = loginServices.getAutorizathion();
const lista = document.querySelector(".lista_de_carrito");
const mensaje = document.querySelector(".mensaje");
const boton = document.querySelector(".button_pagar");

const crearNuevaLinea = (id, cantidad, nombre, precio) => {
  const linea = document.createElement("li");
  linea.classList.add("producto");
  linea.id = id;
  const contenido = `
    <div class="imagen_producto" id="img${id}"></div>
    <p class="nombre_producto">${nombre}</p>
    <p class="cantidad_producto">x${cantidad}</p>
    <p class="precio_producto" id="precio${id}">$${precio * cantidad}</p>
    <img class="eliminar_producto" src="../assets/img/Icono_eliminar_gris.svg" />
    `;
  linea.innerHTML = contenido;
  return linea;
};

let total = 0;

const carrito = await usuarioServicios
  .detalleUsuario(userId)
  .then((data) => {
    return data.carrito;
  })
  .catch((error) => console.log("Ocurrió un error"));

if (carrito.length !== 0) {
  carrito.forEach((producto) => {
    productoServices
      .detalleProducto(producto.productId)
      .then((resp) => {
        console.log(resp);
        const linea = crearNuevaLinea(
          resp.id,
          producto.cantidadCompra,
          resp.nombre,
          resp.precio
        );
        lista.appendChild(linea);
        const img = document.querySelector(`#img${resp.id}`);
        img.style.cssText = `background-image:url(${resp.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
        console.log(`${resp.imagen}`);
        total = total + resp.precio * producto.cantidadCompra;
      })
      .catch((error) => console.log("Ocurrió un error"))
      .finally(() => {
        mensaje.innerHTML = `Total: $${total}`;
        boton.style.display = "block";
      });
  });

  window.addEventListener("click", (evento) => {
    const id = evento.composedPath()[1].id;
    let precioProducto = document.getElementById(`precio${id}`).innerHTML;
    precioProducto = precioProducto.slice(1, precioProducto.length);
    const elemento = document.getElementById(`${id}`);
    const carritoNuevo = carrito;
    carritoNuevo.forEach((producto, index) => {
      if (id === producto.productId) {
        carritoNuevo.splice(index, 1);
      }
    });
    elemento.style.display = "none";
    usuarioServicios.actualizarCarritoUsuario(userId, carritoNuevo);
    total = total - precioProducto;
    if (total > 0) {
      mensaje.innerHTML = `Total: $${total}`;
      boton.style.display = "block";
    } else {
      mensaje.innerHTML = "No hay productos en el carrito";
      boton.style.display = "none";
    }
  });
} else {
  mensaje.innerHTML = "No hay productos en el carrito";
  boton.style.display = "none";
}
