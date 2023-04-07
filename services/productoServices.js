const listaProductos = async () => {
  try {
    const respuesta = await fetch(
      "https://sofifregona.github.io/ecommerce_alura_geek/db.json"
    );
    const data = await respuesta.json();
    return data.productos;
  } catch (error) {
    return console.log(error);
  }
};

const detalleProducto = async (id) => {
  try {
    const respuesta = await fetch(
      `https://sofifregona.github.io/ecommerce_alura_geek/db.json`
    );
    const data = await respuesta.json();
    const productoEncontrado = data.productos.find(
      (producto) => producto.id === id
    );
    return productoEncontrado;
  } catch (error) {
    return console.log(error);
  }
};

const actualizarStock = async (id, stock) => {
  try {
    const respuesta = await fetch(
      "https://sofifregona.github.io/Sofia-tienda-de-ropa/db.json"
    );
    const listaProductos = await respuesta.json();
    const productoEncontrado = listaProductos.productos.find(
      (producto) => producto.id === id
    );
    if (productoEncontrado) {
      //productoEncontrado.stock = stock;
      const respuestaPatch = await fetch(
        "https://sofifregona.github.io/Sofia-tienda-de-ropa/db.json",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify(listaProductos),
          body: JSON.stringify({
            stock,
          }),
        }
      );
      console.log(
        `Nombre del producto con ID ${id} actualizado a ${nuevoNombre}`
      );
      return respuestaPatch;
    } else {
      console.log(`No se encontró un producto con el ID ${id}`);
    }
  } catch (error) {
    return console.log(error);
  }
};

const crearProducto = async (
  id,
  nombre,
  seccion,
  descripcion,
  precio,
  stock,
  imagen
) => {
  try {
    const respuestaPost = await fetch(
      "https://sofifregona.github.io/Sofia-tienda-de-ropa/db.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //mode: 'no-cors',
        //body: JSON.stringify(listaProductos)
        body: JSON.stringify({
          id,
          nombre,
          seccion,
          descripcion,
          precio,
          stock,
          imagen,
        }),
      }
    );
    return respuestaPost;

    /*return await fetch(
      "https://ecommerce-alurageek-challenge.herokuapp.com/productos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nombre,
          seccion,
          descripcion,
          precio,
          stock,
          imagen,
        }),
      }
    );*/
  } catch (error) {
    return console.log(error);
  }
};

const actualizarProducto = async (
  id,
  nombre,
  seccion,
  descripcion,
  precio,
  stock,
  imagen
) => {
  try {
    const respuesta = await fetch(
      "https://sofifregona.github.io/ecommerce_alura_geek/db.json"
    );
    const listaProductos = await respuesta.json();
    const productoEncontrado = listaProductos.productos.find(
      (producto) => producto.id === id
    );
    if (productoEncontrado) {
      productoEncontrado.id = id;
      productoEncontrado.nombre = nombre;
      productoEncontrado.seccion = seccion;
      productoEncontrado.descripcion = descripcion;
      productoEncontrado.precio = precio;
      productoEncontrado.istock = stock;
      productoEncontrado.imagen = imagen;

      const respuestaPatch = await fetch(
        "https://sofifregona.github.io/Sofia-tienda-de-ropa/db.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          //mode: 'no-cors',
          //body: JSON.stringify(listaProductos)
          body: JSON.stringify({
            productoEncontrado
          }),
        }
      );
      return respuestaPatch;
    }
    /*const respuesta = await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/productos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          seccion,
          descripcion,
          precio,
          stock,
          imagen,
        }),
      }
    );
    return respuesta;*/
  } catch (error) {
    return console.log(error);
  }
};

const eliminarProducto = async (id) => {
  try {
    return await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/productos/${id}`,
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

export const productoServices = {
  listaProductos,
  detalleProducto,
  actualizarStock,
  crearProducto,
  actualizarProducto,
  eliminarPr
};

/*

const listaProductos = async () => {
  try {
    const respuesta = await fetch(
      "https://ecommerce-alurageek-challenge.herokuapp.com/productos"
    );
    return await respuesta.json();
  } catch (error) {
    return console.log(error);
  }
};

const detalleProducto = async (id) => {
  try {
    const respuesta = await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/productos/${id}`
    );
    return await respuesta.json();
  } catch (error) {
    return console.log(error);
  }
};

const actualizarStock = async (id, stock) => {
  try {
    const respuesta = await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/productos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock,
        }),
      }
    );
    return respuesta;
  } catch (error) {
    return console.log(error);
  }
};

const crearProducto = async (
  id,
  nombre,
  seccion,
  descripcion,
  precio,
  stock,
  imagen
) => {
  try {
    return await fetch(
      "https://ecommerce-alurageek-challenge.herokuapp.com/productos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nombre,
          seccion,
          descripcion,
          precio,
          stock,
          imagen,
        }),
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

const actualizarProducto = async (
  id,
  nombre,
  seccion,
  descripcion,
  precio,
  stock,
  imagen
) => {
  try {
    const respuesta = await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/productos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          seccion,
          descripcion,
          precio,
          stock,
          imagen,
        }),
      }
    );
    return respuesta;
  } catch (error) {
    return console.log(error);
  }
};

const eliminarProducto = async (id) => {
  try {
    return await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/productos/${id}`,
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

export const productoServices = {
  listaProductos,
  detalleProducto,
  actualizarStock,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
*/
