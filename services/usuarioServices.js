const listaUsuarios = () => {
  return fetch(
    "https://ecommerce-alurageek-challenge.herokuapp.com/users"
  ).then((respuesta) => respuesta.json());
};

const registrarUsuario = (
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
  return fetch("https://ecommerce-alurageek-challenge.herokuapp.com/users", {
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
  });
};

const eliminarUsuario = (id) => {
  return fetch(`https://ecommerce-challenge-heroku.herokuapp.com/users/${id}`, {
    method: "DELETE",
  });
};

export const usuarioServicios = {
  listaUsuarios,
  registrarUsuario,
  eliminarUsuario,
};
