const listaUsuarios = async () => {
  try {
    const respuesta = await fetch(
      "https://sofifregona.github.io/ecommerce_alura_geek/db.json"
    );
    const data = await respuesta.json();
    return data.users
  } catch (error) {
    return console.log(error);
  }
};

const detalleUsuario = async (id) => {
  try {
    const respuesta = await fetch(
      `https://sofifregona.github.io/ecommerce_alura_geek/db.json`
    );
    const data = await respuesta.json();
    const userEncontrado = data.users.find(users => users.id === id);
    return userEncontrado;
  } catch (error) {
    return console.log(error);
  }
};

/*const listaUsuarios = async () => {
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
};*/

const registrarUsuario = async (id, nombre, username, email, password) => {
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
          telefono: "",
          domicilio: "",
          ciudad: "",
          provincia: "",
          cp: "",
          pais: "",
          tarjeta: "",
          titular: "",
          vencimiento: "",
          cvv: "",
          carrito: [],
        }),
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

const modificarDatosDeUsuario = async (id, username, email) => {
  try {
    return await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          username,
          email,
        }),
      }
    );
  } catch (error) {
    return console.log(error);
  }
};

const modificarDatosPersonales = async (
  id,
  nombre,
  telefono,
  domicilio,
  ciudad,
  provincia,
  cp,
  pais
) => {
  try {
    return await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nombre,
          telefono,
          domicilio,
          ciudad,
          provincia,
          cp,
          pais,
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

const modificarDatosDePago = async (id, tarjeta, titular, vencimiento, cvv) => {
  try {
    return await fetch(
      `https://ecommerce-alurageek-challenge.herokuapp.com/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tarjeta,
          titular,
          vencimiento,
          cvv,
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
  modificarDatosDeUsuario,
  modificarDatosPersonales,
  modificarPassword,
  modificarDatosDePago,
  eliminarUsuario,
  actualizarCarritoUsuario,
};
