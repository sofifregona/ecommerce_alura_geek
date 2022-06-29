import { usuarioServicios } from "../services/usuarioServices.js";
import { loginServices } from "../services/loginServices.js";
import { desencriptar, encriptar } from "../controllers/encriptador.js";

const id = loginServices.getAutorizathionId();
let nombre = document.querySelector("#nombre");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let secondPassword = document.querySelector("#secondpassword");
let telefono = document.querySelector("#telefono");
let domicilio = document.querySelector("#domicilio");
let ciudad = document.querySelector("#ciudad");
let provincia = document.querySelector("#provincia");
let cp = document.querySelector("#cp");
let pais = document.querySelector("#pais");
let tarjeta = document.querySelector("#tarjeta");
let titular = document.querySelector("#titular");
let vencimiento = document.querySelector("#vencimiento");
let cvv = document.querySelector("#cvv");

const botonDatosUsuario = document.querySelector(".button_datos_usuario");
const botonDatosPersonales = document.querySelector(".button_datos_personales");
const botonPassword = document.querySelector(".button_password");
const botonDatosPago = document.querySelector(".button_datos_pago");

const listaDeUsuarios = await usuarioServicios
  .listaUsuarios()
  .then((response) => {
    return response;
  });

const usuario = await usuarioServicios.detalleUsuario(id).then((response) => {
  nombre.value = response.nombre;
  username.value = response.username;
  email.value = response.email;
  desencriptar(id, response.password).then((resp) => {
    password.value = resp;
  });
  telefono.value = response.telefono;
  domicilio.value = response.domicilio;
  ciudad.value = response.ciudad;
  provincia.value = response.provincia;
  cp.value = response.cp;
  pais.value = response.pais;
  if (response.tarjeta !== "") {
    desencriptar(id, response.tarjeta).then((resp) => {
      tarjeta.value = resp;
    });
  }
  if (response.titular !== "") {
    desencriptar(id, response.titular).then((resp) => {
      titular.value = resp;
    });
  }
  if (response.vencimiento !== "") {
    desencriptar(id, response.vencimiento).then((resp) => {
      vencimiento.value = resp;
    });
  }
  if (response.cvv !== "") {
    desencriptar(id, response.cvv).then((resp) => {
      cvv.value = resp;
    });
  }
  return response;
});

if (usuario.email === "usuario@alurageek.com") {
  alert("La modificación de datos está desactivada en el modo invitado.");
  botonDatosPersonales.disabled = true;
  botonDatosUsuario.disabled = true;
  botonPassword.disabled = true;
}

botonDatosUsuario.addEventListener("click", () => {
  let errores = 0;
  const spanUsername = document.querySelector(".username");
  const spanEmail = document.querySelector(".email");

  spanUsername.style.display = "none";
  spanEmail.style.display = "none";

  let validarUsername = validar(username, username.id);
  if (validarUsername !== "") {
    spanUsername.style.display = "inline-flex";
    errores++;
  } else {
    validarUsername = validarActualizarUsuario(username, username.id);
    if (validarUsername !== "") {
      spanUsername.style.display = "inline-flex";
      errores++;
    }
  }
  spanUsername.innerHTML = validarUsername;
  let validarEmail = validar(email, email.id);
  if (validarEmail !== "") {
    spanEmail.style.display = "inline-flex";
    errores++;
  } else {
    validarEmail = validarActualizarUsuario(email, email.id);
    if (validarEmail !== "") {
      spanEmail.style.display = "inline-flex";
      errores++;
    }
  }
  spanEmail.innerHTML = validarEmail;
  if (errores === 0) {
    usuarioServicios
      .modificarDatosDeUsuario(id, username.value, email.value)
      .then((response) => {
        console.log(response);
      });
  }
});

botonDatosPersonales.addEventListener("click", () => {
  let errores = 0;
  const spanNombre = document.querySelector(".nombre");

  spanNombre.style.display = "none";

  let validarNombre = validar(nombre, nombre.id);
  if (validarNombre !== "") {
    spanNombre.style.display = "inline-flex";
    errores++;
  }

  spanNombre.innerHTML = validarNombre;
  if (errores === 0) {
    usuarioServicios
      .modificarDatosPersonales(
        id,
        nombre.value,
        telefono.value,
        domicilio.value,
        ciudad.value,
        provincia.value,
        cp.value,
        pais.value
      )
      .then((response) => {
        console.log(response);
      });
  }
});

botonPassword.addEventListener("click", () => {
  let errores = 0;
  const spanPassword = document.querySelector(".password");
  const spanSecondPassword = document.querySelector(".secondpassword");
  spanPassword.style.display = "none";
  spanSecondPassword.style.display = "none";
  const validarPassword = validar(password, password.id);
  if (validarPassword !== "") {
    spanPassword.style.display = "inline-flex";
    errores++;
  }
  spanPassword.innerHTML = validarPassword;
  const validarSecondPAssword = validarRepetirContraseña(secondPassword);
  if (validarSecondPAssword !== "") {
    spanSecondPassword.style.display = "inline-flex";
    errores++;
  }
  spanSecondPassword.innerHTML = validarSecondPAssword;
  if (errores === 0) {
    encriptar(id, password.value).then((response) => {
      const pass = response;
      usuarioServicios.modificarPassword(id, pass);
    });
  }
});

botonDatosPago.addEventListener("click", () => {
  let errores = 0;
  const spanTarjeta = document.querySelector(".tarjeta");
  const spanTitular = document.querySelector(".titular");
  const spanVencimiento = document.querySelector(".vencimiento");
  const spanCvv = document.querySelector(".cvv");
  spanTarjeta.style.display = "none";
  spanTitular.style.display = "none";
  spanVencimiento.style.display = "none";
  spanCvv.style.display = "none";

  const validacionTarjeta = validar(tarjeta, tarjeta.id);
  if (validacionTarjeta !== "") {
    spanTarjeta.style.display = "inline-flex";
    errores++;
  }
  spanTarjeta.innerHTML = validacionTarjeta;

  const validacionTitular = validar(titular, titular.id);
  if (validacionTitular !== "") {
    spanTitular.style.display = "inline-flex";
    errores++;
  }
  spanTitular.innerHTML = validacionTitular;

  const validacionVencimiento = validar(vencimiento, vencimiento.id);
  if (validacionVencimiento !== "") {
    spanVencimiento.style.display = "inline-flex";
    errores++;
  }
  spanVencimiento.innerHTML = validacionVencimiento;

  const validacionCvv = validar(cvv, cvv.id);
  if (validacionCvv !== "") {
    spanCvv.style.display = "inline-flex";
    errores++;
  }
  spanCvv.innerHTML = validacionCvv;

  if (errores === 0) {
    encriptar(id, tarjeta.value).then((tarjeta) => {
      encriptar(id, titular.value.toUpperCase()).then((titular) => {
        encriptar(id, vencimiento.value).then((vencimiento) => {
          encriptar(id, cvv.value).then((cvv) => {
            usuarioServicios.modificarDatosDePago(
              id,
              tarjeta,
              titular,
              vencimiento,
              cvv
            );
          });
        });
      });
    });
  }
});

function validar(input, campo) {
  let error = "";
  console.log(input);
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
        case "tarjeta":
          error = "Por favor haga coincidir el formato 0000 0000 0000 0000<br>";
          break;
        case "titular":
          error =
            "El nombre del titular debe contener al menos 3 letras, sin números ni caracteres especiales<br>";
          break;
        case "vencimiento":
          error = "Por favor haga coincidir el formato 00/00";
          break;
        case "cvv":
          error = "Por favor haga coincidir el formato 000 (o 0000)";
          break;
      }
    }
  } else {
    input.parentElement.classList.remove("input-container--invalid");
  }
  return error;
}

function validarActualizarUsuario(input, campo) {
  let error = "";
  let usuarioEncontrado = false;
  listaDeUsuarios.forEach((user) => {
    if (id !== user.id) {
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
    }
  });
  return error;
}

function validarRepetirContraseña(secondpassword) {
  let error = "";
  if (password.value !== secondpassword.value) {
    error = "Las contraseñas deben coincidir.<br>";
    secondpassword.parentElement.classList.add("input-container--invalid");
  } else {
    secondpassword.parentElement.classList.remove("input-container--invalid");
  }
  return error;
}
