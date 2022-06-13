import { usuarioServicios } from "../services/usuarioServices.js";
import { desencriptar } from "./encriptador.js";
import { loginServices } from "../services/loginServices.js";

const listaDeUsuarios = await usuarioServicios.listaUsuarios();
const span = document.querySelector(".error");

const btnIngresar = document.querySelector(".button_form");

btnIngresar.addEventListener("click", () => {
  let error = "";
  borrarError();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const datos = validarUsername(username);
  if (datos.length !== 0) {
    desencriptar(datos[0], datos[1])
      .then((response) => {
        if (response === password) {
          loginServices.setAuthorization(datos[0]);
          window.location.href = "../index.html";
          console.log("Funciona");
        } else {
          error = "Ha ingresado un usuario y/o contraseña incorrectos.";
          mostrarError(error);
        }
      })
      .catch((error) => console.log(error));
  } else {
    if (username === "") {
      error = "Debe ingresar un nombre de usuario";
    } else if (password === "") {
      error = "Debe ingresar una contraseña";
    } else {
      error = "Ha ingresado un usuario y/o contraseña incorrectos.";
    }
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
  if (error !== "") {
    span.innerHTML = error;
    span.style.display = "inline-flex";
  }
}

function borrarError() {
  span.innerHTML = "";
  span.style.display = "none";
}
