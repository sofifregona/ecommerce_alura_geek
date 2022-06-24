import { productoServices } from "../services/productoServices.js";
import { loginServices } from "../services/loginServices.js";
import { usuarioServicios } from "../services/usuarioServices.js";

const href = window.location.search;
const idProducto = href.slice(4, href.length);

const imagen = document.querySelector(".imagen_producto");
const titulo = document.querySelector(".titulo_producto");
const precio = document.querySelector(".precio_producto");
const descripcion = document.querySelector(".descripcion_producto");
const stock = document.querySelector(".stock_producto");
const cantidad = document.querySelector(".cantidad_producto");
const menos = document.querySelector(".minus");
const mas = document.querySelector(".plus");
const boton = document.querySelector(".button_carrito");

const product = await productoServices
  .detalleProducto(idProducto)
  .then((response) => {
    return response;
  });

imagen.style.cssText = `background-image:url(${product.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
titulo.innerHTML = product.nombre;
precio.innerHTML = `$${product.precio}`;
descripcion.innerHTML = product.descripcion;

let nuevaCantidad = cantidad.value;
let max;

if (product.stock > 1) {
  activarBotones();
  max = product.stock;
  stock.innerHTML = `${product.stock} unidades en stock.`;
} else if (product.stock === 1) {
  activarBotones();
  max = 1;
  stock.innerHTML = `¡Sólo queda ${product.stock} unidad en stock!`;
} else {
  desactivarBotones();
  cantidad.innerHTML = 0;
  stock.innerHTML = `Sin stock por el momento.`;
}

menos.addEventListener("click", () => {
  if (nuevaCantidad > 1) {
    nuevaCantidad--;
    cantidad.value = nuevaCantidad;
  }
});

mas.addEventListener("click", () => {
  if (max > 1 && nuevaCantidad < max) {
    nuevaCantidad++;
    cantidad.value = nuevaCantidad;
  }
});

const productId = product.id;
const userId = loginServices.getAutorizathionId();

boton.addEventListener("click", () => {
  if (product.stock > 0) {
    const cantidadCompra = cantidad.value;
    const nuevoStock = product.stock - cantidadCompra;
    usuarioServicios
      .detalleUsuario(userId)
      .then((response) => {
        response.carrito.push({
          productId,
          cantidadCompra,
        });
        console.log(response.carrito);
        usuarioServicios
          .actualizarCarritoUsuario(userId, response.carrito)
          .then((resp) => {
            console.log(resp);
          });
        productoServices.actualizarStock(productId, nuevoStock).then(() => {
          window.location.href = `../screens/producto.html?id=${productId}`;
        });
      })
      .catch((error) => console.log("Ocurrió un error"));
  }
});

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
      const container = document.querySelector(".productos_similares");
      if (
        container.childElementCount < 6 &&
        product.seccion === producto.seccion
      ) {
        const nuevaLinea = crearNuevaLinea(
          producto.id,
          producto.nombre,
          producto.precio
        );
        container.appendChild(nuevaLinea);
        const img = document.querySelector(`#img${producto.id}`);
        img.style.cssText = `background-image:url(${producto.imagen});background-position:center;background-size:cover;background-repeat:no-repeat;`;
      }
    }
  })
  .catch((error) => console.log("Ocurrió un error"));

function desactivarBotones() {
  menos.style.display = "none";
  mas.style.display = "none";
  boton.style.display = "none";
  stock.style.color = "red";
}

function activarBotones() {
  menos.style.display = "inline";
  mas.style.display = "inline";
  boton.style.display = "inline";
  stock.style.color = "#555555";
}
