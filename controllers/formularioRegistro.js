import { usuarioServicios } from "../services/usuarioServices.js";
import { encriptar } from "./encriptador.js";

const listaDeUsuarios = await usuarioServicios.listaUsuarios();
const container = document.querySelector(".mensajes_de_errores");

const btnRegistrar = document.querySelector(".button_form");

btnRegistrar.addEventListener("click", () => {
  let messages = [];
  let children = container.childNodes;
  children.forEach((child) => {
    child.innerHTML = "";
  });

  const nombre = document.querySelector("#nombre");
  const validacionNombre = validar(nombre);
  if (validacionNombre !== "") {
    messages.push(validacionNombre);
  }

  const username = document.querySelector("#username");
  const validacionUsername = validar(username);
  if (validacionUsername !== "") {
    messages.push(validacionUsername);
  } else if (validarUsername(username) !== "") {
    messages.push(validarUsername(username));
  }

  const email = document.querySelector("#email");
  const validacionEmail = validar(email);
  if (validacionEmail !== "") {
    messages.push(validacionEmail);
  } else if (validarEmail(email) !== "") {
    messages.push(validarEmail(email));
  }

  const password = document.querySelector("#password");
  const validacionPassword = validar(password);
  if (validacionPassword !== "") {
    messages.push(validacionPassword);
  }

  const secondpassword = document.querySelector("#secondpassword");
  const validacionSecondPassword = validarRepetirContraseña(
    password,
    secondpassword
  );
  if (validacionSecondPassword !== "") {
    messages.push(validacionSecondPassword);
  }

  const telefono = document.querySelector("#telefono");
  const domicilio = document.querySelector("#domicilio");
  const ciudad = document.querySelector("#ciudad");
  const provincia = document.querySelector("#provincia");
  const cp = document.querySelector("#cp");
  const pais = document.querySelector("#pais");

  messages.forEach((error) => {
    const span = document.createElement("span");
    span.innerHTML = error;
    container.appendChild(span);
  });

  console.log(messages);
  if (messages.length === 0) {
    console.log("Dentro del IF");
    const id = uuid.v4();
    encriptar(id, password.value).then((response) => {
      const pass = response;
      console.log("Dentro de encriptar");
      usuarioServicios
        .registrarUsuario(
          id,
          nombre.value,
          username.value,
          email.value,
          pass,
          telefono.value,
          domicilio.value,
          ciudad.value,
          provincia.value,
          cp.value,
          pais.value
        )
        .then((response) => {
          console.log(response);
          console.log("Dentro de registrar");
        });
    });
  }
});

function validar(input) {
  let error = "";
  let tipoDeInput = input.id;
  if (!input.validity.valid) {
    input.classList.add("input-container--invalid");
    if (input.validity.valueMissing) {
      error = `El campo ${tipoDeInput} no puede estar vacío.<br>`;
    } else if (input.validity.patternMismatch) {
      switch (tipoDeInput) {
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
    input.classList.remove("input-container--invalid");
  }
  return error;
}

function validarRepetirContraseña(password, secondpassword) {
  let error = "";
  if (password.value !== secondpassword.value) {
    error = "Las contraseñas deben coincidir.<br>";
    secondpassword.classList.add("input-container--invalid");
  } else {
    secondpassword.classList.remove("input-container--invalid");
  }
  return error;
}

function validarUsername(username) {
  let error = "";
  listaDeUsuarios.forEach((user) => {
    if (user.username === username.value) {
      error = "Este username ya está registrado.<br>";
      username.classList.add("input-container--invalid");
    } else {
      username.classList.remove("input-container--invalid");
    }
  });
  return error;
}

function validarEmail(email) {
  let error = "";
  listaDeUsuarios.forEach((user) => {
    if (user.email === email.value) {
      error = "Este email ya está registrado.<br>";
      email.classList.add("input-container--invalid");
    } else {
      email.classList.remove("input-container--invalid");
    }
  });
  return error;
}
