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
      `https://ecommerce-challenge-heroku.herokuapp.com/productos/${id}`,
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
