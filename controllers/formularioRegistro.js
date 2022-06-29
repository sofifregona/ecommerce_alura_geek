import { usuarioServicios } from "../services/usuarioServices.js";
import { loginServices } from "../services/loginServices.js";
import { encriptar } from "./encriptador.js";

const listaDeUsuarios = await usuarioServicios.listaUsuarios();
const spans = document.querySelectorAll(".registro_span");
const inputs = document.querySelectorAll(".obligatorio");

const isAuth = loginServices.getAutorizathion();
console.log(isAuth);
if (isAuth === "no autorizado") {
  inputs.forEach((input) => {
    input.addEventListener("keyup", () => {
      const campo = input.id;
      const span = document.querySelector(`.${campo}`);
      span.style.display = "none";
      const validacion = validar(input, campo);
      if (campo === "secondpassword" && validacion === "") {
        const segundaValidacion = validarRepetirContraseña(input);
        if (segundaValidacion !== "") {
          span.innerHTML = segundaValidacion;
          span.style.display = "inline-flex";
        }
      } else {
        if (validacion !== "") {
          span.innerHTML = validacion;
          span.style.display = "inline-flex";
        }
        if (validacion === "" && (campo === "username" || campo === "email")) {
          const segundaValidacion = validarNuevoUsuario(input, campo);
          if (segundaValidacion !== "") {
            span.innerHTML = segundaValidacion;
            span.style.display = "inline-flex";
          }
        }
      }
    });
  });

  const btnRegistrar = document.querySelector(".button_form");

  btnRegistrar.addEventListener("click", () => {
    let errores = 0;
    spans.forEach((span) => {
      if (span.style.display === "inline-flex") {
        errores++;
      }
    });

    if (errores === 0) {
      const id = uuid.v4();
      encriptar(id, password.value).then((response) => {
        const pass = response;
        usuarioServicios
          .registrarUsuario(
            id,
            document.querySelector("#nombre").value,
            document.querySelector("#username").value,
            document.querySelector("#email").value,
            pass
          )
          .then((response) => {
            console.log(response);
            window.location.href = "../screens/iniciarSesion.html";
          });
      });
    } else {
      window.scrollTo(0, 0);
    }
  });
} else {
  const tituloInicial = document.querySelector(".titulo");
  tituloInicial.innerHTML = "Ups... parece que no hay nada que ver aquí";
  tituloInicial.style.fontSize = "1rem";
  document.querySelectorAll(".div_registro").forEach((div) => {
    div.style.display = "none";
  });
  document.querySelector(".campos_obligatorios").style.display = "none";
  document.querySelector(".button_form").style.display = "none";
}

function validar(input, campo) {
  let error = "";
  if (!input.validity.valid) {
    input.parentElement.classList.add("input-container--invalid");
    if (input.validity.valueMissing) {
      error = `El campo "${input.name}" no puede estar vacío.<br>`;
    } else if (input.validity.patternMismatch) {
      switch (campo) {
        case "nombre":
          error =
            "El nombre debe contener al menos 3 letras, sin números ni caracteres especiales<br>";
          break;
        case "username":
          error =
            "El username debe contener entre 8 y 20 caracteres. Sólo acepta letras, números y _.<br>";
          break;
        case "email":
          error = "El formato del e-mail no es válido.<br>";
          break;
        case "password":
          error =
            "La contraseña debe contener entre 8 y 20 caracteres con al menos una letra minúscula, una mayúscula y un número. No se admiten caracteres especiales.<br>";
          break;
      }
    }
  } else {
    input.parentElement.classList.remove("input-container--invalid");
  }
  return error;
}

function validarRepetirContraseña(secondpassword) {
  let error = "";
  const password = document.querySelector("#password").value;
  if (password !== secondpassword.value) {
    error = "Las contraseñas deben coincidir.<br>";
    secondpassword.parentElement.classList.add("input-container--invalid");
  } else {
    secondpassword.parentElement.classList.remove("input-container--invalid");
  }
  return error;
}

function validarNuevoUsuario(input, campo) {
  let error = "";
  let usuarioEncontrado = false;
  listaDeUsuarios.forEach((user) => {
    const email = user.email;
    const username = user.username;
    if (
      (campo === "email" && email === input.value) ||
      (campo === "username" && username === input.value)
    ) {
      usuarioEncontrado = true;
    }
    if (usuarioEncontrado) {
      error = `Este ${campo} ya está registrado.<br>`;
      input.parentElement.classList.add("input-container--invalid");
    } else {
      input.parentElement.classList.remove("input-container--invalid");
    }
  });
  return error;
}
