import { estilarPagina } from "./estilarPagina.js";
const button = document.querySelector(".empty_button");
const menuDesplegable = document.querySelector(".menu_desplegable");
const body = document.querySelector("body");
const modo = document.querySelector(".modo");

button.addEventListener("click", () => {
  if (menuDesplegable.style.display == "block") {
    menuDesplegable.style.display = "none";
  } else {
    menuDesplegable.style.display = "block";
  }
});

body.addEventListener("click", (event) => {
  if (
    event.srcElement.className !== "empty_button" &&
    event.srcElement.className !== "menu_desplegable"
  ) {
    menuDesplegable.style.display = "none";
  }
});

let modoColor = localStorage.getItem("modoColor");

modo.addEventListener("click", () => {
  if (modoColor === "claro") {
    modoColor = "oscuro";
  } else {
    modoColor = "claro";
  }
  localStorage.setItem("modoColor", modoColor);
  estilarPagina();
});
