import { estilarPagina } from "./estilarPagina.js";
import { loginServices } from "../services/loginServices.js";

const menuDesplegable = document.querySelector(".menu_desplegable");
const signIn = document.querySelector(".signIn");
const logIn = document.querySelector(".logIn");
const logOut = document.querySelector(".logOut");
const carrito = document.querySelector(".carrito");
const productos = document.querySelector(".productos");
const modo = document.querySelector(".modo");
const logout = document.querySelector(".logOut");
estilarPagina();

window.addEventListener("click", (event) => {
  if (event.target.classList[0] === "empty_button") {
    event.preventDefault();
    if (menuDesplegable.style.display === "block") {
      menuDesplegable.style.display = "none";
    } else {
      menuDesplegable.style.display = "block";
    }
  } else {
    menuDesplegable.style.display = "none";
  }
});

signIn.addEventListener(
  "click",
  () => (window.location.href = "../screens/registrarse.html")
);
logIn.addEventListener(
  "click",
  () => (window.location.href = "../screens/iniciarSesion.html")
);
logOut.addEventListener(
  "click",
  () => (window.location.href = "../index.html")
);
carrito.addEventListener(
  "click",
  () => (window.location.href = "../screens/carrito.html")
);
productos.addEventListener(
  "click",
  () => (window.location.href = "../screens/administrador.html")
);

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

logout.addEventListener("click", () => {
  loginServices.setAuthorization("");
  window.location.href = "../index.html";
});
