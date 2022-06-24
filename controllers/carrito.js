import { usuarioServicios } from "../services/usuarioServices.js";
import { loginServices } from "../services/loginServices.js";
import { productoServices } from "../services/productoServices.js";

const userId = loginServices.getAutorizathionId();
const lista = document.querySelector(".lista_de_carrito");
const mensaje = document.querySelector(".mensaje");
const boton = document.querySelector(".button_pagar");

const crearNuevaLinea = (id, cantidad, nombre, precio, imagen) => {
  const linea = document.createElement("li");
  linea.classList.add("producto");
  const contenido = `
    <div class="imagen_producto img${id}" style="background-image:url(${imagen});background-position:center;background-size:cover;background-repeat:no-repeat;"></div>
    <p class="nombre_producto">${nombre}</p>
    <p class="cantidad_producto">x${cantidad}</p>
    <p class="precio_producto">$${precio * cantidad}</p>
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
        const linea = crearNuevaLinea(
          resp.id,
          producto.cantidadCompra,
          resp.nombre,
          resp.precio,
          resp.imagen
        );
        lista.appendChild(linea);
        total = total + resp.precio * producto.cantidadCompra;
      })
      .catch((error) => console.log("Ocurrió un error"))
      .finally(() => {
        mensaje.innerHTML = `Total: $${total}`;
        boton.style.display = "block";
      });
  });

  window.addEventListener("click", (evento) => {
    if (evento.composedPath()[0].classList[0] === "eliminar_producto") {
      const elemento = evento.composedPath()[1];
      let id = elemento.querySelector("div").classList[1];
      id = id.slice(3, id.length);
      console.log(id);

      let precioProducto = elemento.querySelector(".precio_producto").innerHTML;
      precioProducto = precioProducto.slice(1, precioProducto.length);

      let cantidadProducto =
        elemento.querySelector(".cantidad_producto").innerHTML;
      cantidadProducto = parseInt(
        cantidadProducto.slice(1, cantidadProducto.length)
      );

      productoServices.detalleProducto(id).then((response) => {
        const nuevoStock = response.stock + cantidadProducto;
        productoServices.actualizarStock(id, nuevoStock);
      });

      const carritoNuevo = carrito;
      carritoNuevo.forEach((producto, index) => {
        if (id === producto.productId) {
          carritoNuevo.splice(index, 1);
        }
      });

      lista.removeChild(elemento);
      usuarioServicios.actualizarCarritoUsuario(userId, carritoNuevo);

      total = total - precioProducto;
      if (total > 0) {
        mensaje.innerHTML = `Total: $${total}`;
        boton.style.display = "block";
      } else {
        mensaje.innerHTML = "No hay productos en el carrito";
        boton.style.display = "none";
      }
    }
  });
} else {
  mensaje.innerHTML = "No hay productos en el carrito";
  boton.style.display = "none";
}
