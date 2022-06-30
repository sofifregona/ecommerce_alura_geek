import { loginServices } from "../services/loginServices.js";

const isAuth = loginServices.getAutorizathion();

if (isAuth !== "usuario") {
  const titulo = document.querySelector(".title");
  titulo.innerHTML = "Ups... parece que no hay nada que ver aquí";
  titulo.style.fontSize = "1rem";
}
