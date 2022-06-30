import { loginServices } from "../services/loginServices.js";
import { usuarioServicios } from "../services/usuarioServices.js";
import { estilarPagina } from "./estilarPagina.js";

const menuDesplegable = document.querySelector(".menu_desplegable");
const signIn = document.querySelector(".signIn");
const logIn = document.querySelector(".logIn");
const logOut = document.querySelector(".logOut");
const configuracion = document.querySelector(".configuracion");
const carrito = document.querySelector(".carrito");
const productos = document.querySelector(".productos");
const modo = document.querySelector(".modo");
const logout = document.querySelector(".logOut");

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

const isAuth = loginServices.getAutorizathion();
console.log("isAuth:", isAuth);
if (isAuth === "no autorizado") loginServices.setAuthorization("");
if (isAuth !== "no autorizado") {
  signIn.style.display = "none";
  logIn.style.display = "none";
  logOut.style.display = "block";
  if (isAuth === "administrador") {
    console.log("Modo administrador");
    productos.style.display = "block";
    carrito.style.display = "none";
    configuracion.style.display = "none";
  } else {
    console.log("Modo usuario");
    productos.style.display = "none";
    carrito.style.display = "block";
    configuracion.style.display = "block";
  }
} else {
  signIn.style.display = "block";
  logIn.style.display = "block";
  logOut.style.display = "none";
  productos.style.display = "none";
  carrito.style.display = "none";
  configuracion.style.display = "none";
}

signIn.addEventListener(
  "click",
  () => (window.location.href = "../screens/registrarse.html")
);
logIn.addEventListener(
  "click",
  () => (window.location.href = "../screens/iniciarSesion.html")
);
logOut.addEventListener("click", () => (window.location.href = "index.html"));
configuracion.addEventListener("click", () => {
  const id = loginServices.getAutorizathionId();
  window.location.href = `../screens/configuracion.html?id=${id}`;
});
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
  window.location.href = "index.html";
});

estilarPagina();
