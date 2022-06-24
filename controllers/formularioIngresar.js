import { usuarioServicios } from "../services/usuarioServices.js";
import { desencriptar } from "./encriptador.js";
import { loginServices } from "../services/loginServices.js";

const listaDeUsuarios = await usuarioServicios.listaUsuarios();
const span = document.querySelector(".error");

const btnIngresar = document.querySelector(".button_form");

const isAuth = loginServices.getAutorizathion();
console.log(isAuth);

if (isAuth === "no autorizado") {
  btnIngresar.addEventListener("click", () => {
    let error = "";
    borrarError();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const datos = validarUsername(username);
    if (datos.length !== 0) {
      desencriptar(datos[0], datos[1])
        .then((response) => {
          console.log(response);
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
} else {
  const tituloInicial = document.querySelector(".titulo");
  tituloInicial.innerHTML = "Ups... parece que no hay nada que ver aquí";
  tituloInicial.style.fontSize = "1rem";
  document.querySelectorAll(".input_form").forEach((input) => {
    input.style.display = "none";
  });
  btnIngresar.style.display = "none";
}

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
