const listaUsuarios = async () => {
  try {
    const respuesta = await fetch(
      "https://ecommerce-alurageek-challenge.herokuapp.com/users"
    );
    return await respuesta.json();
  } catch (error) {
    return console.log(error);
  }
};

const detalleUsuario = async (id) => {
  try {
    const respuesta = await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/users/${id}`
    );
    return await respuesta.json();
  } catch (error) {
    return console.log(error);
  }
};

const registrarUsuario = async (
  id,
  nombre,
  username,
  email,
  password,
  telefono,
  domicilio,
  ciudad,
  provincia,
  cp,
  pais
) => {
  try {
    return await fetch(
      "https://ecommerce-alurageek-challenge.herokuapp.com/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nombre,
          username,
          email,
          password,
          telefono,
          domicilio,
          ciudad,
          provincia,
          cp,
          pais,
          carrito: [],
        }),
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

const modificarUsuario = async (
  id,
  nombre,
  username,
  email,
  telefono,
  domicilio,
  ciudad,
  provincia,
  cp,
  pais
) => {
  try {
    return await fetch(
      "https://ecommerce-alurageek-challenge.herokuapp.com/users",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nombre,
          username,
          email,
          telefono,
          domicilio,
          ciudad,
          provincia,
          cp,
          pais,
          carrito: [],
        }),
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

const modificarPassword = async (id, password) => {
  try {
    return await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

const eliminarUsuario = async (id) => {
  try {
    return await fetch(
      `https://ecommerce-challenge-heroku.herokuapp.com/users/${id}`,
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

const actualizarCarritoUsuario = async (userId, nuevoCarrito) => {
  try {
    return await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carrito: nuevoCarrito,
        }),
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

export const usuarioServicios = {
  listaUsuarios,
  detalleUsuario,
  registrarUsuario,
  modificarUsuario,
  modificarPassword,
  eliminarUsuario,
  actualizarCarritoUsuario,
};
