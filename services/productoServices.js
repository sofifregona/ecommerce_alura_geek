const listaProductos = () => {
  return fetch(
    "https://ecommerce-alurageek-challenge.herokuapp.com/productos"
  ).then((respuesta) => respuesta.json());
};

const detalleProducto = (seccion, id) => {
  return fetch(
    `https://ecommerce-alurageek-challenge.herokuapp.com/productos/${id}`
  ).then((respuesta) => respuesta.json());
};

const actualizarStock = (id, nuevoStock) => {
  return fetch(
    `https://ecommerce-alurageek-challenge.herokuapp.com/productos/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: nuevoStock,
      }),
    }
  )
    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};

/*
  const crearCliente = (nombre, email) => {
    return fetch("http://localhost:3000/perfil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, id: uuid.v4() }),
    });
  };
  
  const eliminarCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
      method: "DELETE",
    });
  };
  
  const detalleCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta) =>
      respuesta.json()
    );
  };
  
  const actualizarCliente = (nombre, email, id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email }),
    })
      .then((respuesta) => respuesta)
      .catch((error) => console.log(error));
  };
  */

// Es necesario definir el type como module en la etiqueta script de html para poder usar import/export
export const productoServices = {
  listaProductos,
  detalleProducto,
  actualizarStock,
};
