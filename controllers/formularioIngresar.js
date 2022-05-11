import { usuarioServicios } from "../services/usuarioServices.js";
import { estilarPagina } from "./estilarPagina.js";
import { desencriptar } from "./encriptador.js";
import { loginServices } from "../services/loginServices.js";
estilarPagina();

const listaDeUsuarios = await usuarioServicios.listaUsuarios();
const container = document.querySelector(".mensajes_de_errores");

const btnIngresar = document.querySelector(".button_form");

btnIngresar.addEventListener("click", () => {
  let error = "";
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const datos = validarUsername(username);
  if (datos.length !== 0) {
    console.log(username);
    console.log(password);
    desencriptar(datos[0], datos[1])
      .then((response) => {
        if (response === password) {
          loginServices.setAuthorization(datos[0]);
          window.location.href = "../index.html";
        } else {
          error = "Ha ingresado un usuario y/o contraseña incorrectos.";
          mostrarError(error);
        }
      })
      .catch((error) => console.log(error));
  } else {
    error = "Ha ingresado un usuario y/o contraseña incorrectos.";
    mostrarError(error);
  }
});

function validarUsername(username) {
  let datos = [];
  listaDeUsuarios.forEach((user) => {
    if (user.username === username) {
      datos.push(user.id);
      datos.push(user.password);
    }
  });
  return datos;
}

function mostrarError(error) {
  if (error !== "" && container.childElementCount === 0) {
    const span = document.createElement("span");
    span.innerHTML = error;
    container.appendChild(span);
  }
}
