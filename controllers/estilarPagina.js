import { loginServices } from "../services/loginServices.js";

const body = document.querySelector("body");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo_imagen");
const modo = document.querySelector(".modo");
const login = document.querySelector(".logIn");
const logout = document.querySelector(".logOut");
const signin = document.querySelector(".signIn");
const productos = document.querySelector(".productos");
const carrito = document.querySelector(".carrito");
const buscar = document.querySelector(".buscar");
const inputBuscador = document.querySelector(".input_buscador");
const copyright = document.querySelector(".copyright");
const seccionPrincipal = document.querySelector(".seccion_principal");
const footer = document.querySelector(".footer");
const footerLogo = document.querySelector(".footer_logo");
const footerLista = document.querySelectorAll(".footer_lista_elemento");
const input = document.querySelectorAll(".input");

let botonBuscar = 0;

export function estilarPagina() {
  const isAuth = loginServices.getAutorizathion();
  console.log("isAuth:", isAuth);
  if (isAuth === "no autorizado") loginServices.setAuthorization("");
  if (isAuth !== "no autorizado") {
    signin.style.display = "none";
    login.style.display = "none";
    logout.style.display = "block";
    if (isAuth === "administrador") {
      console.log("Modo administrador");
      productos.style.display = "block";
      carrito.style.display = "none";
    } else {
      console.log("Modo usuario");
      productos.style.display = "none";
      carrito.style.display = "block";
    }
  } else {
    signin.style.display = "block";
    login.style.display = "block";
    logout.style.display = "none";
    productos.style.display = "none";
    carrito.style.display = "none";
  }

  let modoColor = localStorage.getItem("modoColor");
  if (modoColor === null) localStorage.setItem("modoColor", "claro");
  if (modoColor === "oscuro") {
    body.style.backgroundColor = "#242424";
    menu.style.backgroundColor = "#242424";
    logo.src = "../assets/img/Logo_blanco.png";
    modo.innerHTML = "Modo claro";
    buscar.classList.remove("buscar_clara");
    buscar.classList.add("buscar_oscuro");
    inputBuscador.style.backgroundColor = "#636363";
    copyright.style.backgroundColor = "#242424";
    copyright.style.color = "#b3b3b3";
    seccionPrincipal.style.backgroundColor = "#080808";
    footer.style.backgroundColor = "#141414";
    footerLogo.src = "../assets/img/Logo_blanco.png";
    footerLista.forEach((item) => {
      item.style.color = "#b3b3b3";
    });
    input.forEach((item) => {
      item.style.backgroundColor = "#b3b3b3";
      item.style.color = "#464646";
    });
  } else {
    body.style.backgroundColor = "#FFFFFF";
    menu.style.backgroundColor = "#FFFFFF";
    logo.src = "../assets/img/Logo.svg";
    modo.innerHTML = "Modo oscuro";
    buscar.classList.remove("buscar_oscuro");
    buscar.classList.add("buscar_clara");
    inputBuscador.style.backgroundColor = "#F5F5F5";
    copyright.style.backgroundColor = "#FFFFFF";
    copyright.style.color = "#464646";
    seccionPrincipal.style.backgroundColor = "#E5E5E5";
    footer.style.backgroundColor = "#EAF2FD";
    footerLogo.src = "../assets/img/Logo.svg";
    footerLista.forEach((item) => {
      item.style.color = "#555555";
    });
    input.forEach((item) => {
      item.style.backgroundColor = "#FFFFFF";
    });
  }
}

buscar.addEventListener("click", () => {
  const busqueda = inputBuscador.value.toLowerCase();
  if (window.innerWidth < 480) {
    if (botonBuscar === 0) {
      botonBuscar = 1;
      inputBuscador.style.cssText =
        "display:block; position:absolute; top:9vh; right:0vh; width:100%; height:6vh";
    } else {
      botonBuscar = 0;
      inputBuscador.style.display = "none";
      if (busqueda !== "") {
        window.location.href = `../screens/busqueda.html?id=${busqueda}`;
      }
    }
  } else {
    inputBuscador.style.cssText = "position:static";
    window.location.href = `../screens/busqueda.html?id=${busqueda}`;
  }
});
