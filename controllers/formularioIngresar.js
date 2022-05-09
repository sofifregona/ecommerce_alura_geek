import { usuarioServicios } from "../services/usuarioServices.js";
import { estilarPagina } from "./estilarPagina.js";
import { desencriptar } from "./encriptador.js";
estilarPagina();

const listaDeUsuarios = await usuarioServicios.listaUsuarios();
const container = document.querySelector(".mensajes_de_errores");

const btnIngresar = document.querySelector(".button_form");

btnIngresar.addEventListener("click", () => {
  console.log("hice click");
  const username = document.querySelector("#username").value;
  if (validarUsername(username) !== 0) {
    const password = document.querySelector("#password").value;
    console.log(username);
    console.log(password);
    console.log(validarUsername(username));
    desencriptar(validarUsername(username), password).then((response) => {
      console.log(response);
    });
  }
});

function validarUsername(username) {
  let id = 0;
  console.log(listaDeUsuarios);
  listaDeUsuarios.forEach((user) => {
    console.log(user);
    if (user.username === username) {
      id = user.id;
    }
  });
  return id;
}
